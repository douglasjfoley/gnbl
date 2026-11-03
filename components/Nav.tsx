import Link from "next/link";
import { getSite } from "@/lib/content";
import { Mark } from "./Mark";
import { MobileMenu, type NavLink } from "./MobileMenu";
import { Button } from "./ui";

function Bar({
  brand,
  links,
  cta,
}: {
  brand: React.ReactNode;
  links: NavLink[];
  cta: React.ReactNode;
}) {
  return (
    <div className="sticky top-0 z-40 bg-[rgb(var(--overlay)/0.94)] pt-[env(safe-area-inset-top)] text-white backdrop-blur-md">
      <div className="wrap relative flex h-[68px] items-center gap-4 lg:gap-6">
        {brand}
        <nav aria-label="Main" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-6 text-[15px] font-semibold">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="opacity-90 hover:opacity-100 hover:underline underline-offset-4">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-auto flex items-center gap-2 lg:ml-0">
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
        <Link href="/" className="flex min-w-0 items-center gap-3 font-display text-[17px] font-extrabold tracking-tight">
          <Mark name="gn-crest" size={42} priority alt="" />
          <span className="hidden truncate sm:inline">Great Neck Baseball</span>
          <span className="sr-only sm:hidden">Great Neck Baseball, home</span>
        </Link>
      }
      cta={
        <Button href="/register" className="!min-h-10 !px-4 !text-sm">
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
    { href: "/", label: "← Back to GNBL" },
  ];
  return (
    <Bar
      links={links}
      brand={
        <Link href="/tridents" className="flex min-w-0 items-center gap-3">
          <Mark name="tridents-crest" size={44} priority alt="" />
          <span className="min-w-0 leading-tight">
            <span className="block font-display text-[17px] font-extrabold tracking-tight">Great Neck Tridents</span>
            <span className="block truncate text-[12px] font-semibold text-columbia-lt">
              A Great Neck Baseball League program
            </span>
          </span>
        </Link>
      }
      cta={
        <Button href="/tridents/tryouts#interest" variant="tridents" className="!min-h-10 !px-4 !text-sm">
          <span className="hidden sm:inline">Tryout interest</span>
          <span className="sm:hidden">Tryouts</span>
        </Button>
      }
    />
  );
}
