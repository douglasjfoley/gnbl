import type { Metadata } from "next";
import { tridentsInterest } from "@/app/actions";
import { InquiryForm, type Field } from "@/components/InquiryForm";
import { INTEREST_FIELDS, TriHeader } from "@/components/tridents";
import { Button, Card, Eyebrow, Section } from "@/components/ui";
import { getDates, getSite, getTridents } from "@/lib/content";
import { longDate } from "@/lib/format";

export const metadata: Metadata = { title: "Tryouts", description: "Great Neck Tridents tryouts: dates, check-in windows, what to bring and how selection works." };

export default function TryoutsPage() {
  const dates = getDates();
  const tri = getTridents();
  const site = getSite();
  return (
    <>
      <TriHeader id="TRI-03" eyebrow="Tryouts" title="Tryouts for 8U to 14U.">
        Dates, check-in windows, what to bring and how selection works.
      </TriHeader>
      <Section>
        <div className="grid gap-5 lg:grid-cols-3">
          <Card>
            <h2 className="t-h3">Dates</h2>
            <ul className="mt-4 space-y-2 text-[15px]">
              {dates.tridentsTryouts.map((t) => (
                <li key={t.ageGroup + t.date}>
                  <b>{t.ageGroup}</b>: {longDate(t.date)}
                  <span className="block text-muted">{t.location}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <h2 className="t-h3">Check-in by last name</h2>
            <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-[15px]">
              {tri.checkIn.map((c) => (
                <div key={c.lastNames} className="contents">
                  <dt className="font-semibold">{c.lastNames}</dt>
                  <dd className="text-muted">{c.window || "Time to be announced"}</dd>
                </div>
              ))}
            </dl>
          </Card>
          <Card>
            <h2 className="t-h3">What to bring</h2>
            <ul className="mt-4 list-disc space-y-1.5 pl-5 text-[15px] text-muted">
              {tri.whatToBring.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          </Card>
        </div>
        <Card className="mt-5">
          <h2 className="t-h3">How selection works</h2>
          <p className="mt-3 text-muted">{tri.selection}</p>
          <Button href={site.registration.portal} variant="tridents" className="mt-6">
            Register for tryouts ({site.registration.platform})
          </Button>
        </Card>
      </Section>
      <Section id="interest" variant="cream" className="scroll-mt-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="min-w-0">
            <Eyebrow className="mb-3 text-columbia-lt">Tryout interest</Eyebrow>
            <h2 className="t-h2">Not ready to register yet?</h2>
            <p className="mt-5 text-lg text-white/90">Send us your player&rsquo;s details and we&rsquo;ll email you as soon as dates are set.</p>
          </div>
          <InquiryForm action={tridentsInterest} fields={INTEREST_FIELDS as unknown as Field[]} submitLabel="Send" variant="tridents" />
        </div>
      </Section>
    </>
  );
}
