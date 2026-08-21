import { SERVICES } from "@/content/services";
import { INDEXING_ENABLED, OFFICIAL_SITE_URL, SITE_URL } from "@/config/site";

/** Absolute site origin for the current build context. */
export function canonicalOrigin(): string {
  return INDEXING_ENABLED ? OFFICIAL_SITE_URL.replace(/\/$/, "") : SITE_URL.replace(/\/$/, "");
}

/** Absolute canonical URL for a path that already includes a trailing slash (or is "/"). */
export function canonicalUrl(path = "/"): string {
  const origin = canonicalOrigin();
  if (!path || path === "/") return `${origin}/`;
  const normalised = path.endsWith("/") ? path : `${path}/`;
  return `${origin}${normalised.startsWith("/") ? normalised : `/${normalised}`}`;
}

/** Indexable marketing routes for sitemap (trailing-slash paths). */
export const SITEMAP_ROUTES: Array<{ path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }> =
  [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/about/", priority: 0.8, changeFrequency: "monthly" },
    { path: "/contact/", priority: 0.9, changeFrequency: "monthly" },
    { path: "/services/", priority: 0.9, changeFrequency: "monthly" },
    ...SERVICES.map((s) => ({
      path: `/services/${s.slug}/`,
      priority: 0.8,
      changeFrequency: "monthly" as const,
    })),
    { path: "/industries/", priority: 0.7, changeFrequency: "monthly" },
    { path: "/pricing/", priority: 0.7, changeFrequency: "monthly" },
    { path: "/insights/", priority: 0.6, changeFrequency: "monthly" },
  ];

export const PRIMARY_NAV: Array<[string, string]> = [
  ["Home", "/"],
  ["About", "/about/"],
  ["Services", "/services/"],
  ["Industries", "/industries/"],
  ["Pricing", "/pricing/"],
  ["Insights", "/insights/"],
  ["Contact", "/contact/"],
];
