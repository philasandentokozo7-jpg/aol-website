import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pure static export: every word of copy ships in the HTML (crawler / link-preview safe).
  output: "export",
  images: { unoptimized: true },
  turbopack: { root: __dirname },
  // Inline the stylesheet into the HTML: removes a render-blocking request
  // (worth ~0.5s FCP/LCP on throttled mobile for our single-page site).
  experimental: { inlineCss: true },
};

export default nextConfig;
