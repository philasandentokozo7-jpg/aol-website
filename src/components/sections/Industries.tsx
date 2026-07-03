import { IndustryTag } from "../ui/IndustryTag";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../interactive/Reveal";
import type { IconName } from "../ui/Icon";

const INDUSTRIES: Array<[IconName, string]> = [
  ["building-2", "SMEs"],
  ["rocket", "Start-ups"],
  ["store", "Retail & Wholesale"],
  ["hard-hat", "Construction"],
  ["bus", "Transport & Taxi Industry"],
  ["utensils", "Hospitality"],
  ["briefcase", "Professional Services"],
  ["school", "Educational Institutions"],
  ["heart-handshake", "Non-Profit Organisations"],
];

export function Industries() {
  return (
    <section id="industries" className="section section--navy">
      <div className="container">
        <Reveal className="section__head section__head--center">
          <SectionHeading
            align="center"
            tone="onDark"
            eyebrow="Industries We Serve"
            title="Supporting businesses across <em>diverse industries</em>"
            lead="We proudly provide professional accounting and advisory services to organisations operating in a wide range of industries."
          />
        </Reveal>
        <div className="grid grid--industries">
          {INDUSTRIES.map(([icon, label], i) => (
            <Reveal key={label} delay={String((i % 3) + 1)}>
              <IndustryTag icon={icon}>{label}</IndustryTag>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
