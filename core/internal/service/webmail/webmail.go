package webmail

import (
	"billionmail-core/internal/consts"
	"billionmail-core/internal/service/public"
	"context"
	"crypto/tls"
	"net"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"
	"path/filepath"
	"strings"
	"sync"
	"time"

	"github.com/gogf/gf/v2/frame/g"
)

// The webmail (alps) only works at the root of an origin, so it gets one host
// for all mail domains (users log in with their full address), on the same
// HTTPS port as the console. core routes that host to the webmail container
// before GoFrame routing, so the console's safe path, IP whitelist and
// handlers never apply.

func hostname(host string) string {
	if h, _, err := net.SplitHostPort(host); err == nil {
		host = h
	}
	return strings.ToLower(strings.Trim(host, "[]"))
}

// webmailHost resolves the webmail host from WEBMAIL_HOST, or derives it from
// BILLIONMAIL_HOSTNAME: mail.example.com -> webmail.example.com.
func webmailHost(configured, mailHostname string) string {
	if configured = hostname(strings.TrimSpace(configured)); configured != "" {
		return configured
	}
	mailHostname = hostname(strings.TrimSpace(mailHostname))
	if mailHostname == "" || mailHostname == "mail.example.com" {
		return ""
	}
	return "webmail." + strings.TrimPrefix(mailHostname, "mail.")
}

// Host returns the webmail host, empty when the server is not configured yet.
// Changing it in .env takes effect on the next core restart.
var Host = sync.OnceValue(func() string {
	return webmailHost(public.MustGetDockerEnv("WEBMAIL_HOST", ""), public.MustGetDockerEnv("BILLIONMAIL_HOSTNAME", ""))
})

// IsWebmailHost reports whether the request is addressed to the webmail host.
func IsWebmailHost(host string) bool {
	return Host() != "" && hostname(host) == Host()
}

// httpsPortSuffix is ":<port>" when the console HTTPS port is not 443.
var httpsPortSuffix = sync.OnceValue(func() string {
	port := public.MustGetDockerEnv("HTTPS_PORT", "443")
	if port == "" || port == "443" {
		return ""
	}
	return ":" + port
})

// URL returns the webmail address, empty when the host is not configured.
func URL() string {
	if Host() == "" {
		return ""
	}
	return "https://" + Host() + httpsPortSuffix() + "/"
}

// NewProxy forwards requests to the webmail backend. Client-supplied forwarding
// headers are replaced, never passed through: alps trusts them from core for
// rate limiting by client IP and for its CSRF origin check.
func NewProxy(target *url.URL) *httputil.ReverseProxy {
	return &httputil.ReverseProxy{
		Rewrite: func(pr *httputil.ProxyRequest) {
			pr.SetURL(target)
			pr.SetXForwarded()
			pr.Out.Host = pr.In.Host
			pr.Out.Header.Del("X-Real-IP")
			if ip, _, err := net.SplitHostPort(pr.In.RemoteAddr); err == nil {
				pr.Out.Header.Set("X-Real-IP", ip)
			}
		},
		Transport: &http.Transport{
			MaxIdleConns:        50,
			MaxIdleConnsPerHost: 50,
			IdleConnTimeout:     90 * time.Second,
		},
		ErrorHandler: func(w http.ResponseWriter, r *http.Request, err error) {
			g.Log().Warning(r.Context(), "Webmail proxy error:", err)
			http.Error(w, "Webmail is temporarily unavailable", http.StatusBadGateway)
		},
	}
}

// Handler serves webmail hosts: plain HTTP is redirected to HTTPS (alps issues
// Secure cookies only), HTTPS is proxied to the webmail container.
func Handler() http.Handler {
	upstream := "127.0.0.1:1323"
	if public.IsRunningInContainer() {
		upstream = "webmail:1323"
	}
	proxy := NewProxy(&url.URL{Scheme: "http", Host: upstream})

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.TLS == nil {
			http.Redirect(w, r, "https://"+hostname(r.Host)+httpsPortSuffix()+r.URL.RequestURI(), http.StatusMovedPermanently)
			return
		}
		proxy.ServeHTTP(w, r)
	})
}

// sslPath is the certificate root, shared with the mail host certificates.
var sslPath = consts.SSL_PATH

// CertPaths returns where the certificate of a webmail host is stored.
func CertPaths(host string) (crtPath, keyPath string) {
	dir := public.AbsPath(sslPath, host)
	return filepath.Join(dir, "fullchain.pem"), filepath.Join(dir, "privkey.pem")
}

type cachedCert struct {
	crt     *tls.Certificate
	modTime time.Time
}

var certCache sync.Map // hostname -> cachedCert

// Certificate returns the certificate for a webmail SNI name, reloading it when
// the file changes, so issuing or renewing it needs no core restart.
func Certificate(serverName string) (*tls.Certificate, bool) {
	host := hostname(serverName)
	if !IsWebmailHost(host) {
		return nil, false
	}

	crtPath, keyPath := CertPaths(host)
	st, err := os.Stat(crtPath)
	if err != nil {
		return nil, false
	}

	if v, ok := certCache.Load(host); ok && v.(cachedCert).modTime.Equal(st.ModTime()) {
		return v.(cachedCert).crt, true
	}

	crt, err := tls.LoadX509KeyPair(crtPath, keyPath)
	if err != nil {
		g.Log().Warning(context.Background(), "Failed to load webmail certificate", host, err)
		return nil, false
	}

	certCache.Store(host, cachedCert{crt: &crt, modTime: st.ModTime()})
	return &crt, true
}
