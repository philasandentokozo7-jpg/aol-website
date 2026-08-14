# Post-deploy status

Last sorted: 2026-08-14

## Code on `main`

| Item | Status |
|---|---|
| Merge | PR #1 merged — tip includes Netlify Forms + approved emails (`9388c29`) |
| GitHub Actions | Deploy to GitHub Pages **succeeded** (run `31848917073`) |
| Formspree | Removed from source |
| Form name | `aol-website-enquiries` |
| Emails | `info@`, `accounts@`, `privacy@`, `office@` @ aolaccountants.co.za (receive-tested) |
| Staging default | `SITE_MODE=staging`, `INDEXING_ENABLED=false` |
| Director personal name | Not published |

## Public visibility (owner action required)

| Surface | Status |
|---|---|
| Intended domain `aolaccountants.co.za` | Registered; **web DNS currently parking** (domains.co.za), not the website |
| Typo domain `aolaccounting.co.za` / `www.aolaccounting.co.za` | Parking page; **must not** be used as official site |
| GitHub Pages custom domain setting | Still set to `www.aolaccounting.co.za` → github.io redirects to parking |
| Netlify preview `aol-accounting-academy.netlify.app` | Observed **stale** (old form name / old email / indexable robots). Redeploy from current `main` |

## Hosting decision (blocking)

Netlify Forms only work when the site is published on **Netlify**.

* **Recommended:** use Netlify as the public host for production (keep current form code), point `aolaccountants.co.za` DNS at Netlify, set form notifications to `office@aolaccountants.co.za`.
* **Alternative:** keep GitHub Pages as host and replace Netlify Forms with another processor.

## Immediate owner checklist

1. GitHub → Settings → Pages → remove custom domain `www.aolaccounting.co.za`
2. Choose primary host (Netlify recommended)
3. Point `aolaccountants.co.za` / `www` DNS at that host (leave parking IP)
4. Redeploy Netlify from current `main` (if using Netlify)
5. Configure Forms notifications → `office@aolaccountants.co.za` and run `docs/FORM_TESTING.md`
6. Keep noindex until legal sign-off + launch QA
7. Add SPF / DKIM / DMARC
8. Only then flip production + indexing env flags

## What “done” looks like for a working public site

* `https://aolaccountants.co.za` serves this build over trusted HTTPS
* Staging/preview remains noindex until launch
* Form submits to Netlify, appears under `aol-website-enquiries`, emails `office@`
* Footer shows `info@` and `office@`; Privacy uses `privacy@`; Terms use `info@` / `accounts@`
