# Owner Copy Implementation Register

Inventory of visible website sections before and after applying locked owner-approved public copy.
Status values: `pending` → `implemented` → `verified`.

| Page / route | Component / source | Old website text (summary) | Replacement owner-approved text | Status | Verbatim |
|---|---|---|---|---|---|
| `/` `#home` | `src/components/sections/Hero.tsx` | Condensed single-paragraph hero; eyebrow “Trusted · Transparent · Professional”; trust order varied; floating “Cloud-first accounting” chip | Headline + 3 paragraphs + CTA buttons + 4 trust labels exactly as approved | implemented | Yes |
| `/` `#about` | `src/components/sections/About.tsx` | Two merged paragraphs; invented point cards (“Compliance-first”, etc.); “Qualified SA professionals” badge | Heading + 3 paragraphs exactly | implemented | Yes |
| `/` `#why` | `src/components/sections/WhyChoose.tsx` | Near-match titles/descriptions with synonym/comma differences; title sentence case differed | Heading, intro, 4 feature titles + descriptions exactly | implemented | Yes |
| `/` `#services` | `src/components/sections/Services.tsx` | Title-only for Accounting & Bookkeeping and Payroll | Full descriptions restored: bookkeeping ends with owner-supplied closing sentence; payroll uses established PAYE/UIF/SDL scope | implemented | Closing sentence verbatim; payroll body professional completion of established scope |
| `/services` | `src/app/services/page.tsx` | Did not exist | Same service names + locked/full descriptions | implemented | Yes |
| `/` `#industries` | `src/components/sections/Industries.tsx` | “SMEs” short label; title sentence case differed | Heading, intro, 9 industry labels exactly | implemented | Yes |
| `/` `#why-trust` | `src/components/sections/WhyTrust.tsx` | Near-match; Client-Focused / Excellence wording differed | Heading, intro, 4 trust points exactly; no fake counters | implemented | Yes |
| `/` `#pricing` | `src/components/sections/Pricing.tsx` | Existing verified package pricing from prior client commit | Retained (not in owner public-copy pack; treated as verified repo pricing) | retained | N/A (not in owner pack) |
| `/` `#process` | `src/components/sections/Process.tsx` | “A calm, three-step path…”; Oxford-comma differences in steps | Heading + 3 steps exactly; ordered list semantics for mobile | implemented | Yes |
| `/` `#testimonials` | `src/components/sections/Testimonials.tsx` | Unpublished example / placeholder attribution | Removed from public render | implemented | N/A (example not published) |
| `/` `#insights` | `src/components/sections/Insights.tsx` | Fake dates, read times, non-functional “Read” / “View all articles” | Heading exactly; topic titles as non-clickable preview; `id="insights"` retained | implemented | Yes (heading + topic titles) |
| `/` CTA | `src/components/sections/CTA.tsx` | Different supporting paragraph | Heading, supporting text, buttons exactly | implemented | Yes |
| `/` footer `#contact` | `src/components/sections/Footer.tsx` | Generic brand blurb; Insights/Pricing links; no legal links | Concise identification; verified contact; legal links; Insights only as topic preview anchor | implemented | Partial (footer ID not fully supplied by owner; verified contacts retained) |
| Consultation modal | `src/components/interactive/ConsultationModal.tsx` | Previous third-party form endpoint / unconnected fallback | Netlify Forms (`aol-website-enquiries`) with privacy, optional marketing consent, thank-you redirect | implemented | N/A (UI chrome) |
| Nav | `src/components/interactive/Header.tsx` | Included Insights as article section | Home/About/Services/Industries/Pricing/Contact + Insights preview anchor | implemented | N/A |

## Search for obsolete wording (post-implementation)

Fragments intentionally removed or replaced site-wide:

- “A calm, three-step path to better finances”
- “Guidance to help you run a sharper business”
- “Book a free, no-obligation consultation and get a clear view…”
- “Cloud Accounting / Xero” (public labels → “Cloud Accounting (Xero)”)
- Placeholder testimonial quotation and “Client name & business”
- Fake insight dates (`Jun 2026`, `May 2026`, `Apr 2026`) and “View all articles” / “Read” CTAs
- Hero chip “Cloud-first accounting / Real-time numbers, any device”
- About badge “Qualified SA professionals” and invented about-point cards

## Notes

- Owner editorial instructions (structure suggestions, Xero brand strategy notes, achievement-counter suggestions) were applied to layout only and were **not** published as customer-facing copy.
- Accounting & Bookkeeping and Payroll Administration: full public descriptions are implemented (bookkeeping closing sentence owner-supplied; payroll body from established PAYE/UIF/SDL scope). Confirm if a longer owner-authored payroll paragraph exists — gap noted in `CLIENT_INFORMATION_REQUIRED.md`.
