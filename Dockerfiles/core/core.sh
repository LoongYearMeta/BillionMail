#!/bin/bash

ENV_FILE=/opt/billionmail/.env

# First start: generate the console credentials and safe entrance left empty in .env
set_random_env() {
    local key=$1 length=$2 value
    grep -q "^${key}=." "${ENV_FILE}" && return
    value=$(LC_ALL=C </dev/urandom tr -dc A-Za-z0-9 2> /dev/null | head -c "${length}")
    # .env is a bind-mounted file: rewrite its content, keep the inode
    { grep -v "^${key}=" "${ENV_FILE}"; echo "${key}=${value}"; } > /tmp/env.new
    cat /tmp/env.new > "${ENV_FILE}" && rm -f /tmp/env.new
    echo "Generated ${key} in .env"
}

if [ -f "${ENV_FILE}" ]; then
    set_random_env ADMIN_USERNAME 8
    set_random_env ADMIN_PASSWORD 16
    set_random_env SafePath 8
fi

# DH params ship with the repository
if [ ! -f "/etc/ssl/mail/dh.pem" ]; then
    cp -d -n /etc/ssl/ssl-self-signed/dh.pem /etc/ssl/mail/
fi

# First start: a self-signed certificate for this host until Let's Encrypt issues one.
# Dovecot waits for it; write to temp files and move them so it never sees a partial file.
if [ ! -f "/etc/ssl/mail/cert.pem" ] || [ ! -f "/etc/ssl/mail/key.pem" ]; then
    HOSTNAME_CN=$(grep "^BILLIONMAIL_HOSTNAME=" "${ENV_FILE}" 2> /dev/null | cut -d= -f2)
    openssl req -x509 -newkey rsa:2048 -nodes -sha256 -days 3650 \
        -subj "/CN=${HOSTNAME_CN:-localhost}" \
        -keyout /etc/ssl/mail/key.pem.tmp -out /etc/ssl/mail/cert.pem.tmp 2> /dev/null \
        && mv /etc/ssl/mail/key.pem.tmp /etc/ssl/mail/key.pem \
        && mv /etc/ssl/mail/cert.pem.tmp /etc/ssl/mail/cert.pem \
        && echo "Generated a self-signed certificate for ${HOSTNAME_CN:-localhost}"
fi

# # Generate DH params
# if [ ! -f "/etc/ssl/mail/dh.pem" ]; then
#     openssl dhparam -out /etc/ssl/mail/dh.pem 2048
# fi

# Remove defaults-debian.conf
if [ -f "/etc/fail2ban/jail.d/defaults-debian.conf" ]; then
    rm -f /etc/fail2ban/jail.d/defaults-debian.conf
fi


## Initialize fail2ban when y, otherwise delete the rule
# Enable fail2ban Access restrictions, specify that the IP exceeds the access limit
if [[ ${FAIL2BAN_INIT} == "y" ]]; then
    ## Copy fail2ban Jail
    cp -rf /opt/billionmail/conf/core/fail2ban_init/jail.d/*-accesslimit.conf /etc/fail2ban/jail.d/

    if ! grep -q "restart_fail2ban.sh" /var/spool/cron/crontabs/root; then
        chmod +x /restart_fail2ban.sh
        echo "02 0,12 * * * bash /restart_fail2ban.sh" >> /var/spool/cron/crontabs/root
        chmod 600 /var/spool/cron/crontabs/root
        chown root:crontab /var/spool/cron/crontabs/root    
        pkill -9 crond
    fi
    bash /restart_fail2ban.sh

else
    rm -f /etc/fail2ban/jail.d/*-accesslimit.conf
    echo -e "fail2ban: delete the rule"
fi

## Copy fail2ban Filter
# if [ ! -f "/etc/fail2ban/filter.d/core-limit-filter.conf" ]; then
#     cp -f /opt/billionmail/conf/core/fail2ban_init/filter.d/core-limit-filter.conf /etc/fail2ban/filter.d/core-limit-filter.conf
# fi
cp -rf /opt/billionmail/conf/core/fail2ban_init/filter.d/*.conf /etc/fail2ban/filter.d/


if [ ! -d "/opt/billionmail/core/logs/" ]; then
    mkdir /opt/billionmail/core/logs
fi

if [ ! -f "/opt/billionmail/core/logs/access-$(date -u +"%Y%m%d").log" ]; then
    touch /opt/billionmail/core/logs/access-$(date -u +"%Y%m%d").log
fi

cd /opt/billionmail/core/
chmod +x billionmail


exec "$@"