# Launch Checklist

## Staging / infrastructure complete when

- [x] Owner-approved wording implemented
- [x] Fake testimonials / fake insight dates removed
- [x] Forms use Netlify Forms (`aol-website-enquiries`) with honest failure handling
- [x] Privacy / cookies / terms routes exist
- [x] 404 and thank-you routes exist
- [x] Staging noindex active by default in application config
- [x] Correct domain `aolaccountants.co.za` attached to Netlify
- [x] Correct DNS + HTTPS for apex and www
- [x] Netlify production branch is `main`
- [x] Netlify Forms detects `aol-website-enquiries`
- [x] Notification recipient set to `office@aolaccountants.co.za`
- [x] Google Workspace aliases receive mail (`info@`, `accounts@`, `privacy@`, `office@`)

## SEO architecture

- [x] Commercial homepage H1 + brand tagline
- [x] Dedicated `/about/`, `/contact/`, `/services/`, `/industries/`, `/pricing/`, `/insights/`
- [x] Ten service landing pages with unique metadata
- [x] Nav/footer rewired to real pages
- [x] Sitemap excludes `/thank-you/`
- [x] Environment-controlled robots retained
- [x] Consultation modal overflow hardened
- [x] Phone-first mobile polish shipped
- [x] Branch merged to `main` and Netlify production redeployed

## Production indexing (enabled 2026-08-21)

- [x] `NEXT_PUBLIC_SITE_MODE=production`
- [x] `NEXT_PUBLIC_SITE_URL=https://aolaccountants.co.za`
- [x] `NEXT_PUBLIC_OFFICIAL_SITE_URL=https://aolaccountants.co.za`
- [x] `NEXT_PUBLIC_INDEXING_ENABLED=true`
- [x] Live `robots.txt` allows crawling and declares official sitemap

## Still open

- [ ] End-to-end form submission confirmed on live Netlify
- [ ] SPF / DKIM / DMARC configured
- [ ] Legal pages approved
- [ ] Claim evidence confirmed or accepted as business risk by owner
- [ ] Search Console on official domain only + sitemap submitted
- [ ] Final visual QA at 320–1440px widths on live
- [ ] Phone / WhatsApp / address reconfirmed
- [ ] No placeholder or blank social links visible
