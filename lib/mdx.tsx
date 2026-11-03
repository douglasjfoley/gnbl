import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { ReactNode } from "react";

const text = (n: ReactNode): string =>
  typeof n === "string" ? n : Array.isArray(n) ? n.map(text).join("") : "";

/** h2 ids are the heading's first word, so "Refund policy" is #refund. */
const components = {
  h2: ({ children }: { children?: ReactNode }) => (
    <h2 id={text(children).split(/\s+/)[0].toLowerCase()} className="scroll-mt-24">
      {children}
    </h2>
  ),
};

export function Mdx({ source }: { source: string }) {
  return (
    <div className="prose-gn max-w-[70ch] text-[17px]">
      <MDXRemote source={source} components={components} />
    </div>
  );
}

export function readPage(name: string) {
  const raw = fs.readFileSync(path.join(process.cwd(), "content", "pages", `${name}.mdx`), "utf8");
  return matter(raw);
}
