"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

export interface RevealProps {
  children: ReactNode;
  as?: "div" | "section" | "span";
  className?: string;
  delay?: string;
  style?: CSSProperties;
}

/** Reveal — fades/rises its children in when scrolled into view (honours reduced motion). */
export function Reveal({ children, as: Tag = "div", className = "", delay, style }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("in");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref as never} className={`reveal ${className}`.trim()} data-delay={delay} style={style}>
      {children}
    </Tag>
  );
}
