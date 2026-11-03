import { describe, expect, it } from "vitest";
import { divisionFor, leagueAge, parseISODate } from "./leagueAge";

const cutoff = parseISODate("2027-04-30");
const d = parseISODate;

describe("leagueAge", () => {
  it("counts a birthday on the cutoff date", () => {
    expect(leagueAge(d("2017-04-30"), cutoff)).toBe(10);
    expect(leagueAge(d("2017-05-01"), cutoff)).toBe(9);
  });
});

describe("divisionFor: the eight boundary dates", () => {
  // Each row: the youngest birthdate that still lands in the division (turns
  // the minimum age exactly on April 30, 2027), and one day younger, which
  // drops to the division below.
  const boundaries: [string, string, string | null][] = [
    ["2024-04-30", "Fawn", null],
    ["2022-04-30", "Shetland", "Fawn"],
    ["2020-04-30", "Pinto", "Shetland"],
    ["2018-04-30", "Mustang", "Pinto"],
    ["2016-04-30", "Bronco", "Mustang"],
    ["2014-04-30", "Pony", "Bronco"],
    ["2012-04-30", "Colt", "Pony"],
    ["2010-04-30", "Palomino", "Colt"],
  ];

  for (const [dob, division, dayAfter] of boundaries) {
    it(`${dob} is ${division}; a day later is ${dayAfter ?? "too young"}`, () => {
      expect(divisionFor(d(dob), cutoff)?.name).toBe(division);
      const next = new Date(d(dob).getTime() + 86_400_000);
      expect(divisionFor(next, cutoff)?.name ?? null).toBe(dayAfter);
    });
  }

  it("returns null for players over 18", () => {
    expect(divisionFor(d("2008-04-30"), cutoff)).toBeNull();
  });
});
