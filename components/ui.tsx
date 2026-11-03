import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/* Button --------------------------------------------------------------- */

type ButtonVariant = "primary" | "secondary" | "tridents";

export function Button({
  href,
  variant = "primary",
  className = "",
  children,
  ...rest
}: { href: string; variant?: ButtonVariant; className?: string; children: ReactNode } & Omit<
  ComponentProps<"a">,
  "href"
>) {
  const cls = `btn btn-${variant} ${className}`;
  const external = /^https?:|^mailto:|^tel:/.test(href);
  if (external) {
    return (
      <a href={href} className={cls} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...(rest as object)}>
      {children}
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
      className={`relative ${VARIANT[variant]} ${className}`}
      {...rest}
    >
      <div
        className={`wrap ${tight ? "py-10 md:py-14" : "py-14 md:py-24"} ${innerClassName}`}
      >
        {children}
      </div>
    </section>
  );
}

/* Section head ------------------------------------------------------------ */

export function SectionHead({
  eyebrow,
  title,
  lead,
  eyebrowClass,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  eyebrowClass?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
      <div className="max-w-[22ch] min-w-0 flex-[1_1_320px]">
        {eyebrow && <Eyebrow className={`mb-3 ${eyebrowClass ?? "text-accent"}`}>{eyebrow}</Eyebrow>}
        <Tag className={Tag === "h1" ? "t-h1" : "t-h2"}>{title}</Tag>
      </div>
      {lead && <div className="max-w-[48ch] flex-[1_1_320px] text-lg opacity-85">{lead}</div>}
    </div>
  );
}

/* Page header ------------------------------------------------------------- */

export function PageHeader({
  eyebrow,
  title,
  children,
  variant = "cream",
}: {
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  variant?: SectionVariant;
}) {
  return (
    <Section variant={variant} className="border-b border-line">
      {eyebrow && <Eyebrow className="mb-4 text-accent">{eyebrow}</Eyebrow>}
      <h1 className="t-h1 max-w-[18ch]">{title}</h1>
      {children && <div className="mt-6 max-w-[60ch] text-lg opacity-90">{children}</div>}
    </Section>
  );
}

/* Card ---------------------------------------------------------------- */

export function Card({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <div className={`min-w-0 rounded-2xl border border-line bg-card p-6 md:p-8 ${className}`}>{children}</div>
  );
}
