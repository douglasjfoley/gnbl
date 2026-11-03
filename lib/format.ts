import { parseISODate } from "./leagueAge";

/** "3-4" → "3–4" (en dash for ranges). */
export const range = (s: string) => s.replace(/(\d)-(\d)/g, "$1–$2");

/** "2026-11-10" → "Nov 10, 2026"; blank → fallback. */
export function longDate(iso: string, fallback = "To be announced"): string {
  if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso || fallback;
  return parseISODate(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export const mapsUrl = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

/** "2027-04-30" → "April 30, 2027". */
export function fullDate(iso: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso;
  return parseISODate(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}
