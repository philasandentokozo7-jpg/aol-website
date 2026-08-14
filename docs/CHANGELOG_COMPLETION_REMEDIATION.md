# Changelog — Owner Copy & Production Readiness Remediation

Branch: `completion/aol-owner-copy-production-readiness`

## Content

* Implemented locked owner-approved wording verbatim across Hero, About, Why Choose, Services, Industries, Trust, Process, Insights heading/topics, and final CTA
* Replaced paraphrased / conflicting homepage copy
* Removed public placeholder testimonial
* Converted Insights to non-clickable topic preview (no fake dates, authors, or Read links)
* Service name corrected to `Cloud Accounting (Xero)`
* Accounting & Bookkeeping and Payroll Administration shown title-only pending owner descriptions
* Added `/services` page with locked descriptions
* Preserved Pricing packages from prior verified client commit

## Platform / SEO

* Expanded `src/config/site.ts` central configuration
* Added `.env.example`
* Environment-aware `robots.ts` / `sitemap.ts` / metadata robots
* Default staging `noindex, nofollow`
* Removed static `public/robots.txt`, `public/sitemap.xml`, premature `public/CNAME`
* GitHub Pages workflow reads staging/production vars; writes CNAME only in production mode
* Added `netlify.toml` for staging headers and build env

## UX / a11y / forms

* Skip link, focus traps, Escape handling, hash focus helper
* Consultation form privacy purpose text, optional marketing consent, validation, honest failure state
* Legal pages: Privacy Notice, Cookie Policy, Terms of Use
* Custom 404 and thank-you route
* Footer legal links; no blank social links

## Design

* Hero brand-first treatment; removed floating overlay chip
* Simplified About (removed invented badge/points)
* Service grid adjusted for long locked descriptions
* Insights preview list styling
* Mobile typography / CTA wrapping tweaks

## Dependencies

* Bumped `next` and `eslint-config-next` from 16.2.10 → 16.2.12 for advisory remediation

## Verification evidence (local)

* `npm run lint` — pass
* `npm run typecheck` — pass
* `npm run build` — pass (routes: `/`, `/services`, `/privacy`, `/cookies`, `/terms`, `/thank-you`, `/robots.txt`, `/sitemap.xml`, `/_not-found`)
* Static serve smoke test (`npx serve out -l 3000`): home/services/legal/thank-you/robots 200; unknown path 404
* `out/robots.txt` = `Disallow: /` in staging
* HTML contains owner phrases verbatim; placeholder testimonial / fake insight dates absent
* Secret scan: no committed keys/endpoints
* `npm audit --omit=dev`: residual transitive highs in postcss/sharp via Next (documented)

## Documentation added

* `OWNER_COPY_IMPLEMENTATION_REGISTER.md`
* `PRODUCTION_READINESS_AUDIT.md`
* `CLIENT_INFORMATION_REQUIRED.md`
* `ACCREDITATION_AND_CLAIMS_REGISTER.md`
* `DOMAIN_AND_EMAIL_LAUNCH_INSTRUCTIONS.md`
* `ANALYTICS_EVENT_PLAN.md`
* `LEGAL_CONTENT_APPROVAL_REQUIRED.md`
* `LAUNCH_CHECKLIST.md`
* `CHANGELOG_COMPLETION_REMEDIATION.md`
