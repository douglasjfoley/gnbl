import {
  Chips,
  CtaCardPair,
  DivisionCard,
  KeyDates,
  NewsCard,
  Pathway,
  ProofBar,
  SplitFeature,
  SponsorGrid,
  StatusChip,
} from "@/components/blocks";
import { ImageSlot } from "@/components/ImageSlot";
import { LeagueAgeCalculator } from "@/components/LeagueAgeCalculator";
import { Mark } from "@/components/Mark";
import { fullDate } from "@/lib/format";
import { Button, Eyebrow, Section, SectionHead } from "@/components/ui";
import { VideoHero } from "@/components/VideoHero";
import {
  getAgeDivisions,
  getDates,
  getDivisions,
  getPathway,
  getPosts,
  getSite,
  getSponsors,
} from "@/lib/content";

export default function Home() {
  const site = getSite();
  const dates = getDates();
  const sponsors = getSponsors();

  return (
    <>
      <VideoHero id="HOME-V01">
        <div className="wrap pt-[clamp(72px,12vw,150px)] pb-[clamp(56px,8vw,96px)]">
          <Eyebrow className="mb-5 text-amber">Virginia Beach · PONY Baseball · 501(c)(3)</Eyebrow>
          <h1 className="t-display max-w-[12ch]">{site.tagline}</h1>
          <p className="mt-6 max-w-[52ch] text-[clamp(18px,2.2vw,23px)] text-white/95">
            A developmental, mission-driven league for ages 3 to 18 on our own fields at Great Neck. From first
            swings, to All-Stars, to the Tridents, to Champions.
          </p>
          <div className="mt-9 flex flex-wrap gap-3.5">
            <Button href="/register">Register for {dates.season}</Button>
            <Button href="/programs" variant="secondary">
              Explore programs
            </Button>
          </div>
          <StatusChip status={dates.fieldStatus} detail={site.address.fields.split(",")[0]} className="mt-6 !bg-white/12" />
        </div>
      </VideoHero>

      <ProofBar divisions={getDivisions().length} />

      <Section id="pathway">
        <SectionHead eyebrow="The pathway" title="From first swings to the next step." lead={site.positioning} />
        <Pathway steps={getPathway()} />
        <p className="mt-8 font-display text-xl font-bold md:text-2xl">
          We don&rsquo;t need to be the destination to be the launch point.
        </p>
      </Section>

      <Section id="divisions" variant="cream">
        <SectionHead
          eyebrow="Find your division"
          title="Every age has a place on the field."
          lead={`League age is your player's age on ${fullDate(dates.leagueAgeDate)}. Teams are drafted after tryouts so every division stays balanced.`}
        />
        <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
          {getAgeDivisions().map((d) => (
            <DivisionCard key={d.id} d={d} />
          ))}
        </div>
        <LeagueAgeCalculator leagueAgeDate={dates.leagueAgeDate} season={dates.season} className="mt-7 !bg-card border border-line" />
      </Section>

      <Section id="home-field">
        <SplitFeature
          media={
            <div className="relative overflow-hidden rounded-2xl">
              <ImageSlot id="HOME-01" alt="The Great Neck Baseball complex at golden hour" aspect="4/3" />
              <StatusChip status={dates.fieldStatus} detail="updated today" className="absolute bottom-4 left-4" />
            </div>
          }
        >
          <Eyebrow className="mb-3">Our home field</Eyebrow>
          <h2 className="t-h2">Most leagues borrow fields. We own our home.</h2>
          <p className="mt-5 text-lg">
            Eight fields sized for every age sit together at 2509 Shorehaven Drive beside Cox High School. Lights,
            batting cages, a concession stand and our own parking lot, kept up by the families who play here.
          </p>
          <ul className="mt-5 grid gap-x-6 gap-y-2 text-[15px] font-semibold sm:grid-cols-2">
            {["Eight fields, Fawn to Pony", "Partner fields at Oceana and London Bridge", "Concessions every game day", "Live field status"].map(
              (f) => (
                <li key={f} className="flex items-center gap-2.5">
                  <i aria-hidden className="h-2 w-2 shrink-0 rounded-sm bg-red" />
                  {f}
                </li>
              ),
            )}
          </ul>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button href="/facilities">Plan your visit</Button>
          </div>
        </SplitFeature>
      </Section>

      <Section id="champions" variant="amber">
        <div className="grid items-center gap-8 md:grid-cols-[1fr_1.1fr] md:gap-12">
          <div className="min-w-0">
            <Eyebrow className="mb-3 text-ink">Champions</Eyebrow>
            <h2 className="t-h1">Every kid plays here.</h2>
            <p className="mt-5 max-w-[46ch] text-lg">
              Our adaptive division for ages 4 to 23. Every Saturday, buddies on the base paths, and at least one
              Tridents team on the field with them.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/register">Register a Champion</Button>
              <Button href="/get-involved#volunteer" variant="secondary">
                Be a Buddy
              </Button>
            </div>
          </div>
          <div className="min-w-0 overflow-hidden rounded-2xl">
            <ImageSlot id="HOME-02" alt="A Champions buddy guiding a player toward first base" aspect="1/1" />
          </div>
        </div>
      </Section>

      <section id="tridents" data-brand="tridents" className="relative isolate overflow-hidden">
        <ImageSlot id="HOME-03" alt="" aspect="fill" tone="navy" className="-z-20" sizes="100vw" />
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{ background: "linear-gradient(90deg, rgb(var(--overlay) / .95) 0%, rgb(var(--overlay) / .8) 55%, rgb(var(--overlay) / .3) 100%)" }}
        />
        <div className="wrap grid items-center gap-10 py-16 md:grid-cols-[1fr_auto] md:py-28">
          <div className="min-w-0">
            <Eyebrow className="text-columbia">Great Neck Tridents</Eyebrow>
            <p className="mt-1.5 mb-6 text-[13px] font-bold tracking-[0.08em] text-columbia-lt/80 uppercase">
              A Great Neck Baseball League program
            </p>
            <h2 className="t-h1 max-w-[14ch]">Ready for the next level? Meet the Tridents.</h2>
            <p className="mt-5 max-w-[54ch] text-lg text-white/90">
              The highest level of play inside Great Neck. A Sunday select program, 8U to 14U, PONY-governed, with the
              same coaches and community. Built to make players better and move them up.
            </p>
            <ul className="mt-7 flex flex-wrap gap-7">
              {[
                ["Develop", "Position work, live arms, game IQ"],
                ["Compete", "Sunday select, regional tournaments"],
                ["Move up", "The front door to school ball and true travel"],
              ].map(([t, s]) => (
                <li key={t} className="border-l-[3px] border-columbia pl-3.5">
                  <b className="block font-display text-lg font-extrabold">{t}</b>
                  <span className="text-[15px] text-white/80">{s}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href="/tridents" variant="tridents">
                Explore the Tridents
              </Button>
            </div>
          </div>
          <Mark name="tridents-crest" size={220} className="hidden md:inline-block" />
        </div>
      </section>

      <Section id="involve">
        <SectionHead eyebrow="Get involved" title="It takes a village to run a season." />
        <CtaCardPair
          cards={[
            {
              image: "INV-01",
              eyebrow: "Volunteer",
              title: "Coach, rake a field, run the grill, be a buddy.",
              body: "No experience required. Three steps: register your role, complete a background check, finish the online training.",
              extra: (
                <Chips items={["Coach", "Team parent", "Champions buddy", "Field crew", "Concessions", "Fundraising"]} />
              ),
              cta: { href: "/get-involved#volunteer", label: "Volunteer with us" },
            },
            {
              image: "INV-02",
              eyebrow: "Sponsor",
              title: "Put your business on the fence where the whole neighborhood sees it.",
              body: `Over ${Math.floor(sponsors.sponsors.length / 10) * 10} local businesses back Great Neck Baseball. Every dollar is tax-deductible.`,
              extra: <Chips items={sponsors.tiers.map((t) => t.name)} />,
              cta: { href: "/get-involved#sponsor", label: "Become a sponsor" },
            },
          ]}
        />
        <div className="mt-12">
          <SponsorGrid data={sponsors} tiers={["corporate", "division"]} />
        </div>
      </Section>

      <Section id="news" variant="cream">
        <div className="grid items-start gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="min-w-0">
            <SectionHead eyebrow="News" title="From the league office." />
            {getPosts()
              .slice(0, 3)
              .map((p) => (
                <NewsCard key={p.slug} post={p} />
              ))}
            <Button href="/news" variant="secondary" className="mt-6">
              All news
            </Button>
          </div>
          <KeyDates dates={dates} boardMeeting={site.boardMeeting} />
        </div>
      </Section>
    </>
  );
}
