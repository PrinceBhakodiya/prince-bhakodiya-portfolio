import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { posts, readingMinutes } from "@/data/blog";
import { SectionTitle } from "./reveal";

/** Home-page teaser for the blog. */
export function Writing() {
  const latest = [...posts.filter((p) => p.kind === "article").slice(0, 2), ...posts.filter((p) => p.kind === "case-study").slice(0, 2)];
  return (
    <section id="writing" className="relative px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1440px]">
        <SectionTitle
          eyebrow="Writing"
          title="From the blog."
          serif="How the apps were built."
          aside={
            <Link href="/blog/" className="btn-dark inline-flex h-12 items-center gap-2 rounded-full px-6">
              All {posts.length} posts <ArrowUpRight className="h-4 w-4" />
            </Link>
          }
        />
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {latest.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}/`}
              className="group flex flex-col rounded-3xl border border-line bg-white/[0.02] p-7 transition-colors hover:border-line-strong hover:bg-white/[0.04]"
            >
              <p className="eyebrow !text-[0.66rem]">
                {p.kind === "case-study" ? "Case study" : "Article"} · {readingMinutes(p)} min
              </p>
              <p className="mt-4 font-display text-2xl font-semibold tracking-[-0.035em] transition-colors group-hover:text-violet-soft sm:text-[28px]">
                {p.title}
              </p>
              <p className="mt-3 line-clamp-2 text-muted">{p.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
