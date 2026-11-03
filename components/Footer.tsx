import Link from "next/link";
import { getSite } from "@/lib/content";
import { Mark } from "./Mark";
import { Button } from "./ui";

type L = { href: string; label: string };

function Col({ title, links }: { title: string; links: L[] }) {
  return (
    <div>
      <h2 className="font-display text-[13px] font-bold tracking-[0.12em] text-white/55 uppercase">{title}</h2>
      <ul className="mt-5 space-y-3 text-[15px]">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="text-white/85 transition-colors hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer({ brand = "league" }: { brand?: "league" | "tridents" }) {
  const site = getSite();
  const tri = brand === "tridents";
  const shop: L[] = site.shop.enabled && site.shop.url ? [{ href: site.shop.url, label: "Shop" }] : [];
  const email = tri ? site.email.tridents : site.email.secretary;

  const cols: [string, L[]][] = tri
    ? [
        ["Tridents", [
          { href: "/tridents/teams", label: "Teams" },
          { href: "/tridents/tryouts", label: "Tryouts" },
          { href: "/tridents/battle-of-the-beach", label: "Battle of the Beach" },
          { href: "/tridents/faq", label: "FAQ" },
        ]],
        ["The league", [
          { href: "/", label: "Great Neck Baseball League" },
          { href: "/register", label: "Register" },
          { href: "/champions", label: "Champions" },
          { href: "/about", label: "About" },
        ]],
      ]
    : [
        ["Play", [
          { href: "/register", label: "Register" },
          { href: "/programs", label: "Programs" },
          { href: "/champions", label: "Champions" },
          { href: "/tridents", label: "Tridents" },
          { href: "/facilities", label: "Facilities" },
        ]],
        ["Support", [
          { href: "/get-involved", label: "Volunteer" },
          { href: "/get-involved#sponsor", label: "Sponsor" },
          { href: "/about#board", label: "Board of Directors" },
          { href: "/policies", label: "Policies & bylaws" },
          ...shop,
        ]],
        ["League", [
          { href: "/about", label: "About" },
          { href: "/news", label: "News" },
          { href: "/contact", label: "Contact" },
        ]],
      ];

  return (
    <footer className="bg-navy text-white">
      <div className="wrap">
        <div className="flex flex-col gap-8 border-b border-white/12 py-12 md:flex-row md:items-center md:justify-between md:py-14">
          <div className="flex items-center gap-5">
            <Mark name={tri ? "tridents-crest" : "gn-crest"} size={64} alt="" />
            <div>
              <p className="font-display text-[22px] leading-tight font-extrabold tracking-tight">
                {tri ? "Great Neck Tridents" : site.name}
              </p>
              <p className="mt-1 max-w-[52ch] text-[15px] text-white/70">
                {tri ? "A Great Neck Baseball League program" : site.positioning}
              </p>
            </div>
          </div>
          {tri ? (
            <Button href="/tridents/tryouts#interest" variant="tridents" arrow>
              Tryout interest
            </Button>
          ) : (
            <Button href="/register" arrow>
              Register
            </Button>
          )}
        </div>

        <div className={`grid gap-10 py-12 sm:grid-cols-2 ${tri ? "lg:grid-cols-4" : "lg:grid-cols-5"}`}>
          <div className="lg:col-span-2">
            <h2 className="font-display text-[13px] font-bold tracking-[0.12em] text-white/55 uppercase">Find us</h2>
            <address className="mt-5 space-y-1 text-[15px] leading-relaxed text-white/85 not-italic">
              <p>Fields: {site.address.fields}</p>
              <p>Mail: {site.address.mail}</p>
              <p>
                <a href={`mailto:${email}`} className="font-semibold text-white underline-offset-4 hover:underline">
                  {email}
                </a>
              </p>
            </address>
            <ul className="mt-6 flex gap-3">
              {[
                ["Facebook", site.social.facebook],
                ["Instagram", site.social.instagram],
              ].map(([n, u]) => (
                <li key={n}>
                  <a href={u} className="inline-flex rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/85 transition-colors hover:border-white hover:text-white">
                    {n}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {cols.map(([t, l]) => (
            <Col key={t} title={t} links={l} />
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-white/12 py-7 text-[13px] text-white/60 sm:flex-row sm:justify-between">
          <span>
            © {new Date().getFullYear()} {site.name}. A 501(c)(3) nonprofit. PONY Baseball affiliate.
          </span>
          <Link href="/policies" className="hover:text-white">
            Policies and privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
