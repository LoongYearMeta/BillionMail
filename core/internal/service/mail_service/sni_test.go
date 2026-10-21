package mail_service

import (
	"strings"
	"testing"
)

func TestAddMissingSNIMapLines(t *testing.T) {
	content := "mail.a.com /etc/ssl/mail/mail.a.com/privkey.pem /etc/ssl/mail/mail.a.com/fullchain.pem"

	got, changed := addMissingSNIMapLines(content, []string{"mail.a.com", "mail.b.com"})
	if !changed {
		t.Fatal("expected mail.b.com to be added")
	}
	want := content + "\nmail.b.com /etc/ssl/mail/mail.b.com/privkey.pem /etc/ssl/mail/mail.b.com/fullchain.pem\n"
	if got != want {
		t.Errorf("got %q, want %q", got, want)
	}

	if _, changed = addMissingSNIMapLines(got, []string{"mail.a.com", "mail.b.com"}); changed {
		t.Error("second run must not change anything")
	}

	// A host that only prefixes an existing one is still missing.
	if _, changed = addMissingSNIMapLines(content, []string{"mail.a.co"}); !changed {
		t.Error("prefix of an existing host must not count as present")
	}
}

func TestAddMissingDovecotSNI(t *testing.T) {
	content := "ssl = yes\n\n#DOMAIN_SSL_BEGIN_mail.a.com\nlocal_name mail.a.com {\n}\n#DOMAIN_SSL_END_mail.a.com\n"

	got, changed := addMissingDovecotSNI(content, []string{"mail.a.com", "mail.b.com"})
	if !changed || strings.Count(got, "#DOMAIN_SSL_BEGIN_") != 2 {
		t.Fatalf("expected one block added, got %q", got)
	}
	if !strings.Contains(got, "local_name mail.b.com {\n    ssl_cert = < /etc/ssl/mail/mail.b.com/fullchain.pem\n    ssl_key = < /etc/ssl/mail/mail.b.com/privkey.pem\n}") {
		t.Errorf("unexpected block: %q", got)
	}

	if _, changed = addMissingDovecotSNI(got, []string{"mail.a.com", "mail.b.com"}); changed {
		t.Error("second run must not change anything")
	}
}
