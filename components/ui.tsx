import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

/* Button --------------------------------------------------------------- */

type ButtonVariant = "primary" | "secondary" | "tridents";

export function Button({
  href,
  variant = "primary",
  size,
  arrow,
  className = "",
  children,
  ...rest
}: {
  href: string;
  variant?: ButtonVariant;
  size?: "sm";
  arrow?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<"a">, "href">) {
  const cls = `btn btn-${variant} ${size === "sm" ? "btn-sm" : ""} ${className}`;
  const inner = (
    <>
      {children}
      {arrow && <ArrowRight size={17} strokeWidth={2.5} aria-hidden />}
    </>
  );
  if (/^https?:|^mailto:|^tel:/.test(href)) {
    return (
      <a href={href} className={cls} {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...(rest as object)}>
      {inner}
    </Link>
  );
}

export function ArrowLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  const inner = (
    <>
      {children}
      <ArrowRight size={15} strokeWidth={2.5} aria-hidden />
    </>
  );
  return /^https?:|^mailto:/.test(href) ? (
    <a href={href} className={`link-arrow ${className}`}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={`link-arrow ${className}`}>
      {inner}
    </Link>
  );
}

/* Eyebrow -------------------------------------------------------------- */

export function Eyebrow({ children, className = "text-accent" }: { children: ReactNode; className?: string }) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}

/* Section -------------------------------------------------------------- */

export type SectionVariant = "light" | "cream" | "navy" | "amber" | "red" | "tridents";

const VARIANT: Record<SectionVariant, string> = {
  light: "bg-bg text-fg",
  cream: "bg-surface text-fg",
  navy: "bg-navy text-white",
  amber: "bg-amber text-ink",
  red: "bg-red text-white",
  tridents: "bg-bg text-fg",
};

export function Section({
  variant = "light",
  id,
  className = "",
  innerClassName = "",
  tight,
  children,
  ...rest
}: {
  variant?: SectionVariant;
  id?: string;
  className?: string;
  innerClassName?: string;
  tight?: boolean;
  children: ReactNode;
} & ComponentProps<"section">) {
  return (
    <section
      id={id}
      data-brand={variant === "tridents" ? "tridents" : undefined}
      className={`relative scroll-mt-16 ${VARIANT[variant]} ${className}`}
      {...rest}
    >
      <div className={`wrap ${tight ? "section-pad-sm" : "section-pad"} ${innerClassName}`}>{children}</div>
    </section>
  );
}

/* Section head ------------------------------------------------------------
   Title left, lead right on a 12-column grid when there is room; stacked when
   the head sits in a narrow column (container query, not viewport). */

export function SectionHead({
  eyebrow,
  title,
  lead,
  action,
  eyebrowClass,
  as: Tag = "h2",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  action?: ReactNode;
  eyebrowClass?: string;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <header className={`@container mb-10 md:mb-14 ${className}`}>
      <div className="grid gap-5 @3xl:grid-cols-12 @3xl:items-end @3xl:gap-10">
        <div className={lead || action ? "@3xl:col-span-7" : "@3xl:col-span-10"}>
          {eyebrow && <Eyebrow className={`mb-4 ${eyebrowClass ?? "text-accent"}`}>{eyebrow}</Eyebrow>}
          <Tag className={`${Tag === "h1" ? "t-h1" : "t-h2"} max-w-[20ch]`}>{title}</Tag>
        </div>
        {(lead || action) && (
          <div className="flex flex-col gap-5 @3xl:col-span-5 @3xl:items-start @3xl:pb-1">
            {lead && <div className="t-lead max-w-[46ch] opacity-80">{lead}</div>}
            {action}
          </div>
        )}
      </div>
    </header>
  );
}

/* Page header (inner pages) --------------------------------------------- */

export function PageHeader({
  eyebrow,
  title,
  children,
  aside,
}: {
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <header className="relative isolate overflow-hidden bg-navy text-white">
      <div aria-hidden className="panel absolute inset-0 -z-10" />
      <div className="wrap grid gap-10 pt-[clamp(72px,9vw,128px)] pb-[clamp(56px,6vw,88px)] lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          {eyebrow && <Eyebrow className="mb-5 text-amber">{eyebrow}</Eyebrow>}
          <h1 className="t-h1 max-w-[18ch]">{title}</h1>
          {children && <div className="t-lead mt-6 max-w-[56ch] text-white/85">{children}</div>}
        </div>
        {aside && <div className="lg:col-span-4">{aside}</div>}
      </div>
    </header>
  );
}

/* Card ---------------------------------------------------------------- */

export function Card({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`card p-7 md:p-8 ${className}`}>{children}</div>;
}

/* Numbered steps ---------------------------------------------------------- */

export function Steps({ items, className = "" }: { items: { title: ReactNode; body: ReactNode }[]; className?: string }) {
  return (
    <ol className={`relative space-y-7 ${className}`}>
      <span aria-hidden className="absolute top-3 bottom-3 left-[19px] w-px bg-line" />
      {items.map((s, i) => (
        <li key={i} className="relative grid grid-cols-[40px_1fr] gap-5">
          <span className="relative grid h-10 w-10 place-items-center rounded-full bg-red font-display text-[15px] font-extrabold text-white">
            {i + 1}
          </span>
          <div className="pt-1.5">
            <h3 className="font-display text-[17px] font-bold">{s.title}</h3>
            <div className="t-small mt-1 text-muted">{s.body}</div>
          </div>
        </li>
      ))}
    </ol>
  );
}
