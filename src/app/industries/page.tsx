import type { Metadata } from "next";
import Link from "next/link";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IndustryTag } from "@/components/ui/IndustryTag";
import { BookButton } from "@/components/interactive/BookButton";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/interactive/Reveal";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { INDUSTRIES, INDUSTRIES_HEADING, INDUSTRIES_INTRO } from "@/content/industries";
import { canonicalUrl } from "@/lib/seo";

const TITLE = "Industries We Serve in Durban | AOL";
const DESCRIPTION =
  "AOL Accounting Academy SA supports SMEs, start-ups, retail, construction, transport, hospitality, professional services, education and non-profits with accounting and advisory services.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: canonicalUrl("/industries/") },
  openGraph: { title: TITLE, description: DESCRIPTION, url: canonicalUrl("/industries/") },
};

export default function IndustriesPage() {
  return (
    <SiteChrome>
      <article className="section section--white page-hero">
        <div className="container page-content">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Industries", path: "/industries/" },
            ]}
          />
          <Reveal immediate>
            <SectionHeading
              as="h1"
              id="industries-page-heading"
              eyebrow="Industries We Serve"
              title={INDUSTRIES_HEADING}
              lead={INDUSTRIES_INTRO}
            />
          </Reveal>
          <p className="prose" style={{ marginTop: "1.25rem", maxWidth: "68ch" }}>
            Every organisation has different reporting rhythms and compliance pressures. Our collaborative network
            provides accounting, tax, payroll and advisory support shaped around how your industry actually operates —
            without one-size-fits-all claims or invented sector statistics.
          </p>
          <ul className="grid grid--industries" style={{ marginTop: "2rem" }}>
            {INDUSTRIES.map((item, i) => (
              <li key={item.label} className="industry-item">
                <Reveal delay={String((i % 3) + 1)}>
                  <IndustryTag icon={item.icon}>{item.label}</IndustryTag>
                </Reveal>
              </li>
            ))}
          </ul>
          <div className="page-cta-row">
            <BookButton size="lg" iconRight="arrow-right">
              Book a Free Consultation
            </BookButton>
            <Button href="/services/" size="lg" variant="outline">
              View services
            </Button>
            <Link className="text-link" href="/contact/">
              Contact
            </Link>
          </div>
        </div>
      </article>
    </SiteChrome>
  );
}
