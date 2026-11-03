import type { Metadata } from "next";
import Link from "next/link";
import { LeagueAgeCalculator } from "@/components/LeagueAgeCalculator";
import { Button, Eyebrow, PageHeader, Section, SectionHead, Steps } from "@/components/ui";
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
  const platform = site.registration.platform;

  const window =
    dates.registrationOpens && dates.registrationCloses
      ? `Registration opens ${longDate(dates.registrationOpens)} and closes ${longDate(dates.registrationCloses)}.`
      : "Registration dates will be announced here and by email.";

  const steps = [
    { title: "Confirmation email", body: `${platform} emails a confirmation as soon as you finish.` },
    { title: "Tryout or draft date", body: "Mustang and up hold tryouts, then a draft. Pinto is auto-drafted. Fawn and Shetland are placed on teams." },
    { title: "Coach contact", body: "Your coach reaches out once teams are set." },
    { title: "Uniform pickup", body: "Your division director shares the pickup date and place." },
    { title: "Opening Day", body: `${dates.openingDay ? longDate(dates.openingDay) : "Date to be announced"}, at 2509 Shorehaven Drive.` },
  ];

  const handoff = (
    <div className="rounded-[22px] border border-white/15 bg-white/[0.06] p-7 backdrop-blur-sm md:p-8">
      <p className="font-display text-lg font-bold">Ready to register?</p>
      <p className="t-small mt-2 text-white/75">
        Registration runs through {platform}. You&rsquo;ll sign in or create a free account there.
      </p>
      <Button href={site.registration.portal} arrow className="mt-6 w-full">
        Continue to {platform}
      </Button>
    </div>
  );

  return (
    <>
      <PageHeader eyebrow="Register" title={`Register for ${dates.season}`} aside={handoff}>
        {window} League age is your player&rsquo;s age on {fullDate(dates.leagueAgeDate)}.
      </PageHeader>

      <Section>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 lg:col-span-6">
            <Eyebrow>After you register</Eyebrow>
            <h2 className="t-h2 mt-4">What happens next.</h2>
            <Steps items={steps} className="mt-10" />
          </div>
          <div className="min-w-0 lg:col-span-6">
            <Eyebrow>Fees</Eyebrow>
            <h2 className="t-h2 mt-4">Fees by division.</h2>
            <div className="card mt-10 overflow-hidden">
              <table className="w-full text-left text-[15px]">
                <thead>
                  <tr className="border-b border-line text-[12px] tracking-[0.08em] text-muted uppercase">
                    <th scope="col" className="px-6 py-4 font-semibold">Division</th>
                    <th scope="col" className="px-6 py-4 font-semibold">Ages</th>
                    <th scope="col" className="px-6 py-4 text-right font-semibold">Fee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {divisions.map((d) => (
                    <tr key={d.id}>
                      <th scope="row" className="px-6 py-3.5 font-display font-bold">{d.name}</th>
                      <td className="px-6 py-3.5 tabular-nums text-muted">{range(d.ages)}</td>
                      <td className="px-6 py-3.5 text-right">{d.fee || <span className="text-muted">To be announced</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Section>

      <Section variant="cream">
        <SectionHead
          eyebrow="Which division?"
          title="Find your player's division."
          lead="The registration system places your player automatically. This is just so you know before you start."
        />
        <LeagueAgeCalculator leagueAgeDate={dates.leagueAgeDate} season={dates.season} />
      </Section>

      <Section tight>
        <div className="panel flex flex-col gap-8 rounded-[22px] p-8 md:flex-row md:items-center md:justify-between md:p-12">
          <div>
            <h2 className="t-h2">Ready when you are.</h2>
            <p className="t-small mt-3 max-w-[60ch] text-white/75">
              Coaching or volunteering?{" "}
              <Link href="/get-involved#volunteer" className="font-semibold text-white underline underline-offset-4">
                Register as a volunteer
              </Link>
              . Refunds follow the{" "}
              <Link href="/policies#refund" className="font-semibold text-white underline underline-offset-4">
                refund policy
              </Link>
              . Questions:{" "}
              <a href={`mailto:${site.email.registrar}`} className="font-semibold text-white underline underline-offset-4">
                {site.email.registrar}
              </a>
            </p>
          </div>
          <Button href={site.registration.portal} arrow className="shrink-0">
            Continue to {platform}
          </Button>
        </div>
      </Section>
    </>
  );
}
