import { ogImage, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Great Neck Baseball League";

export default function Image() {
  return ogImage("HOME-V01", "gn-crest", "#0A162C", "This is where Virginia Beach plays ball.");
}
