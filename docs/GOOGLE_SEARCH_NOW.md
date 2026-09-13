# Get AOL on Google now

**Site status (already done on the server):**

| Check | Live result |
|---|---|
| Domain | `https://aolaccountants.co.za` |
| HTTPS | Active |
| `robots.txt` | `Allow: /` + sitemap declared |
| Page robots meta | `index, follow` |
| Sitemap | `https://aolaccountants.co.za/sitemap.xml` (17 URLs) |
| Googlebot fetch | Homepage + key pages return **200** |
| Blocking headers | None (`X-Robots-Tag` not set) |

The website is **open to Google**. What Google still needs is an official sitemap submission and URL indexing requests from Search Console. Only the domain owner can complete that step.

---

## Owner action (about 5–10 minutes)

Do this while signed into the Google account that owns `aolaccountants.co.za` / Workspace mail.

### 1. Open Search Console
https://search.google.com/search-console

### 2. Add the property
- Choose **URL prefix**
- Enter exactly: `https://aolaccountants.co.za`

### 3. Verify ownership (pick the fastest method you can)

**Option A — HTML meta tag (fast if you send Cursor the code)**  
1. Copy the `google-site-verification` content string Google shows.  
2. Send it to Cursor / the developer.  
3. We will add it to the site `<head>` and redeploy.  
4. Click **Verify** in Search Console.

**Option B — HTML file upload**  
1. Download the Google HTML verification file.  
2. Send the file to Cursor / the developer to place in `public/` and deploy.  
3. Click **Verify**.

**Option C — DNS TXT record**  
1. Add the TXT record Google provides at your DNS host.  
2. Wait for DNS, then click **Verify**.

### 4. Submit the sitemap
After verification:

1. Left menu → **Sitemaps**
2. Enter: `sitemap.xml`
3. Click **Submit**

Full sitemap URL:  
https://aolaccountants.co.za/sitemap.xml

### 5. Request indexing for the money pages (do these today)
In Search Console → **URL Inspection**, paste each URL, then **Request indexing**:

1. `https://aolaccountants.co.za/`
2. `https://aolaccountants.co.za/services/`
3. `https://aolaccountants.co.za/services/bookkeeping/`
4. `https://aolaccountants.co.za/services/tax-services/`
5. `https://aolaccountants.co.za/services/payroll/`
6. `https://aolaccountants.co.za/contact/`
7. `https://aolaccountants.co.za/about/`
8. `https://aolaccountants.co.za/pricing/`

Google usually queues these within hours; appearing in normal search results can take from same day to a few days.

### 6. Quick check after 24–48 hours
Google search:

```
site:aolaccountants.co.za
```

---

## What Cursor / developer can do immediately if you reply with one of these

Reply with either:

1. The **Google HTML tag** verification code (`google-site-verification=...`), or  
2. The **verification HTML filename** Google gave you, or  
3. Confirmation that DNS TXT is already added

Then we will wire verification into the live site and redeploy within minutes.

---

## Do not

- Do not submit `aolaccounting.co.za` (typo domain)
- Do not submit a Netlify `*.netlify.app` sitemap
- Do not turn indexing off in Netlify after this launch
