import type { Metadata } from "next";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { ANALYTICS_ID, isPublicValue, POLICY_EFFECTIVE_DATE, TRADING_NAME } from "@/config/site";

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

          <h2>What this policy covers</h2>
          <p>
            This Cookie Policy explains how {TRADING_NAME} uses cookies and similar technologies on this website.
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
              No third-party analytics identifier is currently configured for this website. If analytics is added later,
              it will be documented here and will not run before required consent.
            </p>
          )}

          <h2>Managing cookies</h2>
          <p>
            You can control cookies through your browser settings. Blocking some cookies may affect optional features
            once they are introduced.
          </p>

          <p className="legal__note">
            This policy describes current website behaviour and is pending owner/legal approval before production launch.
          </p>
        </div>
      </article>
    </SiteChrome>
  );
}
