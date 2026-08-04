/**
 * Central configuration for AOL Accounting Academy SA.
 * Nullable / env-controlled values must not be rendered when empty or placeholder.
 *
 * Privacy: never store or render the director’s personal name, ID number,
 * tax number, residential address, or other private information in public output.
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

/** Official production site URL. Do not hard-code a staging URL as the final canonical. */
export const OFFICIAL_SITE_URL = env("NEXT_PUBLIC_OFFICIAL_SITE_URL") ?? "https://aolaccountants.co.za";

/** Staging / preview URL (Netlify or other). Not used as production canonical. */
export const PREVIEW_SITE_URL = env("NEXT_PUBLIC_PREVIEW_SITE_URL") ?? "https://aol-accounting-academy.netlify.app";

/**
 * Active site URL for the current build.
 * Staging builds use the preview URL (or a local override) so canonicals never
 * misrepresent an unfinished custom domain as live.
 */
export const SITE_URL =
  env("NEXT_PUBLIC_SITE_URL") ?? (IS_PRODUCTION ? OFFICIAL_SITE_URL : PREVIEW_SITE_URL);

export const REGISTERED_COMPANY_NAME = env("NEXT_PUBLIC_REGISTERED_COMPANY_NAME") ?? "AOL Accounting Academy SA";
export const TRADING_NAME = env("NEXT_PUBLIC_TRADING_NAME") ?? "AOL Accounting Academy SA";

export const COMPANY_REGISTRATION_NUMBER =
  env("NEXT_PUBLIC_COMPANY_REGISTRATION_NUMBER") ?? "2025/645278/07";

/** VAT number/status are optional and not shown publicly unless explicitly set. */
export const VAT_NUMBER = env("NEXT_PUBLIC_VAT_NUMBER") ?? null;
export const VAT_STATUS = env("NEXT_PUBLIC_VAT_STATUS") ?? null;
export const IS_VAT_REGISTERED = envBool("NEXT_PUBLIC_VAT_REGISTERED", false);

/** Approved public website address only. */
export const PHYSICAL_ADDRESS =
  env("NEXT_PUBLIC_PHYSICAL_ADDRESS") ?? "27 Bram Fischer Road, Durban, South Africa";

export const POSTAL_ADDRESS = env("NEXT_PUBLIC_POSTAL_ADDRESS") ?? null;

export const PHONE_DISPLAY = env("NEXT_PUBLIC_PHONE_DISPLAY") ?? "+27 72 206 7130";
export const PHONE_E164 = env("NEXT_PUBLIC_PHONE_E164") ?? "+27722067130";
export const PHONE_HREF = `tel:${PHONE_E164}`;

export const WHATSAPP_NUMBER = env("NEXT_PUBLIC_WHATSAPP_NUMBER") ?? "27722067130";

const DEFAULT_WHATSAPP_MESSAGE =
  "Hello AOL Accounting Academy SA, I would like to enquire about your accounting and business advisory services.";

/** WhatsApp chat URL with a professional prefilled enquiry message. */
export const WHATSAPP_URL =
  env("NEXT_PUBLIC_WHATSAPP_URL") ??
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_WHATSAPP_MESSAGE)}`;

/**
 * Approved public domain email addresses (aolaccountants.co.za).
 * Netlify Forms notifications are configured in the Netlify dashboard to
 * OFFICE_EMAIL — not as a client-side form action or secret env routing var.
 */
export const EMAIL_INFO = "info@aolaccountants.co.za" as const;
export const EMAIL_ACCOUNTS = "accounts@aolaccountants.co.za" as const;
export const EMAIL_PRIVACY = "privacy@aolaccountants.co.za" as const;
export const EMAIL_OFFICE = "office@aolaccountants.co.za" as const;

export const MAILTO_INFO = `mailto:${EMAIL_INFO}` as const;
export const MAILTO_ACCOUNTS = `mailto:${EMAIL_ACCOUNTS}` as const;
export const MAILTO_PRIVACY = `mailto:${EMAIL_PRIVACY}` as const;
export const MAILTO_OFFICE = `mailto:${EMAIL_OFFICE}` as const;

/** Primary public enquiries address (footer / general contact). */
export const CONTACT_EMAIL = env("NEXT_PUBLIC_CONTACT_EMAIL") ?? EMAIL_INFO;

/** Accounts and billing. */
export const ACCOUNTS_EMAIL = env("NEXT_PUBLIC_ACCOUNTS_EMAIL") ?? EMAIL_ACCOUNTS;

/** Privacy, POPIA and Information Officer enquiries. */
export const PRIVACY_EMAIL = env("NEXT_PUBLIC_PRIVACY_EMAIL") ?? EMAIL_PRIVACY;

/** Office contact; also the Netlify Forms notification recipient (dashboard-only). */
export const OFFICE_EMAIL = env("NEXT_PUBLIC_OFFICE_EMAIL") ?? EMAIL_OFFICE;

/** Optional extra mailbox override — not rendered unless set to a public value. */
export const FUTURE_DOMAIN_EMAIL = env("NEXT_PUBLIC_FUTURE_DOMAIN_EMAIL") ?? null;

/** Optional complaints mailbox — not invented; null until explicitly set. */
export const COMPLAINTS_EMAIL = env("NEXT_PUBLIC_COMPLAINTS_EMAIL") ?? null;

/**
 * Public Information Officer designation only — never a personal name.
 * Do not introduce an env var for the director’s personal name.
 */
export const INFORMATION_OFFICER_TITLE =
  env("NEXT_PUBLIC_INFORMATION_OFFICER_TITLE") ?? "Director of AOL Accounting Academy SA";

export const INFORMATION_OFFICER_EMAIL =
  env("NEXT_PUBLIC_INFORMATION_OFFICER_EMAIL") ?? EMAIL_PRIVACY;

export const BUSINESS_HOURS = env("NEXT_PUBLIC_BUSINESS_HOURS") ?? "Mon–Fri: 08:00–16:30";

export const SOCIAL_LINKS = {
  linkedin: env("NEXT_PUBLIC_SOCIAL_LINKEDIN") ?? null,
  facebook: env("NEXT_PUBLIC_SOCIAL_FACEBOOK") ?? null,
  instagram: env("NEXT_PUBLIC_SOCIAL_INSTAGRAM") ?? null,
  x: env("NEXT_PUBLIC_SOCIAL_X") ?? null,
} as const;

/** Confirmed public Xero statement. */
export const XERO_PUBLIC_STATEMENT =
  env("NEXT_PUBLIC_XERO_PUBLIC_STATEMENT") ??
  "AOL Accounting Academy SA has a Xero Certified Advisor. Certification and supporting documentation are available upon request.";

/** Confirmed supporting-document statement. */
export const SUPPORTING_DOCUMENTS_STATEMENT =
  env("NEXT_PUBLIC_SUPPORTING_DOCUMENTS_STATEMENT") ??
  "Company registration, professional certification and supporting documents are available upon request.";

export const ANALYTICS_ID = env("NEXT_PUBLIC_ANALYTICS_ID") ?? null;

export const POLICY_EFFECTIVE_DATE = env("NEXT_PUBLIC_POLICY_EFFECTIVE_DATE") ?? "2026-08-03";

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
