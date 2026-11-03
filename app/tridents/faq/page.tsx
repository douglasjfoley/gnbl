import type { Metadata } from "next";
import { Accordion } from "@/components/blocks";
import { TriHeader } from "@/components/tridents";
import { Button, Section } from "@/components/ui";
import { getSite, getTridents } from "@/lib/content";

export const metadata: Metadata = { title: "FAQ", description: "Cost, time commitment, travel, uniforms and how the Tridents fit with rec and All-Stars." };

export default function FaqPage() {
  const { faq } = getTridents();
  const site = getSite();
  return (
    <>
      <TriHeader id="TRI-04" eyebrow="FAQ" title="Questions families ask." />
      <Section>
        <div className="max-w-3xl">
          <Accordion items={faq.map((f) => ({ q: f.q, a: f.a }))} />
          <p className="mt-8 text-muted">
            Something else? Email{" "}
            <a className="font-semibold text-accent underline underline-offset-4" href={`mailto:${site.email.tridents}`}>
              {site.email.tridents}
            </a>
            .
          </p>
          <Button href="/tridents/tryouts#interest" variant="tridents" className="mt-6">
            Tryout interest
          </Button>
        </div>
      </Section>
    </>
  );
}
