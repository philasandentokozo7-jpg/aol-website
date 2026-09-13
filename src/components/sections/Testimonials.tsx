import { GoogleReviews } from "../interactive/GoogleReviews";

/**
 * Client voices slot.
 * Shows live, genuine Google reviews via /api/google-rating — never example or
 * placeholder quotations. GoogleReviews renders nothing until real reviews and
 * a rating exist on the Google Business Profile.
 */
export function Testimonials() {
  return <GoogleReviews />;
}
