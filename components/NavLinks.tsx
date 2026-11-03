"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavLink } from "./MobileMenu";

/** Desktop links with an active underline for the current section. */
export function NavLinks({ links }: { links: NavLink[] }) {
  const pathname = usePathname();
  return (
    <ul className="flex items-center gap-1">
      {links.map((l) => {
        const active = l.href !== "/" && (pathname === l.href || pathname.startsWith(l.href + "/"));
        return (
          <li key={l.href}>
            <Link
              href={l.href}
              aria-current={active ? "page" : undefined}
              className={`relative rounded-lg px-3 py-2 text-[15px] font-semibold transition-colors hover:bg-white/8 hover:text-white ${
                active ? "text-white" : "text-white/80"
              }`}
            >
              {l.label}
              {active && <span aria-hidden className="absolute inset-x-3 -bottom-[3px] h-[2px] rounded bg-primary" />}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
