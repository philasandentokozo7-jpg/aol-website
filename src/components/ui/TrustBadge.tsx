import type { HTMLAttributes, ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

export interface TrustBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  icon?: IconName;
  children: ReactNode;
  tone?: "blue" | "gold";
  onDark?: boolean;
}

/** TrustBadge — pill with an icon chip + short label (hero trust row). */
export function TrustBadge({ icon = "badge-check", children, tone = "blue", onDark = false, className = "", ...rest }: TrustBadgeProps) {
  const cls = [
    "aol-trustbadge",
    onDark ? "aol-trustbadge--onDark" : "",
    tone === "gold" ? "aol-trustbadge--gold" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <span className={cls} {...rest}>
      <span className="aol-trustbadge__ico">
        <Icon name={icon} size={17} stroke={2.2} />
      </span>
      <span className="aol-trustbadge__label">{children}</span>
    </span>
  );
}
