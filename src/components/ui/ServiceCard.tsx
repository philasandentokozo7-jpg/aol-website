import Link from "next/link";
import type { ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

export interface ServiceCardProps {
  icon?: IconName;
  title: ReactNode;
  description?: ReactNode | null;
  children?: ReactNode;
  href?: string | null;
  linkLabel?: string | null;
  className?: string;
  titleOnly?: boolean;
}

/** ServiceCard — icon + title + description tile for the Services grid. */
export function ServiceCard({
  icon = "calculator",
  title,
  description,
  children,
  href = null,
  linkLabel = null,
  className = "",
  titleOnly = false,
}: ServiceCardProps) {
  const body = description || children;
  const cls = `aol-servicecard ${titleOnly ? "aol-servicecard--titleOnly" : ""} ${className}`.trim();
  const inner = (
    <>
      <span className="aol-servicecard__ico" aria-hidden="true">
        <Icon name={icon} size={24} />
      </span>
      <h3 className="aol-servicecard__title">{title}</h3>
      {body ? <p className="aol-servicecard__desc">{body}</p> : null}
      {linkLabel ? (
        <span className="aol-servicecard__link">
          {linkLabel}
          <Icon name="arrow-right" size={15} stroke={2.2} />
        </span>
      ) : null}
    </>
  );

  if (href) {
    return (
      <Link className={cls} href={href}>
        {inner}
      </Link>
    );
  }

  return (
    <article className={cls} aria-label={typeof title === "string" ? title : undefined}>
      {inner}
    </article>
  );
}
