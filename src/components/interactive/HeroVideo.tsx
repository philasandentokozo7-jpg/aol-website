"use client";

import { useEffect, useRef } from "react";

/** The hero's looping brand video with a nudge to satisfy mobile autoplay policies. */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true; // ensure the muted *property* is set (required for autoplay)
    const p = v.play();
    if (p && p.catch) p.catch(() => {});
  }, []);

  return (
    <video
      ref={ref}
      src="/assets/media/aol-hero.mp4"
      poster="/assets/media/aol-hero-poster.webp"
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      aria-label="AOL Accounting Academy — cinematic office loop"
    />
  );
}
