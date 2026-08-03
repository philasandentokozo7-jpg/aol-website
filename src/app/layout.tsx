import type { Metadata, Viewport } from "next";
import { Manrope, Spectral } from "next/font/google";
import "./globals.css";
import {
  BRAND,
  BUSINESS_HOURS,
  COMPANY_REGISTRATION_NUMBER,
  INDEXING_ENABLED,
  isPublicValue,
  OFFICIAL_SITE_URL,
  PHONE_E164,
  PHYSICAL_ADDRESS,
  SITE_URL,
  TRADING_NAME,
} from "@/config/site";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const spectral = Spectral({
  variable: "--font-spectral",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

function buildJsonLd() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    name: TRADING_NAME,
    legalName: TRADING_NAME,
    description:
      "Modern accounting and business advisory firm providing accounting, taxation, payroll, cloud accounting, and business advisory services for South African businesses.",
    url: SITE_URL,
    image: `${SITE_URL}${BRAND.officeImage}`,
    logo: `${SITE_URL}${BRAND.logoFullPng}`,
    telephone: PHONE_E164,
    areaServed: { "@type": "Country", name: "South Africa" },
    knowsAbout: [
      "Accounting",
      "Bookkeeping",
      "Payroll",
      "Taxation",
      "Financial statements",
      "Management accounting",
      "Business advisory",
      "CIPC services",
      "Cloud accounting",
      "Xero",
      "Cash flow management",
      "Accounting training",
    ],
  };

  if (isPublicValue(COMPANY_REGISTRATION_NUMBER)) {
    data.identifier = COMPANY_REGISTRATION_NUMBER;
  }

  if (isPublicValue(PHYSICAL_ADDRESS)) {
    data.address = {
      "@type": "PostalAddress",
      streetAddress: "27 Bram Fischer Road",
      addressLocality: "Durban",
      addressCountry: "ZA",
    };
  }

  if (isPublicValue(BUSINESS_HOURS)) {
    data.openingHoursSpecification = [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "16:30",
      },
    ];
  }

  return data;
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: INDEXING_ENABLED ? `${OFFICIAL_SITE_URL}/` : `${SITE_URL}/` },
  title: {
    default: `${TRADING_NAME} — Accounting, Tax & Advisory`,
    template: `%s | ${TRADING_NAME}`,
  },
  description:
    "AOL Accounting Academy SA — modern accounting, taxation, payroll, compliance and business advisory for South African SMEs, start-ups and growing companies.",
  icons: { icon: BRAND.logoMarkPng },
  robots: INDEXING_ENABLED
    ? { index: true, follow: true }
    : { index: false, follow: false, googleBot: { index: false, follow: false } },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: TRADING_NAME,
    title: `${TRADING_NAME} — Accounting, Tax & Advisory`,
    description: "Professional Accounting. Strategic Business Advice. Sustainable Growth.",
    images: [{ url: BRAND.heroPoster, width: 1200, height: 630, alt: TRADING_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TRADING_NAME} — Accounting, Tax & Advisory`,
    description: "Professional Accounting. Strategic Business Advice. Sustainable Growth.",
    images: [BRAND.heroPoster],
  },
};

export const viewport: Viewport = {
  themeColor: "#0A1E3A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = buildJsonLd();
  return (
    <html lang="en-ZA" className={`${manrope.variable} ${spectral.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
