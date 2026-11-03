import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import siteJson from "@/content/data/site.json";
import pathwayJson from "@/content/data/pathway.json";
import divisionsJson from "@/content/data/divisions.json";
import boardJson from "@/content/data/board.json";
import sponsorsJson from "@/content/data/sponsors.json";
import datesJson from "@/content/data/dates.json";
import facilitiesJson from "@/content/data/facilities.json";
import tridentsJson from "@/content/data/tridents.json";

import type {
  BoardMember,
  Dates,
  Division,
  Facilities,
  PathwayStep,
  Post,
  PostMeta,
  Site,
  Sponsors,
  Tridents,
} from "./types";

export const getSite = () => siteJson as Site;
export const getPathway = () => pathwayJson as PathwayStep[];
export const getDivisions = () => divisionsJson as Division[];
/** The eight age divisions, Fawn to Palomino (Champions excluded). */
export const getAgeDivisions = () => getDivisions().filter((d) => d.id !== "champions");
export const getBoard = () => boardJson as BoardMember[];
export const getSponsors = () => sponsorsJson as Sponsors;
export const getDates = () => datesJson as Dates;
export const getFacilities = () => facilitiesJson as Facilities;
export const getTridents = () => tridentsJson as Tridents;

const NEWS_DIR = path.join(process.cwd(), "content", "news");

function readPost(file: string): Post {
  const raw = fs.readFileSync(path.join(NEWS_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const date =
    data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? "");
  return {
    slug: file.replace(/\.mdx?$/, ""),
    title: String(data.title ?? ""),
    date,
    excerpt: String(data.excerpt ?? ""),
    image: String(data.image ?? ""),
    body: content,
  };
}

/** Every post in content/news, newest first. */
export function getPosts(): PostMeta[] {
  if (!fs.existsSync(NEWS_DIR)) return [];
  return fs
    .readdirSync(NEWS_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(readPost)
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(({ body: _body, ...meta }) => meta);
}

export function getPost(slug: string): Post | null {
  for (const ext of [".mdx", ".md"]) {
    if (fs.existsSync(path.join(NEWS_DIR, slug + ext))) return readPost(slug + ext);
  }
  return null;
}
