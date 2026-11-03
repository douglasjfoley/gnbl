import Link from "next/link";
import { tridentsInterest } from "@/app/actions";
import { SplitFeature } from "@/components/blocks";
import { ImageSlot, PanelStat } from "@/components/ImageSlot";
import { InquiryForm, type Field } from "@/components/InquiryForm";
import { Mark } from "@/components/Mark";
import { INTEREST_FIELDS, Pillars } from "@/components/tridents";
import { Button, Eyebrow, Section, SectionHead } from "@/components/ui";
import { VideoHero } from "@/components/VideoHero";
import { getDates, getSite, getTridents } from "@/lib/content";

const ARE = [
  "An elevated, more competitive level of play",
  "Governed by PONY rules and scope",
  "The same coaches and the same community",
  "The front door to the next step",
];
const ARENT = [
  "A true travel team",
  "A reason to leave rec ball",
  "A destination. When a player outgrows us, we help them get where they're going",
];

export default function TridentsHome() {
  const tri = getTridents();
  const dates = getDates();
  const site = getSite();

  return (
    <>
      <VideoHero id="TRI-V01">
        <div className="wrap pt-[clamp(72px,12vw,150px)] pb-[clamp(56px,8vw,96px)]">
          <Eyebrow className="mb-5 text-columbia-lt">Great Neck Tridents</Eyebrow>
          <h1 className="t-display max-w-[14ch]">The highest level of play inside Great Neck.</h1>
          <p className="mt-6 max-w-[52ch] text-[clamp(18px,2.2vw,23px)] text-white/95">
            Sunday select, 8U to 14U, PONY-governed. Built to make players better and move them up.
          </p>
          <div className="mt-9 flex flex-wrap gap-3.5">
            <Button href="#interest" variant="tridents">
              Tryout interest
            </Button>
            <Button href="/tridents/teams" variant="secondary">
              Meet the teams
            </Button>
          </div>
        </div>
      </VideoHero>

      <Section>
        <SectionHead eyebrow="What we do" title="Develop. Compete. Move up." eyebrowClass="text-columbia-lt" />
        <div className="mb-6 overflow-hidden rounded-[22px]">
          <ImageSlot id="TRI-01" alt="A coach at the fence pointing to the field while a player listens" aspect="2/1" sizes="(max-width: 1280px) 100vw, 1280px" fallback={<p className="max-w-[20ch] font-display text-[clamp(28px,3.6vw,52px)] leading-[1.05] font-extrabold tracking-tight">We don&rsquo;t need to be the destination to be the launch point.</p>} />
        </div>
        <Pillars />
      </Section>

      <Section variant="cream">
        <SectionHead eyebrow="Plainly" title="What the Tridents are, and aren't." eyebrowClass="text-columbia-lt" />
        <div className="grid gap-10 md:grid-cols-2">
          {[
            ["Are", ARE],
            ["Aren't", ARENT],
          ].map(([h, list]) => (
            <div key={h as string}>
              <h3 className="t-h3 mb-4 text-columbia-lt">The Tridents {h as string}</h3>
              <ul className="space-y-3 text-lg">
                {(list as string[]).map((i) => (
                  <li key={i} className="border-t border-line pt-3">
                    {i}.
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SplitFeature
          media={
            <div className="overflow-hidden rounded-[22px]">
              <ImageSlot id="TRI-02" alt="A Tridents team huddle from above" aspect="4/3" fallback={<PanelStat value="7" label="Teams, 8U to 14U" />} />
            </div>
          }
        >
          <Eyebrow className="mb-3 text-columbia-lt">Teams at a glance</Eyebrow>
          <h2 className="t-h2">Seven teams, 8U to 14U.</h2>
          <ul className="mt-6 grid grid-cols-4 gap-2.5 sm:grid-cols-7 md:grid-cols-4">
            {tri.teams.map((t) => (
              <li key={t.ageGroup}>
                <Link
                  href={`/tridents/teams#${t.ageGroup.toLowerCase()}`}
                  className="grid h-14 place-items-center card font-display font-extrabold hover:border-columbia"
                >
                  {t.ageGroup}
                </Link>
              </li>
            ))}
          </ul>
          <Button href="/tridents/teams" variant="secondary" className="mt-7">
            Coaches and schedules
          </Button>
        </SplitFeature>
      </Section>

      <Section variant="cream">
        <SplitFeature
          reverse
          media={
            <div className="overflow-hidden rounded-[22px]">
              <ImageSlot id="TRI-03" alt="Players waiting their turn at a tryout station" aspect="4/3" fallback={<PanelStat value="8U–14U" label="Tryouts every season" />} />
            </div>
          }
        >
          <Eyebrow className="mb-3 text-columbia-lt">Tryouts</Eyebrow>
          <h2 className="t-h2">Dates, check-in and how selection works.</h2>
          <p className="mt-5 text-lg text-white/90">
            {dates.tridentsTryouts.some((t) => t.date)
              ? "Tryout dates are set. Check-in runs by last name."
              : "Tryout dates are coming. Tell us you're interested and we'll email you the moment they're set."}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button href="/tridents/tryouts" variant="tridents">
              Tryout details
            </Button>
            <Button href={site.registration.portal} variant="secondary">
              Register for tryouts ({site.registration.platform})
            </Button>
          </div>
        </SplitFeature>
      </Section>

      <Section>
        <SplitFeature
          media={
            <div className="overflow-hidden rounded-[22px]">
              <ImageSlot id="CHAMP-03" alt="Tridents players high-fiving a Champions player" aspect="4/3" fallback={<PanelStat value="52" label="Saturdays a year at Champions" />} />
            </div>
          }
        >
          <Eyebrow className="mb-3 text-columbia-lt">Tridents at Champions</Eyebrow>
          <h2 className="t-h2">Every Saturday, one Tridents team at Champions.</h2>
          <p className="mt-5 text-lg text-white/90">
            Year-round, at least one Tridents team is on the field with our Champions division. Top to bottom, one
            organization.
          </p>
        </SplitFeature>
      </Section>

      <section className="relative isolate overflow-hidden">
        <ImageSlot id="BOTB-01" alt="" aspect="fill" tone="navy" sizes="100vw" className="-z-20" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[rgb(var(--overlay)/0.8)]" />
        <div className="wrap grid items-center gap-8 py-16 md:grid-cols-[auto_1fr] md:py-24">
          <Mark name="botb-2026" size={200} />
          <div className="min-w-0">
            <Eyebrow className="mb-3 text-gold">Battle of the Beach · {dates.battleOfTheBeach}</Eyebrow>
            <h2 className="t-h1">ONE BEACH • THREE DIVISIONS • ONE BATTLE</h2>
            <p className="mt-5 text-lg text-white/90">Pinto, Mustang and Bronco. Hosted by the Tridents in Virginia Beach.</p>
            <Button href="/tridents/battle-of-the-beach" variant="tridents" className="mt-7">
              Enter a team
            </Button>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="min-w-0">
            <Eyebrow className="mb-3 text-columbia-lt">FAQ</Eyebrow>
            <h2 className="t-h2">Cost, time and travel.</h2>
            <ul className="mt-6 space-y-4">
              {tri.faq.slice(0, 3).map((f) => (
                <li key={f.q} className="border-t border-line pt-4">
                  <b className="font-display">{f.q}</b>
                  <p className="mt-1 text-muted">{f.a}</p>
                </li>
              ))}
            </ul>
            <Button href="/tridents/faq" variant="secondary" className="mt-7">
              All questions
            </Button>
          </div>
          <div className="min-w-0">
            <div className="overflow-hidden rounded-[22px]">
              <ImageSlot id="TRI-05" alt="A player walking off the field toward high school lights" aspect="4/3" fallback={<PanelStat value="Next" label="Middle school, high school, true travel" />} />
            </div>
            <h2 className="t-h3 mt-6">The next step</h2>
            <p className="mt-2 text-muted">
              Middle school, high school and true travel programs. When a player outgrows what we offer, we help them
              get where they&rsquo;re going. We don&rsquo;t need to be the destination to be the launch point.
            </p>
          </div>
        </div>
      </Section>

      <Section id="interest" variant="cream" className="scroll-mt-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="min-w-0">
            <Eyebrow className="mb-3 text-columbia-lt">Tryout interest</Eyebrow>
            <h2 className="t-h2">Thinking about the Tridents?</h2>
            <p className="mt-5 text-lg text-white/90">
              Tell us about your player. We&rsquo;ll email tryout dates, check-in times and what to bring.
            </p>
          </div>
          <InquiryForm action={tridentsInterest} fields={INTEREST_FIELDS as unknown as Field[]} submitLabel="Send" variant="tridents" />
        </div>
      </Section>
    </>
  );
}
