"use client";

import { useEffect, useState } from "react";
import { Icon } from "../ui/Icon";
import { SectionHeading } from "../ui/SectionHeading";

/** Response contract of netlify/functions/google-rating.mts. */
interface GoogleRating {
  available: boolean;
  rating?: number;
  count?: number;
  mapsUrl?: string;
  reviewUrl?: string;
  reviews?: Array<{ author: string; rating: number; text: string; when: string }>;
}

/** 5-star row; each star clips its gold fill individually so 4★ and 4.8★ read exactly. */
function Stars({ value, size = 20 }: { value: number; size?: number }) {
  return (
    <span className="gstars" role="img" aria-label={`Rated ${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => {
        const fill = Math.max(0, Math.min(1, value - (n - 1)));
        return (
          <span key={n} className="gstar" aria-hidden="true">
            <Icon name="star" size={size} />
            {fill > 0 ? (
              <span className="gstar__fill" style={{ width: `${fill * 100}%` }}>
                <Icon name="star" size={size} />
              </span>
            ) : null}
          </span>
        );
      })}
    </span>
  );
}

/**
 * Live Google rating + reviews, fetched from /api/google-rating (Netlify Function).
 *
 * Renders nothing until genuine Google reviews exist — never placeholder ratings.
 * Also hides itself where the function is absent (e.g. `next dev`, GitHub Pages).
 */
export function GoogleReviews() {
  const [data, setData] = useState<GoogleRating | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/google-rating")
      .then((res) => (res.ok ? (res.json() as Promise<GoogleRating>) : null))
      .then((body) => {
        if (!cancelled && body?.available) setData(body);
      })
      .catch(() => {
        /* No function or network failure — stay hidden. */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!data || !data.rating || !data.count) return null;

  return (
    <section id="reviews" className="section section--navy" aria-labelledby="reviews-heading">
      <div className="container">
        <div className="section__head section__head--center">
          <SectionHeading
            id="reviews-heading"
            align="center"
            tone="onDark"
            eyebrow="Google Reviews"
            title="What Our Clients <em>Say</em>"
            lead="Ratings and reviews shown live from our Google Business Profile."
          />
        </div>

        <div className="greviews__summary">
          <Stars value={data.rating} size={24} />
          <p className="greviews__score">
            <strong>{data.rating.toFixed(1)}</strong> out of 5
          </p>
          <p className="greviews__count">
            Based on {data.count} Google review{data.count === 1 ? "" : "s"}
          </p>
        </div>

        {data.reviews && data.reviews.length > 0 ? (
          <ul className="greviews__grid">
            {data.reviews.map((review) => (
              <li key={`${review.author}-${review.when}`} className="greviews__card">
                <Stars value={review.rating} size={16} />
                <blockquote>&ldquo;{review.text}&rdquo;</blockquote>
                <footer>
                  <b>{review.author}</b>
                  {review.when ? <span>{review.when}</span> : null}
                </footer>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="greviews__links">
          {data.mapsUrl ? (
            <a className="text-link text-link--onDark" href={data.mapsUrl} target="_blank" rel="noopener noreferrer">
              See all reviews on Google
            </a>
          ) : null}
          {data.reviewUrl ? (
            <a className="text-link text-link--onDark" href={data.reviewUrl} target="_blank" rel="noopener noreferrer">
              Write a Google review
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
