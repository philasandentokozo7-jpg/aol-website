import type { Metadata } from "next";
import Link from "next/link";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { BookButton } from "@/components/interactive/BookButton";
import { Reveal } from "@/components/interactive/Reveal";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SERVICES, SERVICES_SECTION_INTRO, servicePath } from "@/content/services";
import { canonicalUrl } from "@/lib/seo";

const TITLE = "Accounting, Tax & Payroll Services in Durban | AOL";
const DESCRIPTION =
  "Explore accounting, bookkeeping, tax, payroll, Xero, CIPC and business advisory services for Durban SMEs and growing South African businesses.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: canonicalUrl("/services/") },
  openGraph: { title: TITLE, description: DESCRIPTION, url: canonicalUrl("/services/") },
};

export default function ServicesPage() {
  return (
    <SiteChrome>
      <section className="section section--white page-hero" aria-labelledby="services-page-heading">
        <div className="container">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Services", path: "/services/" },
            ]}
          />
          <Reveal immediate>
            <SectionHeading
              as="h1"
              id="services-page-heading"
              eyebrow="Our Services"
              title="Accounting, Tax, Payroll & Advisory Services in Durban"
              lead="A practical overview of the accounting and advisory services AOL Accounting Academy SA provides for SMEs and growing organisations — choose a service for fuller detail."
            />
          </Reveal>
          <p className="prose" style={{ marginTop: "1rem", maxWidth: "68ch" }}>
            {SERVICES_SECTION_INTRO}
          </p>
        </div>
      </section>

      <section className="section section--paper2">
        <div className="container">
          <div className="grid grid--services grid--services-detail">
            {SERVICES.map((service, i) => (
              <div key={service.slug} id={service.slug}>
                <Reveal delay={String((i % 3) + 1)}>
                  <ServiceCard
                    icon={service.icon}
                    title={service.title}
                    description={service.description}
                    href={servicePath(service.slug)}
                    linkLabel="Learn more"
                  />
                </Reveal>
              </div>
            ))}
          </div>
          <div className="services__more">
            <BookButton size="lg" iconRight="arrow-right">
              Book a Free Consultation
            </BookButton>
            <Link className="text-link" href="/contact/" style={{ marginLeft: "1rem" }}>
              Or contact us directly
            </Link>
          </div>
        </div>
      </section>
    </SiteChrome>
  );
}
