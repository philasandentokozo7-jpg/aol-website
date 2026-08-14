# AOL Accounting Academy SA — Website

Public marketing website for **AOL Accounting Academy SA**  
Intended production domain: **https://aolaccountants.co.za**

## Stack

* Next.js (App Router) static export → `out/`
* React 19
* npm

## Commands

```bash
npm install
npm run dev        # local development
npm run lint
npm run typecheck
npm run build      # writes static site to out/
```

Preview the build locally:

```bash
npx serve out -l 3000
```

## Configuration

* Central config: `src/config/site.ts`
* Env names only: `.env.example` (never commit real `.env` secrets)
* Default mode: **staging** (`noindex`) until launch flags are set
* Enquiry form: **Netlify Forms** (`aol-website-enquiries`) — requires a Netlify-hosted publish for submissions to work
* Public emails: `info@`, `accounts@`, `privacy@`, `office@` @ `aolaccountants.co.za`
* Information Officer public wording: “Director of AOL Accounting Academy SA” (no personal name on the site)

## Hosting notes

* GitHub Actions deploys `main` to **GitHub Pages** (see `.github/workflows/deploy.yml`)
* `netlify.toml` configures **Netlify** staging builds with noindex headers
* **Netlify Forms only process forms on Netlify.** If production is GitHub Pages only, form submissions will not be handled by Netlify Forms.
* Do **not** use the typo/parking domain `aolaccounting.co.za` as the official site.

## Docs

* `docs/POST_DEPLOY_STATUS.md` — current deploy / DNS status
* `docs/LAUNCH_CHECKLIST.md`
* `docs/DOMAIN_AND_EMAIL_LAUNCH_INSTRUCTIONS.md`
* `docs/FORM_TESTING.md`
* `docs/CLIENT_INFORMATION_REQUIRED.md`
* `docs/PRODUCTION_READINESS_AUDIT.md`

## Privacy

Never publish the director’s personal name, ID number, tax number, or private residential address in this repository or on the public site.
