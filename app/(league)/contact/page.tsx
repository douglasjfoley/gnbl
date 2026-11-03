import type { Metadata } from "next";
import { Button, Card, PageHeader, Section } from "@/components/ui";
import { getBoard, getFacilities, getSite } from "@/lib/content";
import { mapsUrl } from "@/lib/format";

export const metadata: Metadata = { title: "Contact", description: "Email directory, mailing address and directions to Great Neck Baseball League." };

const LABELS: Record<string, string> = {
  secretary: "General questions (Secretary)",
  president: "President",
  registrar: "Registration",
  volunteer: "Volunteering",
  sponsorship: "Sponsorship",
  champions: "Champions",
  tridents: "Tridents",
};

export default function ContactPage() {
  const site = getSite();
  const fac = getFacilities();
  const board = getBoard();
  return (
    <>
      <PageHeader eyebrow="Contact" title="Get in touch.">
        <p>Every inbox below is answered by a volunteer, so give us a day or two.</p>
      </PageHeader>
      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="min-w-0">
            <h2 className="t-h3 mb-4">Email by topic</h2>
            <ul className="divide-y divide-line card">
              {Object.entries(site.email).map(([k, v]) => (
                <li key={k} className="flex flex-wrap justify-between gap-x-4 gap-y-1 px-5 py-4">
                  <span className="font-semibold">{LABELS[k] ?? k}</span>
                  <a href={`mailto:${v}`} className="break-all text-accent underline-offset-4 hover:underline">{v}</a>
                </li>
              ))}
            </ul>
            <h2 className="t-h3 mt-10 mb-4">Division directors</h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {board
                .filter((b) => /Director/.test(b.role) && /Fawn|Pinto|Mustang|Bronco|Pony|Champions|Tridents/.test(b.role))
                .map((b) => (
                  <li key={b.role} className="card px-4 py-3 text-[15px]">
                    <b>{b.role}</b>
                    <a href={`mailto:${b.email}`} className="block break-all text-accent underline-offset-4 hover:underline">{b.email}</a>
                  </li>
                ))}
            </ul>
          </div>
          <div className="min-w-0 space-y-5">
            <Card>
              <h2 className="t-h3">Mailing address</h2>
              <p className="mt-2">{site.name}<br />{site.address.mail}</p>
            </Card>
            <Card>
              <h2 className="t-h3">The fields</h2>
              <p className="mt-2">{fac.home.address}</p>
              <p className="mt-3 text-[15px] text-muted">{fac.home.directions}</p>
              <Button href={mapsUrl(fac.home.address)} className="mt-5">Directions</Button>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}
