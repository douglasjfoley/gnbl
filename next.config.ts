import type { NextConfig } from "next";

// Old Sports Connect URLs (/Default.aspx?tabid=…) are redirected in middleware.ts.
const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
};

export default nextConfig;
