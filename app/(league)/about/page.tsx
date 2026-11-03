import type { Metadata } from "next";
import Link from "next/link";
import { SplitFeature } from "@/components/blocks";
import { ImageHero } from "@/components/ImageHero";
import { ImageSlot } from "@/components/ImageSlot";
import { Card, Eyebrow, Section, SectionHead } from "@/components/ui";
import { getBoard, getDates, getSite } from "@/lib/content";
import { longDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "About",
  description: "Great Neck Baseball League is a developmental, mission-driven, volunteer-run 501(c)(3) youth baseball league in Virginia Beach.",
};

export default function AboutPage() {
  const site = getSite();
  const board = getBoard();
  const dates = getDates();
  return (
    <>
      <ImageHero id="ABOUT-01" alt="A scoreboard with an E in the errors column">
        <Eyebrow className="mb-4 text-amber">About</Eyebrow>
        <h1 className="t-h1 max-w-[20ch]">Baseball is the only game that puts errors on the scoreboard.</h1>
      </ImageHero>

      <Section>
        <SectionHead eyebrow="What we believe" title="Three ideas behind everything we do." />
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["Resilience", "The sport expects us to be imperfect. Look deeper into any box score and you find the rest of the story: resilience. We build character, community and camaraderie for the love of the game."],
            ["Mission, not profit", "GNBL is a 501(c)(3). We are not profit-driven, and we don't compete on those terms. Travel clubs exist to win and attract talent. Our job is to help kids fall in love with baseball and move them through its stages."],
            ["Ascension, not retention", "That does not mean we aren't competitive; we play to win. It means when a player is ready for the next step, we are proud to be the launch point."],
          ].map(([t, b], i) => (
            <div key={t} className="card p-8">
              <span className="stat text-[40px] text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="t-h3 mt-5">{t}</h3>
              <p className="t-small mt-3 text-muted">{b}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section variant="cream">
        <SplitFeature
          reverse
          media={
            <div className="overflow-hidden rounded-[22px]">
              <ImageSlot id="ABOUT-02" alt="A Great Neck youth team from decades ago" aspect="4/3" />
            </div>
          }
        >
          <Eyebrow className="mb-3">Who we are</Eyebrow>
          <h2 className="t-h2">A developmental, mission-driven league.</h2>
          <p className="mt-5">
            Great Neck Baseball League is a PONY league in Virginia Beach, home to Fawn and Shetland tee ball, Pinto, Mustang,
            Bronco, Pony, Colt and Palomino, and our Champions division. The Great Neck Tridents offer a higher level of
            development for players ready for more. Every spring each division fields an All-Star team, and every summer we
            host the Battle of the Beach. We have played on our own fields on Shorehaven Drive for decades.
          </p>
          <h3 className="t-h3 mt-8">Sportsmanship</h3>
          <p className="mt-3 text-muted">
            We are committed to teaching every player the fundamentals of baseball, and equally to good sportsmanship: respect
            for teammates, opponents and umpires; understanding and abiding by the rules; perseverance regardless of the score;
            and graciousness in victory and defeat. We ask parents and spectators to set a good example in the stands, support
            every player and coach, and not argue with umpires&rsquo; decisions.
          </p>
        </SplitFeature>
      </Section>

      <Section id="board" className="scroll-mt-16">
        <SectionHead eyebrow="Board of Directors" title="Run by volunteers." lead={`${site.boardMeeting}. Next meeting: ${longDate(dates.nextBoardMeeting)}.`} />
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {board.map((b) => (
            <li key={b.role} className="card p-4">
              <p className="eyebrow text-muted">{b.role}</p>
              <p className="mt-1 font-display text-lg font-bold">{b.name || "Open"}</p>
              {b.assistant && <p className="text-sm text-muted">Assistant: {b.assistant}</p>}
              <a href={`mailto:${b.email}`} className="mt-1 block text-[15px] font-semibold text-accent underline-offset-4 hover:underline break-all">
                {b.email}
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <Section variant="cream" tight>
        <div className="grid gap-5 md:grid-cols-3">
          <Card>
            <h2 className="t-h3">Board meetings</h2>
            <p className="mt-2 text-muted">{site.boardMeeting}. Email <a className="font-semibold text-accent underline underline-offset-4" href={`mailto:${site.email.president}`}>{site.email.president}</a> for the agenda.</p>
          </Card>
          <Card>
            <h2 className="t-h3">Policies and bylaws</h2>
            <p className="mt-2 text-muted">Refunds, rain delays, parking and our bylaws.</p>
            <Link href="/policies" className="mt-3 inline-block font-semibold text-accent underline underline-offset-4">Read the policies</Link>
          </Card>
          <Card>
            <h2 className="t-h3">Contact</h2>
            <p className="mt-2 text-muted">Emails by role, our mailing address and directions.</p>
            <Link href="/contact" className="mt-3 inline-block font-semibold text-accent underline underline-offset-4">Contact us</Link>
          </Card>
        </div>
      </Section>
    </>
  );
}
