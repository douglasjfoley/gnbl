import Image from "next/image";
import type { ReactNode } from "react";
import { findVideo, versioned } from "@/lib/assets";
import { AmbientDust } from "./AmbientDust";

type Props = {
  id: "HOME-V01" | "TRI-V01";
  children: ReactNode;
  className?: string;
};

/**
 * Full-bleed hero. Video when the files exist (WebM, then MP4, with a 9:16
 * mobile source), else the poster still, else the ambient dust canvas.
 * Reduced motion hides the video and leaves the poster.
 */
export function VideoHero({ id, children, className = "" }: Props) {
  const v = findVideo(id);
  const poster = v.poster && versioned(v.poster);
  const hasVideo = Boolean(v.mp4 || v.webm);
  const showId = process.env.NEXT_PUBLIC_SHOW_SLOT_IDS === "true";

  return (
    <header
      className={`relative isolate flex min-h-[min(88vh,860px)] flex-col justify-end overflow-hidden bg-navy text-white ${className}`}
      data-slot={id}
      data-slot-filled={hasVideo || v.poster ? "true" : "false"}
    >
      {poster ? (
        <Image src={poster} alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
      ) : (
        <AmbientDust />
      )}
      {hasVideo && (
        <video
          className="hero-video absolute inset-0 -z-20 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster ?? undefined}
          aria-hidden="true"
        >
          {v.mobile && <source src={v.mobile} type="video/mp4" media="(max-width: 768px)" />}
          {v.webm && <source src={v.webm} type="video/webm" />}
          {v.mp4 && <source src={v.mp4} type="video/mp4" />}
        </video>
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgb(var(--overlay) / .35) 0%, rgb(var(--overlay) / .55) 55%, rgb(var(--overlay) / .9) 100%)",
        }}
      />
      {children}
      {showId && !hasVideo && (
        <span className="absolute right-3 bottom-3 rounded bg-white/10 px-1.5 py-0.5 font-mono text-[11px] text-white/80">
          {id} · {v.poster ? "poster only" : "no video yet"}
        </span>
      )}
    </header>
  );
}
