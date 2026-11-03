import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

const ROUTES = [
  "", "/register", "/programs", "/champions", "/facilities", "/get-involved", "/about", "/policies", "/news", "/contact",
  "/tridents", "/tridents/teams", "/tridents/tryouts", "/tridents/battle-of-the-beach", "/tridents/faq",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...ROUTES.map((r) => ({ url: `${SITE_URL}${r}`, changeFrequency: "weekly" as const, priority: r === "" || r === "/register" ? 1 : 0.7 })),
    ...getPosts().map((p) => ({ url: `${SITE_URL}/news/${p.slug}`, lastModified: p.date, priority: 0.5 })),
  ];
}
