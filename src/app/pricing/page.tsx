import type { Metadata } from "next";
import Link from "next/link";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PricingCard } from "@/components/ui/PricingCard";
import { Icon } from "@/components/ui/Icon";
import { BookButton } from "@/components/interactive/BookButton";
import { Reveal } from "@/components/interactive/Reveal";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import {
  PRICING_ADDONS,
  PRICING_FINE_PRINT,
  PRICING_ONCE_OFF_NOTE,
  PRICING_PLANS,
} from "@/content/pricing";
import { canonicalUrl } from "@/lib/seo";

const TITLE = "Accounting & Bookkeeping Packages | AOL";
const DESCRIPTION =
  "Transparent monthly bookkeeping retainers from AOL Accounting Academy SA, with optional specialist add-ons for payroll, tax, Xero and advisory support.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: canonicalUrl("/pricing/") },
  openGraph: { title: TITLE, description: DESCRIPTION, url: canonicalUrl("/pricing/") },
};

export default function PricingPage() {
  return (
    <SiteChrome>
      <article className="section section--white page-hero">
        <div className="container page-content">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Pricing", path: "/pricing/" },
            ]}
          />
          <Reveal immediate>
            <SectionHeading
              as="h1"
              id="pricing-page-heading"
              align="center"
              eyebrow="Investment"
              title="Accounting & bookkeeping packages, <em>scaled to your business</em>"
              lead="Transparent monthly bookkeeping retainers. Add specialist services as you need them — or ask about once-off help."
            />
          </Reveal>

          <div className="pricing__grid" style={{ marginTop: "2rem" }}>
            {PRICING_PLANS.map((p) => (
              <div key={p.tier} style={{ display: "flex", minWidth: 0 }}>
                <div style={{ flex: 1, display: "flex", minWidth: 0 }}>
                  <PricingCard {...p} period="per month" cta={`Choose ${p.tier}`} ctaHref="/contact/" />
                </div>
              </div>
            ))}
          </div>

          <div className="pricing__addons">
            <div className="pricing__addons-head">
              <span className="k">
                <Icon name="puzzle" size={17} color="var(--brand-primary)" />
                Optional add-ons
              </span>
              <span className="sub">Add to any package based on your business requirements</span>
            </div>
            <div className="pricing__chips">
              {PRICING_ADDONS.map((a) => (
                <span className="chip" key={a}>
                  {a}
                </span>
              ))}
            </div>
          </div>

          <div className="pricing__note">
            <span className="oneoff">
              <Icon name="file-check-2" size={18} color="var(--brand-primary)" />
              {PRICING_ONCE_OFF_NOTE}
            </span>
            <span className="fine">{PRICING_FINE_PRINT}</span>
          </div>

          <div className="page-cta-row" style={{ justifyContent: "center" }}>
            <BookButton size="lg" iconRight="arrow-right">
              Book a Free Consultation
            </BookButton>
            <Link className="text-link" href="/services/">
              Compare services
            </Link>
          </div>
        </div>
      </article>
    </SiteChrome>
  );
}
