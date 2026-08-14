# Domain and Email Launch Instructions

The website code is on `main` and staging-ready. Remaining work is host/DNS configuration — not a redesign.

**Do not use** `aolaccounting.co.za` / `www.aolaccounting.co.za` as the official site (parking / wrong domain).  
**Use** `https://aolaccountants.co.za`.

**Netlify Forms note:** form submissions only work when this site is published on **Netlify**. GitHub Pages alone will not process `aol-website-enquiries`. Prefer Netlify as the public host while keeping the current form implementation. See `docs/POST_DEPLOY_STATUS.md`.

Current defaults:

* `NEXT_PUBLIC_SITE_MODE=staging`
* `NEXT_PUBLIC_INDEXING_ENABLED=false`
* Preview reference: `https://aol-accounting-academy.netlify.app/` (redeploy from current `main` before trusting it)
* Intended official production domain: `https://aolaccountants.co.za` (configurable via `NEXT_PUBLIC_OFFICIAL_SITE_URL`)

## Before connecting the official domain

0. **Clear the wrong GitHub Pages custom domain**
   * GitHub → Settings → Pages → Custom domain: remove `www.aolaccounting.co.za`.
   * Do not re-add a custom domain until DNS for `aolaccountants.co.za` points at the chosen host.

## Post-purchase steps

1. **Add the domain to the hosting provider**
   * **Recommended (Netlify Forms):** Netlify → Domain management → Add `aolaccountants.co.za`.
   * GitHub Pages: only if you accept replacing Netlify Forms with another processor.
   * The repository does **not** publish a `CNAME` file from builds; custom domain is dashboard-only.

2. **Connect the required DNS records**
   * Follow the host’s exact A / ALIAS / CNAME instructions for apex and `www`.
   * Do not invent DNS values in the repository.
   * Current web DNS for `aolaccountants.co.za` has been observed as a parking page — replace those records.

3. **Confirm HTTPS**
   * Wait for certificate provisioning.
   * Verify `https://` loads with no mixed-content warnings.

4. **Select the primary domain**
   * Prefer one canonical host (usually `www` or apex) and redirect the other to it.

5. **Redirect the Netlify / preview subdomain where appropriate**
   * After cutover, redirect `aol-accounting-academy.netlify.app` (and any GitHub Pages default URL) to the official domain.

6. **Update the production site URL**
   * Set repository/hosting env vars:
     * `NEXT_PUBLIC_SITE_MODE=production`
     * `NEXT_PUBLIC_SITE_URL=https://aolaccountants.co.za`
     * `NEXT_PUBLIC_OFFICIAL_SITE_URL=https://aolaccountants.co.za`

7. **Activate canonical URLs**
   * Rebuild so metadata `alternates.canonical` and Open Graph URLs use the official domain.

8. **Activate the production sitemap**
   * Rebuild; `app/sitemap.ts` emits official-domain URLs when indexing is enabled.

9. **Change robots / indexing from staging to production**
   * Set `NEXT_PUBLIC_INDEXING_ENABLED=true` only after launch QA.
   * Rebuild so `robots.ts` allows crawling and includes the sitemap.

10. **Official domain mailbox**
    * Google Workspace is active for `aolaccountants.co.za`.

11. **Approved public addresses (already in site config + receive-tested)**
    * `info@aolaccountants.co.za` — general enquiries (footer primary)
    * `accounts@aolaccountants.co.za` — accounts and billing
    * `privacy@aolaccountants.co.za` — privacy / POPIA / Information Officer
    * `office@aolaccountants.co.za` — office contact; primary mailbox; Netlify Forms notification recipient
    * Aliases `info@`, `accounts@`, `privacy@` deliver to `office@`
    * **Receive test passed** for all four addresses (owner confirmed).
    * Optional env overrides: `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_ACCOUNTS_EMAIL`, `NEXT_PUBLIC_PRIVACY_EMAIL`, `NEXT_PUBLIC_OFFICE_EMAIL`.

12. **Update form delivery and reply-to settings**
    * Publish current `main` to **Netlify** (required for Netlify Forms).
    * Confirm Netlify Forms detected `aol-website-enquiries` after deploy.
    * Configure Netlify form **notifications** to **`office@aolaccountants.co.za`** (dashboard only — the form does not POST to an email address).
    * Run the end-to-end checks in `docs/FORM_TESTING.md`.

13. **Add SPF**
    * Publish the SPF TXT record required by the mailbox provider.

14. **Add DKIM**
    * Publish DKIM keys from the mailbox provider.

15. **Add DMARC**
    * Publish a DMARC policy appropriate for launch (start with monitoring if unsure).

16. **Test inbound and outbound email**
    * Send and receive from each published address.

17. **Test form acknowledgements**
    * Submit the consultation form end-to-end.
    * Confirm success state only after real delivery.
    * Confirm notification email and optional auto-reply.

18. **Update footer and legal contact details**
    * Approved emails are already published in footer / Privacy / Terms.
    * Confirm address, phone, hours, and Information Officer details. Email receive tests for all four addresses are complete.

19. **Add Search Console**
    * Verify the **official** domain only (not the Netlify preview as the final property).
    * Submit the production sitemap.

20. **Complete final launch QA**
    * Use `docs/LAUNCH_CHECKLIST.md`.
    * Confirm noindex is off only on the official domain build.
    * Confirm no placeholder emails or blank social links are visible.

## Security headers note

`netlify.toml` already sets frame denial, nosniff, referrer policy, permissions policy, and staging `X-Robots-Tag`. For GitHub Pages, equivalent headers must be configured at the CDN/host layer if required — static export cannot enforce them alone.
