import type { ReactNode } from "react";
import { Icon } from "./Icon";

export interface ArticleCardProps {
  image?: string;
  alt?: string;
  category?: string;
  title: ReactNode;
  date?: string;
  readTime?: string;
  href?: string;
  className?: string;
}

/** ArticleCard — insight/blog card with cover image. */
export function ArticleCard({ image, alt = "", category = "Insight", title, date, readTime, href = "#insights", className = "" }: ArticleCardProps) {
  return (
    <a className={`aol-articlecard ${className}`.trim()} href={href}>
      <div className="aol-articlecard__media">
        <span className="aol-articlecard__cat">{category}</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {image && <img src={image} alt={alt} loading="lazy" />}
      </div>
      <div className="aol-articlecard__body">
        <h3 className="aol-articlecard__title">{title}</h3>
        <div className="aol-articlecard__meta">
          {date && (
            <span>
              <Icon name="calendar" size={14} />
              {date}
            </span>
          )}
          {readTime && (
            <span>
              <Icon name="clock" size={14} />
              {readTime}
            </span>
          )}
          <span className="aol-articlecard__more">
            Read
            <Icon name="arrow-right" size={14} stroke={2.2} />
          </span>
        </div>
      </div>
    </a>
  );
}
