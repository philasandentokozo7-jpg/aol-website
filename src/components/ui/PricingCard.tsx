import type { ReactNode } from "react";
import { Icon, type IconName } from "./Icon";
import { Button } from "./Button";

export interface PricingCardProps {
  tier: string;
  price: string;
  period?: string;
  fromLabel?: string;
  description?: ReactNode;
  features?: ReactNode[];
  featured?: boolean;
  badge?: string;
  icon?: IconName;
  cta?: string;
  ctaHref?: string;
  className?: string;
}

/** PricingCard — a tiered pricing plan. `featured` renders the navy "most popular" variant. */
export function PricingCard({
  tier,
  price,
  period = "per month",
  fromLabel = "From",
  description,
  features = [],
  featured = false,
  badge,
  icon = "layers",
  cta = "Get Started",
  ctaHref = "#contact",
  className = "",
}: PricingCardProps) {
  return (
    <div className={`aol-pricing ${featured ? "aol-pricing--featured" : ""} ${className}`.trim()}>
      {badge && <span className="aol-pricing__badge">{badge}</span>}
      <div className="aol-pricing__head">
        <span className="aol-pricing__ico">
          <Icon name={icon} size={21} />
        </span>
        <span className="aol-pricing__tier">{tier}</span>
      </div>
      <div className="aol-pricing__price">
        {fromLabel && <span className="aol-pricing__from">{fromLabel}</span>}
        <span className="aol-pricing__amt">{price}</span>
        {period && <span className="aol-pricing__per">{period}</span>}
      </div>
      {description && <p className="aol-pricing__desc">{description}</p>}
      <hr className="aol-pricing__rule" />
      {features.length > 0 && (
        <ul className="aol-pricing__feats">
          {features.map((f, i) => (
            <li className="aol-pricing__feat" key={i}>
              <Icon name="check" size={18} stroke={2.4} />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="aol-pricing__cta">
        <Button variant={featured ? "primary" : "outline"} block href={ctaHref} iconRight="arrow-right">
          {cta}
        </Button>
      </div>
    </div>
  );
}
