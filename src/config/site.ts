// Single source of truth for site-wide configuration.

// Production URL — used for canonical, Open Graph, sitemap and structured data.
export const SITE_URL = "https://www.aolaccounting.co.za";

// Consultation form delivery endpoint (Formspree).
// LEAVE EMPTY until a real Formspree endpoint is provided. While empty, the
// consultation form does NOT pretend to submit — it shows an honest notice and
// points the visitor to WhatsApp instead. Set this to the real
// "https://formspree.io/f/xxxxxxxx" URL when available.
export const FORMSPREE_ENDPOINT = "";

// Business contact — used for the WhatsApp fallback while email is not yet live.
export const WHATSAPP_URL = "https://wa.me/27722067130";
