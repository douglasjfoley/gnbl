"use client";
import { useEffect, useRef } from "react";

/** Fallback hero: navy-to-dusk gradient with drifting amber dust. */
export function AmbientDust() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ps = Array.from({ length: 120 }, () => ({
      x: Math.random(), y: Math.random(), r: Math.random() * 2.2 + 0.4,
      v: Math.random() * 0.25 + 0.05, a: Math.random() * 0.5 + 0.15,
    }));
    let raf = 0;
    const size = () => { c.width = c.clientWidth; c.height = c.clientHeight; };
    const frame = (loop = true) => {
      const { width: w, height: h } = c;
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, "#0A162C"); g.addColorStop(0.6, "#3B3044"); g.addColorStop(1, "#7A5238");
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      for (const p of ps) {
        ctx.fillStyle = `rgba(242,166,58,${p.a})`;
        ctx.beginPath(); ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2); ctx.fill();
        if (!reduce) { p.x = (p.x + p.v * 0.0012) % 1; p.y -= p.v * 0.0008; if (p.y < 0) p.y = 1; }
      }
      if (loop && !reduce) raf = requestAnimationFrame(() => frame());
    };
    // Paint one still frame now; start drifting once the page has settled.
    size(); frame(false);
    const start = setTimeout(() => frame(), 3000);
    const onResize = () => { size(); if (reduce) frame(false); };
    addEventListener("resize", onResize);
    return () => { clearTimeout(start); cancelAnimationFrame(raf); removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 -z-20 h-full w-full" />;
}
