import { ProcessStep } from "../ui/ProcessStep";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../interactive/Reveal";
import type { IconName } from "../ui/Icon";

const STEPS: Array<[number, IconName, string, string]> = [
  [1, "messages-square", "Consultation", "We begin by understanding your business, your challenges and your financial goals."],
  [
    2,
    "settings",
    "Implementation",
    "Our professionals manage your accounting, payroll, taxation and compliance using efficient cloud-based systems.",
  ],
  [
    3,
    "trending-up",
    "Growth & Ongoing Support",
    "Receive reliable financial reports, strategic advice and continuous support to help your business grow with confidence.",
  ],
];

export function Process() {
  return (
    <section id="process" className="section section--white">
      <div className="container">
        <Reveal className="section__head section__head--center">
          <SectionHeading align="center" eyebrow="How We Work" title="A calm, three-step path to <em>better finances</em>" />
        </Reveal>
        <div className="process__grid">
          {STEPS.map(([step, icon, title, desc], i) => (
            <Reveal key={step} delay={String(i + 1)}>
              <ProcessStep step={step} icon={icon} title={title} description={desc} connector={i < STEPS.length - 1} layout="row" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
