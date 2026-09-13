import type { Config } from "@netlify/functions";

/**
 * Live Google rating/reviews for the site (server-side proxy).
 *
 * Keeps the Places API key out of the browser and caches responses on the CDN
 * so Google is queried at most a few times a day. The client hides the reviews
 * section whenever `available` is false, so this endpoint never causes fake or
 * empty rating UI: no key, no reviews, or an upstream error all degrade to
 * "render nothing" (matching the site's no-placeholder-content policy).
 *
 * Environment (set in the Netlify dashboard — never committed):
 * - GOOGLE_PLACES_API_KEY  required; Places API (New) enabled key
 * - GOOGLE_PLACE_ID        optional; skips the text-search lookup when set
 * - GOOGLE_PLACES_QUERY    optional; lookup query override
 * - GOOGLE_PLACES_API_BASE optional; test seam, defaults to the real API
 */

const API_BASE = () => Netlify.env.get("GOOGLE_PLACES_API_BASE") ?? "https://places.googleapis.com/v1";

const DEFAULT_QUERY = "AOL Accountants, 27 Bram Fischer Road, Durban, South Africa";

/** Public review shape consumed by src/components/interactive/GoogleReviews.tsx. */
interface PublicReview {
  author: string;
  rating: number;
  text: string;
  when: string;
}

interface PublicRating {
  available: boolean;
  rating?: number;
  count?: number;
  mapsUrl?: string;
  reviewUrl?: string;
  reviews?: PublicReview[];
}

interface PlaceDetails {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  writeAReviewUri?: string;
  reviews?: Array<{
    rating?: number;
    relativePublishTimeDescription?: string;
    text?: { text?: string };
    authorAttribution?: { displayName?: string };
  }>;
}

function json(body: PublicRating, cacheSeconds: number): Response {
  return new Response(JSON.stringify(body), {
    headers: {
      "Content-Type": "application/json",
      // Browser cache kept short; CDN (durable) cache absorbs traffic between refreshes.
      "Cache-Control": "public, max-age=300",
      "Netlify-CDN-Cache-Control": `public, durable, s-maxage=${cacheSeconds}, stale-while-revalidate=86400`,
    },
  });
}

const UNAVAILABLE = (cacheSeconds: number) => json({ available: false }, cacheSeconds);

async function resolvePlaceId(apiKey: string): Promise<string | null> {
  const configured = Netlify.env.get("GOOGLE_PLACE_ID");
  if (configured) return configured;

  const res = await fetch(`${API_BASE()}/places:searchText`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "places.id",
    },
    body: JSON.stringify({ textQuery: Netlify.env.get("GOOGLE_PLACES_QUERY") ?? DEFAULT_QUERY }),
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { places?: Array<{ id?: string }> };
  return data.places?.[0]?.id ?? null;
}

const googleRating = async (): Promise<Response> => {
  const apiKey = Netlify.env.get("GOOGLE_PLACES_API_KEY");
  if (!apiKey) return UNAVAILABLE(3600);

  try {
    const placeId = await resolvePlaceId(apiKey);
    if (!placeId) return UNAVAILABLE(3600);

    const res = await fetch(`${API_BASE()}/places/${encodeURIComponent(placeId)}`, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri,writeAReviewUri,reviews",
      },
    });
    if (!res.ok) {
      console.error("google-rating: place details failed", res.status, await res.text());
      return UNAVAILABLE(3600);
    }

    const place = (await res.json()) as PlaceDetails;
    if (!place.rating || !place.userRatingCount) return UNAVAILABLE(3600);

    const reviews: PublicReview[] = (place.reviews ?? [])
      .filter((r) => Boolean(r.text?.text) && typeof r.rating === "number")
      .slice(0, 3)
      .map((r) => ({
        author: r.authorAttribution?.displayName ?? "Google user",
        rating: r.rating as number,
        text: r.text?.text as string,
        when: r.relativePublishTimeDescription ?? "",
      }));

    return json(
      {
        available: true,
        rating: Math.round(place.rating * 10) / 10,
        count: place.userRatingCount,
        mapsUrl: place.googleMapsUri,
        reviewUrl: place.writeAReviewUri,
        reviews,
      },
      21600
    );
  } catch (err) {
    console.error("google-rating: unexpected error", err);
    return UNAVAILABLE(3600);
  }
};

export default googleRating;

export const config: Config = {
  // Both forms: the site is built with trailingSlash: true, so some user agents
  // and helpers normalise fetch URLs to the slashed variant.
  path: ["/api/google-rating", "/api/google-rating/"],
  method: "GET",
};
