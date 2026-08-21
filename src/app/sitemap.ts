import type { MetadataRoute } from "next";
import { INDEXING_ENABLED, OFFICIAL_SITE_URL, SITE_URL } from "@/config/site";
import { SITEMAP_ROUTES } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // Staging builds still emit a sitemap file for QA; robots disallow all when indexing is off.
  // Production indexing uses the official domain origin.
  const origin = (INDEXING_ENABLED ? OFFICIAL_SITE_URL : SITE_URL).replace(/\/$/, "");

  return SITEMAP_ROUTES.map((route) => ({
    url: route.path === "/" ? `${origin}/` : `${origin}${route.path}`,
    lastModified: new Date("2026-08-21"),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
