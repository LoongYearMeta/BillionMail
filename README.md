# BillionMail

A self-hosted mail server for company domains, run with Docker Compose.

- **Mail:** Postfix, Dovecot (IMAP/POP3) and Rspamd, with DKIM, SPF and DMARC records generated per domain.
- **Console:** domains, mailboxes, DNS record checks, Let's Encrypt certificates, SMTP relays, delivery statistics, logs and settings.
- **Webmail:** [alps](https://github.com/migadu/alps) at one address for all domains, `https://webmail.<your-domain>/` by default.
- **Protection:** fail2ban rate limits on the console and webmail login limits.

This is a fork of [aaPanel/BillionMail](https://github.com/aaPanel/BillionMail) reduced to company mail: the email marketing, templates, contacts, send API, AI and video features were removed.

## Install with Docker Compose

BillionMail runs only with Docker Compose. You need Docker with the Compose plugin, a fixed public IP, and ports 25, 465, 587, 110, 995, 143, 993, 80 and 443 open in your provider's firewall.

```shell
git clone https://github.com/LoongYearMeta/BillionMail && cd BillionMail
cp .env.example .env
sed -i -e "s/^DBPASS=.*/DBPASS=$(openssl rand -hex 16)/" \
       -e "s/^REDISPASS=.*/REDISPASS=$(openssl rand -hex 16)/" .env
# Set your mail hostname and the server's public IP
sed -i -e "s/^BILLIONMAIL_HOSTNAME=.*/BILLIONMAIL_HOSTNAME=mail.example.com/" \
       -e "s/^SERVER_IP=.*/SERVER_IP=203.0.113.10/" .env
docker compose up -d
```

On the first start BillionMail generates the console username, password and safe entrance and writes them to `.env`:

```shell
grep -E '^(ADMIN_USERNAME|ADMIN_PASSWORD|SafePath)=' .env
```

Then open `https://<your-server>/<SafePath>`.

## Operations

Run these in the BillionMail directory.

| Task | Command |
|------|---------|
| Status | `docker compose ps` |
| Logs | `docker compose logs -f core-billionmail` (mail service logs are also in `./logs/`) |
| Restart a service | `docker compose restart postfix-billionmail` |
| Stop / start | `docker compose down` / `docker compose up -d` |
| Update | `git pull && docker compose pull && docker compose up -d` |
| Change the admin username or password, the safe entrance or the console IP whitelist (`IP_WHITELIST_ENABLE`) | edit `.env`, then `docker compose restart core-billionmail` |
| Change ports or the time zone | edit `.env`, then `docker compose up -d` |
| Domains, mailboxes, DNS records | the console |

## WebMail

BillionMail ships with the [alps](https://github.com/migadu/alps) webmail on one host shared by all mail domains; users sign in with their full address. The host is `WEBMAIL_HOST` in `.env`, by default derived from `BILLIONMAIL_HOSTNAME` (`mail.example.com` → `webmail.example.com`). Point its DNS A record (shown with the DNS records of the domain it belongs to) at the server; the certificate is then issued automatically. Old `/roundcube/` links redirect there.

## Issues

If you encounter any issues or have feature requests, please [open an issue](https://github.com/LoongYearMeta/BillionMail/issues). Be sure to include:

- A clear description of the problem or request.
- Steps to reproduce the issue (if applicable).
- Screenshots or error logs (if applicable).

## License

BillionMail is licensed under the **AGPLv3 License**. This means you can:

✅ Use the software for free.  
✅ Modify and distribute the code.  
✅ Use it privately without restrictions.

See the [LICENSE](LICENSE) file for more details.
