FROM alpine:3.22

LABEL maintainer="https://github.com/LoongYearMeta/BillionMail"

# iptables here is the nf_tables variant, like the Docker hosts it bans on.
# Drop the distribution's default jails (sshd), only the generated jails apply.
RUN apk add --no-cache fail2ban iptables ip6tables tzdata \
    && rm -f /etc/fail2ban/jail.d/*

COPY fail2ban.sh /fail2ban.sh
RUN chmod +x /fail2ban.sh

ENTRYPOINT ["/fail2ban.sh"]
