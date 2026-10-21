package mail_service

import (
	"strings"
	"testing"
)

const testMasterCf = `smtp      inet  n       -       n       -       -       smtpd
#smtp      inet  n       -       n       -       1       postscreen
submission inet n       -       n       -       -       smtpd
  -o smtpd_tls_security_level=encrypt
smtp      unix  -       -       n       -       -       smtp
`

func TestAddPort25NoAuthOption(t *testing.T) {
	got, changed := addPort25NoAuthOption(testMasterCf)
	if !changed {
		t.Fatal("expected the option to be added")
	}
	lines := strings.Split(got, "\n")
	if !strings.HasPrefix(lines[0], "smtp      inet") || !strings.Contains(lines[1], "smtpd_discard_ehlo_keyword_address_maps=cidr:/etc/postfix/conf/smtpd_no_auth.cidr") {
		t.Fatalf("option not placed under the port 25 service:\n%s", got)
	}
	if strings.Count(got, "smtpd_discard_ehlo_keyword_address_maps") != 1 {
		t.Error("only the port 25 service gets the option")
	}

	if _, changed = addPort25NoAuthOption(got); changed {
		t.Error("second run must not change anything")
	}
}

func TestPort25NoAuthCIDR(t *testing.T) {
	got := port25NoAuthCIDR("10.66.66.0/24")
	// The docker network must match before the catch-all entries.
	if strings.Index(got, "10.66.66.0/24") > strings.Index(got, "0.0.0.0/0") {
		t.Errorf("docker network must come first:\n%s", got)
	}
}
