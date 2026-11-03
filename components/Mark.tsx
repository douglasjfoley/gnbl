import Image from "next/image";
import { findMark, type MarkName } from "@/lib/assets";

const LABEL: Record<MarkName, string> = {
  "gn-crest": "Great Neck Baseball League crest",
  "tridents-crest": "Great Neck Tridents crest",
  "botb-2026": "Battle of the Beach tournament mark",
};

type Props = {
  name: MarkName;
  size: number;
  variant?: "color" | "white";
  className?: string;
  alt?: string;
  priority?: boolean;
};

/**
 * A brand mark from public/brand, preferring SVG over PNG. The Tridents crest
 * and BOTB mark ship as square PNGs on white, so they render on a white disc
 * or tile until transparent SVGs land.
 */
export function Mark({ name, size, variant = "color", className = "", alt, priority }: Props) {
  const src = findMark(name, variant === "white");
  if (!src) return null;
  const isPng = src.endsWith(".png");
  const shape =
    isPng && name === "tridents-crest"
      ? "rounded-full bg-white"
      : isPng && name === "botb-2026"
        ? "rounded-2xl bg-white p-[4%]"
        : "";
  return (
    <span
      className={`relative inline-block shrink-0 overflow-hidden ${shape} ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt ?? LABEL[name]}
        fill
        priority={priority}
        sizes={`${size * 2}px`}
        className="object-contain"
        unoptimized={src.endsWith(".svg")}
      />
    </span>
  );
}
