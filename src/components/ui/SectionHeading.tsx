import type { ElementType, ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";

export interface SectionHeadingProps {
  eyebrow?: ReactNode;
  /** Title copy; strings may contain <br> and <em> (accent word) per the design. */
  title?: string | ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "onDark";
  as?: ElementType;
  eyebrowTone?: "gold" | "blue" | "onDark";
  className?: string;
}

/** SectionHeading — eyebrow + editorial serif title + optional lead paragraph. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "light",
  as: Tag = "h2",
  eyebrowTone,
  className = "",
}: SectionHeadingProps) {
  const center = align === "center";
  const cls = [
    "aol-secheading",
    center ? "aol-secheading--center" : "",
    tone === "onDark" ? "aol-secheading--onDark" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const ebTone = eyebrowTone || (tone === "onDark" ? "onDark" : "gold");
  return (
    <div className={cls}>
      {eyebrow && (
        <Eyebrow tone={ebTone} center={center}>
          {eyebrow}
        </Eyebrow>
      )}
      {title != null &&
        (typeof title === "string" ? (
          <Tag className="aol-secheading__title" dangerouslySetInnerHTML={{ __html: title }} />
        ) : (
          <Tag className="aol-secheading__title">{title}</Tag>
        ))}
      {lead && <p className="aol-secheading__lead">{lead}</p>}
    </div>
  );
}
