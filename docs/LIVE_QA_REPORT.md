# Live QA report — aolaccountants.co.za

Last run: 2026-08-22 against production commit `ccebb55`

## Honest context

Earlier releases were verified with build/lint checks and spot checks, not a full browser crawl of every route after in-app navigation. That is why the blank `/services/` page was missed until you found it. That was a process failure.

This report is from an automated Playwright crawl of the live site after the visibility hardening deploy.

## Result

**182 checks passed, 0 failures.**

## What was tested on production

### Every public route (HTTP 200, one H1, no horizontal overflow, no typo domain, content present)
- `/`, `/about/`, `/contact/`, `/services/`
- all 10 `/services/.../` detail pages
- `/industries/`, `/pricing/`, `/insights/`
- `/privacy/`, `/cookies/`, `/terms/`, `/thank-you/`

### Hub content counts
- Services hub: 10 cards
- Pricing: 3 packages
- Industries: 9 items
- Insights: 4 planned topics

### In-app navigation (the failure class you hit)
- Header nav to About / Services / Industries / Pricing / Insights / Contact
- Homepage **View All Services** → `/services/` with all 10 cards visible

### Consultation modal
- Opens from Book
- Browser Back restores the homepage (no blank locked overlay)

### Mobile widths 320 / 360 / 390 / 412
- `/`, `/services/`, `/contact/`, `/pricing/`, `/about/`
- no horizontal overflow
- no invisible main content

### SEO outputs
- `robots.txt` allows crawling
- `sitemap.xml` uses `aolaccountants.co.za` only, excludes `/thank-you/`

## Fix shipped for the blank-page class of bug

Scroll-reveal no longer hides content with `opacity: 0`. Sections stay visible even if animation JS is late or skipped after client navigation.

## Still not covered by this crawl (owner follow-up)

These need a real human/business check; automation cannot certify them fully:

1. End-to-end consultation form submission → email received at `office@aolaccountants.co.za`
2. Phone / WhatsApp dial-out on a real phone
3. Search Console sitemap acceptance
4. Email DNS (SPF/DKIM/DMARC)
5. Final visual taste pass on your devices

## How to re-run this crawl

```bash
node /opt/cursor/artifacts/qa/live-site-qa.cjs
```

Expect: `"failures": 0`
