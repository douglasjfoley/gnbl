import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import type { Dates, Division, PathwayStep, PostMeta, Sponsors } from "@/lib/types";
import { longDate, range } from "@/lib/format";
import { findSponsorLogo } from "@/lib/assets";
import { ImageSlot } from "./ImageSlot";
import { Button, Eyebrow } from "./ui";

/* StatusChip ------------------------------------------------------------ */

export function StatusChip({ status, detail, className = "" }: { status: string; detail?: string; className?: string }) {
  const open = status.toLowerCase() === "open";
  return (
    <span
      className={`inline-flex items-center gap-2.5 rounded-full bg-[rgb(var(--overlay)/0.78)] px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm ${className}`}
    >
      <span aria-hidden className="relative flex h-2.5 w-2.5">
        {open && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-go opacity-50" />}
        <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${open ? "bg-go" : "bg-red"}`} />
      </span>
      Fields {open ? "open" : "closed"}
      {detail && <span className="font-normal text-white/75">· {detail}</span>}
    </span>
  );
}

/* ProofBar ------------------------------------------------------------- */

export function ProofBar({ divisions }: { divisions: number }) {
  const facts: [string, string][] = [
    ["8", "Fields at our home complex"],
    ["3–18", "Ages, spring and fall"],
    [String(divisions), "Divisions, including Champions"],
    ["PONY", "Affiliated league"],
    ["100%", "Volunteer run nonprofit"],
  ];
  return (
    <div className="bg-red text-white">
      <dl className="wrap grid grid-cols-2 gap-y-8 py-9 md:grid-cols-5 md:py-11">
        {facts.map(([n, l], i) => (
          <div
            key={l}
            className={`flex flex-col gap-2.5 pr-4 ${i === 4 ? "col-span-2 md:col-span-1" : ""} ${i > 0 ? "md:border-l md:border-white/25 md:pl-7" : ""} ${i % 2 === 1 ? "border-l border-white/25 pl-5 md:pl-7" : ""}`}
          >
            <dt className="order-2 text-[12.5px] leading-snug font-semibold tracking-[0.08em] text-white/90 uppercase">{l}</dt>
            <dd className="stat order-1 text-[clamp(34px,3.4vw,46px)]">{n}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/* Pathway ------------------------------------------------------------------ */

export function Pathway({ steps, compact }: { steps: PathwayStep[]; compact?: boolean }) {
  if (compact) {
    return (
      <ol className="flex flex-wrap items-center gap-x-2.5 gap-y-2 text-sm font-semibold">
        {steps.map((s, i) => (
          <li key={s.id} className="flex items-center gap-2.5">
            <span className="rounded-full border border-white/25 px-3.5 py-1.5 text-white/90">{s.title}</span>
            {i < steps.length - 1 && <ArrowRight aria-hidden size={15} className="text-white/50" />}
          </li>
        ))}
      </ol>
    );
  }
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
      {steps.map((s) => {
        const last = !s.image;
        const num = String(s.step).padStart(2, "0");
        return (
          <li key={s.id} className={`flex min-w-0 flex-col overflow-hidden rounded-[18px] ${last ? "bg-navy text-white" : "card"}`}>
            {s.image ? (
              <ImageSlot
                id={s.image}
                alt={s.title}
                aspect="4/3"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                panel={<span className="stat text-[64px] text-white/90">{num}</span>}
              />
            ) : (
              <div className="relative aspect-[4/3] overflow-hidden">
                <div className="absolute inset-0 flex flex-col justify-end p-[clamp(20px,4%,36px)]">
                  <span className="stat text-[64px] text-amber">{num}</span>
                </div>
              </div>
            )}
            <div className="flex flex-1 flex-col gap-2 p-6">
              <span className={`eyebrow eyebrow-plain ${last ? "text-amber" : "text-accent"}`}>
                {s.ages ? `Ages ${range(s.ages)}` : "Beyond Great Neck"}
              </span>
              <h3 className="t-h3">{s.title}</h3>
              <p className={`t-small ${last ? "text-white/85" : "text-muted"}`}>{s.copy}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/* DivisionCard ------------------------------------------------------------ */

export function DivisionCard({ d, detailed }: { d: Division; detailed?: boolean }) {
  if (!detailed) {
    return (
      <Link href={`/programs#${d.id}`} className="card card-hover group flex h-full min-w-0 flex-col p-6 hover:border-red">
        <span className="stat text-[clamp(30px,2.6vw,36px)] text-accent">{range(d.ages)}</span>
        <span className="mt-1 text-[12.5px] font-semibold tracking-[0.08em] text-muted uppercase">Ages</span>
        <h3 className="t-h3 mt-5">{d.name}</h3>
        <p className="t-small mt-1.5 text-muted">{d.format}</p>
        <span className="link-arrow mt-auto pt-5">
          Details <ArrowRight size={15} strokeWidth={2.5} aria-hidden className="transition group-hover:translate-x-0.5" />
        </span>
      </Link>
    );
  }
  return (
    <article id={d.id} className="card flex h-full min-w-0 scroll-mt-24 flex-col overflow-hidden">
      <ImageSlot
        id={d.image}
        alt={`${d.name} division`}
        aspect="3/2"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        panel={<span className="stat text-[48px] text-white/90">{range(d.ages)}</span>}
      />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="t-h3">{d.name}</h3>
          <span className="shrink-0 text-sm font-semibold text-muted">Ages {range(d.ages)}</span>
        </div>
        <p className="t-small mt-2 text-muted">{d.format}</p>
        <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-line pt-4 text-sm">
          {[
            ["Bases", d.bases ?? "Tee ball"],
            ["Mound", d.mound ?? "None"],
            ["Tryouts", d.tryouts ? "Yes" : "No"],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-[11.5px] font-semibold tracking-[0.08em] text-muted uppercase">{k}</dt>
              <dd className="mt-0.5 font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
        <Link href="/register" className="link-arrow mt-auto pt-6">
          Register for {d.name} <ArrowRight size={15} strokeWidth={2.5} aria-hidden />
        </Link>
      </div>
    </article>
  );
}

/* SplitFeature ------------------------------------------------------------- */

export function SplitFeature({ media, children, reverse }: { media: ReactNode; children: ReactNode; reverse?: boolean }) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
      <div className={`min-w-0 lg:col-span-7 ${reverse ? "lg:order-2" : ""}`}>{media}</div>
      <div className="min-w-0 lg:col-span-5">{children}</div>
    </div>
  );
}

export function Media({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`relative overflow-hidden rounded-[22px] ${className}`}>{children}</div>;
}

/* Checklist ---------------------------------------------------------------- */

export function Checklist({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`grid gap-x-8 gap-y-3 sm:grid-cols-2 ${className}`}>
      {items.map((f) => (
        <li key={f} className="flex items-start gap-3 text-[15.5px] font-semibold">
          <span aria-hidden className="mt-[7px] h-2 w-2 shrink-0 rotate-45 bg-red" />
          {f}
        </li>
      ))}
    </ul>
  );
}

/* CtaCardPair --------------------------------------------------------------- */

export type CtaCard = {
  id?: string;
  image: string;
  eyebrow: string;
  title: string;
  body: ReactNode;
  extra?: ReactNode;
  cta: { href: string; label: string };
};

export function CtaCardPair({ cards }: { cards: [CtaCard, CtaCard] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {cards.map((c) => (
        <article key={c.title} id={c.id} className="card flex min-w-0 scroll-mt-24 flex-col overflow-hidden">
          <ImageSlot id={c.image} alt="" aspect="2/1" sizes="(max-width: 768px) 100vw, 50vw" />
          <div className="flex flex-1 flex-col p-7 md:p-9">
            <Eyebrow>{c.eyebrow}</Eyebrow>
            <h3 className="mt-4 font-display text-[clamp(22px,2vw,28px)] leading-tight font-extrabold tracking-tight">{c.title}</h3>
            <div className="t-small mt-3 text-muted">{c.body}</div>
            {c.extra && <div className="mt-5">{c.extra}</div>}
            <div className="mt-auto pt-8">
              <Button href={c.cta.href} arrow>
                {c.cta.label}
              </Button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export function Chips({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((i) => (
        <li key={i} className="rounded-full border border-line bg-surface px-3 py-1.5 text-[13px] font-semibold">
          {i}
        </li>
      ))}
    </ul>
  );
}

/* SponsorGrid -------------------------------------------------------------- */

export function SponsorGrid({ data, tiers }: { data: Sponsors; tiers?: Sponsors["tiers"][number]["id"][] }) {
  const show = data.tiers.filter((t) => !tiers || tiers.includes(t.id));
  return (
    <div className="space-y-10">
      {show.map((t) => {
        const list = data.sponsors.filter((s) => s.tier === t.id);
        if (!list.length) return null;
        const big = t.id === "corporate" || t.id === "division";
        return (
          <div key={t.id}>
            <div className="mb-4 flex items-baseline justify-between border-b border-line pb-3">
              <h3 className="font-display text-[15px] font-bold">{t.name} sponsors</h3>
              <span className="text-sm text-muted">{list.length}</span>
            </div>
            <ul className={`grid gap-3 ${big ? "grid-cols-[repeat(auto-fit,minmax(170px,1fr))]" : "grid-cols-[repeat(auto-fill,minmax(160px,1fr))]"}`}>
              {list.map((s) => {
                const logo = findSponsorLogo(s.tier, s.logo);
                return (
                  <li
                    key={s.name}
                    className={`card relative grid place-items-center px-4 text-center font-display leading-tight font-bold ${big ? "min-h-24 text-[15px]" : "min-h-[72px] text-[13px]"}`}
                  >
                    {logo ? <Image src={logo} alt={s.name} fill sizes="220px" className="object-contain p-4" /> : <span>{s.name}</span>}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

/* NewsCard ---------------------------------------------------------------- */

export function NewsCard({ post }: { post: PostMeta }) {
  return (
    <article className="group relative grid gap-2 border-t border-line py-7 sm:grid-cols-[140px_1fr] sm:gap-8">
      <time dateTime={post.date} className="pt-1 font-display text-[13px] font-bold tracking-[0.08em] text-muted uppercase">
        {longDate(post.date, "")}
      </time>
      <div className="min-w-0">
        <h3 className="t-h3">
          <Link href={`/news/${post.slug}`} className="after:absolute after:inset-0 group-hover:underline group-hover:underline-offset-4">
            {post.title}
          </Link>
        </h3>
        <p className="t-small mt-2 text-muted">{post.excerpt}</p>
      </div>
    </article>
  );
}

/* KeyDates ------------------------------------------------------------------ */

export function KeyDates({ dates, boardMeeting }: { dates: Dates; boardMeeting: string }) {
  const firstTryout = dates.tryouts.find((t) => t.date);
  const rows: [string, string][] = [
    ["Registration", dates.registrationOpens ? `Opens ${longDate(dates.registrationOpens)}` : "To be announced"],
    ["Tryouts", firstTryout ? `${firstTryout.division}, ${longDate(firstTryout.date)}` : "To be announced"],
    ["Opening Day", longDate(dates.openingDay)],
    ["Battle of the Beach", dates.battleOfTheBeach || "To be announced"],
    ["Board meeting", dates.nextBoardMeeting ? longDate(dates.nextBoardMeeting) : boardMeeting],
  ];
  return (
    <aside className="panel rounded-[22px] p-8 md:p-9">
      <Eyebrow className="text-amber">{dates.season}</Eyebrow>
      <h2 className="mt-4 font-display text-[26px] font-extrabold tracking-tight">Key dates</h2>
      <dl className="mt-6 divide-y divide-white/12">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-baseline justify-between gap-4 py-3.5 text-[15px]">
            <dt className="text-white/70">{k}</dt>
            <dd className="text-right font-semibold">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-5 text-[13px] text-white/60">Board meetings are open to the public.</p>
    </aside>
  );
}

/* Accordion (native details: keyboard accessible with no script) ---------- */

export function Accordion({ items }: { items: { q: string; a: ReactNode }[] }) {
  return (
    <div className="card divide-y divide-line">
      {items.map((i) => (
        <details key={i.q} className="group px-6 md:px-8">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-[18px] font-bold [&::-webkit-details-marker]:hidden">
            {i.q}
            <span aria-hidden className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-xl leading-none text-accent transition group-open:rotate-45">
              +
            </span>
          </summary>
          <div className="t-small max-w-[62ch] pb-6 text-muted">{i.a}</div>
        </details>
      ))}
    </div>
  );
}
