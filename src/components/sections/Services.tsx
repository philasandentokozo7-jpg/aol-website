import { Button } from "../ui/Button";
import { SectionHeading } from "../ui/SectionHeading";
import { ServiceCard } from "../ui/ServiceCard";
import { Reveal } from "../interactive/Reveal";
import {
  SERVICES,
  SERVICES_SECTION_HEADING,
  SERVICES_SECTION_INTRO,
  SERVICES_VIEW_ALL_LABEL,
  servicePath,
} from "@/content/services";

export function Services() {
  return (
    <section id="services" className="section section--white" aria-labelledby="services-heading">
      <div className="container">
        <Reveal className="section__head section__head--center">
          <SectionHeading
            id="services-heading"
            align="center"
            eyebrow="Our Services"
            title={SERVICES_SECTION_HEADING}
            lead={SERVICES_SECTION_INTRO}
          />
        </Reveal>
        <div className="grid grid--services">
          {SERVICES.map((service, i) => (
            <Reveal key={service.slug} delay={String((i % 4) + 1)}>
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
                href={servicePath(service.slug)}
                linkLabel="Learn more"
              />
            </Reveal>
          ))}
        </div>
        <Reveal className="services__more">
          <Button href="/services/" size="lg" iconRight="arrow-right">
            {SERVICES_VIEW_ALL_LABEL}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
