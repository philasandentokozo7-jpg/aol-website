import type { Metadata } from "next";
import { SiteChrome } from "@/components/layout/SiteChrome";
import {
  ANALYTICS_ID,
  COMPANY_REGISTRATION_NUMBER,
  isPublicValue,
  PHYSICAL_ADDRESS,
  POLICY_EFFECTIVE_DATE,
  REGISTERED_COMPANY_NAME,
  TRADING_NAME,
} from "@/config/site";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `Cookie Policy for ${TRADING_NAME}.`,
};

export default function CookiesPage() {
  return (
    <SiteChrome>
      <article className="section section--white legal">
        <div className="container legal__inner">
          <h1>Cookie Policy</h1>
          <p className="legal__meta">Effective date: {POLICY_EFFECTIVE_DATE}.</p>

          <h2>Who this policy covers</h2>
          <p>
            This Cookie Policy explains how {REGISTERED_COMPANY_NAME}
            {isPublicValue(COMPANY_REGISTRATION_NUMBER)
              ? ` (company registration number ${COMPANY_REGISTRATION_NUMBER})`
              : ""}
            , trading as {TRADING_NAME}, uses cookies and similar technologies on this website
            {isPublicValue(PHYSICAL_ADDRESS) ? <> at {PHYSICAL_ADDRESS}</> : null}.
          </p>

          <h2>Essential operation</h2>
          <p>
            This site is primarily a static marketing website. It may use strictly necessary browser storage for
            security, form anti-spam, preference, or hosting operations. These technologies are used to make core
            features work.
          </p>

          <h2>Analytics</h2>
          {isPublicValue(ANALYTICS_ID) ? (
            <p>
              Analytics is configured for this deployment. Non-essential analytics cookies or similar technologies will
              only run after the required consent where consent is needed. Analytics is configured not to send names,
              email addresses, phone numbers, message contents, or other enquiry personal information.
            </p>
          ) : (
            <p>
              No third-party analytics identifier is currently configured for this website. Non-essential tracking is
              not used. If analytics is added later, it will be documented here and will not run before required
              consent.
            </p>
          )}

          <h2>Managing cookies</h2>
          <p>
            You can control cookies through your browser settings. Blocking some cookies may affect optional features
            once they are introduced.
          </p>

          <p className="legal__note">
            This policy describes current website behaviour and remains subject to owner review before production launch.
            It does not claim that a lawyer has reviewed or certified this page.
          </p>
        </div>
      </article>
    </SiteChrome>
  );
}
