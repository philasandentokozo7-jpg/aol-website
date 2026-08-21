import type { Metadata } from "next";
import { SiteChrome } from "@/components/layout/SiteChrome";
import {
  BUSINESS_HOURS,
  COMPANY_REGISTRATION_NUMBER,
  INFORMATION_OFFICER_TITLE,
  isPublicValue,
  MAILTO_PRIVACY,
  PHONE_DISPLAY,
  PHONE_HREF,
  PHYSICAL_ADDRESS,
  POLICY_EFFECTIVE_DATE,
  PRIVACY_EMAIL,
  REGISTERED_COMPANY_NAME,
  TRADING_NAME,
  WHATSAPP_URL,
} from "@/config/site";
import { canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: canonicalUrl("/privacy/") },
  title: "Privacy Notice",
  description: `Privacy Notice for ${TRADING_NAME}.`,
};

export default function PrivacyPage() {
  return (
    <SiteChrome>
      <article className="section section--white legal">
        <div className="container legal__inner">
          <h1>Privacy Notice</h1>
          <p className="legal__meta">
            Effective date: {POLICY_EFFECTIVE_DATE}. This page describes how {TRADING_NAME} handles personal information
            collected through this website.
          </p>

          <h2>Who we are</h2>
          <p>
            This website is operated by {REGISTERED_COMPANY_NAME}
            {isPublicValue(COMPANY_REGISTRATION_NUMBER)
              ? ` (company registration number ${COMPANY_REGISTRATION_NUMBER})`
              : ""}
            . {TRADING_NAME} provides information about accounting, taxation, payroll, cloud accounting, and business
            advisory services, and receives consultation and enquiry requests through this website.
          </p>
          {isPublicValue(PHYSICAL_ADDRESS) ? <p>Public business address: {PHYSICAL_ADDRESS}.</p> : null}

          <h2>Information Officer</h2>
          <p>
            The Information Officer for {TRADING_NAME} is the {INFORMATION_OFFICER_TITLE}. Privacy, POPIA and Information
            Officer enquiries may be made by email at{" "}
            <a href={MAILTO_PRIVACY}>{PRIVACY_EMAIL}</a>, or using the telephone or WhatsApp contact details published on
            this website.
          </p>

          <h2>Information we collect</h2>
          <p>When you use the consultation or enquiry form, we may collect:</p>
          <ul>
            <li>Full name (required)</li>
            <li>Email address (required)</li>
            <li>Business name (optional)</li>
            <li>Phone number (optional)</li>
            <li>Service interest and message (optional)</li>
            <li>Optional marketing consent preference</li>
          </ul>
          <p>
            We also collect limited technical information that your browser or hosting provider may generate (such as IP
            address, user agent, and basic request metadata) for security and operational purposes.
          </p>

          <h2>Why we collect it</h2>
          <p>We use personal information to:</p>
          <ul>
            <li>Respond to consultation and enquiry requests</li>
            <li>Contact you about services you asked about</li>
            <li>Send optional updates only if you actively consent</li>
            <li>Protect the website against spam and abuse</li>
            <li>Meet applicable legal obligations</li>
          </ul>
          <p>Marketing consent is optional and is never pre-selected.</p>

          <h2>How we share information</h2>
          <p>
            Enquiry information submitted through the website consultation form is processed through Netlify&apos;s
            form-handling service for the purpose of receiving and responding to enquiries. WhatsApp conversations use
            WhatsApp&apos;s own platform when you choose that channel. We do not sell personal information.
          </p>

          <h2>Retention</h2>
          <p>
            Enquiry records are retained only for as long as needed to respond to your request, manage the client
            relationship if one follows, and meet legal or accounting record-keeping duties.
          </p>

          <h2>Your rights</h2>
          <p>
            Depending on applicable South African privacy law, you may request access to, correction of, or deletion of
            personal information we hold about you, subject to legal exceptions.
          </p>

          <h2>Contact</h2>
          <ul>
            <li>Information Officer: {INFORMATION_OFFICER_TITLE}</li>
            {isPublicValue(PHYSICAL_ADDRESS) ? <li>Address: {PHYSICAL_ADDRESS}</li> : null}
            {isPublicValue(PHONE_DISPLAY) ? (
              <li>
                Phone: <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
              </li>
            ) : null}
            {isPublicValue(WHATSAPP_URL) ? (
              <li>
                WhatsApp:{" "}
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  Chat with us
                </a>
              </li>
            ) : null}
            {isPublicValue(PRIVACY_EMAIL) ? (
              <li>
                Privacy / POPIA email: <a href={MAILTO_PRIVACY}>{PRIVACY_EMAIL}</a>
              </li>
            ) : null}
            {isPublicValue(BUSINESS_HOURS) ? <li>Hours: {BUSINESS_HOURS}</li> : null}
          </ul>

          <p className="legal__note">
            This notice describes current website behaviour and remains subject to owner review before production launch.
            It does not claim that a lawyer has reviewed or certified this page.
          </p>
        </div>
      </article>
    </SiteChrome>
  );
}
