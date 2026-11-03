import Link from "next/link";
import { getSite } from "@/lib/content";
import { Mark } from "./Mark";

function Col({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h2 className="eyebrow mb-3 text-white/70">{title}</h2>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="opacity-90 hover:opacity-100 hover:underline underline-offset-4">
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
  const shop = site.shop.enabled && site.shop.url ? [{ href: site.shop.url, label: "Shop" }] : [];
  return (
    <footer className={`${tri ? "border-t border-line bg-navy" : "bg-navy"} text-white`}>
      <div className="wrap grid gap-10 py-12 text-[15px] sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href={tri ? "/tridents" : "/"} className="mb-4 flex items-center gap-3 font-display font-extrabold">
            <Mark name={tri ? "tridents-crest" : "gn-crest"} size={48} alt="" />
            {tri ? "Great Neck Tridents" : site.name}
          </Link>
          <p className="opacity-80">
            {tri && (
              <>
                A Great Neck Baseball League program
                <br />
              </>
            )}
            {site.address.mail}
            <br />
            Fields: {site.address.fields.split(",")[0]}
            <br />
            <a href={`mailto:${tri ? site.email.tridents : site.email.secretary}`} className="underline-offset-4 hover:underline">
              {tri ? site.email.tridents : site.email.secretary}
            </a>
          </p>
        </div>
        {tri ? (
          <>
            <Col
              title="Tridents"
              links={[
                { href: "/tridents/teams", label: "Teams" },
                { href: "/tridents/tryouts", label: "Tryouts" },
                { href: "/tridents/battle-of-the-beach", label: "Battle of the Beach" },
                { href: "/tridents/faq", label: "FAQ" },
              ]}
            />
            <Col
              title="Great Neck"
              links={[
                { href: "/", label: "Great Neck Baseball League" },
                { href: "/register", label: "Register" },
                { href: "/champions", label: "Champions" },
                { href: "/about", label: "About" },
              ]}
            />
          </>
        ) : (
          <>
            <Col
              title="Play"
              links={[
                { href: "/register", label: "Register" },
                { href: "/programs", label: "Programs" },
                { href: "/champions", label: "Champions" },
                { href: "/tridents", label: "Tridents" },
                { href: "/facilities", label: "Facilities" },
              ]}
            />
            <Col
              title="Support"
              links={[
                { href: "/get-involved", label: "Volunteer" },
                { href: "/get-involved#sponsor", label: "Sponsor" },
                { href: "/about#board", label: "Board of Directors" },
                { href: "/policies", label: "Policies & bylaws" },
                { href: "/news", label: "News" },
                { href: "/contact", label: "Contact" },
                ...shop,
              ]}
            />
          </>
        )}
        <div>
          <h2 className="eyebrow mb-3 text-white/70">Follow</h2>
          <ul className="space-y-2">
            <li>
              <a href={site.social.facebook} className="opacity-90 hover:opacity-100 hover:underline underline-offset-4">
                Facebook
              </a>
            </li>
            <li>
              <a href={site.social.instagram} className="opacity-90 hover:opacity-100 hover:underline underline-offset-4">
                Instagram
              </a>
            </li>
          </ul>
          <p className="mt-5 text-sm opacity-75">PONY Baseball affiliate · 501(c)(3) nonprofit</p>
        </div>
        <div className="flex flex-wrap justify-between gap-4 border-t border-white/15 pt-5 text-[13px] opacity-70 sm:col-span-2 lg:col-span-4">
          <span>© {new Date().getFullYear()} {site.name} · A 501(c)(3) nonprofit · PONY Baseball affiliate</span>
          <Link href="/policies" className="hover:underline underline-offset-4">
            Policies · Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
