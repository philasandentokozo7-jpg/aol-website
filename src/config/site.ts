/**
 * Central configuration for AOL Accounting Academy SA.
 * Nullable / env-controlled values must not be rendered when empty or placeholder.
 */

function env(name: string): string | undefined {
  const v = process.env[name];
  if (v == null) return undefined;
  const t = v.trim();
  return t.length ? t : undefined;
}

function envBool(name: string, fallback: boolean): boolean {
  const v = env(name);
  if (v == null) return fallback;
  return ["1", "true", "yes", "on"].includes(v.toLowerCase());
}

/** staging | production — default staging until official domain launch is confirmed. */
export const SITE_MODE = (env("NEXT_PUBLIC_SITE_MODE") ?? "staging") as "staging" | "production";

export const IS_PRODUCTION = SITE_MODE === "production";

/** Indexing only when explicitly enabled in production mode. */
export const INDEXING_ENABLED = IS_PRODUCTION && envBool("NEXT_PUBLIC_INDEXING_ENABLED", false);

/** Official site URL (production). Do not hard-code Netlify as the future canonical. */
export const OFFICIAL_SITE_URL = env("NEXT_PUBLIC_OFFICIAL_SITE_URL") ?? "https://www.aolaccounting.co.za";

/** Staging / preview URL (Netlify or other). Not used as production canonical. */
export const PREVIEW_SITE_URL = env("NEXT_PUBLIC_PREVIEW_SITE_URL") ?? "https://aol-accounting-academy.netlify.app";

/**
 * Active site URL for the current build.
 * Staging builds use the preview URL (or a local override) so canonicals never
 * misrepresent an unfinished custom domain as live.
 */
export const SITE_URL =
  env("NEXT_PUBLIC_SITE_URL") ?? (IS_PRODUCTION ? OFFICIAL_SITE_URL : PREVIEW_SITE_URL);

export const REGISTERED_COMPANY_NAME = env("NEXT_PUBLIC_REGISTERED_COMPANY_NAME") ?? null;
export const TRADING_NAME = env("NEXT_PUBLIC_TRADING_NAME") ?? "AOL Accounting Academy SA";

export const COMPANY_REGISTRATION_NUMBER = env("NEXT_PUBLIC_COMPANY_REGISTRATION_NUMBER") ?? null;
export const VAT_NUMBER = env("NEXT_PUBLIC_VAT_NUMBER") ?? null;
export const VAT_STATUS = env("NEXT_PUBLIC_VAT_STATUS") ?? null;

export const PHYSICAL_ADDRESS =
  env("NEXT_PUBLIC_PHYSICAL_ADDRESS") ??
  "27 Bram Fischer Road, Storage Solutions, 2nd Floor, Room 2-40, Durban, 4001";

export const POSTAL_ADDRESS = env("NEXT_PUBLIC_POSTAL_ADDRESS") ?? null;

export const PHONE_DISPLAY = env("NEXT_PUBLIC_PHONE_DISPLAY") ?? "+27 72 206 7130";
export const PHONE_E164 = env("NEXT_PUBLIC_PHONE_E164") ?? "+27722067130";
export const PHONE_HREF = `tel:${PHONE_E164}`;

export const WHATSAPP_NUMBER = env("NEXT_PUBLIC_WHATSAPP_NUMBER") ?? "27722067130";
export const WHATSAPP_URL = env("NEXT_PUBLIC_WHATSAPP_URL") ?? `https://wa.me/${WHATSAPP_NUMBER}`;

/** Temporary verified contact email (if any). Null until verified. */
export const CONTACT_EMAIL = env("NEXT_PUBLIC_CONTACT_EMAIL") ?? null;

/** Future official domain mailbox — configurable, not rendered until set. */
export const FUTURE_DOMAIN_EMAIL = env("NEXT_PUBLIC_FUTURE_DOMAIN_EMAIL") ?? null;

export const PRIVACY_EMAIL = env("NEXT_PUBLIC_PRIVACY_EMAIL") ?? null;
export const COMPLAINTS_EMAIL = env("NEXT_PUBLIC_COMPLAINTS_EMAIL") ?? null;

export const INFORMATION_OFFICER_NAME = env("NEXT_PUBLIC_INFORMATION_OFFICER_NAME") ?? null;
export const INFORMATION_OFFICER_EMAIL = env("NEXT_PUBLIC_INFORMATION_OFFICER_EMAIL") ?? null;

export const BUSINESS_HOURS = env("NEXT_PUBLIC_BUSINESS_HOURS") ?? "Mon–Fri: 08:00–16:30";

export const SOCIAL_LINKS = {
  linkedin: env("NEXT_PUBLIC_SOCIAL_LINKEDIN") ?? null,
  facebook: env("NEXT_PUBLIC_SOCIAL_FACEBOOK") ?? null,
  instagram: env("NEXT_PUBLIC_SOCIAL_INSTAGRAM") ?? null,
  x: env("NEXT_PUBLIC_SOCIAL_X") ?? null,
} as const;

/** Owner-approved public claim; evidence still required before production indexing. */
export const XERO_CERTIFIED_ADVISORS = envBool("NEXT_PUBLIC_XERO_CERTIFIED", true);

export const ANALYTICS_ID = env("NEXT_PUBLIC_ANALYTICS_ID") ?? null;

/**
 * Formspree (or compatible) endpoint.
 * Leave empty until a real endpoint is configured — the form must not fake success.
 */
export const FORMSPREE_ENDPOINT = env("NEXT_PUBLIC_FORMSPREE_ENDPOINT") ?? "";

export const POLICY_EFFECTIVE_DATE = env("NEXT_PUBLIC_POLICY_EFFECTIVE_DATE") ?? "2026-07-30";

export const BRAND = {
  name: TRADING_NAME,
  shortName: "AOL",
  tagline: "Professional Accounting. Strategic Business Advice. Sustainable Growth.",
  logoFull: "/assets/logo/aol-logo-full.webp",
  logoFullPng: "/assets/logo/aol-logo-full.png",
  logoMark: "/assets/logo/aol-mark.webp",
  logoMarkPng: "/assets/logo/aol-mark.png",
  heroPoster: "/assets/media/aol-hero-poster.webp",
  heroVideo: "/assets/media/aol-hero.mp4",
  officeImage: "/assets/media/aol-office.webp",
} as const;

/** Render helper: skip null/empty/placeholder public values. */
export function isPublicValue(value: string | null | undefined): value is string {
  if (value == null) return false;
  const t = value.trim();
  if (!t) return false;
  const lower = t.toLowerCase();
  if (lower.includes("example.com") || lower.includes("placeholder") || lower === "#" || lower.startsWith("todo")) {
    return false;
  }
  return true;
}

export function publicSocialLinks(): Array<{ label: string; href: string }> {
  const out: Array<{ label: string; href: string }> = [];
  if (isPublicValue(SOCIAL_LINKS.linkedin)) out.push({ label: "LinkedIn", href: SOCIAL_LINKS.linkedin });
  if (isPublicValue(SOCIAL_LINKS.facebook)) out.push({ label: "Facebook", href: SOCIAL_LINKS.facebook });
  if (isPublicValue(SOCIAL_LINKS.instagram)) out.push({ label: "Instagram", href: SOCIAL_LINKS.instagram });
  if (isPublicValue(SOCIAL_LINKS.x)) out.push({ label: "X", href: SOCIAL_LINKS.x });
  return out;
}
