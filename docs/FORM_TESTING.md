# Enquiry form testing — Netlify Forms

Form name: `aol-website-enquiries`  
Processor: Netlify Forms (static export)  
Success route: `/thank-you/`

## Submitted fields

| Field `name` | Type | Required | Notes |
|---|---|---|---|
| `form-name` | hidden | yes | Always `aol-website-enquiries` |
| `bot-field` | honeypot | no | Must stay empty; hidden from visitors |
| `name` | text | yes | Full name |
| `business` | text | no | Business name |
| `email` | email | yes | Contact email |
| `phone` | tel | no | Phone |
| `service` | select | no | Service interest |
| `message` | textarea | no | Free-text enquiry |
| `marketing_consent` | checkbox → yes/no | no | Unticked by default; submitted as `yes` or `no` |

WhatsApp and telephone remain alternative contact channels only — they are not form processors.

## After first deploy that detects the form

1. Open the Netlify site dashboard → **Forms**.
2. Confirm `aol-website-enquiries` appears.
3. Configure **Form notifications** to **`office@aolaccountants.co.za`** (required notification recipient).
4. Optionally set spam filtering / notification rules.
5. Do not point the HTML form `action` at an email address — submissions stay on Netlify Forms.
6. Do not enable indexing until launch QA is complete.

## End-to-end test procedure

1. Deploy the static `out/` build to Netlify (branch deploy or production).
2. Confirm Forms lists `aol-website-enquiries`.
3. Open the live site → **Book a Free Consultation**.
4. Submit with empty required fields → client validation errors appear; no success navigation.
5. Submit a valid test enquiry (use a real mailbox you control).
6. Confirm navigation to `/thank-you/` only after success.
7. Confirm the submission appears under Netlify → Forms → `aol-website-enquiries`.
8. Confirm the notification email arrives at `office@aolaccountants.co.za` (after notifications are configured).
9. Force a failure (e.g. offline or blocked network) → form stays open with an accessible error; no thank-you page.
10. Confirm honeypot submissions with a filled `bot-field` are filtered by Netlify.
11. Confirm phone and WhatsApp links still work from the modal and footer.

## Local note

`npx serve out` does not process Netlify Forms POSTs. Local success redirects require a Netlify deploy (or Netlify Dev with linked site). Client validation can still be tested locally.
