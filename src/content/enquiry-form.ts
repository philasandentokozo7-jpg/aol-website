/** Shared Netlify Forms identity and field names for detection + submission. */

export const NETLIFY_FORM_NAME = "aol-website-enquiries";

export const ENQUIRY_FIELD_NAMES = [
  "name",
  "business",
  "email",
  "phone",
  "service",
  "message",
  "marketing_consent",
] as const;

export const NETLIFY_HONEYPOT_FIELD = "bot-field";
