"use client";

import { useEffect, useRef } from "react";
import { BRAND } from "@/config/site";

/** The hero's looping brand video with a nudge to satisfy mobile autoplay policies. */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      v.pause();
      return;
    }
    v.muted = true;
    const p = v.play();
    if (p && p.catch) p.catch(() => {});
  }, []);

  return (
    <video
      ref={ref}
      src={BRAND.heroVideo}
      poster={BRAND.heroPoster}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      aria-label="Accounting and advisory work environment for AOL Accounting Academy SA"
    />
  );
}
