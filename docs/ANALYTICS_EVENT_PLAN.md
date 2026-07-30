# Analytics Event Plan

No analytics ID is configured by default (`NEXT_PUBLIC_ANALYTICS_ID`).
Analytics must not run before required consent.

Do **not** send names, emails, phones, message bodies, tax/financial details, form answers, or URL parameters containing personal information.

## Planned events (real interactions only)

| Event | Trigger | Properties (non-PII) |
|---|---|---|
| `consultation_start` | Consultation modal opened | `source` (header / hero / cta / services) if available |
| `consultation_submit` | Form provider returns success | `service_selected` (service label only) |
| `enquiry_submit` | Alias of consultation submit if contact form is unified | `service_selected` |
| `service_view` | `/services` page view or service anchor view | `service_slug` |
| `insight_view` | Only when a genuine article route exists | `article_slug` |
| `phone_click` | Click-to-call | none |
| `email_click` | Mailto click (only when email is published) | none |
| `whatsapp_click` | WhatsApp link click | none |
| `form_error` | Client validation or provider failure | `error_type` (`validation` / `network` / `unconfigured`) |

## Explicitly out of scope until features exist

* course / enrolment / payment events
* fake article reads for the topic preview
* testimonial interaction events
* guaranteed conversion funnels

## Implementation rule

When analytics is added, gate it behind consent (see Cookie Policy) and keep event payloads free of personal information.
