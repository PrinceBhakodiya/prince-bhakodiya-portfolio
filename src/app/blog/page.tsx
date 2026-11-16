import Link from "next/link";
import { posts, readingMinutes } from "@/data/blog";
import { siteConfig } from "@/data/site";
import { PageShell, Breadcrumbs } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl, breadcrumbSchema, pageMetadata, PERSON_ID } from "@/lib/seo";

const description = `Case studies and articles by ${siteConfig.name} on building Flutter apps, Node.js backends, real-time systems, AI features and shipping products in India.`;

export const metadata = {
  ...pageMetadata({ title: "Blog — Case Studies & Engineering Notes", description, path: "/blog/" }),
  alternates: { canonical: "/blog/", types: { "application/rss+xml": "/blog/rss.xml" } },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog/" },
];

const dateLabel = (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default function BlogPage() {
  const groups = [
    { title: "Articles", items: posts.filter((p) => p.kind === "article") },
    { title: "Case studies", items: posts.filter((p) => p.kind === "case-study") },
  ];
  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          {
            "@type": "Blog",
            name: `${siteConfig.name} — Blog`,
            url: absoluteUrl("/blog/"),
            description,
            author: { "@id": PERSON_ID },
            blogPost: posts.map((p) => ({
              "@type": "BlogPosting",
              headline: p.title,
              url: absoluteUrl(`/blog/${p.slug}/`),
              datePublished: p.date,
            })),
          },
        ]}
      />
      <Breadcrumbs items={crumbs} />
      <p className="eyebrow">Blog · {posts.length} posts</p>
      <h1 className="display mt-5 text-6xl sm:text-8xl">Notes from the workbench.</h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{description}</p>

      {groups.map((g) => (
        <section key={g.title} className="mt-16">
          <h2 className="eyebrow">{g.title}</h2>
          <div className="mt-4 divide-y divide-line border-y border-line">
            {g.items.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}/`} className="group grid gap-2 py-7 sm:grid-cols-[1fr_auto] sm:gap-10">
                <div>
                  <p className="font-display text-2xl font-semibold tracking-[-0.035em] transition-colors group-hover:text-violet-soft sm:text-3xl">
                    {p.title}
                  </p>
                  <p className="mt-2 max-w-3xl text-muted">{p.description}</p>
                </div>
                <p className="font-mono text-sm text-subtle sm:text-right">
                  {dateLabel(p.date)}
                  <br className="hidden sm:block" /> <span className="sm:hidden">·</span> {readingMinutes(p)} min read
                </p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </PageShell>
  );
}
