import Image from "next/image";
import type { ReactNode } from "react";
import { findImage, versioned } from "@/lib/assets";

type Aspect = "16/9" | "4/3" | "1/1" | "2/1" | "3/2" | "fill";

const ASPECT: Record<Exclude<Aspect, "fill">, string> = {
  "16/9": "aspect-[16/9]",
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
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
  /** Empty-slot treatment: a navy brand panel (default) or a cream field. */
  tone?: "navy" | "cream";
  sizes?: string;
  /** Another shot ID (e.g. "HOME-01-alt") used only when `id` has no file. */
  fallback?: string;
  /** Large type shown on the empty panel until a photo lands. */
  panel?: ReactNode;
};

/**
 * An image slot keyed by shot ID. Renders the file from public/images when it
 * exists; otherwise a flat brand panel, optionally carrying large type. With
 * NEXT_PUBLIC_SHOW_SLOT_IDS=true the empty panel also shows its shot ID.
 */
export function ImageSlot({
  id,
  alt,
  aspect = "4/3",
  priority,
  className = "",
  tone = "navy",
  sizes = "(max-width: 768px) 100vw, 50vw",
  fallback,
  panel,
}: Props) {
  const primary = findImage(id);
  const file = primary ?? (fallback ? findImage(fallback) : null);
  const src = file && versioned(file);
  const box = aspect === "fill" ? "absolute inset-0" : `relative w-full ${ASPECT[aspect]}`;
  const empty = tone === "navy" ? "panel" : "bg-surface";
  const showId = process.env.NEXT_PUBLIC_SHOW_SLOT_IDS === "true";

  return (
    <div className={`${box} overflow-hidden ${src ? "bg-navy" : empty} ${className}`} data-slot={id} data-slot-filled={primary ? "true" : file ? "fallback" : "false"}>
      {src ? (
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
      ) : (
        <>
          <span className="sr-only">{alt}</span>
          {panel && <div className="absolute inset-0 flex flex-col justify-end p-[clamp(20px,4%,36px)]">{panel}</div>}
          {showId && (
            <span
              className={`absolute top-3 right-3 rounded-md px-1.5 py-0.5 font-mono text-[11px] tracking-wide ${
                tone === "navy" ? "bg-white/10 text-white/70" : "bg-black/5 text-muted"
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

/** Big-number panel: "8" over "fields at our home complex". */
export function PanelStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="stat text-[clamp(64px,9vw,128px)] text-amber">{value}</div>
      <div className="mt-2 max-w-[22ch] font-display text-[15px] font-bold tracking-wide text-white/85 uppercase">{label}</div>
    </div>
  );
}
