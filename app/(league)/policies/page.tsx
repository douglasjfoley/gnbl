import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/ui";
import { getSite } from "@/lib/content";
import { Mdx, readPage } from "@/lib/mdx";

const page = readPage("policies");

export const metadata: Metadata = { title: "Policies", description: String(page.data.excerpt ?? "") };

export default function PoliciesPage() {
  const l = getSite().links;
  const source = page.content
    .replace("BYLAWS_URL", l.bylaws)
    .replace("RULES_URL", l.playingRules)
    .replace("ALLSTAR_URL", l.allStarPolicy);
  return (
    <>
      <PageHeader eyebrow="About" title="Policies">
        <p>{String(page.data.excerpt ?? "")}</p>
      </PageHeader>
      <Section>
        <Mdx source={source} />
      </Section>
    </>
  );
}
