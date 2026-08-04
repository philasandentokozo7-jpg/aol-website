# Production Readiness Audit

## Stack detected

| Item | Value |
|---|---|
| Framework | Next.js 16.2.10 (App Router), React 19 |
| Output | Static export (`output: "export"`) |
| Package manager | npm (`package-lock.json`) |
| Dev command | `npm run dev` |
| Build command | `npm run build` |
| Lint | `npm run lint` |
| Typecheck | `npm run typecheck` |
| Deployment | GitHub Pages workflow + Netlify staging config (`netlify.toml`) |
| Form provider | Netlify Forms (`aol-website-enquiries`); WhatsApp/phone remain alternative contact options |
| Analytics | Not configured |
| Preview inspected | https://aol-accounting-academy.netlify.app/ (pre-remediation content matched repo) |

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

## Remaining blockers to official production launch

1. Domain purchase + DNS + HTTPS
2. Confirm all four approved addresses receive email; confirm `info@` / `accounts@` / `privacy@` Workspace aliases (`office@` active and tested)
3. Netlify Forms notifications to `office@aolaccountants.co.za` after first detecting deploy
4. Legal approval + claim evidence confirmation
5. Flip env flags and rebuild for indexing
