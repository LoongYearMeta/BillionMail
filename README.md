<div align="center">
  <a name="readme-top"></a>
  <h1><a href="https://www.billionmail.com/" target="_blank">BillionMail 📧</a></h1>


## An Open-Source MailServer, NewsLetter, Email Marketing Solution for Smarter Campaigns

[![][license-shield]][license-link] [![][docs-shield]][docs-link] [![][github-release-shield]][github-release-link] [![][github-stars-shield]][github-stars-link]

</div>
<br/>

<div align="center">
<a href="https://trendshift.io/repositories/13842" target="_blank"><img src="https://trendshift.io/api/badge/repositories/13842" alt="aaPanel%2FBillionMail | Trendshift" style="width: 250px; height: 55px;" width="250" height="55"/></a>
</div>

## What is BillionMail?

BillionMail is a **future open-source Mail server, Email marketing platform** designed to help businesses and individuals manage their email campaigns with ease. Whether you're sending newsletters, promotional emails, or transactional messages, this tool will provide **full control** over your email marketing efforts. With features like **advanced analytics**, and **customer management**, you'll be able to create, send, and track emails like a pro.

![BillionMail Banner](https://www.billionmail.com/home.png?v1)

# Just 3 steps to send a billion emails!
**Billion emails. Any business. Guaranteed.**

### Step 1️⃣ Install BillionMail
See [Install with Docker Compose](#install-with-docker-compose).


### Step 2️⃣: Connect Your Domain
- Add the sending domain
- Verify DNS records
- Auto-enable free SSL


### Step 3️⃣: Build Your Campaign

- Write or paste your email
- Choose list & tags
- Set send time or send now


<div align="center">
  <a href="https://www.youtube.com/embed/UHgxZa_9jGs?si=0-f1B5hDtcWImvQv" target="_blank">
    <img src="https://img.youtube.com/vi/UHgxZa_9jGs/maxresdefault.jpg" alt="" width="80%">
    <br />
    <img src="https://www.iconfinder.com/icons/317714/download/png/16" alt="YouTube" width="16"/>
    <b>Watch on Youtube</b>
  </a>
</div>


## Install with Docker Compose

BillionMail runs only with Docker Compose. You need Docker with the Compose plugin, and ports 25, 465, 587, 110, 995, 143, 993, 80 and 443 open.

```shell
git clone https://github.com/LoongYearMeta/BillionMail && cd BillionMail
cp .env.example .env
sed -i -e "s/^DBPASS=.*/DBPASS=$(openssl rand -hex 16)/" \
       -e "s/^REDISPASS=.*/REDISPASS=$(openssl rand -hex 16)/" .env
# Set your mail hostname, e.g. mail.example.com
sed -i "s/^BILLIONMAIL_HOSTNAME=.*/BILLIONMAIL_HOSTNAME=mail.example.com/" .env
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

## Live Demo
BillionMail Demo: [https://demo.billionmail.com/billionmail](https://demo.billionmail.com/billionmail)

Username: `billionmail` 

Password: `billionmail` 


## WebMail

BillionMail ships with the [alps](https://github.com/migadu/alps) webmail at `https://webmail.<your-domain>/` for every mail domain. Point the `webmail` DNS record (shown with the domain's DNS records) at the server; the certificate is then issued automatically. Old `/roundcube/` links redirect there.

## Why BillionMail?

Most email marketing platforms are either **expensive**, **closed-source**, or **lack essential features**. BillionMail aims to be different:

✅ **Fully Open-Source** – No hidden costs, no vendor lock-in.  
📊 **Advanced Analytics** – Track email delivery, open rates, click-through rates, and more.  
📧 **Unlimited Sending** – No restrictions on the number of emails you can send.  
🎨 **Customizable Templates** – Custom professional marketing templates for reuse.
🔒 **Privacy-First** – Your data stays with you, no third-party tracking.  
🚀 **Self-Hosted** – Run it on your own server for complete control.  

## How You Can Help 🌟

BillionMail is a **community-driven project**, and we need your support to get started! Here's how you can help:

1. **Star This Repository**: Show your interest by starring this repo.  
2. **Spread the Word**: Share BillionMail with your network—developers, marketers, and open-source enthusiasts.  
3. **Share Feedback**: Let us know what features you'd like to see in BillionMail by opening an issue or joining the discussion.  
4. **Contribute**: Once development begins, we'll welcome contributions from the community. Stay tuned for updates!

---

📧 **BillionMail – The Future of Open-Source Email Marketing.**

## Issues

If you encounter any issues or have feature requests, please [open an issue](https://github.com/LoongYearMeta/BillionMail/issues). Be sure to include:

- A clear description of the problem or request.
- Steps to reproduce the issue (if applicable).
- Screenshots or error logs (if applicable).

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=aapanel/billionmail&type=Date)](https://www.star-history.com/#aapanel/billionmail&Date)

## License

BillionMail is licensed under the **AGPLv3 License**. This means you can:

✅ Use the software for free.  
✅ Modify and distribute the code.  
✅ Use it privately without restrictions.

See the [LICENSE](LICENSE) file for more details.

---

<!-- BillionMail official link -->
[docs-link]: https://www.billionmail.com/

<!-- BillionMail Other link-->
[license-link]: https://www.gnu.org/licenses/agpl-3.0.html
[github-release-link]: https://github.com/aaPanel/BillionMail/releases/latest
[github-stars-link]: https://github.com/aaPanel/BillionMail
[github-issues-link]: https://github.com/aaPanel/BillionMail/issues

<!-- Shield link-->
[docs-shield]: https://img.shields.io/badge/documentation-148F76
[github-release-shield]: https://img.shields.io/github/v/release/aaPanel/BillionMail
[github-stars-shield]: https://img.shields.io/github/stars/aaPanel/BillionMail?color=%231890FF&style=flat-square   
[license-shield]: https://img.shields.io/github/license/aaPanel/BillionMail

