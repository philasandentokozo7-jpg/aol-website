import type { Metadata } from "next";
import { SiteChrome } from "@/components/layout/SiteChrome";
import {
  ACCOUNTS_EMAIL,
  COMPANY_REGISTRATION_NUMBER,
  CONTACT_EMAIL,
  isPublicValue,
  MAILTO_ACCOUNTS,
  MAILTO_INFO,
  PHONE_DISPLAY,
  PHONE_HREF,
  PHYSICAL_ADDRESS,
  POLICY_EFFECTIVE_DATE,
  REGISTERED_COMPANY_NAME,
  TRADING_NAME,
  WHATSAPP_URL,
} from "@/config/site";
import { canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: canonicalUrl("/terms/") },
  title: "Terms of Use",
  description: `Terms of Use for the ${TRADING_NAME} website.`,
};

export default function TermsPage() {
  return (
    <SiteChrome>
      <article className="section section--white legal">
        <div className="container legal__inner">
          <h1>Terms of Use</h1>
          <p className="legal__meta">Effective date: {POLICY_EFFECTIVE_DATE}.</p>

          <h2>About this website</h2>
          <p>
            This website is operated by {REGISTERED_COMPANY_NAME}
            {isPublicValue(COMPANY_REGISTRATION_NUMBER)
              ? ` (company registration number ${COMPANY_REGISTRATION_NUMBER})`
              : ""}
            , trading as {TRADING_NAME}. It provides general information about accounting, taxation, payroll, cloud
            accounting, business advisory, and related services. Website content is not personalised professional advice
            until a formal engagement is agreed.
          </p>
          {isPublicValue(PHYSICAL_ADDRESS) ? <p>Public business address: {PHYSICAL_ADDRESS}.</p> : null}

          <h2>No guarantee of outcomes</h2>
          <p>
            Nothing on this website guarantees tax savings, funding, compliance outcomes, business growth, or any other
            specific result. Professional services are provided under separate terms agreed with the client.
          </p>

          <h2>Training content</h2>
          <p>
            References to accounting training or the word &quot;Academy&quot; describe educational and advisory intent.
            Unless separately confirmed in writing, this website does not offer accredited qualifications, formal
            certificates, or recognised academic programmes.
          </p>

          <h2>Enquiries and consultations</h2>
          <p>
            Submitting a consultation request does not create a client relationship. We will respond using the contact
            details you provide. Website consultation requests are handled through Netlify Forms; if the form is
            unavailable, email, WhatsApp or telephone contact may be offered instead. General enquiries may be sent to{" "}
            <a href={MAILTO_INFO}>{CONTACT_EMAIL}</a>. Accounts and billing matters may be directed to{" "}
            <a href={MAILTO_ACCOUNTS}>{ACCOUNTS_EMAIL}</a>.
          </p>

          <h2>Intellectual property</h2>
          <p>
            Website text, branding, and approved media assets belong to {TRADING_NAME} or its licensors. You may not
            copy or reuse them for commercial purposes without permission.
          </p>

          <h2>External links</h2>
          <p>
            Links to third-party services (including WhatsApp or accounting platforms) are provided for convenience.
            Those services have their own terms and privacy practices.
          </p>

          <h2>Contact</h2>
          <ul>
            {isPublicValue(PHYSICAL_ADDRESS) ? <li>{PHYSICAL_ADDRESS}</li> : null}
            {isPublicValue(PHONE_DISPLAY) ? (
              <li>
                <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
              </li>
            ) : null}
            {isPublicValue(CONTACT_EMAIL) ? (
              <li>
                General enquiries: <a href={MAILTO_INFO}>{CONTACT_EMAIL}</a>
              </li>
            ) : null}
            {isPublicValue(ACCOUNTS_EMAIL) ? (
              <li>
                Accounts and billing: <a href={MAILTO_ACCOUNTS}>{ACCOUNTS_EMAIL}</a>
              </li>
            ) : null}
            {isPublicValue(WHATSAPP_URL) ? (
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </li>
            ) : null}
          </ul>

          <p className="legal__note">
            These terms describe current website use and remain subject to owner review before production launch. They
            do not claim that a lawyer has reviewed or certified this page.
          </p>
        </div>
      </article>
    </SiteChrome>
  );
}
