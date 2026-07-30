import { FeatureCard } from "../ui/FeatureCard";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../interactive/Reveal";
import type { IconName } from "../ui/Icon";

const WHY_ITEMS: Array<[IconName, string, string]> = [
  [
    "award",
    "Qualified Professionals",
    "Work with experienced accounting, payroll, taxation, and advisory professionals committed to delivering high-quality financial services.",
  ],
  [
    "cloud",
    "Modern Cloud Technology",
    "Using Xero and other leading cloud accounting solutions, we provide secure, accurate, and real-time financial information.",
  ],
  [
    "sliders-horizontal",
    "Tailored Business Solutions",
    "Every business is unique. Our services are customised to suit your industry, objectives, and stage of growth.",
  ],
  [
    "heart-handshake",
    "Long-Term Partnership",
    "We work alongside our clients, providing continuous support that extends beyond compliance to help them achieve lasting business success.",
  ],
];

export function WhyChoose() {
  return (
    <section id="why" className="section section--paper2" aria-labelledby="why-heading">
      <div className="container">
        <Reveal className="section__head section__head--center">
          <SectionHeading
            id="why-heading"
            align="center"
            eyebrow="Why Choose AOL"
            title="Why Businesses Choose AOL Accounting Academy SA"
            lead="Instead of simply preparing financial records, we help businesses build stronger financial foundations through modern accounting solutions and practical business advice."
          />
        </Reveal>
        <div className="grid grid--4">
          {WHY_ITEMS.map(([icon, title, desc], i) => (
            <Reveal key={title} delay={String(i + 1)}>
              <FeatureCard icon={icon} title={title} description={desc} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
