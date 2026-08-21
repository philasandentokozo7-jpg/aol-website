# Post-deploy status

Last sorted: 2026-08-21 (SEO architecture branch)

## Production infrastructure (confirmed)

| Item | Status |
|---|---|
| Netlify production branch | `main` |
| Primary domain | `https://aolaccountants.co.za` |
| `www.aolaccountants.co.za` | Redirects to primary |
| HTTPS | Let’s Encrypt active for apex and www |
| DNS | Correct for Netlify hosting |
| Netlify Forms | Detects `aol-website-enquiries` |
| Form notifications | `office@aolaccountants.co.za` |
| Legacy dashboard form `consultation` | Historical only — not used by current frontend |
| Safe application default | `SITE_MODE=staging`, `INDEXING_ENABLED=false` until launch QA |
| Typo domain `aolaccounting.co.za` | Obsolete — never reintroduce as public/config host |

## SEO architecture branch (`seo-architecture-final`)

Adds standalone About, Contact, Industries, Pricing, Insights and ten service landing pages; rewires nav/footer; fixes homepage H1/commercial metadata; excludes `/thank-you/` from sitemap; preserves Netlify Forms identity `aol-website-enquiries`.

## Still required after this PR merges

1. End-to-end real form submission confirmation on production Netlify (if not already completed)
2. Merge `seo-architecture-final` → `main` after QA
3. Production indexing env switch after final QA:
   - `NEXT_PUBLIC_SITE_MODE=production`
   - `NEXT_PUBLIC_INDEXING_ENABLED=true`
   - `NEXT_PUBLIC_SITE_URL=https://aolaccountants.co.za`
   - `NEXT_PUBLIC_OFFICIAL_SITE_URL=https://aolaccountants.co.za`
4. Search Console verification + sitemap submission on the official domain only
5. SPF / DKIM / DMARC if still incomplete
6. Final visual QA on live after merge

## Do not

* Hard-code production indexing in `netlify.toml`
* Restore a global `X-Robots-Tag: noindex` header
* Rename the live form to `consultation`
* Publish director personal name or fabricated claims
