import type { MetadataRoute } from "next";
import { INDEXING_ENABLED, OFFICIAL_SITE_URL, SITE_URL } from "@/config/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = INDEXING_ENABLED ? OFFICIAL_SITE_URL : SITE_URL;
  const routes = ["", "/services", "/privacy", "/cookies", "/terms", "/thank-you"];

  // Staging builds still emit a file for local QA, but robots disallow all indexing.
  return routes.map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "monthly" : "yearly",
    priority: path === "" ? 1 : 0.6,
  }));
}
