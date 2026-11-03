import type { Metadata } from "next";
import { ImageHero } from "@/components/ImageHero";
import { ImageSlot } from "@/components/ImageSlot";
import { Mark } from "@/components/Mark";
import { Button, Card, Eyebrow, Section, SectionHead } from "@/components/ui";
import { getBoard, getDates, getSite } from "@/lib/content";

export const metadata: Metadata = {
  title: "Battle of the Beach",
  description: "ONE BEACH • THREE DIVISIONS • ONE BATTLE. The Battle of the Beach youth baseball tournament for Pinto, Mustang and Bronco, in Virginia Beach.",
};

const tba = (v: string) => v || "To be announced";

export default function BotbPage() {
  const { botb, battleOfTheBeach } = getDates();
  const site = getSite();
  const director = getBoard().find((b) => b.role === "Tournament Director");
  const enter = `mailto:${director?.email ?? site.email.tridents}?subject=${encodeURIComponent("Battle of the Beach team entry")}`;
  return (
    <>
      <ImageHero id="BOTB-01" alt="Three games on three fields at the Battle of the Beach">
        <div className="flex flex-col gap-8 md:flex-row md:items-end">
          <Mark name="botb-2026" size={180} priority />
          <div className="min-w-0">
            <Eyebrow className="mb-3 text-gold">{battleOfTheBeach} · Virginia Beach, VA</Eyebrow>
            <h1 className="t-h1">Battle of the Beach</h1>
            <p className="mt-3 font-display text-lg font-extrabold tracking-wide text-columbia-lt">
              ONE BEACH • THREE DIVISIONS • ONE BATTLE
            </p>
            <Button href={enter} variant="tridents" className="mt-6">
              Enter a team
            </Button>
          </div>
        </div>
      </ImageHero>
      <Section>
        <SectionHead eyebrow="Divisions" title="Three divisions, one battle." eyebrowClass="text-columbia-lt" />
        <ul className="grid gap-4 md:grid-cols-3">
          {[
            ["Pinto", "7 to 8"],
            ["Mustang", "9 to 10"],
            ["Bronco", "11 to 12"],
          ].map(([n, a]) => (
            <li key={n} className="card p-7">
              <h3 className="font-display text-3xl font-extrabold">{n}</h3>
              <p className="mt-1 text-muted">Ages {a}</p>
            </li>
          ))}
        </ul>
      </Section>
      <Section variant="cream">
        <div className="grid gap-8 lg:grid-cols-2">
          <Card>
            <h2 className="t-h3">Tournament details</h2>
            <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-5 gap-y-3 text-[15px]">
              <dt className="font-semibold text-muted">Dates</dt>
              <dd>{tba(botb.dates || battleOfTheBeach)}</dd>
              <dt className="font-semibold text-muted">Format</dt>
              <dd>To be announced</dd>
              <dt className="font-semibold text-muted">Entry fee</dt>
              <dd>{tba(botb.fee)}</dd>
              <dt className="font-semibold text-muted">Venue</dt>
              <dd>{tba(botb.venue)}</dd>
              <dt className="font-semibold text-muted">Lodging</dt>
              <dd>{tba(botb.lodging)}</dd>
            </dl>
            <Button href={enter} variant="tridents" className="mt-7">
              Enter a team
            </Button>
          </Card>
          <div className="min-w-0">
            <div className="overflow-hidden rounded-[22px]">
              <ImageSlot id="BOTB-02" alt="A team holding a banner at the trophy presentation" aspect="4/3" tone="navy" />
            </div>
            <h2 className="t-h3 mt-6">Past champions</h2>
            <p className="mt-2 text-muted">Results and photos from past tournaments will post here.</p>
          </div>
        </div>
      </Section>
    </>
  );
}
