"use client";
import Link from "next/link";
import { useId, useState } from "react";
import { ArrowRight } from "lucide-react";
import { divisionFor, leagueAge, parseISODate } from "@/lib/leagueAge";

/** Birthdate in, division out. League age is the player's age on the league-age date. */
export function LeagueAgeCalculator({
  leagueAgeDate,
  season,
  className = "",
}: {
  leagueAgeDate: string;
  season: string;
  className?: string;
}) {
  const [dob, setDob] = useState("");
  const id = useId();
  const cutoff = parseISODate(leagueAgeDate);
  const cutoffLabel = cutoff.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

  let label = "Your division";
  let headline: React.ReactNode = "Enter a birthdate";
  let note: React.ReactNode = `Based on age as of ${cutoffLabel}.`;

  if (/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
    const birth = parseISODate(dob);
    const age = leagueAge(birth, cutoff);
    const div = divisionFor(birth, cutoff);
    label = `League age ${age}`;
    if (div) {
      headline = div.name;
      note = (
        <Link href={`/programs#${div.id}`} className="inline-flex items-center gap-1.5 font-semibold text-amber hover:underline">
          About {div.name} <ArrowRight size={15} aria-hidden />
        </Link>
      );
    } else if (age < 3) {
      headline = "Not yet";
      note = "Fawn starts at league age 3, so check back next season.";
    } else {
      headline = "Talk to us";
      note = (
        <>
          Ask the{" "}
          <Link href="/contact" className="underline underline-offset-4">
            registrar
          </Link>
          , or see{" "}
          <Link href="/champions" className="underline underline-offset-4">
            Champions
          </Link>{" "}
          (ages 4 to 23).
        </>
      );
    }
  }

  return (
    <form className={`card @container overflow-hidden ${className}`} onSubmit={(e) => e.preventDefault()}>
      <div className="grid @2xl:grid-cols-[1.25fr_1fr]">
      <div className="p-7 md:p-9">
        <h3 className="t-h3">Not sure which division?</h3>
        <p className="t-small mt-2 text-muted">
          Enter your player&rsquo;s birthdate. {season} divisions use league age, your player&rsquo;s age on {cutoffLabel}.
        </p>
        <label htmlFor={id} className="mt-6 block text-[13px] font-semibold tracking-[0.08em] text-muted uppercase">
          Birthdate
        </label>
        <input
          id={id}
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="mt-2 h-14 w-full max-w-xs rounded-xl border border-line bg-bg px-4 text-lg text-fg"
        />
      </div>
      <output htmlFor={id} aria-live="polite" className="panel flex flex-col justify-center p-7 md:p-9">
        <span className="eyebrow text-amber">{label}</span>
        <span className="stat mt-3 text-[clamp(36px,4vw,52px)]">{headline}</span>
        <span className="mt-3 text-[15px] text-white/80">{note}</span>
      </output>
      </div>
    </form>
  );
}
