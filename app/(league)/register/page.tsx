import type { Metadata } from "next";
import Link from "next/link";
import { LeagueAgeCalculator } from "@/components/LeagueAgeCalculator";
import { Button, Card, PageHeader, Section, SectionHead } from "@/components/ui";
import { getDates, getDivisions, getSite } from "@/lib/content";
import { fullDate, longDate, range } from "@/lib/format";

export const metadata: Metadata = {
  title: "Register",
  description: "Register for Spring 2027 at Great Neck Baseball League: dates, fees by division, the league-age calculator and what happens next.",
};

export default function RegisterPage() {
  const site = getSite();
  const dates = getDates();
  const divisions = getDivisions();

  const window =
    dates.registrationOpens && dates.registrationCloses
      ? `Registration opens ${longDate(dates.registrationOpens)} and closes ${longDate(dates.registrationCloses)}.`
      : "Registration dates will be announced here and by email.";

  const steps = [
    ["Confirmation email", "Stack Sports emails a confirmation as soon as you finish."],
    ["Tryout or draft date", "Mustang and up hold tryouts, then a draft. Pinto is auto-drafted. Fawn and Shetland are placed on teams."],
    ["Coach contact", "Your coach reaches out once teams are set."],
    ["Uniform pickup", "Your division director shares the pickup date and place."],
    ["Opening Day", `${dates.openingDay ? longDate(dates.openingDay) : "Date to be announced"}, at 2509 Shorehaven Drive.`],
  ];

  return (
    <>
      <PageHeader eyebrow="Register" title={`Register for ${dates.season}`}>
        <p>
          {window} League age is your player&rsquo;s age on {fullDate(dates.leagueAgeDate)}.
        </p>
        <p className="mt-3 text-muted">
          Registration runs through Stack Sports. You&rsquo;ll be asked to sign in or create a free account there, so
          here is everything you need to know first.
        </p>
      </PageHeader>

      <Section>
        <SectionHead eyebrow="Fees" title="Fees by division." />
        <div className="overflow-hidden rounded-2xl border border-line bg-card">
          <table className="w-full text-left text-[15px]">
            <thead className="bg-surface font-display text-sm">
              <tr>
                <th scope="col" className="px-4 py-3 md:px-6">Division</th>
                <th scope="col" className="px-4 py-3 md:px-6">Ages</th>
                <th scope="col" className="px-4 py-3 md:px-6">Fee</th>
              </tr>
            </thead>
            <tbody>
              {divisions.map((d) => (
                <tr key={d.id} className="border-t border-line">
                  <th scope="row" className="px-4 py-3 font-semibold md:px-6">{d.name}</th>
                  <td className="px-4 py-3 tabular-nums md:px-6">{range(d.ages)}</td>
                  <td className="px-4 py-3 md:px-6">{d.fee || <span className="text-muted">Fee to be announced</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section variant="cream">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="min-w-0">
            <SectionHead eyebrow="Which division?" title="Find your player's division." />
            <LeagueAgeCalculator leagueAgeDate={dates.leagueAgeDate} season={dates.season} className="!bg-card border border-line" />
          </div>
          <div className="min-w-0">
            <SectionHead eyebrow="After you register" title="What happens next." />
            <ol className="space-y-4">
              {steps.map(([t, s], i) => (
                <li key={t} className="grid grid-cols-[40px_1fr] gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-red font-display font-extrabold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <b className="font-display">{t}</b>
                    <p className="text-[15px] text-muted">{s}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <Section>
        <Card className="text-center">
          <h2 className="t-h2">Ready to register?</h2>
          <div className="mt-6">
            <Button href={site.registration.portal}>Continue to registration (Stack Sports)</Button>
          </div>
          <p className="mt-6 text-[15px] text-muted">
            Coaching or volunteering?{" "}
            <Link href="/get-involved#volunteer" className="font-semibold text-accent underline underline-offset-4">
              Register as a volunteer
            </Link>
            .
            <br />
            Refunds follow the league&rsquo;s{" "}
            <Link href="/policies#refund" className="font-semibold text-accent underline underline-offset-4">
              refund policy
            </Link>
            . Questions go to{" "}
            <a href={`mailto:${site.email.registrar}`} className="font-semibold text-accent underline underline-offset-4">
              {site.email.registrar}
            </a>
            .
          </p>
        </Card>
      </Section>
    </>
  );
}
