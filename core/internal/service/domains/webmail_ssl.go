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
	"strings"
	"time"

	"github.com/gogf/gf/v2/errors/gerror"
	"github.com/gogf/gf/v2/frame/g"
)

// The webmail host certificate is managed apart from the mail host
// certificates: it is only requested once the webmail DNS record points at
// this server, a failure never touches the mail certificates, and core picks
// up a new file without restarting (see webmail.Certificate).

const (
	webmailCertRenewBefore = 30 * 24 * time.Hour
	webmailCertRetryAfter  = time.Hour
)

var webmailCertRetryAt time.Time // next attempt after a failure

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

// ApplyWebmailCert requests a Let's Encrypt certificate for the webmail host over HTTP-01.
func ApplyWebmailCert(ctx context.Context, host string, accountInfo *model.Account) error {
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

// EnsureWebmailCert issues the webmail host certificate once its DNS points at
// this server, and renews it before it expires.
func EnsureWebmailCert(ctx context.Context) {
	host := webmail.Host()
	if host == "" || webmailCertRemaining(host) > webmailCertRenewBefore || time.Now().Before(webmailCertRetryAt) {
		return
	}

	serverIP, err := public.GetServerIP()
	if err != nil {
		return
	}
	recordType := "A"
	if strings.Contains(serverIP, ":") {
		recordType = "AAAA"
	}
	if !ValidateARecord(v1.DNSRecord{Type: recordType, Host: host, Value: serverIP}) {
		return
	}

	account, err := adminAccount()
	if err != nil {
		g.Log().Warning(ctx, "[WebmailSSL] Failed to get admin account:", err)
		return
	}

	g.Log().Info(ctx, "[WebmailSSL] Requesting certificate for", host)
	if err = ApplyWebmailCert(ctx, host, account); err != nil {
		webmailCertRetryAt = time.Now().Add(webmailCertRetryAfter)
		g.Log().Warningf(ctx, "[WebmailSSL] Certificate for %s failed, retry in %s: %v", host, webmailCertRetryAfter, err)
		return
	}

	g.Log().Info(ctx, "[WebmailSSL] Certificate issued for", host)
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
