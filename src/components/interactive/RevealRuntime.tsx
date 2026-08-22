"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Re-bind reveal-on-scroll after client navigations.
 * Content stays visible by default; JS opts into hide-until-in-view.
 */
export function initReveals(root: ParentNode = document) {
  document.documentElement.classList.add("reveal-ready");

  const els = Array.from(root.querySelectorAll<HTMLElement>(".reveal:not(.in)"));
  if (!els.length) return;

  const revealAll = () => {
    els.forEach((el) => el.classList.add("in"));
  };

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    revealAll();
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.01, rootMargin: "0px 0px 20% 0px" }
  );

  els.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight * 1.15 && rect.bottom > 0;
    if (inView) el.classList.add("in");
    else io.observe(el);
  });

  window.setTimeout(() => {
    document.querySelectorAll<HTMLElement>(".reveal:not(.in)").forEach((el) => el.classList.add("in"));
    io.disconnect();
  }, 1500);
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
    var els = document.querySelectorAll('.reveal:not(.in)');
    if (!els.length) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.01, rootMargin: '0px 0px 20% 0px' });
    els.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < innerHeight * 1.15 && r.bottom > 0) el.classList.add('in');
      else io.observe(el);
    });
    setTimeout(function () {
      document.querySelectorAll('.reveal:not(.in)').forEach(function (el) { el.classList.add('in'); });
      io.disconnect();
    }, 1500);
  } catch (e) {}
})();
`;
