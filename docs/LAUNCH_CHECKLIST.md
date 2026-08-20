# Launch Checklist

## Staging complete when

- [x] Owner-approved wording implemented verbatim
- [x] Conflicting old copy removed
- [x] Fake testimonials removed from public display
- [x] Fake insight dates / non-functional article links removed
- [x] Fake statistics not displayed
- [x] Forms use Netlify Forms with honest failure handling and thank-you only after success
- [x] Privacy / cookies / terms routes exist
- [x] 404 page exists
- [x] Staging noindex active by default
- [x] Central env configuration present
- [x] Netlify config no longer hard-codes staging/indexing flags or a global noindex header
- [x] Missing client facts documented
- [x] Code merged to `main` and GitHub Pages workflow succeeded
- [x] Google Workspace: `office@` primary active; aliases `info@`, `accounts@`, `privacy@` configured
- [x] Receive test passed for all four addresses (`info@`, `accounts@`, `privacy@`, `office@`)

## Before the public site is usable

- [ ] Remove wrong GitHub Pages custom domain (`www.aolaccounting.co.za`)
- [ ] Use Netlify as primary host while the current Netlify Forms implementation is retained
- [ ] Redeploy Netlify from current `main`
- [ ] Confirm Netlify preview shows current copy and routes (`/privacy`, `/services`, `/terms`, `/thank-you`)
- [ ] Confirm live form name is `aol-website-enquiries`
- [ ] Add `aolaccountants.co.za` and `www.aolaccountants.co.za` in Netlify and select the primary domain
- [ ] Replace the Domains.co.za parking web DNS with the exact Netlify records; preserve Google Workspace mail records
- [ ] Netlify Forms notifications set to `office@aolaccountants.co.za` and end-to-end tested (`docs/FORM_TESTING.md`)
- [ ] HTTPS confirmed on primary domain and alternate host redirects correctly
- [ ] Confirm staging/preview remains noindex until launch QA

## Before enabling production indexing

- [ ] `NEXT_PUBLIC_SITE_MODE=production` set in the production deployment environment
- [ ] `NEXT_PUBLIC_SITE_URL=https://aolaccountants.co.za`
- [ ] `NEXT_PUBLIC_OFFICIAL_SITE_URL=https://aolaccountants.co.za`
- [ ] `NEXT_PUBLIC_INDEXING_ENABLED=true` only after QA
- [ ] SPF published for Google Workspace
- [ ] DKIM enabled in Google Workspace and exact selector published in DNS
- [ ] DMARC published (monitoring policy acceptable for initial launch if appropriate)
- [ ] Legal pages approved
- [ ] Claim evidence confirmed or accepted as business risk by owner
- [ ] Search Console on official domain only
- [ ] Final visual QA at 320–1440px widths
- [ ] Phone / WhatsApp / address reconfirmed
- [ ] No placeholder or blank social links visible
