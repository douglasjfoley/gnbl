import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ImageSlot } from "@/components/ImageSlot";
import { PageHeader, Section } from "@/components/ui";
import { getPost, getPosts } from "@/lib/content";
import { longDate } from "@/lib/format";
import { Mdx } from "@/lib/mdx";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = getPost((await params).slug);
  return post ? { title: post.title, description: post.excerpt } : {};
}

export default async function PostPage({ params }: Params) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  return (
    <>
      <PageHeader eyebrow={longDate(post.date, "News")} title={post.title}>
        <p>{post.excerpt}</p>
      </PageHeader>
      <Section>
        {post.image && (
          <div className="mb-10 max-w-3xl overflow-hidden rounded-2xl">
            <ImageSlot id={post.image} alt="" aspect="16/9" />
          </div>
        )}
        <Mdx source={post.body} />
        <Link href="/news" className="mt-10 inline-block font-semibold text-accent underline underline-offset-4">
          ← All news
        </Link>
      </Section>
    </>
  );
}
