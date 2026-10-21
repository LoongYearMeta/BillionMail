package mail_service

import (
	"billionmail-core/internal/consts"
	"billionmail-core/internal/service/public"
	"context"
	"crypto/tls"
	"errors"
	"fmt"
	"os"
	"path/filepath"
	"strings"

	"github.com/gogf/gf/v2/frame/g"
)

// Certificates copied into the SSL directory by external tools, instead of
// applied through the console, never reached the Postfix SNI map or the
// Dovecot local_name blocks, so clients connecting to those mail hosts got the
// default certificate. EnsureCertificateSNI registers every valid mail host
// certificate and reloads Postfix/Dovecot only when something changed.
//
// The Postfix map is built with postmap -F, which embeds the certificate files
// in the .db: a renewed certificate is only served after the map is rebuilt,
// so it is also rebuilt when a certificate file is newer than the .db.

// sniCertPaths returns the certificate and key paths of a mail host, as seen by
// core, Postfix and Dovecot (they mount the SSL directory at the same path).
func sniCertPaths(host string) (crtPath, keyPath string) {
	return filepath.Join(consts.SSL_PATH, host, "fullchain.pem"), filepath.Join(consts.SSL_PATH, host, "privkey.pem")
}

// addMissingSNIMapLines appends Postfix SNI map entries for hosts without one.
func addMissingSNIMapLines(content string, hosts []string) (string, bool) {
	existing := make(map[string]bool)
	for _, line := range strings.Split(content, "\n") {
		if fields := strings.Fields(line); len(fields) > 0 {
			existing[fields[0]] = true
		}
	}

	changed := false
	for _, host := range hosts {
		if existing[host] {
			continue
		}
		crtPath, keyPath := sniCertPaths(host)
		if content != "" && !strings.HasSuffix(content, "\n") {
			content += "\n"
		}
		content += fmt.Sprintf("%s %s %s\n", host, keyPath, crtPath)
		changed = true
	}
	return content, changed
}

// addMissingDovecotSNI appends Dovecot local_name blocks for hosts without one,
// in the format written by updateDovecotSNIConfig.
func addMissingDovecotSNI(content string, hosts []string) (string, bool) {
	changed := false
	for _, host := range hosts {
		if strings.Contains(content, "#DOMAIN_SSL_BEGIN_"+host+"\n") {
			continue
		}
		crtPath, keyPath := sniCertPaths(host)
		content += "\n#DOMAIN_SSL_BEGIN_" + host +
			"\nlocal_name " + host +
			" {\n    ssl_cert = < " + crtPath +
			"\n    ssl_key = < " + keyPath +
			"\n}\n#DOMAIN_SSL_END_" + host + "\n"
		changed = true
	}
	return content, changed
}

// certsNewerThan reports whether any host certificate or key changed after path (or path is missing).
func certsNewerThan(hosts []string, path string) bool {
	st, err := os.Stat(path)
	if err != nil {
		return true
	}
	for _, host := range hosts {
		crtPath, keyPath := sniCertPaths(host)
		for _, p := range []string{crtPath, keyPath} {
			if fst, err := os.Stat(public.AbsPath(p)); err == nil && fst.ModTime().After(st.ModTime()) {
				return true
			}
		}
	}
	return false
}

func readFileIfExists(path string) (string, error) {
	data, err := os.ReadFile(path)
	if errors.Is(err, os.ErrNotExist) {
		return "", nil
	}
	return string(data), err
}

// EnsureCertificateSNI registers the certificates of all mail domains with Postfix and Dovecot SNI.
func EnsureCertificateSNI(ctx context.Context) {
	domains, err := g.DB().Model("domain").Fields("domain").Array()
	if err != nil {
		g.Log().Warning(ctx, "EnsureCertificateSNI: failed to list domains:", err)
		return
	}

	var hosts []string
	for _, d := range domains {
		host := public.FormatMX(d.String())
		crtPath, keyPath := sniCertPaths(host)
		if _, err := tls.LoadX509KeyPair(public.AbsPath(crtPath), public.AbsPath(keyPath)); err != nil {
			continue
		}
		hosts = append(hosts, host)
	}
	if len(hosts) == 0 {
		return
	}

	c := NewCertificate()
	defer c.Close()

	mapContent, err := readFileIfExists(c.PostfixSNIPath)
	if err != nil {
		g.Log().Warning(ctx, "EnsureCertificateSNI: failed to read Postfix SNI map:", err)
		return
	}
	newContent, mapChanged := addMissingSNIMapLines(mapContent, hosts)
	if mapChanged {
		if err = os.WriteFile(c.PostfixSNIPath, []byte(newContent), 0644); err != nil {
			g.Log().Warning(ctx, "EnsureCertificateSNI: failed to write Postfix SNI map:", err)
			return
		}
	}
	if mapChanged || certsNewerThan(hosts, c.PostfixSNIPath+".db") {
		for _, cmd := range [][]string{{"postmap", "-F", "hash:/etc/postfix/conf/vmail_ssl.map"}, {"postfix", "reload"}} {
			if _, err = c.dockerApiClient().ExecCommandByName(ctx, consts.SERVICES.Postfix, cmd, "root"); err != nil {
				g.Log().Warning(ctx, "EnsureCertificateSNI:", strings.Join(cmd, " "), "failed:", err)
				return
			}
		}
		g.Log().Info(ctx, "EnsureCertificateSNI: rebuilt the Postfix SNI map")
	}

	sslConf, err := readFileIfExists(c.DovecotSslConf)
	if err != nil {
		g.Log().Warning(ctx, "EnsureCertificateSNI: failed to read Dovecot SSL config:", err)
		return
	}
	if newContent, changed := addMissingDovecotSNI(sslConf, hosts); changed {
		if err = os.WriteFile(c.DovecotSslConf, []byte(newContent), 0644); err != nil {
			g.Log().Warning(ctx, "EnsureCertificateSNI: failed to write Dovecot SSL config:", err)
			return
		}
		if _, err = c.dockerApiClient().ExecCommandByName(ctx, consts.SERVICES.Dovecot, []string{"doveadm", "reload"}, "root"); err != nil {
			g.Log().Warning(ctx, "EnsureCertificateSNI: doveadm reload failed:", err)
			return
		}
		g.Log().Info(ctx, "EnsureCertificateSNI: updated the Dovecot SNI config")
	}
}
