import Image from "next/image";
import { findImage } from "@/lib/assets";

type Aspect = "16/9" | "4/3" | "1/1" | "2/1" | "fill";

const ASPECT: Record<Exclude<Aspect, "fill">, string> = {
  "16/9": "aspect-[16/9]",
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
  "2/1": "aspect-[2/1]",
};

type Props = {
  /** Shot ID from docs/HIGGSFIELD_SHOT_LIST.md, e.g. "HOME-01". */
  id: string;
  alt: string;
  /** "fill" stretches to the parent (parent must be positioned). */
  aspect?: Aspect;
  priority?: boolean;
  className?: string;
  /** Empty-slot color: navy on dark sections, cream on light. */
  tone?: "cream" | "navy";
  sizes?: string;
};

/**
 * An image slot keyed by shot ID. Renders the file from public/images when it
 * exists; otherwise a flat block in the section's palette. With
 * NEXT_PUBLIC_SHOW_SLOT_IDS=true the empty block carries its shot ID.
 */
export function ImageSlot({
  id,
  alt,
  aspect = "4/3",
  priority,
  className = "",
  tone = "cream",
  sizes = "(max-width: 768px) 100vw, 50vw",
}: Props) {
  const src = findImage(id);
  const box =
    aspect === "fill" ? "absolute inset-0" : `relative w-full ${ASPECT[aspect]}`;
  const fill = tone === "navy" ? "bg-navy-mid" : "bg-surface";
  const showId = process.env.NEXT_PUBLIC_SHOW_SLOT_IDS === "true";

  return (
    <div
      className={`${box} overflow-hidden ${src ? "" : fill} ${className}`}
      data-slot={id}
      data-slot-filled={src ? "true" : "false"}
    >
      {src ? (
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
      ) : (
        <>
          <span className="sr-only">{alt}</span>
          {showId && (
            <span
              className={`absolute top-2 left-2 rounded px-1.5 py-0.5 font-mono text-[11px] tracking-wide ${
                tone === "navy" ? "bg-white/10 text-white/80" : "bg-black/5 text-muted"
              }`}
            >
              {id}
            </span>
          )}
        </>
      )}
    </div>
  );
}
