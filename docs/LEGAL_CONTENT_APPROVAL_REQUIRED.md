# Legal Content Approval Required

## Existing legal pages

| Route | Purpose | Status |
|---|---|---|
| `/privacy` | Privacy Notice | Draft published for staging; pending owner/legal approval |
| `/cookies` | Cookie Policy | Draft published for staging; pending owner/legal approval |
| `/terms` | Terms of Use | Draft published for staging; pending owner/legal approval |

## Technical corrections completed

* Footer links to Privacy Notice, Cookie Policy, and Terms of Use
* Forms explain purpose of collection and link to Privacy Notice
* Optional marketing consent left unticked
* Privacy Notice states enquiry data is processed through Netlify’s form-handling service
* Confirmed company name, registration number, public address and phone added
* VAT status statement removed from public pages at owner request
* Information Officer shown only as “Director of AOL Accounting Academy SA”
* Approved public emails published: `info@`, `accounts@`, `privacy@`, `office@` @ aolaccountants.co.za
* No director personal name published
* Staging remains noindex until production launch configuration is enabled

## Missing verified business information

* Optional complaints mailbox (if different from privacy@) — not invented
* Confirmed postal address (if different from the public business address)
* Any longer owner-authorised Payroll Administration paragraph beyond the established scope already used

## Clauses needing owner approval

* Retention wording in Privacy Notice
* Marketing communications wording
* Training / “Academy” clarification in Terms of Use
* Limitation language around outcomes and non-advisory website content
* Cookie / analytics consent mechanism once analytics is introduced

## Privacy contacts

* Privacy / POPIA / Information Officer: `privacy@aolaccountants.co.za` (implemented)
* Optional separate complaints mailbox: not set (do not invent)

## Production-launch blockers (legal)

* Owner review/sign-off on the three legal pages
* Confirm all four approved addresses can receive email (blocking receive test)
* Google Workspace aliases `info@`, `accounts@`, `privacy@` are configured on the `office@` primary mailbox
* DNS/HTTPS and production indexing flags
* Indexing remains disabled until launch QA is complete
