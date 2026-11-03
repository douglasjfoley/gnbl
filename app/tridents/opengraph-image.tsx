import { ogImage, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Great Neck Tridents";

export default function Image() {
  return ogImage("TRI-V01", "tridents-crest", "#0B1A33", "The highest level of play inside Great Neck.");
}
