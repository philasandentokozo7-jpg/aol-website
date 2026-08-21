import { Icon } from "../ui/Icon";
import { PricingCard } from "../ui/PricingCard";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../interactive/Reveal";
import { Button } from "../ui/Button";
import {
  PRICING_ADDONS,
  PRICING_FINE_PRINT,
  PRICING_ONCE_OFF_NOTE,
  PRICING_PLANS,
} from "@/content/pricing";

export function Pricing() {
  return (
    <section id="pricing" className="section section--paper2">
      <div className="container">
        <Reveal className="section__head section__head--center">
          <SectionHeading
            align="center"
            eyebrow="Investment"
            title="Accounting & bookkeeping packages, <em>scaled to your business</em>"
            lead="Transparent monthly bookkeeping retainers. Add specialist services as you need them — or ask about once-off help."
          />
        </Reveal>
        <div className="pricing__grid">
          {PRICING_PLANS.map((p, i) => (
            <Reveal key={p.tier} delay={String(i + 1)} style={{ display: "flex", minWidth: 0 }}>
              <div style={{ flex: 1, display: "flex", minWidth: 0 }}>
                <PricingCard {...p} period="per month" cta={`Choose ${p.tier}`} ctaHref="/contact/" />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="pricing__addons">
          <div className="pricing__addons-head">
            <span className="k">
              <Icon name="puzzle" size={17} color="var(--brand-primary)" />
              Optional add-ons
            </span>
            <span className="sub">Add to any package based on your business requirements</span>
          </div>
          <div className="pricing__chips">
            {PRICING_ADDONS.map((a) => (
              <span className="chip" key={a}>
                {a}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal className="pricing__note">
          <span className="oneoff">
            <Icon name="file-check-2" size={18} color="var(--brand-primary)" />
            {PRICING_ONCE_OFF_NOTE}
          </span>
          <span className="fine">{PRICING_FINE_PRINT}</span>
        </Reveal>

        <Reveal className="services__more">
          <Button href="/pricing/" size="lg" variant="outline" iconRight="arrow-right">
            Full pricing details
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
