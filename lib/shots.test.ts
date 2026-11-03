import { describe, expect, it } from "vitest";
import { matchesShot } from "./shots";

describe("matchesShot", () => {
  it("matches the primary file, not the -alt spare", () => {
    expect(matchesShot("HOME-01-complex-golden-hour.jpg", "HOME-01")).toBe(true);
    expect(matchesShot("HOME-01-alt-complex-elevated.jpg", "HOME-01")).toBe(false);
  });
  it("finds the spare only when it is asked for explicitly", () => {
    expect(matchesShot("HOME-01-alt-complex-elevated.jpg", "HOME-01-alt")).toBe(true);
    expect(matchesShot("HOME-01-complex-golden-hour.jpg", "HOME-01-alt")).toBe(false);
  });
  it("handles the files still to come the same way", () => {
    expect(matchesShot("TRI-01-coach-fence-dusk.jpg", "TRI-01")).toBe(true);
    expect(matchesShot("TRI-01-alt-dugout-rail-dusk.jpg", "TRI-01")).toBe(false);
    expect(matchesShot("CHAMP-01-team-line.jpg", "CHAMP-01")).toBe(true);
    expect(matchesShot("CHAMP-01-alt-buddy-first-base.jpg", "CHAMP-01")).toBe(false);
  });
  it("does not confuse neighbouring IDs or other file types", () => {
    expect(matchesShot("HOME-010-x.jpg", "HOME-01")).toBe(false);
    expect(matchesShot("HOME-01-notes.txt", "HOME-01")).toBe(false);
    expect(matchesShot("HOME-01.webp", "HOME-01")).toBe(true);
  });
});
