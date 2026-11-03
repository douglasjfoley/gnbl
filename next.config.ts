import type { NextConfig } from "next";

// Old Sports Connect URLs (/Default.aspx?tabid=…) are redirected in middleware.ts.
const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Local images may carry a ?v=<content hash> cache-buster (lib/assets.ts).
    localPatterns: [{ pathname: "/**" }],
  },
};

export default nextConfig;
