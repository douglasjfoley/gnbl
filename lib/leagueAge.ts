import type { Division } from "./types";
import divisionsJson from "@/content/data/divisions.json";

const AGE_DIVISIONS = (divisionsJson as Division[]).filter((d) => d.id !== "champions");

/** Parse "YYYY-MM-DD" as a calendar date with no time zone drift. */
export function parseISODate(s: string): Date {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

/** A player's league age: their age on the league-age date. */
export function leagueAge(dob: Date, leagueAgeDate: Date): number {
  let age = leagueAgeDate.getUTCFullYear() - dob.getUTCFullYear();
  const beforeBirthday =
    leagueAgeDate.getUTCMonth() < dob.getUTCMonth() ||
    (leagueAgeDate.getUTCMonth() === dob.getUTCMonth() &&
      leagueAgeDate.getUTCDate() < dob.getUTCDate());
  if (beforeBirthday) age--;
  return age;
}

/** The division (Fawn to Palomino) for a birthdate, or null when out of range. */
export function divisionFor(
  dob: Date,
  leagueAgeDate: Date,
  divisions: Division[] = AGE_DIVISIONS,
): Division | null {
  const age = leagueAge(dob, leagueAgeDate);
  return (
    divisions.find((d) => {
      const [min, max] = d.ages.split("-").map(Number);
      return age >= min && age <= max;
    }) ?? null
  );
}
