import type { ReactNode } from "react";
import { ImageSlot } from "./ImageSlot";

/** Full-bleed still hero with the navy gradient and type anchored to the bottom. */
export function ImageHero({ id, alt, children }: { id: string; alt: string; children: ReactNode }) {
  return (
    <header className="relative isolate flex min-h-[min(72vh,680px)] flex-col justify-end overflow-hidden bg-navy text-white">
      <ImageSlot id={id} alt={alt} aspect="fill" priority sizes="100vw" className="-z-20" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgb(var(--overlay) / .15) 0%, rgb(var(--overlay) / .45) 45%, rgb(var(--overlay) / .92) 100%)",
        }}
      />
      <div className="wrap pt-32 pb-[clamp(48px,6vw,88px)]">{children}</div>
    </header>
  );
}
