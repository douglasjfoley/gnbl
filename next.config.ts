import type { NextConfig } from "next";

// Old Sports Connect pages, matched on the tabid query value.
const oldTabs: Record<string, string> = {
  "989811": "/about",
  "989819": "/contact",
  "1010751": "/get-involved",
  "989823": "/get-involved#sponsor",
  "989810": "/about#board",
  "1203470": "/about#board",
  "1183145": "/programs",
  "989815": "/policies",
  "905424": "/register",
  "905422": "/",
};

const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    return ["/Default.aspx", "/default.aspx"].flatMap((source) =>
      Object.entries(oldTabs).map(([tabid, destination]) => ({
        source,
        has: [{ type: "query" as const, key: "tabid", value: tabid }],
        destination,
        permanent: true,
      })),
    );
  },
};

export default nextConfig;
