import type { Metadata, Viewport } from "next";
import { Manrope, Spectral } from "next/font/google";
import "./globals.css";

// Self-hosted via next/font: woff2 files are downloaded at build time and
// served from our own origin — no Google Fonts request at runtime.
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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aolaccounting.co.za";

// LocalBusiness structured data — powers the rich Google listing (name, address,
// phone, hours). Emitted as JSON-LD in <head>.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  name: "AOL Accounting Academy SA",
  description:
    "Specialised bookkeeping and advisory services for South African SMEs and taxi businesses — bookkeeping, payroll, financial statements, VAT/PAYE/tax advisory, cash-flow management and business compliance.",
  url: SITE_URL,
  image: `${SITE_URL}/assets/media/aol-office.webp`,
  logo: `${SITE_URL}/assets/logo/aol-logo-full.png`,
  telephone: "+27722067130",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "27 Bram Fischer Road, Storage Solutions, 2nd Floor, Room 2-40",
    addressLocality: "Durban",
    addressRegion: "KwaZulu-Natal",
    postalCode: "4001",
    addressCountry: "ZA",
  },
  areaServed: { "@type": "Country", name: "South Africa" },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "16:30",
    },
  ],
  knowsAbout: [
    "Bookkeeping",
    "Payroll",
    "Financial statements",
    "VAT",
    "PAYE",
    "Tax advisory",
    "Cash flow management",
    "Business compliance",
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  title: "AOL Accounting Academy SA — Accounting, Tax & Advisory",
  description:
    "AOL Accounting Academy SA — modern accounting, taxation, payroll, compliance and business advisory for South African SMEs, start-ups and growing companies. Stay compliant, make informed decisions, and grow with confidence.",
  icons: { icon: "/assets/logo/aol-mark.png" },
  openGraph: {
    type: "website",
    siteName: "AOL Accounting Academy SA",
    title: "AOL Accounting Academy SA — Accounting, Tax & Advisory",
    description:
      "Professional accounting, strategic business advice and sustainable growth for South African SMEs.",
    images: [{ url: "/assets/media/aol-hero-poster.webp" }], // resolved absolute via metadataBase
  },
  twitter: {
    card: "summary_large_image",
    title: "AOL Accounting Academy SA — Accounting, Tax & Advisory",
    description:
      "Professional accounting, strategic business advice and sustainable growth for South African SMEs.",
    images: ["/assets/media/aol-hero-poster.webp"],
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
  return (
    <html lang="en" className={`${manrope.variable} ${spectral.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
