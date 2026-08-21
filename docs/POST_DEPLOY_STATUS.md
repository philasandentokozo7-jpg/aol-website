# Post-deploy status

Last sorted: 2026-08-21 (production indexing enabled)

## Production infrastructure (confirmed)

| Item | Status |
|---|---|
| Netlify production branch | `main` |
| Primary domain | `https://aolaccountants.co.za` |
| `www.aolaccountants.co.za` | Redirects to primary |
| HTTPS | Let’s Encrypt active for apex and www |
| DNS | Correct for Netlify hosting |
| Netlify Forms | Detects `aol-website-enquiries` |
| Form notifications | `office@aolaccountants.co.za` |
| Legacy dashboard form `consultation` | Historical only — not used by current frontend |
| Production env | `SITE_MODE=production`, `INDEXING_ENABLED=true`, official `SITE_URL` |
| Live `robots.txt` | `Allow: /` + `Sitemap: https://aolaccountants.co.za/sitemap.xml` |
| Typo domain `aolaccounting.co.za` | Obsolete — never reintroduce as public/config host |

## Shipped on main

Standalone About, Contact, Industries, Pricing, Insights and ten service landing pages; phone-first mobile polish; commercial homepage H1; sitemap excludes `/thank-you/`; Netlify Forms identity `aol-website-enquiries`.

## Still recommended

1. End-to-end real form submission confirmation on production Netlify (if not already completed)
2. Search Console verification + sitemap submission on the official domain only
3. SPF / DKIM / DMARC if still incomplete
4. Spot-check live visual QA on phone widths after this deploy

## Do not

* Hard-code production indexing in `netlify.toml`
* Restore a global `X-Robots-Tag: noindex` header
* Rename the live form to `consultation`
* Publish director personal name or fabricated claims
