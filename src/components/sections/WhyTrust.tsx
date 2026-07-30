import { Icon, type IconName } from "../ui/Icon";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../interactive/Reveal";

const TRUST_POINTS: Array<[IconName, string, string]> = [
  [
    "users",
    "Professional Network",
    "Qualified accountants, tax professionals, payroll specialists, and advisors working together to support your business.",
  ],
  [
    "cloud",
    "Modern Cloud Solutions",
    "Leveraging Xero to provide secure, efficient, and real-time financial management.",
  ],
  ["target", "Client-Focused Approach", "Tailored solutions designed around your business goals."],
  [
    "award",
    "Commitment to Excellence",
    "Delivering reliable service with integrity, professionalism, and continuous improvement.",
  ],
];

export function WhyTrust() {
  return (
    <section id="why-trust" className="section section--white hairline-top" aria-labelledby="trust-heading">
      <div className="container">
        <Reveal className="section__head section__head--center">
          <SectionHeading
            id="trust-heading"
            align="center"
            eyebrow="Why Businesses Trust Us"
            title="Built on Trust. Driven by Results."
            lead="Businesses choose AOL Accounting Academy SA because we combine technical expertise with a genuine commitment to helping our clients succeed."
          />
        </Reveal>
        <div className="trust-grid">
          {TRUST_POINTS.map(([icon, title, desc], i) => (
            <Reveal key={title} delay={String(i + 1)} className="trust-item">
              <span className="trust-item__ic" aria-hidden="true">
                <Icon name={icon} size={22} />
              </span>
              <div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
