import type { Metadata } from "next";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { BookButton } from "@/components/interactive/BookButton";
import { Reveal } from "@/components/interactive/Reveal";
import {
  SERVICES,
  SERVICES_SECTION_HEADING,
  SERVICES_SECTION_INTRO,
} from "@/content/services";
export const metadata: Metadata = {
  title: "Services",
  description: `${SERVICES_SECTION_INTRO}`,
};

export default function ServicesPage() {
  return (
    <SiteChrome>
      <section className="section section--white page-hero" aria-labelledby="services-page-heading">
        <div className="container">
          <Reveal immediate>
            <SectionHeading
              id="services-page-heading"
              eyebrow="Our Services"
              title={SERVICES_SECTION_HEADING}
              lead={SERVICES_SECTION_INTRO}
            />
          </Reveal>
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
                    titleOnly={!service.description}
                  />
                </Reveal>
              </div>
            ))}
          </div>
          <div className="services__more">
            <BookButton size="lg" iconRight="arrow-right">
              Book a Free Consultation
            </BookButton>
          </div>
        </div>
      </section>
    </SiteChrome>
  );
}
