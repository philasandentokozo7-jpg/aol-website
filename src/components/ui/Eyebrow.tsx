import type { HTMLAttributes, ReactNode } from "react";

export interface EyebrowProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  tone?: "gold" | "blue" | "onDark";
  tick?: boolean;
  center?: boolean;
}

/** Eyebrow — small uppercase kicker with a short gold tick, sits above section titles. */
export function Eyebrow({ children, tone = "gold", tick = true, center = false, className = "", ...rest }: EyebrowProps) {
  const cls = [
    "aol-eyebrow",
    tone === "blue" ? "aol-eyebrow--blue" : "",
    tone === "onDark" ? "aol-eyebrow--onDark" : "",
    center ? "aol-eyebrow--center" : "",
    tick ? "" : "aol-eyebrow--plain",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <span className={cls} {...rest}>
      <span className="aol-eyebrow__tick" aria-hidden="true" />
      {children}
    </span>
  );
}
