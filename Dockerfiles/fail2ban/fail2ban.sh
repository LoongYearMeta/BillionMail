#!/bin/sh
set -e

# Bans SMTP/IMAP/POP password guessing on the host. Runs with the host network:
# mail ports are published by Docker, so their traffic is forwarded to the
# containers through DOCKER-USER and never passes the host INPUT chain.
# The docker network is ignored: core and the webmail log in from there, and
# the webmail has its own per-client login limits.

POSTFIX_LOG=/var/log/mail/postfix/mail.log
DOVECOT_LOG=/var/log/mail/dovecot/mail.log
SUBNET="${IPV4_NETWORK:-10.66.66}.0/24"

cat > /etc/fail2ban/fail2ban.local <<EOF
[Definition]
logtarget = /var/log/fail2ban/fail2ban.log
# Keep bans across restarts for as long as the longest ban
dbpurgeage = 8d
EOF

cat > /etc/fail2ban/jail.local <<EOF
[DEFAULT]
chain = DOCKER-USER
banaction = iptables-multiport
banaction_allports = iptables-allports
ignoreip = 127.0.0.1/8 ::1 ${SUBNET}
backend = polling
findtime = 10m
maxretry = 5
bantime = 1h
port = 25,465,587,993,995

[postfix-sasl]
enabled = true
filter = postfix[mode=auth]
logpath = ${POSTFIX_LOG}

[dovecot]
enabled = true
logpath = ${DOVECOT_LOG}

# Offenders banned 3 times within a day: all ports for a week
[recidive]
enabled = true
logpath = /var/log/fail2ban/fail2ban.log
banaction = %(banaction_allports)s
findtime = 1d
maxretry = 3
bantime = 7d
EOF

# On a fresh install Postfix and Dovecot have not written their logs yet
until [ -f "${POSTFIX_LOG}" ] && [ -f "${DOVECOT_LOG}" ]; do
    echo "Waiting for ${POSTFIX_LOG} and ${DOVECOT_LOG}..."
    sleep 10
done
touch /var/log/fail2ban/fail2ban.log

mkdir -p /var/run/fail2ban
exec fail2ban-server -f -x start
