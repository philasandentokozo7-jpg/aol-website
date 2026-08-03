# Domain and Email Launch Instructions

The website code is staging-ready. Official-domain and mailbox activation should be configuration and DNS work, not a redesign.

Current defaults:

* `NEXT_PUBLIC_SITE_MODE=staging`
* `NEXT_PUBLIC_INDEXING_ENABLED=false`
* Preview reference: `https://aol-accounting-academy.netlify.app/`
* Intended official production domain: `https://aolaccountants.co.za` (configurable via `NEXT_PUBLIC_OFFICIAL_SITE_URL`)

## Post-purchase steps

1. **Add the domain to the hosting provider**
   * Netlify: Domain management → Add custom domain.
   * GitHub Pages / Netlify: set the custom domain in the host dashboard after DNS is ready. The repository does not publish a `CNAME` file from staging builds.

2. **Connect the required DNS records**
   * Follow the host’s exact A / ALIAS / CNAME instructions for apex and `www`.
   * Do not invent DNS values in the repository.

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

10. **Create the official domain mailbox**
    * Provision Google Workspace / Microsoft 365 / chosen host on the domain.

11. **Select final addresses**
    * Choose names such as enquiries, accounts, privacy, or complaints — do not assume exact local-parts until the owner decides.
    * Set env values: `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_PRIVACY_EMAIL`, `NEXT_PUBLIC_COMPLAINTS_EMAIL`, `NEXT_PUBLIC_FUTURE_DOMAIN_EMAIL`.

12. **Update form delivery and reply-to settings**
    * Create/configure Formspree (or equivalent) endpoint.
    * Set `NEXT_PUBLIC_FORMSPREE_ENDPOINT`.
    * Set reply-to / notification recipients to the new domain mailbox.

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
    * Publish verified emails once live.
    * Confirm address, phone, hours, Information Officer details.

19. **Add Search Console**
    * Verify the **official** domain only (not the Netlify preview as the final property).
    * Submit the production sitemap.

20. **Complete final launch QA**
    * Use `docs/LAUNCH_CHECKLIST.md`.
    * Confirm noindex is off only on the official domain build.
    * Confirm no placeholder emails or blank social links are visible.

## Security headers note

`netlify.toml` already sets frame denial, nosniff, referrer policy, permissions policy, and staging `X-Robots-Tag`. For GitHub Pages, equivalent headers must be configured at the CDN/host layer if required — static export cannot enforce them alone.
