import Link from "next/link";
import type { ReactNode } from "react";
import type { Dates, Division, PathwayStep, PostMeta, Sponsors } from "@/lib/types";
import { longDate, range } from "@/lib/format";
import { findSponsorLogo } from "@/lib/assets";
import Image from "next/image";
import { ImageSlot } from "./ImageSlot";
import { Button, Eyebrow } from "./ui";

/* StatusChip ------------------------------------------------------------ */

export function StatusChip({ status, detail, className = "" }: { status: string; detail?: string; className?: string }) {
  const open = status.toLowerCase() === "open";
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full bg-[rgb(var(--overlay)/0.8)] px-3.5 py-1.5 text-sm font-semibold text-white ${className}`}
    >
      <i aria-hidden className={`h-2 w-2 rounded-full ${open ? "bg-go" : "bg-red"}`} />
      Fields {open ? "open" : "closed"}
      {detail && <span className="opacity-80">· {detail}</span>}
    </span>
  );
}

/* ProofBar ------------------------------------------------------------- */

export function ProofBar({ divisions }: { divisions: number }) {
  const facts = [
    ["8", "Fields at our home complex"],
    ["3–18", "Ages, every spring and fall"],
    [String(divisions), "Divisions, Fawn to Palomino plus Champions"],
    ["PONY", "Affiliated league"],
    ["100%", "Volunteer run, 501(c)(3)"],
  ];
  return (
    <div className="bg-red text-white">
      <dl className="wrap grid grid-cols-2 gap-x-4 gap-y-6 py-7 md:grid-cols-5">
        {facts.map(([n, l]) => (
          <div key={l} className="flex flex-col-reverse">
            <dt className="mt-1.5 text-[13px] font-semibold tracking-wide uppercase opacity-95">{l}</dt>
            <dd className="font-display text-3xl font-extrabold tracking-tight tabular-nums">{n}</dd>
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
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-2 text-sm font-semibold">
        {steps.map((s, i) => (
          <li key={s.id} className="flex items-center gap-2">
            <span className="rounded-full border border-line bg-card px-3 py-1">{s.title}</span>
            {i < steps.length - 1 && <span aria-hidden className="text-muted">→</span>}
          </li>
        ))}
      </ol>
    );
  }
  return (
    <ol className="grid gap-4 lg:grid-cols-5 lg:gap-3">
      {steps.map((s) => {
        const last = !s.image;
        return (
          <li
            key={s.id}
            className={`grid min-w-0 grid-cols-[112px_1fr] overflow-hidden rounded-2xl border sm:grid-cols-[180px_1fr] lg:grid-cols-1 ${
              last ? "border-transparent bg-navy text-white" : "border-line bg-card"
            }`}
          >
            {s.image ? (
              <ImageSlot id={s.image} alt={s.title} aspect="4/3" className="!aspect-auto h-full min-h-28 lg:!aspect-[4/3] lg:h-auto" sizes="(max-width: 1024px) 180px, 20vw" />
            ) : (
              <div className="flex flex-col justify-end gap-1 bg-navy-mid p-4 font-display text-[15px] leading-tight font-extrabold text-amber lg:aspect-[4/3] lg:text-xl" aria-hidden>
                <span>Middle school</span>
                <span>High school</span>
                <span>True travel</span>
              </div>
            )}
            <div className="flex flex-col gap-1.5 p-4 md:p-5">
              <span className={`eyebrow ${last ? "text-amber" : "text-accent"}`}>
                Step {s.step}
                {s.ages && ` · ${range(s.ages)}`}
              </span>
              <h3 className="font-display text-lg font-bold">{s.title}</h3>
              <p className={`text-[15px] leading-snug ${last ? "text-white/85" : "text-muted"}`}>{s.copy}</p>
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
      <Link
        href={`/programs#${d.id}`}
        className="group flex min-w-0 flex-col gap-1.5 rounded-2xl border border-line bg-card p-5 transition hover:-translate-y-0.5 hover:border-red"
      >
        <span className="font-display text-[28px] font-extrabold tracking-tight text-accent tabular-nums">{range(d.ages)}</span>
        <span className="font-display text-[17px] font-bold">{d.name}</span>
        <span className="text-[15px] text-muted">{d.format}</span>
        <span className="mt-auto pt-2 text-sm font-semibold text-accent">See the division →</span>
      </Link>
    );
  }
  return (
    <article id={d.id} className="flex min-w-0 scroll-mt-24 flex-col overflow-hidden rounded-2xl border border-line bg-card">
      <ImageSlot id={d.image} alt={`${d.name} division`} aspect="4/3" sizes="(max-width: 768px) 100vw, 25vw" />
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-display text-xl font-bold">{d.name}</h3>
          <span className="font-display font-extrabold text-accent tabular-nums">Ages {range(d.ages)}</span>
        </div>
        <p className="text-[15px] text-muted">{d.format}</p>
        <dl className="mt-1 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
          <dt className="font-semibold">Bases</dt>
          <dd>{d.bases ?? "Short, tee ball setup"}</dd>
          <dt className="font-semibold">Mound</dt>
          <dd>{d.mound ?? "No pitching"}</dd>
          <dt className="font-semibold">Tryouts</dt>
          <dd>{d.tryouts ? "Yes, then a draft" : d.note ?? "No"}</dd>
        </dl>
        <Link href="/register" className="mt-auto pt-3 text-sm font-semibold text-accent hover:underline">
          Register for {d.name} →
        </Link>
      </div>
    </article>
  );
}

/* SplitFeature ------------------------------------------------------------- */

export function SplitFeature({
  media,
  children,
  reverse,
}: {
  media: ReactNode;
  children: ReactNode;
  reverse?: boolean;
}) {
  return (
    <div className="grid items-center gap-8 md:grid-cols-[1.15fr_1fr] md:gap-12">
      <div className={`min-w-0 ${reverse ? "md:order-2" : ""}`}>{media}</div>
      <div className="min-w-0">{children}</div>
    </div>
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
    <div className="grid gap-5 md:grid-cols-2">
      {cards.map((c) => (
        <article
          key={c.title}
          id={c.id}
          className="flex min-w-0 scroll-mt-24 flex-col overflow-hidden rounded-2xl border border-line bg-card"
        >
          <ImageSlot id={c.image} alt="" aspect="16/9" sizes="(max-width: 768px) 100vw, 50vw" />
          <div className="flex flex-1 flex-col gap-4 p-6 md:p-8">
            <Eyebrow>{c.eyebrow}</Eyebrow>
            <h3 className="t-h3">{c.title}</h3>
            <div className="text-muted">{c.body}</div>
            {c.extra}
            <Button href={c.cta.href} className="mt-auto self-start">
              {c.cta.label}
            </Button>
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
        <li key={i} className="rounded-full bg-surface px-3 py-1.5 text-[13px] font-semibold">
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
    <div className="space-y-8">
      {show.map((t) => {
        const list = data.sponsors.filter((s) => s.tier === t.id);
        if (!list.length) return null;
        const big = t.id === "corporate" || t.id === "division";
        return (
          <div key={t.id}>
            <h3 className="eyebrow mb-3 text-muted">
              {t.name} sponsors <span className="opacity-70">({list.length})</span>
            </h3>
            <ul className={`grid gap-2.5 ${big ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-6" : "grid-cols-2 md:grid-cols-4 lg:grid-cols-6"}`}>
              {list.map((s) => {
                const logo = findSponsorLogo(s.tier, s.logo);
                return (
                  <li
                    key={s.name}
                    className={`relative grid place-items-center rounded-xl border border-line bg-card px-3 text-center font-display font-bold ${
                      big ? "min-h-20 text-[14px]" : "min-h-16 text-[12.5px]"
                    }`}
                  >
                    {logo ? (
                      <Image src={logo} alt={s.name} fill sizes="200px" className="object-contain p-3" />
                    ) : (
                      <span className="leading-tight">{s.name}</span>
                    )}
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
    <article className="grid grid-cols-[96px_1fr] gap-4 border-t border-line py-5">
      <time dateTime={post.date} className="font-display text-[13px] font-bold tracking-wide text-muted">
        {longDate(post.date, "")}
      </time>
      <div className="min-w-0">
        <h3 className="font-display text-lg font-bold">
          <Link href={`/news/${post.slug}`} className="hover:underline underline-offset-4">
            {post.title}
          </Link>
        </h3>
        <p className="text-[15px] text-muted">{post.excerpt}</p>
      </div>
    </article>
  );
}

/* KeyDates ------------------------------------------------------------------ */

export function KeyDates({ dates, boardMeeting }: { dates: Dates; boardMeeting: string }) {
  const firstTryout = dates.tryouts.find((t) => t.date);
  const rows: [string, string][] = [
    ["Registration", dates.registrationOpens ? `Opens ${longDate(dates.registrationOpens)}` : "To be announced"],
    ["Tryouts", firstTryout ? `${firstTryout.division}, ${longDate(firstTryout.date)}` : "Mustang to Palomino, to be announced"],
    ["Opening Day", longDate(dates.openingDay)],
    ["Battle of the Beach", dates.battleOfTheBeach || "To be announced"],
    ["Board meeting", dates.nextBoardMeeting ? `${longDate(dates.nextBoardMeeting)}, open to all` : boardMeeting],
  ];
  return (
    <aside className="rounded-2xl bg-navy p-7 text-white">
      <h2 className="t-h3 mb-1">Key dates</h2>
      <p className="mb-4 text-sm text-white/75">{dates.season}</p>
      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2.5 text-[15px]">
        {rows.map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="font-semibold text-white/75">{k}</dt>
            <dd className="font-semibold">{v}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}

/* Accordion (native details: keyboard accessible with no script) ---------- */

export function Accordion({ items }: { items: { q: string; a: ReactNode }[] }) {
  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-card">
      {items.map((i) => (
        <details key={i.q} className="group px-5 py-1 md:px-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-lg font-bold [&::-webkit-details-marker]:hidden">
            {i.q}
            <span aria-hidden className="text-2xl text-accent transition group-open:rotate-45">+</span>
          </summary>
          <div className="pb-5 text-muted">{i.a}</div>
        </details>
      ))}
    </div>
  );
}
