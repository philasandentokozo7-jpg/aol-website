import type { ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

export interface ServiceCardProps {
  icon?: IconName;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  href?: string;
  linkLabel?: string;
  className?: string;
}

/** ServiceCard — icon + title + description tile for the Services grid. */
export function ServiceCard({
  icon = "calculator",
  title,
  description,
  children,
  href = "#services",
  linkLabel = "Learn more",
  className = "",
}: ServiceCardProps) {
  const inner = (
    <>
      <span className="aol-servicecard__ico">
        <Icon name={icon} size={24} />
      </span>
      <h3 className="aol-servicecard__title">{title}</h3>
      <p className="aol-servicecard__desc">{description || children}</p>
      {linkLabel && (
        <span className="aol-servicecard__link">
          {linkLabel}
          <Icon name="arrow-right" size={15} stroke={2.2} />
        </span>
      )}
    </>
  );
  const cls = `aol-servicecard ${className}`.trim();
  return href ? (
    <a className={cls} href={href}>
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  );
}
