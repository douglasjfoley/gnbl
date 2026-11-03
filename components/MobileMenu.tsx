"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Menu, X } from "lucide-react";

export type NavLink = { href: string; label: string };

/** Hamburger and slide-down panel for small screens. The Register button stays in the bar. */
export function MobileMenu({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((o) => !o)}
        className="grid h-11 w-11 place-items-center rounded-lg text-white hover:bg-white/10"
      >
        {open ? <X size={24} aria-hidden /> : <Menu size={24} aria-hidden />}
      </button>
      <nav
        id={id}
        hidden={!open}
        aria-label="Mobile"
        className="absolute inset-x-0 top-full border-t border-white/10 bg-[rgb(var(--overlay))] shadow-xl"
      >
        <ul className="wrap flex flex-col py-3">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="block py-3 font-display text-lg font-bold text-white"
                aria-current={pathname === l.href ? "page" : undefined}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
