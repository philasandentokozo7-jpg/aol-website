import type { ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

export interface IndustryTagProps {
  icon?: IconName;
  children: ReactNode;
  href?: string;
  className?: string;
}

/** IndustryTag — icon + label chip for the Industries grid. */
export function IndustryTag({ icon = "building-2", children, href, className = "" }: IndustryTagProps) {
  const cls = `aol-industrytag ${href ? "aol-industrytag--link" : ""} ${className}`.trim();
  const inner = (
    <>
      <span className="aol-industrytag__ico">
        <Icon name={icon} size={20} />
      </span>
      <span className="aol-industrytag__label">{children}</span>
    </>
  );
  return href ? (
    <a className={cls} href={href}>
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  );
}
