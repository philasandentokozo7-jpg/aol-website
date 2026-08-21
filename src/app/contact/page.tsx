import type { Metadata } from "next";
import Link from "next/link";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BookButton } from "@/components/interactive/BookButton";
import { Reveal } from "@/components/interactive/Reveal";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Icon } from "@/components/ui/Icon";
import {
  BUSINESS_HOURS,
  CONTACT_EMAIL,
  isPublicValue,
  MAILTO_INFO,
  MAILTO_OFFICE,
  OFFICE_EMAIL,
  PHONE_DISPLAY,
  PHONE_HREF,
  PHYSICAL_ADDRESS,
  TRADING_NAME,
  WHATSAPP_URL,
} from "@/config/site";
import { canonicalUrl } from "@/lib/seo";

const TITLE = "Contact AOL Accountants in Durban | Free Consultation";
const DESCRIPTION =
  "Speak to AOL Accounting Academy SA in Durban about accounting, bookkeeping, tax, payroll, Xero and business advisory support. Book a consultation.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: canonicalUrl("/contact/") },
  openGraph: { title: TITLE, description: DESCRIPTION, url: canonicalUrl("/contact/") },
};

export default function ContactPage() {
  return (
    <SiteChrome>
      <article className="section section--white page-hero">
        <div className="container legal__inner page-content">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Contact", path: "/contact/" },
            ]}
          />
          <Reveal immediate>
            <SectionHeading
              as="h1"
              id="contact-page-heading"
              eyebrow="Contact"
              title="Contact AOL Accounting Academy SA in Durban"
              lead={`Reach ${TRADING_NAME} for accounting, bookkeeping, tax, payroll, Xero and business advisory support.`}
            />
          </Reveal>

          <ul className="contact-details">
            {isPublicValue(PHYSICAL_ADDRESS) ? (
              <li>
                <Icon name="map-pin" size={18} />
                <span>{PHYSICAL_ADDRESS}</span>
              </li>
            ) : null}
            {isPublicValue(PHONE_DISPLAY) ? (
              <li>
                <Icon name="phone" size={18} />
                <span>
                  <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
                </span>
              </li>
            ) : null}
            {isPublicValue(CONTACT_EMAIL) ? (
              <li>
                <Icon name="mail" size={18} />
                <span>
                  Enquiries: <a href={MAILTO_INFO}>{CONTACT_EMAIL}</a>
                </span>
              </li>
            ) : null}
            {isPublicValue(OFFICE_EMAIL) ? (
              <li>
                <Icon name="mail" size={18} />
                <span>
                  Office: <a href={MAILTO_OFFICE}>{OFFICE_EMAIL}</a>
                </span>
              </li>
            ) : null}
            {isPublicValue(WHATSAPP_URL) ? (
              <li>
                <Icon name="message-circle" size={18} />
                <span>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                    WhatsApp chat
                  </a>
                </span>
              </li>
            ) : null}
            {isPublicValue(BUSINESS_HOURS) ? (
              <li>
                <Icon name="clock" size={18} />
                <span>{BUSINESS_HOURS}</span>
              </li>
            ) : null}
          </ul>

          <p className="prose">
            Prefer a structured consultation request? Use the form to tell us about your business. See our{" "}
            <Link href="/privacy/">Privacy Notice</Link> for how enquiry information is handled.
          </p>

          <div className="page-cta-row">
            <BookButton size="lg" iconRight="arrow-right">
              Book a Free Consultation
            </BookButton>
            <Link className="text-link" href="/services/">
              Browse services
            </Link>
          </div>
        </div>
      </article>
    </SiteChrome>
  );
}
