"use client";
import Link from "next/link";
import { useId, useState } from "react";
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
  const cutoffLabel = cutoff.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

  let result: React.ReactNode = "Enter a birthdate to see the division.";
  if (/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
    const birth = parseISODate(dob);
    const age = leagueAge(birth, cutoff);
    const div = divisionFor(birth, cutoff);
    result = div ? (
      <>
        League age {age}:{" "}
        <Link href={`/programs#${div.id}`} className="text-accent underline underline-offset-4">
          {div.name}
        </Link>
      </>
    ) : age < 3 ? (
      `League age ${age}. Fawn starts at 3, so check back next season.`
    ) : (
      <>
        League age {age}. Ask the{" "}
        <Link href="/contact" className="underline underline-offset-4">
          registrar
        </Link>
        , or look at{" "}
        <Link href="/champions" className="underline underline-offset-4">
          Champions
        </Link>{" "}
        (ages 4 to 23).
      </>
    );
  }

  return (
    <form
      className={`flex flex-wrap items-center gap-x-5 gap-y-3 rounded-2xl bg-surface p-5 md:p-6 ${className}`}
      onSubmit={(e) => e.preventDefault()}
    >
      <label htmlFor={id} className="text-[15px] font-semibold">
        Not sure which division? Enter a birthdate
      </label>
      <input
        id={id}
        type="date"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        className="h-11 rounded-lg border border-line bg-card px-3 text-fg"
      />
      <output htmlFor={id} aria-live="polite" className="min-w-[16ch] font-display text-lg font-bold">
        {result}
      </output>
      <small className="basis-full text-sm text-muted">
        {season}: based on age as of {cutoffLabel}. The registration system places your player automatically.
      </small>
    </form>
  );
}
