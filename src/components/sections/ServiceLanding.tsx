import Link from "next/link";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { BookButton } from "@/components/interactive/BookButton";
import { Reveal } from "@/components/interactive/Reveal";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { relatedServices, type ServiceItem, servicePath } from "@/content/services";
import { TRADING_NAME } from "@/config/site";
import { canonicalUrl } from "@/lib/seo";

export function ServiceLanding({ service }: { service: ServiceItem }) {
  const related = relatedServices(service.slug);
  const pageUrl = canonicalUrl(servicePath(service.slug));

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    url: pageUrl,
    provider: {
      "@type": "AccountingService",
      "@id": `${canonicalUrl("/")}#business`,
      name: TRADING_NAME,
    },
    areaServed: [
      { "@type": "City", name: "Durban" },
      { "@type": "Country", name: "South Africa" },
    ],
  };

  return (
    <SiteChrome>
      <JsonLd data={serviceLd} />
      <article className="section section--white page-hero">
        <div className="container legal__inner page-content">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Services", path: "/services/" },
              { name: service.title, path: servicePath(service.slug) },
            ]}
          />
          <Reveal immediate>
            <SectionHeading
              as="h1"
              id={`${service.slug}-heading`}
              eyebrow="Service"
              title={service.title}
              lead={`Professional ${service.title.toLowerCase()} support from ${TRADING_NAME} for Durban and South African businesses.`}
            />
          </Reveal>
          <div className="prose" style={{ marginTop: "1.5rem" }}>
            <p>{service.description}</p>
          </div>

          <h2 className="page-subheading">How we can help</h2>
          <ul className="page-list">
            {service.helpPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>

          {related.length ? (
            <>
              <h2 className="page-subheading">Related services</h2>
              <ul className="page-link-list">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link href={servicePath(item.slug)}>{item.title}</Link>
                  </li>
                ))}
                <li>
                  <Link href="/services/">View all services</Link>
                </li>
              </ul>
            </>
          ) : null}

          <div className="page-cta-row">
            <BookButton size="lg" iconRight="arrow-right">
              Book a Free Consultation
            </BookButton>
            <Button href="/contact/" size="lg" variant="outline">
              Contact us
            </Button>
          </div>
        </div>
      </article>
    </SiteChrome>
  );
}
