import { Icon, type IconName } from "../ui/Icon";
import { PricingCard } from "../ui/PricingCard";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../interactive/Reveal";

interface Plan {
  tier: string;
  price: string;
  icon: IconName;
  description: string;
  features: string[];
  featured?: boolean;
  badge?: string;
}

const PLANS: Plan[] = [
  {
    tier: "Foundation",
    price: "R2,300",
    icon: "layers",
    description:
      "A strong financial foundation — for start-ups, sole proprietors and small businesses with lower transaction volumes.",
    features: [
      "Daily / weekly / monthly bookkeeping",
      "Bank reconciliation (1 account)",
      "Accounts payable & receivable",
      "General ledger & trial balance",
      "Cloud bookkeeping on Xero",
      "Monthly financial summary",
      "Email & WhatsApp support",
    ],
  },
  {
    tier: "Growth",
    price: "R4,500",
    icon: "trending-up",
    featured: true,
    badge: "Most Popular",
    description: "Deeper insight and stronger control for expanding SMEs (≈100–500 monthly transactions).",
    features: [
      "Everything in Foundation",
      "Multiple bank reconciliations",
      "Inventory & fixed-asset register",
      "AR / AP ageing reports",
      "Monthly management reports",
      "Month-end review meeting",
      "Priority client support",
    ],
  },
  {
    tier: "Professional",
    price: "R7,500",
    icon: "briefcase",
    description: "Comprehensive management for established businesses (≈500–1,500 monthly transactions).",
    features: [
      "Everything in Growth",
      "Monthly financial analysis",
      "Budget monitoring & cash-flow reporting",
      "Management accounting & KPI reporting",
      "Quarterly review meetings",
      "Dedicated account manager",
      "Business performance recommendations",
    ],
  },
];

const ADDONS = [
  "Payroll Administration",
  "VAT Registration & Returns",
  "Income Tax Services",
  "Annual Financial Statements",
  "Independent Reviews",
  "CIPC Services",
  "Xero Setup & Migration",
  "Xero Training",
  "Business Advisory",
  "Cash-Flow Forecasting",
  "Accounting Training",
];

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
          {PLANS.map((p, i) => (
            <Reveal key={p.tier} delay={String(i + 1)} style={{ display: "flex", minWidth: 0 }}>
              <div style={{ flex: 1, display: "flex", minWidth: 0 }}>
                <PricingCard {...p} period="per month" cta={`Choose ${p.tier}`} ctaHref="/#contact" />
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
            {ADDONS.map((a) => (
              <span className="chip" key={a}>
                {a}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal className="pricing__note">
          <span className="oneoff">
            <Icon name="file-check-2" size={18} color="var(--brand-primary)" />
            Once-off professional services from R450
          </span>
          <span className="fine">Final pricing depends on your business requirements and transaction volume.</span>
        </Reveal>
      </div>
    </section>
  );
}
