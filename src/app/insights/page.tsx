import type { Metadata } from "next";
import Link from "next/link";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BookButton } from "@/components/interactive/BookButton";
import { Reveal } from "@/components/interactive/Reveal";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { INSIGHT_TOPICS, INSIGHTS_INTRO } from "@/content/insights";
import { canonicalUrl } from "@/lib/seo";

const TITLE = "Insights & Resources | AOL Accounting Academy SA";
const DESCRIPTION =
  "Planned insight topics from AOL Accounting Academy SA on cash flow, tax season preparation, Xero cloud accounting and financial tips for growing businesses.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: canonicalUrl("/insights/") },
  openGraph: { title: TITLE, description: DESCRIPTION, url: canonicalUrl("/insights/") },
};

export default function InsightsPage() {
  return (
    <SiteChrome>
      <article className="section section--white page-hero">
        <div className="container legal__inner page-content">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Insights", path: "/insights/" },
            ]}
          />
          <Reveal immediate>
            <SectionHeading
              as="h1"
              id="insights-page-heading"
              eyebrow="Insights"
              title="Insights That Help Your Business Grow"
              lead={INSIGHTS_INTRO}
            />
          </Reveal>

          <ul className="insights-preview" style={{ marginTop: "2rem" }}>
            {INSIGHT_TOPICS.map((topic, i) => (
              <li key={topic.title} className="insights-preview__item">
                <div className="insights-preview__row">
                  <span className="insights-preview__mark" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <span className="insights-preview__title">{topic.title}</span>
                    <p className="insights-preview__blurb">{topic.blurb}</p>
                    <p className="insights-preview__status">Planned resource topic — article not published yet</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="page-cta-row">
            <BookButton size="lg" iconRight="arrow-right">
              Book a Free Consultation
            </BookButton>
            <Link className="text-link" href="/services/">
              Explore services
            </Link>
            <Link className="text-link" href="/contact/">
              Contact
            </Link>
          </div>
        </div>
      </article>
    </SiteChrome>
  );
}
