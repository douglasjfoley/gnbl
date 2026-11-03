import type { Metadata } from "next";
import { KeyDates, NewsCard } from "@/components/blocks";
import { PageHeader, Section } from "@/components/ui";
import { getDates, getPosts, getSite } from "@/lib/content";

export const metadata: Metadata = { title: "News", description: "News and key dates from Great Neck Baseball League." };

export default function NewsPage() {
  const posts = getPosts();
  return (
    <>
      <PageHeader eyebrow="News" title="From the league office." />
      <Section>
        <div className="grid items-start gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="min-w-0">
            {posts.length ? posts.map((p) => <NewsCard key={p.slug} post={p} />) : <p className="text-muted">No posts yet.</p>}
          </div>
          <KeyDates dates={getDates()} boardMeeting={getSite().boardMeeting} />
        </div>
      </Section>
    </>
  );
}
