import type { Metadata } from "next";
import { TriHeader } from "@/components/tridents";
import { Button, Section } from "@/components/ui";
import { getSite, getTridents } from "@/lib/content";

export const metadata: Metadata = { title: "Teams", description: "Great Neck Tridents teams, 8U to 14U: coaches, coordinators and schedules." };

const tbd = (v: string) => v || "To be announced";

export default function TeamsPage() {
  const { teams } = getTridents();
  const site = getSite();
  return (
    <>
      <TriHeader id="TRI-02" eyebrow="Teams" title="Seven teams, 8U to 14U.">
        Sunday select under PONY rules. Every team has a head coach and a coordinator who is your first contact.
      </TriHeader>
      <Section>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {teams.map((t) => (
            <li key={t.ageGroup} id={t.ageGroup.toLowerCase()} className="scroll-mt-24 card p-6">
              <h2 className="font-display text-4xl font-extrabold text-columbia-lt">{t.ageGroup}</h2>
              <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-[15px]">
                <dt className="font-semibold text-muted">Coach</dt>
                <dd>{tbd(t.coach)}</dd>
                <dt className="font-semibold text-muted">Coordinator</dt>
                <dd>{tbd(t.coordinator)}</dd>
                <dt className="font-semibold text-muted">Season</dt>
                <dd>{tbd(t.season)}</dd>
                <dt className="font-semibold text-muted">Schedule</dt>
                <dd>{tbd(t.schedule)}</dd>
              </dl>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-muted">
          Questions about a team? Email{" "}
          <a className="font-semibold text-accent underline underline-offset-4" href={`mailto:${site.email.tridents}`}>
            {site.email.tridents}
          </a>
          .
        </p>
        <Button href="/tridents/tryouts" variant="tridents" className="mt-6">
          Tryout details
        </Button>
      </Section>
    </>
  );
}
