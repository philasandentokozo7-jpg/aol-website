# Post-deploy status

Last sorted: 2026-08-21

## Code on `main`

| Item | Status |
|---|---|
| Netlify launch config | Fixed on `main` (`520b840`) — production flags are no longer hard-coded to staging/noindex in `netlify.toml` |
| Previous sorted baseline | `a8d9442` |
| GitHub Actions | `a8d9442` build/deploy succeeded; latest pushes should be rechecked after this status update |
| Formspree | Removed from source |
| Form name | `aol-website-enquiries` |
| Emails | `info@`, `accounts@`, `privacy@`, `office@` @ aolaccountants.co.za (receive-tested) |
| Safe application default | `SITE_MODE=staging`, `INDEXING_ENABLED=false` unless explicitly changed in the deployment environment |
| Netlify robots header | Global `X-Robots-Tag: noindex, nofollow` removed so production indexing can be enabled after QA |
| Director personal name | Not published |

## Public visibility (owner action required)

| Surface | Status |
|---|---|
| Intended domain `aolaccountants.co.za` | Registered; **web DNS currently parking** at `169.239.219.58` (domains.co.za), not the website |
| `www.aolaccountants.co.za` | CNAME to `aolaccountants.co.za`, therefore also parking while the apex remains parked |
| Typo domain `aolaccounting.co.za` / `www.aolaccounting.co.za` | Parking page; **must not** be used as official site |
| GitHub Pages custom domain setting | Still associated with the wrong parking/typo domain; remove it in GitHub → Settings → Pages |
| Netlify preview `aol-accounting-academy.netlify.app` | Last crawl showed a **stale older build** (old testimonial/Insights content, indexable robots, missing newer routes). Redeploy from current `main` before trusting it |

## Email DNS

| Record | Status |
|---|---|
| MX | Google Workspace receiving is active (`SMTP.GOOGLE.COM`) |
| SPF | Not published at last crawl |
| DKIM | Common selectors not found at last crawl; verify the exact Google Workspace selector before publishing |
| DMARC | Not published at last crawl |

## Hosting decision

Netlify Forms only work when the site is published on **Netlify**.

* **Recommended:** use Netlify as the public host for production (keep current form code), point `aolaccountants.co.za` DNS at Netlify, set form notifications to `office@aolaccountants.co.za`.
* **Alternative:** keep GitHub Pages as host and replace Netlify Forms with another processor.

## Immediate owner checklist

1. GitHub → Settings → Pages → remove custom domain `www.aolaccounting.co.za`
2. Netlify → connect/redeploy this repository from current `main`
3. Confirm Netlify detects `aol-website-enquiries` and that `/privacy`, `/services`, `/terms`, `/thank-you`, and staging noindex are present
4. Netlify → add `aolaccountants.co.za` and `www.aolaccountants.co.za`; choose the primary domain
5. Domains.co.za → replace the parking web DNS with the exact records Netlify provides; do not disturb Google Workspace MX/TXT records
6. Configure Netlify Forms notifications → `office@aolaccountants.co.za` and run `docs/FORM_TESTING.md`
7. Confirm HTTPS and redirects
8. Add/verify SPF, DKIM and DMARC for Google Workspace
9. Complete legal/launch QA
10. Only then set production/indexing environment flags and redeploy

## Production environment after launch QA

Set these in the production deployment environment (not hard-coded in `netlify.toml`):

* `NEXT_PUBLIC_SITE_MODE=production`
* `NEXT_PUBLIC_SITE_URL=https://aolaccountants.co.za`
* `NEXT_PUBLIC_OFFICIAL_SITE_URL=https://aolaccountants.co.za`
* `NEXT_PUBLIC_INDEXING_ENABLED=true`

Before QA is complete, leave production indexing disabled.

## What “done” looks like for a working public site

* `https://aolaccountants.co.za` serves the current `main` build over trusted HTTPS
* `www` redirects to the selected canonical host
* Staging/preview remains noindex; official production becomes indexable only after explicit launch approval
* Form submits to Netlify, appears under `aol-website-enquiries`, and notifies `office@`
* `/privacy`, `/services`, `/terms`, and `/thank-you` work on the live host
* Footer shows `info@` and `office@`; Privacy uses `privacy@`; Terms use `info@` / `accounts@`
* SPF, DKIM and DMARC are published and outbound email passes authentication checks
