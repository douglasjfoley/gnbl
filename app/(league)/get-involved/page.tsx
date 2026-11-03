import type { Metadata } from "next";
import { sponsorInquiry } from "@/app/actions";
import { Chips, Media, SplitFeature, SponsorGrid } from "@/components/blocks";
import { ImageSlot, PanelStat } from "@/components/ImageSlot";
import { InquiryForm } from "@/components/InquiryForm";
import { Button, Card, Eyebrow, PageHeader, Section, SectionHead, Steps } from "@/components/ui";
import { getSite, getSponsors } from "@/lib/content";

export const metadata: Metadata = {
  title: "Get Involved",
  description: "Volunteer as a coach, team parent, Champions buddy or field crew, or sponsor Great Neck Baseball League. Every dollar is tax-deductible.",
};

const ROLES = ["Coach", "Assistant coach", "Team parent", "Champions buddy", "Field maintenance", "Concessions", "Fundraising", "Tradesmen"];

export default function GetInvolvedPage() {
  const site = getSite();
  const sponsors = getSponsors();
  const l = site.links;
  const steps = [
    {
      t: "Register for your role",
      d: (
        <>
          Sign up on{" "}
          <a href={l.volunteerRegistration} className="font-semibold text-accent underline underline-offset-4">{site.registration.platform}</a>, pick the
          program, then the role. To be a Champions buddy, choose Champions, then Buddy Volunteer.
        </>
      ),
    },
    {
      t: "Background check",
      d: (
        <>
          Everyone 18 or over completes a{" "}
          <a href={l.backgroundCheck} className="font-semibold text-accent underline underline-offset-4">background check</a>.
        </>
      ),
    },
    {
      t: "Training",
      d: (
        <>
          If you&rsquo;re 18 or over and haven&rsquo;t already, complete and send to your Division Director:{" "}
          <a href={l.naysBullying} className="font-semibold text-accent underline underline-offset-4">NAYS bullying prevention</a>,{" "}
          <a href={l.naysConcussion} className="font-semibold text-accent underline underline-offset-4">NAYS concussion training</a> and the{" "}
          <a href={l.mandatedReporter} className="font-semibold text-accent underline underline-offset-4">Virginia mandated reporter course (CWS5692)</a>.
        </>
      ),
    },
  ];

  return (
    <>
      <PageHeader eyebrow="Get involved" title="It takes a village to run a season.">
        <p>No experience required. Volunteers coach, keep score, rake fields, run the grill and walk the base paths with our Champions.</p>
      </PageHeader>

      <Section id="volunteer">
        <SplitFeature
          media={
            <Media>
              <ImageSlot id="INV-01" alt="A parent volunteer raking the infield at sunrise" aspect="4/3" />
            </Media>
          }
        >
          <Eyebrow>Volunteer</Eyebrow>
          <h2 className="t-h2 mt-4">Three steps to the field.</h2>
          <div className="mt-6">
            <Chips items={ROLES} />
          </div>
          <Steps className="mt-9" items={steps.map((s) => ({ title: s.t, body: s.d }))} />
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={l.volunteerRegistration} arrow>Volunteer with us</Button>
            <Button href={`mailto:${site.email.volunteer}`} variant="secondary">Email the volunteer director</Button>
          </div>
        </SplitFeature>
      </Section>

      <Section id="sponsor" variant="cream">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 lg:col-span-7">
            <Eyebrow>Sponsor</Eyebrow>
            <h2 className="t-h2 mt-4">Put your business on the fence where the whole neighborhood sees it.</h2>
            <p className="t-lead mt-6 text-muted">
              Sponsorship keeps registration affordable and the fields in shape. GNBL is a 501(c)(3), so every dollar is tax-deductible.
              Pay by Venmo, by check to P.O. Box 3004, Virginia Beach, VA 23454, or in person at the complex.
            </p>
            <ul className="mt-9 grid gap-4 sm:grid-cols-2">
              {sponsors.tiers.map((t) => (
                <li key={t.id} className="card p-6">
                  <h3 className="font-display text-lg font-bold">{t.name}</h3>
                  {t.benefits.length ? (
                    <ul className="mt-2 list-disc pl-5 text-[15px] text-muted">
                      {t.benefits.map((b) => <li key={b}>{b}</li>)}
                    </ul>
                  ) : (
                    <p className="mt-1 text-[15px] text-muted">Benefits and pricing on request.</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <Media className="self-start lg:col-span-5">
            <ImageSlot id="INV-02" alt="Sponsor banners along the outfield fence" aspect="4/3" fallback={<PanelStat value={String(sponsors.sponsors.length)} label="Local businesses behind the league" />} />
          </Media>
        </div>
      </Section>

      <Section id="sponsors">
        <SectionHead eyebrow="Thank you" title="Our sponsors." lead="Every one of these businesses helps keep registration affordable and the fields in shape." />
        <SponsorGrid data={sponsors} />
      </Section>

      <Section variant="cream" id="inquiry">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="min-w-0">
            <Eyebrow className="mb-3">Sponsor inquiry</Eyebrow>
            <h2 className="t-h2">Let&rsquo;s talk.</h2>
            <p className="mt-5 text-lg">
              Tell us a little about your business and our sponsorship director will follow up. Or email{" "}
              <a href={`mailto:${site.email.sponsorship}`} className="font-semibold text-accent underline underline-offset-4">{site.email.sponsorship}</a>.
            </p>
          </div>
          <Card>
            <InquiryForm
              action={sponsorInquiry}
              submitLabel="Send inquiry"
              fields={[
                { name: "name", label: "Your name", required: true, autoComplete: "name" },
                { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
                { name: "business", label: "Business", autoComplete: "organization" },
                { name: "tier", label: "Tier of interest", type: "select", options: [...sponsors.tiers.map((t) => t.name), "Not sure yet"] },
                { name: "message", label: "Message", type: "textarea" },
              ]}
            />
          </Card>
        </div>
      </Section>
    </>
  );
}
