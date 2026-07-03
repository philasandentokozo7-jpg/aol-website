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
 * Server component: the scroll-in behaviour is driven by the tiny inline
 * IntersectionObserver script in page.tsx (see REVEAL_SCRIPT), so these
 * wrappers don't hydrate. Honours prefers-reduced-motion.
 */
export function Reveal({ children, as: Tag = "div", className = "", delay, style, immediate = false }: RevealProps) {
  return (
    <Tag className={`reveal ${immediate ? "in " : ""}${className}`.trim()} data-delay={delay} style={style}>
      {children}
    </Tag>
  );
}

/** Inline, hydration-free reveal-on-scroll (mirrors the prototype's Reveal/site-lib.jsx). */
export const REVEAL_SCRIPT = `
(function () {
  var els = document.querySelectorAll('.reveal:not(.in)');
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  els.forEach(function (el) { io.observe(el); });
})();
`;
