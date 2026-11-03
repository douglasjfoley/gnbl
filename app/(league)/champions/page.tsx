import type { Metadata } from "next";
import { SplitFeature } from "@/components/blocks";
import { ImageHero } from "@/components/ImageHero";
import { ImageSlot } from "@/components/ImageSlot";
import { Button, Card, Eyebrow, Section } from "@/components/ui";
import { getBoard, getSite } from "@/lib/content";

export const metadata: Metadata = {
  title: "Champions",
  description: "Champions is our adaptive division for players ages 4 to 23. Every Saturday, every player bats and fields, with a buddy beside them.",
};

const HOW = [
  "Every player bats and fields every inning.",
  "No outs on strikes.",
  "One hour, every Saturday.",
  "Shirt and hat provided.",
];

export default function ChampionsPage() {
  const site = getSite();
  const director = getBoard().find((b) => b.role.startsWith("Champions"));

  return (
    <>
      <ImageHero id="CHAMP-01" alt="Champions players and buddies with their arms around each other">
        <Eyebrow className="mb-4 text-amber">Champions</Eyebrow>
        <h1 className="t-display max-w-[12ch]">Every kid plays here.</h1>
        <p className="mt-5 text-xl text-white/95">Ages 4 to 23. Every Saturday. No score. Buddies.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/register">Register a Champion</Button>
          <Button href="/get-involved#volunteer" variant="secondary">
            Be a Buddy
          </Button>
        </div>
      </ImageHero>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="min-w-0">
            <Eyebrow className="mb-3">How a game works</Eyebrow>
            <h2 className="t-h2">Ballplayers, exactly as they are.</h2>
            <p className="mt-5 text-lg">
              Champions is where players with disabilities take the field and get to be exactly what they are:
              ballplayers.
            </p>
            <ol className="mt-6 space-y-3">
              {HOW.map((h, i) => (
                <li key={h} className="flex items-center gap-4 rounded-xl border border-line bg-card px-5 py-4 font-display text-lg font-bold">
                  <span className="text-accent tabular-nums">{i + 1}</span>
                  {h}
                </li>
              ))}
            </ol>
          </div>
          <div id="buddies" className="min-w-0 scroll-mt-24">
            <div className="overflow-hidden rounded-2xl">
              <ImageSlot id="CHAMP-02" alt="A player swinging a bat while a buddy holds the tee steady" aspect="4/3" />
            </div>
            <h2 className="t-h3 mt-6">The buddy program</h2>
            <p className="mt-3 text-muted">
              Every Champion has a buddy beside them on the base paths. Buddies are teammates from our other
              divisions, Tridents players, parents and neighbors. No experience needed, just show up on Saturday and
              cheer loud.
            </p>
            <Button href="/get-involved#volunteer" className="mt-5">
              Be a Buddy
            </Button>
          </div>
        </div>
      </Section>

      <Section variant="cream">
        <SplitFeature
          reverse
          media={
            <div className="overflow-hidden rounded-2xl">
              <ImageSlot id="CHAMP-03" alt="Two Tridents players high-fiving a young Champions player" aspect="4/3" />
            </div>
          }
        >
          <Eyebrow className="mb-3">Tridents at Champions</Eyebrow>
          <h2 className="t-h2">Top to bottom, one organization.</h2>
          <p className="mt-5 text-lg">
            At least one Tridents team is on the field with Champions every Saturday, year-round. Our highest level of
            play, shoulder to shoulder with the players who get the most out of being part of this.
          </p>
        </SplitFeature>
      </Section>

      <Section tight>
        <Card>
          <h2 className="t-h3">Questions about Champions?</h2>
          <p className="mt-3 text-muted">
            Email{" "}
            <a href={`mailto:${site.email.champions}`} className="font-semibold text-accent underline underline-offset-4">
              {site.email.champions}
            </a>
            {director?.name && (
              <>
                . Champions Director: {director.name}
                {director.assistant && `, with ${director.assistant}`}
              </>
            )}
            .
          </p>
        </Card>
      </Section>
    </>
  );
}
