import "server-only";
import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { matchesShot } from "./shots";

// Build-time file lookup for shot-ID images, hero videos and brand marks.
// Runs on the server only; pages are static, so a new file is picked up on
// the next build with no code change.

const PUBLIC = path.join(process.cwd(), "public");

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return (fs.readdirSync(dir, { recursive: true }) as string[])
    .map((f) => f.split(path.sep).join("/"))
    .filter((f) => !f.split("/").pop()!.startsWith("."))
    .sort();
}

let imageCache: string[] | null = null;
let videoCache: string[] | null = null;
const images = () => (imageCache ??= walk(path.join(PUBLIC, "images")));
const videos = () => (videoCache ??= walk(path.join(PUBLIC, "video")));

const base = (f: string) => f.split("/").pop()!;

/**
 * public/images/**\/{id}-*.{jpg,jpeg,png,webp,avif} → "/images/…", or null.
 * `{id}-alt-*` spares are skipped; pass "{id}-alt" to get one on purpose.
 */
export function findImage(id: string): string | null {
  const hit = images().find((f) => matchesShot(base(f), id));
  return hit ? `/images/${hit}` : null;
}

export type VideoFiles = {
  mp4: string | null;
  webm: string | null;
  mobile: string | null;
  poster: string | null;
};

/** public/video/**\/{id}.mp4, .webm, -mobile.mp4, -poster.jpg. */
export function findVideo(id: string): VideoFiles {
  const pick = (name: string) => {
    const hit = videos().find((f) => base(f).toLowerCase() === name.toLowerCase());
    return hit ? `/video/${hit}` : null;
  };
  return {
    mp4: pick(`${id}.mp4`),
    webm: pick(`${id}.webm`),
    mobile: pick(`${id}-mobile.mp4`),
    poster: pick(`${id}-poster.jpg`) ?? pick(`${id}-poster.jpeg`) ?? findImage(`${id}-poster`),
  };
}

export type MarkName = "gn-crest" | "tridents-crest" | "botb-2026";
const MARK_DIR: Record<MarkName, string> = {
  "gn-crest": "gnbl",
  "tridents-crest": "tridents",
  "botb-2026": "botb",
};

/** Brand mark, preferring SVG, then PNG; `-white.svg` when white is asked for and exists. */
export function findMark(name: MarkName, white = false): string | null {
  const dir = MARK_DIR[name];
  const candidates = [
    ...(white ? [`${name}-white.svg`] : []),
    `${name}.svg`,
    `${name}.png`,
  ];
  for (const c of candidates) {
    if (fs.existsSync(path.join(PUBLIC, "brand", dir, c))) return `/brand/${dir}/${c}`;
  }
  return null;
}

/** Absolute file path for a public URL path (for OG image compositing). */
export const publicFile = (urlPath: string) => path.join(PUBLIC, urlPath);

const versions = new Map<string, string>();
/**
 * Adds a short content hash (`?v=…`) so replacing a file under the same name
 * (a new logo, a better photo) busts the image-optimizer and CDN caches.
 */
export function versioned(urlPath: string): string {
  let v = versions.get(urlPath);
  if (!v) {
    v = createHash("sha1").update(fs.readFileSync(publicFile(urlPath))).digest("hex").slice(0, 10);
    versions.set(urlPath, v);
  }
  return `${urlPath}?v=${v}`;
}

/** Sponsor logo by slug in public/brand/sponsors/{tier}/. */
export function findSponsorLogo(tier: string, logo: string): string | null {
  if (!logo) return null;
  const p = path.join(PUBLIC, "brand", "sponsors", tier, logo);
  if (fs.existsSync(p)) return `/brand/sponsors/${tier}/${logo}`;
  for (const ext of [".svg", ".png", ".webp", ".jpg"]) {
    if (fs.existsSync(p + ext)) return `/brand/sponsors/${tier}/${logo}${ext}`;
  }
  return null;
}
