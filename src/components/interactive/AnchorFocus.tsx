"use client";

import { useEffect } from "react";

/**
 * Moves keyboard focus to hash targets (e.g. /#insights) after navigation/load,
 * without trapping focus. Respects fixed-header scroll-margin via CSS.
 */
export function AnchorFocus() {
  useEffect(() => {
    const focusHash = () => {
      const id = window.location.hash.replace(/^#/, "");
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
      el.focus({ preventScroll: true });
    };

    focusHash();
    window.addEventListener("hashchange", focusHash);
    return () => window.removeEventListener("hashchange", focusHash);
  }, []);

  return null;
}
