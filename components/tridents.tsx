import type { ReactNode } from "react";
import { ImageHero } from "./ImageHero";
import { Eyebrow } from "./ui";

export const PILLARS: [string, string][] = [
  ["Develop", "Position work, live arms, game IQ."],
  ["Compete", "Sunday select against PONY Elite and AAU clubs."],
  ["Move up", "To school ball and true travel. We are the launch point."],
];

export function Pillars() {
  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {PILLARS.map(([t, s]) => (
        <li key={t} className="card p-7 md:p-8">
          <span aria-hidden className="mb-4 block h-1 w-10 rounded bg-columbia" />
          <h3 className="t-h3">{t}</h3>
          <p className="mt-2 text-muted">{s}</p>
        </li>
      ))}
    </ul>
  );
}

/** Interior Tridents page header. */
export function TriHeader({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <ImageHero id={id} alt="">
      <Eyebrow className="mb-4 text-columbia-lt">{eyebrow}</Eyebrow>
      <h1 className="t-h1 max-w-[18ch]">{title}</h1>
      {children && <div className="mt-5 max-w-[60ch] text-lg text-white/90">{children}</div>}
    </ImageHero>
  );
}


export const INTEREST_FIELDS = [
  { name: "parent", label: "Parent or guardian name", required: true, autoComplete: "name" },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
  { name: "player", label: "Player name", required: true },
  { name: "ageGroup", label: "Age group next season", type: "select", options: ["8U", "9U", "10U", "11U", "12U", "13U", "14U"], required: true },
  { name: "positions", label: "Primary positions" },
  { name: "notes", label: "Anything we should know?", type: "textarea" },
] as const;
