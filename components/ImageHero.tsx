import type { ReactNode } from "react";
import { ImageSlot } from "./ImageSlot";

/** Full-bleed still hero with the navy gradient and type on top. */
export function ImageHero({ id, alt, children }: { id: string; alt: string; children: ReactNode }) {
  return (
    <header className="relative isolate overflow-hidden bg-navy text-white">
      <ImageSlot id={id} alt={alt} aspect="fill" tone="navy" priority sizes="100vw" className="-z-20" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgb(var(--overlay) / .3) 0%, rgb(var(--overlay) / .55) 50%, rgb(var(--overlay) / .92) 100%)",
        }}
      />
      <div className="wrap pt-[clamp(80px,12vw,160px)] pb-[clamp(48px,7vw,88px)]">{children}</div>
    </header>
  );
}
