import type { MetadataRoute } from "next";
import { INDEXING_ENABLED, OFFICIAL_SITE_URL, SITE_URL } from "@/config/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  if (!INDEXING_ENABLED) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${OFFICIAL_SITE_URL || SITE_URL}/sitemap.xml`,
  };
}
