package webmail

import (
	"crypto/ecdsa"
	"crypto/elliptic"
	"crypto/rand"
	"crypto/tls"
	"crypto/x509"
	"crypto/x509/pkix"
	"encoding/pem"
	"math/big"
	"net/http"
	"net/http/httptest"
	"net/url"
	"os"
	"path/filepath"
	"testing"
	"time"
)

func TestIsWebmailHost(t *testing.T) {
	domainExists = func(domain string) bool { return domain == "example.com" }
	t.Cleanup(func() { hostCache.Clear() })

	cases := map[string]bool{
		"webmail.example.com":     true,
		"WEBMAIL.Example.com:443": true,
		"webmail.other.com":       false,
		"mail.example.com":        false,
		"example.com":             false,
		"webmail.":                false,
		"1.2.3.4":                 false,
	}
	for host, want := range cases {
		if got := IsWebmailHost(host); got != want {
			t.Errorf("IsWebmailHost(%q) = %v, want %v", host, got, want)
		}
	}
}

func TestHandlerRedirectsPlainHTTP(t *testing.T) {
	rec := httptest.NewRecorder()
	Handler().ServeHTTP(rec, httptest.NewRequest(http.MethodGet, "http://webmail.example.com/mailbox?x=1", nil))
	if rec.Code != http.StatusMovedPermanently {
		t.Fatalf("status = %d, want 301", rec.Code)
	}
	if loc := rec.Header().Get("Location"); loc != "https://webmail.example.com/mailbox?x=1" {
		t.Errorf("Location = %q", loc)
	}
}

func TestProxyReplacesForwardingHeaders(t *testing.T) {
	var got http.Header
	var gotHost string
	backend := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		got = r.Header.Clone()
		gotHost = r.Host
	}))
	defer backend.Close()

	target, _ := url.Parse(backend.URL)
	req := httptest.NewRequest(http.MethodPost, "https://webmail.example.com/session", nil)
	req.TLS = &tls.ConnectionState{}
	req.RemoteAddr = "203.0.113.7:51234"
	req.Header.Set("X-Forwarded-For", "10.0.0.1")
	req.Header.Set("X-Real-IP", "10.0.0.1")
	req.Header.Set("X-Forwarded-Proto", "http")
	req.Header.Set("X-Forwarded-Host", "evil.example")

	NewProxy(target).ServeHTTP(httptest.NewRecorder(), req)

	want := map[string]string{
		"X-Forwarded-For":   "203.0.113.7",
		"X-Real-Ip":         "203.0.113.7",
		"X-Forwarded-Proto": "https",
		"X-Forwarded-Host":  "webmail.example.com",
	}
	for k, v := range want {
		if got.Get(k) != v {
			t.Errorf("%s = %q, want %q", k, got.Get(k), v)
		}
	}
	if gotHost != "webmail.example.com" {
		t.Errorf("Host = %q, want original host", gotHost)
	}
}

func TestProxyBackendDown(t *testing.T) {
	target, _ := url.Parse("http://127.0.0.1:1")
	rec := httptest.NewRecorder()
	NewProxy(target).ServeHTTP(rec, httptest.NewRequest(http.MethodGet, "https://webmail.example.com/", nil))
	if rec.Code != http.StatusBadGateway {
		t.Errorf("status = %d, want 502", rec.Code)
	}
}

func writeCert(t *testing.T, host string, serial int64) {
	t.Helper()
	key, _ := ecdsa.GenerateKey(elliptic.P256(), rand.Reader)
	tmpl := &x509.Certificate{
		SerialNumber: big.NewInt(serial),
		Subject:      pkix.Name{CommonName: host},
		DNSNames:     []string{host},
		NotBefore:    time.Now(),
		NotAfter:     time.Now().Add(time.Hour),
	}
	der, _ := x509.CreateCertificate(rand.Reader, tmpl, tmpl, &key.PublicKey, key)
	keyDer, _ := x509.MarshalECPrivateKey(key)

	crtPath, keyPath := CertPaths(host)
	_ = os.MkdirAll(filepath.Dir(crtPath), 0o755)
	_ = os.WriteFile(keyPath, pem.EncodeToMemory(&pem.Block{Type: "EC PRIVATE KEY", Bytes: keyDer}), 0o600)
	_ = os.WriteFile(crtPath, pem.EncodeToMemory(&pem.Block{Type: "CERTIFICATE", Bytes: der}), 0o644)
}

func serialOf(t *testing.T, crt *tls.Certificate) int64 {
	t.Helper()
	leaf, err := x509.ParseCertificate(crt.Certificate[0])
	if err != nil {
		t.Fatal(err)
	}
	return leaf.SerialNumber.Int64()
}

func TestCertificateReloadsOnChange(t *testing.T) {
	sslPath = t.TempDir()
	t.Cleanup(func() { certCache.Clear() })
	host := "webmail.example.com"

	if _, ok := Certificate(host); ok {
		t.Fatal("expected no certificate before it is issued")
	}
	if _, ok := Certificate("mail.example.com"); ok {
		t.Fatal("non-webmail hosts must not be served here")
	}

	writeCert(t, host, 1)
	crt, ok := Certificate(host)
	if !ok || serialOf(t, crt) != 1 {
		t.Fatal("expected first certificate")
	}

	// Renewal: a new file with a later mtime replaces the cached one.
	writeCert(t, host, 2)
	crtPath, _ := CertPaths(host)
	later := time.Now().Add(time.Minute)
	_ = os.Chtimes(crtPath, later, later)
	crt, ok = Certificate(host)
	if !ok || serialOf(t, crt) != 2 {
		t.Fatal("expected renewed certificate without restart")
	}
}
