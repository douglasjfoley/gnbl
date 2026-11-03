import Link from "next/link";
import { getSite } from "@/lib/content";
import { Mark } from "./Mark";
import { MobileMenu, type NavLink } from "./MobileMenu";
import { NavLinks } from "./NavLinks";
import { Button } from "./ui";

function Bar({ brand, links, cta }: { brand: React.ReactNode; links: NavLink[]; cta: React.ReactNode }) {
  return (
    <div className="sticky top-0 z-40 border-b border-white/8 bg-[rgb(var(--overlay)/0.92)] pt-[env(safe-area-inset-top)] text-white backdrop-blur-xl backdrop-saturate-150">
      <div className="wrap relative flex h-[72px] items-center gap-6">
        {brand}
        <nav aria-label="Main" className="ml-auto hidden lg:block">
          <NavLinks links={links} />
        </nav>
        <div className="ml-auto flex items-center gap-2 lg:ml-2">
          {cta}
          <MobileMenu links={links} />
        </div>
      </div>
    </div>
  );
}

/** League nav: GN crest, five links, Shop when live, red Register. */
export function Nav() {
  const site = getSite();
  const links: NavLink[] = [
    { href: "/programs", label: "Programs" },
    { href: "/facilities", label: "Facilities" },
    { href: "/champions", label: "Champions" },
    { href: "/tridents", label: "Tridents" },
    { href: "/get-involved", label: "Get Involved" },
    ...(site.shop.enabled && site.shop.url ? [{ href: site.shop.url, label: "Shop" }] : []),
  ];
  return (
    <Bar
      links={links}
      brand={
        <Link href="/" className="flex min-w-0 items-center gap-3" aria-label={`${site.name}, home`}>
          <Mark name="gn-crest" size={44} priority alt="" />
          <span className="hidden font-display leading-[1.05] font-extrabold tracking-tight sm:block">
            <span className="block text-[16px]">Great Neck</span>
            <span className="block text-[16px] text-white/75">Baseball League</span>
          </span>
        </Link>
      }
      cta={
        <Button href="/register" size="sm">
          Register
        </Button>
      }
    />
  );
}

/** Tridents nav: Tridents crest with the league line beneath, Columbia CTA. */
export function NavTridents() {
  const links: NavLink[] = [
    { href: "/tridents/teams", label: "Teams" },
    { href: "/tridents/tryouts", label: "Tryouts" },
    { href: "/tridents/battle-of-the-beach", label: "Battle of the Beach" },
    { href: "/tridents/faq", label: "FAQ" },
    { href: "/", label: "League home" },
  ];
  return (
    <Bar
      links={links}
      brand={
        <Link href="/tridents" className="flex min-w-0 items-center gap-3" aria-label="Great Neck Tridents, home">
          <Mark name="tridents-crest" size={46} priority alt="" />
          <span className="min-w-0 leading-tight">
            <span className="block font-display text-[16px] font-extrabold tracking-tight">Great Neck Tridents</span>
            <span className="hidden text-[12px] font-semibold text-columbia-lt sm:block">A Great Neck Baseball League program</span>
          </span>
        </Link>
      }
      cta={
        <Button href="/tridents/tryouts#interest" variant="tridents" size="sm">
          <span className="hidden sm:inline">Tryout interest</span>
          <span className="sm:hidden">Tryouts</span>
        </Button>
      }
    />
  );
}
