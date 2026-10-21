package domains

import (
	v1 "billionmail-core/api/domains/v1"
	"billionmail-core/internal/model"
	"billionmail-core/internal/service/acme"
	"billionmail-core/internal/service/public"
	"billionmail-core/internal/service/webmail"
	"context"
	"os"
	"path/filepath"
	"sync"
	"time"

	"github.com/gogf/gf/v2/errors/gerror"
	"github.com/gogf/gf/v2/frame/g"
)

// Webmail certificates (webmail.<domain>) are managed apart from the mail host
// certificates: they are only requested once the webmail DNS record points at
// this server, a failure never touches the mail certificate, and core picks up
// a new file without restarting (see webmail.Certificate).

const (
	webmailCertRenewBefore = 30 * 24 * time.Hour
	webmailCertRetryAfter  = time.Hour
)

var webmailCertRetryAt sync.Map // hostname -> time.Time of the next attempt after a failure

// webmailCertRemaining returns how long the stored webmail certificate is valid, 0 if missing.
func webmailCertRemaining(host string) time.Duration {
	crtPath, _ := webmail.CertPaths(host)
	pemData, err := os.ReadFile(crtPath)
	if err != nil {
		return 0
	}
	endtime := acme.GetCertInfo(string(pemData)).Endtime
	return time.Until(time.Unix(int64(endtime), 0))
}

// ApplyWebmailCert requests a Let's Encrypt certificate for webmail.<domain> over HTTP-01.
func ApplyWebmailCert(ctx context.Context, domain string, accountInfo *model.Account) error {
	host := public.FormatWebmail(domain)

	certificate, privateKey, err := acme.ApplySSLWithExistingServer(ctx, []string{host}, accountInfo.Email, "http", "", nil, "")
	if err != nil {
		return err
	}
	if certificate == "" || privateKey == "" {
		return gerror.Newf("empty certificate issued for %s", host)
	}

	crtPath, keyPath := webmail.CertPaths(host)
	if err = os.MkdirAll(filepath.Dir(crtPath), 0750); err != nil {
		return err
	}

	// Key first: webmail.Certificate reloads when the certificate file changes.
	if err = os.WriteFile(keyPath, []byte(privateKey), 0600); err != nil {
		return err
	}
	return os.WriteFile(crtPath, []byte(certificate), 0644)
}

// EnsureWebmailCerts issues missing webmail certificates and renews expiring ones.
func EnsureWebmailCerts(ctx context.Context) {
	ds, err := All(ctx)
	if err != nil {
		return
	}

	var account *model.Account

	for _, d := range ds {
		host := public.FormatWebmail(d.Domain)

		if webmailCertRemaining(host) > webmailCertRenewBefore {
			continue
		}

		if t, ok := webmailCertRetryAt.Load(host); ok && time.Now().Before(t.(time.Time)) {
			continue
		}

		record, ok := public.GetCache(buildCacheKey(d.Domain, "WEBMAIL")).(v1.DNSRecord)
		if !ok {
			record, _ = GetWebmailRecord(d.Domain, true)
		}
		if !record.Valid {
			continue
		}

		if account == nil {
			account, err = adminAccount()
			if err != nil {
				g.Log().Warning(ctx, "[WebmailSSL] Failed to get admin account:", err)
				return
			}
		}

		g.Log().Info(ctx, "[WebmailSSL] Requesting certificate for", host)
		if err = ApplyWebmailCert(ctx, d.Domain, account); err != nil {
			webmailCertRetryAt.Store(host, time.Now().Add(webmailCertRetryAfter))
			g.Log().Warningf(ctx, "[WebmailSSL] Certificate for %s failed, retry in %s: %v", host, webmailCertRetryAfter, err)
			continue
		}

		webmailCertRetryAt.Delete(host)
		g.Log().Info(ctx, "[WebmailSSL] Certificate issued for", host)
	}
}

// adminAccount returns the console admin account, used as the ACME account.
func adminAccount() (*model.Account, error) {
	adminUsername, err := public.DockerEnv("ADMIN_USERNAME")
	if err != nil {
		return nil, err
	}

	account := &model.Account{}
	if err = g.DB().Model("account").Where("username = ?", adminUsername).Scan(account); err != nil {
		return nil, err
	}
	return account, nil
}
