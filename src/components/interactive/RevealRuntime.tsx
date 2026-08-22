"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Mark reveals as ready and ensure every .reveal has .in (content never hidden). */
export function initReveals(root: ParentNode = document) {
  document.documentElement.classList.add("reveal-ready");
  root.querySelectorAll<HTMLElement>(".reveal:not(.in)").forEach((el) => el.classList.add("in"));
}

export function RevealRuntime() {
  const pathname = usePathname();

  useEffect(() => {
    const id = window.requestAnimationFrame(() => initReveals());
    return () => window.cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}

/** Inline boot for first paint before React hydrates. */
export const REVEAL_SCRIPT = `
(function () {
  try {
    document.documentElement.classList.add('reveal-ready');
    document.querySelectorAll('.reveal:not(.in)').forEach(function (el) { el.classList.add('in'); });
  } catch (e) {}
})();
`;
