#!/bin/sh
set -e

# alps is only reachable inside billionmail-network. core terminates TLS for
# webmail.<domain> and reverse-proxies here, so the docker subnet is the only
# trusted proxy (needed for client IPs in rate limiting and the CSRF origin).
TRUSTED_PROXY="${IPV4_NETWORK:-10.66.66}.0/24"

# Optional Fernet key: keeps users logged in across container restarts.
LOGIN_KEY_LINE=""
if [ -n "${WEBMAIL_LOGIN_KEY}" ]; then
    LOGIN_KEY_LINE="login_key = \"${WEBMAIL_LOGIN_KEY}\""
fi

# Dovecot and Postfix are reached by their docker hostnames, which do not match
# the mail certificates, so the hop inside the bridge network is plaintext
# (same as the previous Roundcube setup). Browser traffic is TLS via core.
cat > /etc/alps/config.toml <<EOF
[server]
addr = ":1323"
debug = false
trusted_proxies = ["${TRUSTED_PROXY}"]
temp_dir = "/tmp/alps"
${LOGIN_KEY_LINE}
read_timeout_sec = 60
write_timeout_sec = 120
idle_timeout_sec = 120
imap_timeout_sec = 30
smtp_timeout_sec = 60

[logging]
output = "stdout"
format = "console"
level = "info"

[provider]
type = "imap"

[provider.imap]
server = "imap+insecure://dovecot:143"

[smtp]
server = "smtp+insecure://postfix:25"

[plugin.base]
enabled = true

[plugin.gpg]
enabled = true

[plugin.caldav]
enabled = false

[plugin.carddav]
enabled = false

[plugin.managesieve]
enabled = false

[plugin.password]
enabled = false
EOF

exec /usr/local/bin/alps -config /etc/alps/config.toml
