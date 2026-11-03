import type { Metadata } from "next";
import { DivisionCard, Pathway } from "@/components/blocks";
import { ImageSlot } from "@/components/ImageSlot";
import { Button, Card, Eyebrow, PageHeader, Section, SectionHead } from "@/components/ui";
import { getAgeDivisions, getPathway, getSite } from "@/lib/content";

export const metadata: Metadata = {
  title: "Programs",
  description: "Eight divisions from Fawn tee ball to Palomino, plus All-Stars, Champions and how we develop players and coaches.",
};

const DEVELOPMENT = [
  ["Coach the coaches", "We invest in the volunteers we already have, so better coaching reaches every team."],
  ["Microclinics", "Targeted skill sessions at the start, middle and end of each season, meeting players where they are."],
  ["Tryout prep", "Sessions that ready players for their next step, All-Stars, travel or a school team, with feedback on what to work on."],
  ["School engagement", "We keep building our ties with local middle and high school programs."],
];

export default function ProgramsPage() {
  const site = getSite();
  return (
    <>
      <PageHeader eyebrow="Programs" title="Every age has a place on the field.">
        <p>{site.positioning}</p>
        <div className="mt-6">
          <Pathway steps={getPathway()} compact />
        </div>
      </PageHeader>

      <Section id="divisions">
        <SectionHead
          eyebrow="Divisions"
          title="Fawn to Palomino."
          lead="Spring and fall seasons at our home complex. Mustang and up hold tryouts and a draft so every team is balanced."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {getAgeDivisions().map((d) => (
            <DivisionCard key={d.id} d={d} detailed />
          ))}
        </div>
      </Section>

      <Section id="development" variant="cream">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="min-w-0">
            <Eyebrow className="mb-3">Development</Eyebrow>
            <h2 className="t-h2">How we close the coaching gap.</h2>
            <p className="mt-5 text-lg">
              We&rsquo;re a volunteer organization, so there will always be coaching gaps. The fix is leverage, not
              headcount.
            </p>
            <div className="mt-6 overflow-hidden rounded-2xl">
              <ImageSlot id="PATH-02" alt="A young pitcher mid-windup with the catcher set" aspect="4/3" />
            </div>
          </div>
          <div className="grid min-w-0 gap-4 sm:grid-cols-2">
            {DEVELOPMENT.map(([t, s]) => (
              <Card key={t} className="!p-6">
                <h3 className="t-h3">{t}</h3>
                <p className="mt-2 text-muted">{s}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          <Card>
            <Eyebrow className="mb-3">All-Stars</Eyebrow>
            <h2 className="t-h3">Every division, every spring.</h2>
            <p className="mt-3 text-muted">
              Each division fields an All-Star team for PONY sectional and state play. It&rsquo;s the next rung on the
              pathway after rec ball.
            </p>
          </Card>
          <Card>
            <Eyebrow className="mb-3">Champions</Eyebrow>
            <h2 className="t-h3">Every kid plays here.</h2>
            <p className="mt-3 text-muted">Our adaptive division for ages 4 to 23, every Saturday, with buddies on the base paths.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button href="/register">Register</Button>
              <Button href="/champions" variant="secondary">
                About Champions
              </Button>
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}
