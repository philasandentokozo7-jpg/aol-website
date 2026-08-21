import type { CSSProperties, ReactNode } from "react";

export interface RevealProps {
  children: ReactNode;
  as?: "div" | "section" | "span";
  className?: string;
  delay?: string;
  style?: CSSProperties;
  /** Render already-revealed (CSS animation runs at style load, no JS needed).
      Use for above-the-fold content so LCP isn't gated on hydration. */
  immediate?: boolean;
}

/**
 * Reveal — fades/rises its children in when scrolled into view.
 * Scroll binding is handled by RevealRuntime (re-runs on client navigations).
 */
export function Reveal({ children, as: Tag = "div", className = "", delay, style, immediate = false }: RevealProps) {
  return (
    <Tag className={`reveal ${immediate ? "in " : ""}${className}`.trim()} data-delay={delay} style={style}>
      {children}
    </Tag>
  );
}
