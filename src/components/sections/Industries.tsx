import { IndustryTag } from "../ui/IndustryTag";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../interactive/Reveal";
import { Button } from "../ui/Button";
import { INDUSTRIES, INDUSTRIES_HEADING, INDUSTRIES_INTRO } from "@/content/industries";

export function Industries() {
  return (
    <section id="industries" className="section section--navy" aria-labelledby="industries-heading">
      <div className="container">
        <Reveal className="section__head section__head--center">
          <SectionHeading
            id="industries-heading"
            align="center"
            tone="onDark"
            eyebrow="Industries We Serve"
            title={INDUSTRIES_HEADING}
            lead={INDUSTRIES_INTRO}
          />
        </Reveal>
        <ul className="grid grid--industries">
          {INDUSTRIES.map((item, i) => (
            <li key={item.label} className="industry-item">
              <Reveal delay={String((i % 3) + 1)}>
                <IndustryTag icon={item.icon}>{item.label}</IndustryTag>
              </Reveal>
            </li>
          ))}
        </ul>
        <Reveal className="services__more">
          <Button href="/industries/" size="lg" variant="outline" onDark iconRight="arrow-right">
            View industries
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
