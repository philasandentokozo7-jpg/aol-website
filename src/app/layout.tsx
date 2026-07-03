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

// TODO: swap for the custom domain once it's pointed at Netlify.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aol-accounting-academy.netlify.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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
      <body>{children}</body>
    </html>
  );
}
