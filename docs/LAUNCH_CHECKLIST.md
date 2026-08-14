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
- [x] Missing client facts documented
- [x] Code merged to `main` and GitHub Pages workflow succeeded
- [x] Google Workspace: `office@` primary active; aliases `info@`, `accounts@`, `privacy@` configured
- [x] Receive test passed for all four addresses (`info@`, `accounts@`, `privacy@`, `office@`)

## Before the public site is usable

- [ ] Remove wrong GitHub Pages custom domain (`www.aolaccounting.co.za`)
- [ ] Choose primary host (Netlify recommended while using Netlify Forms)
- [ ] Point `aolaccountants.co.za` / `www` web DNS at the chosen host (not parking)
- [ ] Redeploy Netlify from current `main` (if using Netlify)
- [ ] Confirm live form name is `aol-website-enquiries`
- [ ] Netlify Forms notifications set to `office@aolaccountants.co.za` and end-to-end tested (`docs/FORM_TESTING.md`)
- [ ] HTTPS confirmed on primary domain
- [ ] Confirm staging/preview remains noindex until launch QA

## Before enabling production indexing

- [ ] `NEXT_PUBLIC_SITE_MODE=production`
- [ ] `NEXT_PUBLIC_SITE_URL` / official URL set to `https://aolaccountants.co.za`
- [ ] `NEXT_PUBLIC_INDEXING_ENABLED=true` only after QA
- [ ] SPF / DKIM / DMARC configured
- [ ] Legal pages approved
- [ ] Claim evidence confirmed or accepted as business risk by owner
- [ ] Search Console on official domain only
- [ ] Final visual QA at 320–1440px widths
- [ ] Phone / WhatsApp / address reconfirmed
- [ ] No placeholder or blank social links visible
