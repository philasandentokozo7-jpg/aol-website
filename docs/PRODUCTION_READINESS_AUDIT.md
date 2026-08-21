# Production Readiness Audit

## Stack detected

| Item | Value |
|---|---|
| Framework | Next.js 16.2.12 (App Router), React 19 |
| Output | Static export (`output: "export"`) |
| Package manager | npm (`package-lock.json`) |
| Dev command | `npm run dev` |
| Build command | `npm run build` |
| Lint | `npm run lint` |
| Typecheck | `npm run typecheck` |
| Deployment | GitHub Pages workflow on `main` + Netlify config (`netlify.toml`) |
| Form provider | Netlify Forms (`aol-website-enquiries`); WhatsApp/phone remain alternative contact options |
| Analytics | Not configured |
| Official domain (intended) | `https://aolaccountants.co.za` |
| Wrong/typo domain (do not use) | `aolaccounting.co.za` — documentation warning only |

## Current deploy reality

* Netlify hosts production on `main` with `aolaccountants.co.za` + HTTPS.
* Forms detect `aol-website-enquiries`; notifications go to `office@aolaccountants.co.za`.
* Application defaults remain staging/noindex until launch env flags are flipped.
* SEO architecture branch adds standalone commercial pages and sitemap coverage — merge after QA.
* See `docs/POST_DEPLOY_STATUS.md`.

## Routes

* `/` — homepage sections
* `/services` — full service list
* `/privacy`, `/cookies`, `/terms`
* `/thank-you`
* `/_not-found` / custom `not-found`
* Anchors: `#home` `#about` `#why` `#services` `#industries` `#why-trust` `#pricing` `#process` `#insights` `#contact`

## Staging vs production SEO

| Mode | Robots | Canonical / OG base | Sitemap |
|---|---|---|---|
| staging (default) | `noindex, nofollow` | preview / configured `SITE_URL` | emitted for QA; robots disallow all |
| production + indexing enabled | allow | official domain | official domain URLs |

## Forms

* Labels, required markers, purpose text, Privacy Notice link: yes
* Optional marketing consent, unticked: yes
* Validation + accessible error alert: yes
* Success only after Netlify Forms success response: yes
* Failure stays on form with accessible error (no fake success): yes
* Honeypot (`bot-field` + `netlify-honeypot`): yes
* Double-submit guard via `sending` state: yes
* Static-export detection form (`NetlifyFormsDetector`): yes
* **Hosting requirement:** Netlify Forms only process submissions on a Netlify publish

## Accessibility (implemented)

* Skip link
* Landmark structure (`header`, `main`, `footer`, `nav`)
* Page-level h1 in hero; section h2s
* Mobile drawer Escape + focus trap + restore
* Modal Escape + focus trap + restore
* Hash focus helper for `/#insights`
* `scroll-margin-top` for fixed header
* Reduced-motion handling for reveal + hero video
* Visible `:focus-visible` styles

## Performance

* `next/font` self-hosted Manrope + Spectral
* Inline CSS experiment retained
* WebP logo / poster / office image
* Hero video `preload="metadata"`; poster for LCP-friendly fallback
* Below-fold images lazy-loaded
* Floating hero overlay chip removed

## Security

* No secrets committed (`.env*` gitignored; `.env.example` names only)
* External links use `rel="noopener noreferrer"` where `target="_blank"`
* Netlify security headers in `netlify.toml`
* Form does not put PII in URLs
* Dependency audit: upgraded `next` / `eslint-config-next` to 16.2.12. Residual high findings remain in transitive `postcss` / `sharp` via Next; `npm audit fix --force` proposes unsafe downgrades — do not apply blindly. Re-audit at launch.
* Static export is served with `npx serve out` (or Netlify/GitHub Pages). `next start` is not the static-hosting path.

## Remaining blockers to official production indexing

1. Merge SEO architecture branch after QA
2. Confirm live form E2E if not already done
3. SPF / DKIM / DMARC if incomplete
4. Legal approval + claim evidence confirmation
5. Flip env flags and rebuild for indexing only after QA
