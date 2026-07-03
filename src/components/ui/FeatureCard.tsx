import type { ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

export interface FeatureCardProps {
  icon?: IconName;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
}

/** FeatureCard — icon medallion + title + copy for the "Why Choose AOL" grid. */
export function FeatureCard({ icon = "shield-check", title, description, children, className = "" }: FeatureCardProps) {
  return (
    <div className={`aol-featurecard ${className}`.trim()}>
      <span className="aol-featurecard__ico">
        <Icon name={icon} size={26} />
      </span>
      <h3 className="aol-featurecard__title">{title}</h3>
      <p className="aol-featurecard__desc">{description || children}</p>
    </div>
  );
}
