import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pure static export: every word of copy ships in the HTML (crawler / link-preview safe).
  output: "export",
  images: { unoptimized: true },
  turbopack: { root: __dirname },
};

export default nextConfig;
