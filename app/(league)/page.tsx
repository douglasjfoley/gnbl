import {
  Checklist,
  Chips,
  CtaCardPair,
  DivisionCard,
  KeyDates,
  Media,
  NewsCard,
  Pathway,
  ProofBar,
  SplitFeature,
  SponsorGrid,
  StatusChip,
} from "@/components/blocks";
import { ImageSlot, PanelStat } from "@/components/ImageSlot";
import { LeagueAgeCalculator } from "@/components/LeagueAgeCalculator";
import { Mark } from "@/components/Mark";
import { ArrowLink, Button, Eyebrow, Section, SectionHead } from "@/components/ui";
import { VideoHero } from "@/components/VideoHero";
import { getAgeDivisions, getDates, getDivisions, getPathway, getPosts, getSite, getSponsors } from "@/lib/content";
import { fullDate } from "@/lib/format";

export default function Home() {
  const site = getSite();
  const dates = getDates();
  const sponsors = getSponsors();
  const posts = getPosts().slice(0, 3);

  return (
    <>
      <VideoHero id="HOME-V01">
        <div className="wrap pt-36 pb-[clamp(56px,7vw,96px)]">
          <div className="max-w-[920px]">
            <Eyebrow className="text-amber">Virginia Beach · PONY Baseball · 501(c)(3)</Eyebrow>
            <h1 className="t-display mt-6 max-w-[13ch]">{site.tagline}</h1>
            <p className="t-lead mt-7 max-w-[54ch] text-white/90">
              A developmental, mission-driven league for ages 3 to 18 on our own fields at Great Neck. From first swings, to
              All-Stars, to the Tridents, to Champions.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button href="/register" arrow>
                Register for {dates.season}
              </Button>
              <Button href="/programs" variant="secondary">
                Explore programs
              </Button>
            </div>
          </div>
          <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/15 pt-6 text-[15px] text-white/75">
            <StatusChip status={dates.fieldStatus} className="!bg-white/10" />
            <span>{site.address.fields}</span>
          </div>
        </div>
      </VideoHero>

      <ProofBar divisions={getDivisions().length} />

      <Section id="pathway">
        <SectionHead eyebrow="The pathway" title="From first swings to the next step." lead={site.positioning} />
        <Pathway steps={getPathway()} />
        <p className="mt-12 border-l-4 border-red pl-6 font-display text-[clamp(22px,2.2vw,30px)] leading-snug font-extrabold tracking-tight">
          We don&rsquo;t need to be the destination to be the launch point.
        </p>
      </Section>

      <Section id="divisions" variant="cream">
        <SectionHead
          eyebrow="Find your division"
          title="Every age has a place on the field."
          lead={`League age is your player's age on ${fullDate(dates.leagueAgeDate)}. Mustang and up hold tryouts and a draft so every team is balanced.`}
        />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {getAgeDivisions().map((d) => (
            <DivisionCard key={d.id} d={d} />
          ))}
        </div>
        <LeagueAgeCalculator leagueAgeDate={dates.leagueAgeDate} season={dates.season} className="mt-8" />
      </Section>

      <Section id="home-field">
        <SplitFeature
          media={
            <Media>
              <ImageSlot
                id="HOME-01"
                alt="The Great Neck Baseball League complex at golden hour"
                aspect="4/3"
                fallback={<PanelStat value="8" label="Fields at 2509 Shorehaven Drive" />}
              />
              <StatusChip status={dates.fieldStatus} detail="updated today" className="absolute top-5 left-5" />
            </Media>
          }
        >
          <Eyebrow>Our home field</Eyebrow>
          <h2 className="t-h2 mt-4">Most leagues borrow fields. We own our home.</h2>
          <p className="t-lead mt-6 text-muted">
            Eight fields sized for every age sit together at 2509 Shorehaven Drive beside Cox High School, with lights, batting
            cages, a concession stand and our own parking lot.
          </p>
          <Checklist
            className="mt-8"
            items={["Eight fields, Fawn to Pony", "Partners at Oceana and London Bridge", "Concessions every game day", "Live field status"]}
          />
          <div className="mt-10">
            <Button href="/facilities" arrow>
              Plan your visit
            </Button>
          </div>
        </SplitFeature>
      </Section>

      <Section id="champions" variant="amber">
        <SplitFeature
          reverse
          media={
            <Media>
              <ImageSlot
                id="HOME-02"
                alt="A Champions buddy guiding a player toward first base"
                aspect="4/3"
                fallback={<PanelStat value="4–23" label="Ages, every Saturday" />}
              />
            </Media>
          }
        >
          <Eyebrow className="text-ink">Champions</Eyebrow>
          <h2 className="t-h1 mt-4">Every kid plays here.</h2>
          <p className="t-lead mt-6">
            Our adaptive division for ages 4 to 23. Every Saturday, a buddy on the base paths, and at least one Tridents team on
            the field alongside.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/register" arrow>
              Register a Champion
            </Button>
            <Button href="/champions#buddies" variant="secondary">
              Be a Buddy
            </Button>
          </div>
        </SplitFeature>
      </Section>

      <section id="tridents" data-brand="tridents" className="relative isolate scroll-mt-16 overflow-hidden">
        <ImageSlot id="HOME-03" alt="" aspect="fill" sizes="100vw" className="-z-20" />
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(70% 90% at 85% 40%, rgb(91 155 213 / .28), transparent 60%), linear-gradient(90deg, rgb(var(--overlay) / .96) 0%, rgb(var(--overlay) / .86) 55%, rgb(var(--overlay) / .55) 100%)",
          }}
        />
        <div className="wrap section-pad grid items-center gap-12 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-8">
            <Eyebrow className="text-columbia">Great Neck Tridents</Eyebrow>
            <p className="mt-3 text-[13px] font-semibold tracking-[0.08em] text-columbia-lt/85 uppercase">
              A Great Neck Baseball League program
            </p>
            <h2 className="t-h1 mt-6 max-w-[16ch]">Ready for the next level? Meet the Tridents.</h2>
            <p className="t-lead mt-6 max-w-[54ch] text-white/85">
              The highest level of play inside Great Neck. A Sunday select program, 8U to 14U, PONY-governed, with the same
              coaches and community. Built to make players better and move them up.
            </p>
            <ul className="mt-10 grid gap-6 sm:grid-cols-3">
              {[
                ["Develop", "Position work, live arms, game IQ"],
                ["Compete", "Sunday select and regional tournaments"],
                ["Move up", "The front door to school ball and true travel"],
              ].map(([t, s]) => (
                <li key={t} className="border-t-2 border-columbia pt-4">
                  <b className="block font-display text-lg font-extrabold">{t}</b>
                  <span className="t-small mt-1 block text-white/75">{s}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Button href="/tridents" variant="tridents" arrow>
                Explore the Tridents
              </Button>
            </div>
          </div>
          <div className="hidden justify-center lg:col-span-4 lg:flex">
            <Mark name="tridents-crest" size={280} className="shadow-2xl shadow-black/40" />
          </div>
        </div>
      </section>

      <Section id="involve">
        <SectionHead
          eyebrow="Get involved"
          title="It takes a village to run a season."
          lead="Volunteers and local businesses keep registration affordable and the fields in shape."
        />
        <CtaCardPair
          cards={[
            {
              image: "INV-01",
              eyebrow: "Volunteer",
              title: "Coach, rake a field, run the grill, be a buddy.",
              body: "No experience required. Three steps: register your role, complete a background check, finish the online training.",
              extra: <Chips items={["Coach", "Team parent", "Champions buddy", "Field crew", "Concessions"]} />,
              cta: { href: "/get-involved#volunteer", label: "Volunteer with us" },
            },
            {
              image: "INV-02",
              eyebrow: "Sponsor",
              title: "Put your business on the fence where the whole neighborhood sees it.",
              body: `Over ${Math.floor(sponsors.sponsors.length / 10) * 10} local businesses back Great Neck Baseball League. Every dollar is tax-deductible.`,
              extra: <Chips items={sponsors.tiers.map((t) => `${t.name} tier`)} />,
              cta: { href: "/get-involved#sponsor", label: "Become a sponsor" },
            },
          ]}
        />
        <div className="mt-16">
          <SponsorGrid data={sponsors} tiers={["corporate", "division"]} />
          <div className="mt-6">
            <ArrowLink href="/get-involved#sponsors">See all {sponsors.sponsors.length} sponsors</ArrowLink>
          </div>
        </div>
      </Section>

      <Section id="news" variant="cream">
        <div className="grid items-start gap-12 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-7">
            <Eyebrow>News</Eyebrow>
            <h2 className="t-h2 mt-4">From the league office.</h2>
            <div className="mt-8 border-b border-line">
              {posts.map((p) => (
                <NewsCard key={p.slug} post={p} />
              ))}
            </div>
            <div className="mt-8">
              <ArrowLink href="/news">All news</ArrowLink>
            </div>
          </div>
          <div className="lg:col-span-5">
            <KeyDates dates={dates} boardMeeting={site.boardMeeting} />
          </div>
        </div>
      </Section>
    </>
  );
}
