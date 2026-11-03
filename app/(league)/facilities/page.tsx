import type { Metadata } from "next";
import { StatusChip } from "@/components/blocks";
import { ImageHero } from "@/components/ImageHero";
import { ImageSlot } from "@/components/ImageSlot";
import { Button, Card, Eyebrow, Section, SectionHead } from "@/components/ui";
import { getAgeDivisions, getDates, getFacilities } from "@/lib/content";
import { mapsUrl } from "@/lib/format";

export const metadata: Metadata = {
  title: "Facilities",
  description: "Eight fields, batting cages, concessions and lights at 2509 Shorehaven Drive in Virginia Beach, plus our partner fields.",
};

export default function FacilitiesPage() {
  const fac = getFacilities();
  const dates = getDates();
  const divisions = getAgeDivisions();

  const fields = fac.home.fields.map((f) => {
    const div = divisions.find((d) => f.toLowerCase().startsWith(d.name.toLowerCase()));
    return { name: f, bases: div?.bases, mound: div?.mound };
  });

  return (
    <>
      <ImageHero id="FAC-01" alt="Aerial view of the eight-field Great Neck complex">
        <Eyebrow className="mb-4 text-amber">Facilities</Eyebrow>
        <h1 className="t-display">Our home field</h1>
        <p className="mt-4 text-xl text-white/95">{fac.home.address}</p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Button href={mapsUrl(fac.home.address)} variant="secondary">
            Directions
          </Button>
          <StatusChip status={dates.fieldStatus} className="!bg-white/12" />
        </div>
      </ImageHero>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="min-w-0">
            <SectionHead eyebrow="The complex" title="Eight fields, one address." />
            <div className="overflow-hidden rounded-2xl border border-line bg-card">
              <table className="w-full text-left text-[15px]">
                <thead className="bg-surface font-display text-sm">
                  <tr>
                    <th scope="col" className="px-4 py-3">Field</th>
                    <th scope="col" className="px-4 py-3">Bases</th>
                    <th scope="col" className="px-4 py-3">Mound</th>
                  </tr>
                </thead>
                <tbody>
                  {fields.map((f) => (
                    <tr key={f.name} className="border-t border-line">
                      <th scope="row" className="px-4 py-3 font-semibold">{f.name}</th>
                      <td className="px-4 py-3">{f.bases ?? "Tee ball"}</td>
                      <td className="px-4 py-3">{f.mound ?? "None"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="min-w-0">
            <SectionHead eyebrow="Amenities" title="Everything a game day needs." />
            <ul className="grid gap-3 sm:grid-cols-2">
              {fac.home.amenities.map((a) => (
                <li key={a} className="flex items-center gap-3 rounded-xl border border-line bg-card px-4 py-3 font-semibold">
                  <i aria-hidden className="h-2 w-2 shrink-0 rounded-sm bg-red" />
                  {a}
                </li>
              ))}
            </ul>
            <h3 className="t-h3 mt-8">Getting here</h3>
            <p className="mt-2 text-muted">{fac.home.directions}</p>
          </div>
        </div>
      </Section>

      <section aria-label="Photos of the complex" className="wrap grid gap-4 pb-14 md:grid-cols-3 md:pb-24">
        {[
          ["FAC-02", "The Bronco field from behind home plate"],
          ["FAC-03", "The batting cages"],
          ["FAC-05", "Field lights on at dusk"],
        ].map(([id, alt]) => (
          <div key={id} className="overflow-hidden rounded-2xl">
            <ImageSlot id={id} alt={alt} aspect="4/3" sizes="(max-width: 768px) 100vw, 33vw" />
          </div>
        ))}
      </section>

      <Section variant="cream">
        <div className="grid gap-5 lg:grid-cols-3">
          <Card>
            <h2 className="t-h3">Partner fields</h2>
            <ul className="mt-4 space-y-2.5 text-[15px]">
              {fac.partner.map((p) => (
                <li key={p.name}>
                  <b>{p.name}</b>
                  {p.fields.length > 0 && <span className="text-muted"> · {p.fields.join(", ")}</span>}
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <h2 className="t-h3">Parking</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] text-muted">
              {fac.home.parking
                .split(". ")
                .filter(Boolean)
                .map((s) => (
                  <li key={s}>{s.replace(/\.$/, "")}.</li>
                ))}
              <li>Overflow parking is available at Cox High School.</li>
            </ul>
          </Card>
          <Card>
            <h2 className="t-h3">Field status</h2>
            <div className="mt-4">
              <StatusChip status={dates.fieldStatus} />
            </div>
            <p className="mt-4 text-[15px] text-muted">
              Check before you leave the house.
            </p>
          </Card>
        </div>
      </Section>

      <Section tight className="text-center">
        <h2 className="t-h2">See it in person on Opening Day.</h2>
        <Button href="/register" className="mt-6">
          Register
        </Button>
      </Section>
    </>
  );
}
