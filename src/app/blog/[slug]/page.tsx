import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { getPost, posts, readingMinutes, plain } from "@/data/blog";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { PageShell, Breadcrumbs } from "@/components/page-shell";
import { Blocks, ContactCta, Faqs, Tldr } from "@/components/content";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl, breadcrumbSchema, faqSchema, pageMetadata, PERSON_ID, WEBSITE_ID } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug)!;
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}/`,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.updated ?? post.date,
    keywords: post.tags,
  });
}

const dateLabel = (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const project = post.projectId ? projects.find((p) => p.id === post.projectId) : undefined;
  const related = posts.filter((p) => p.slug !== post.slug && p.tags.some((t) => post.tags.includes(t))).slice(0, 3);
  const url = `/blog/${post.slug}/`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog/" },
    { name: post.title, path: url },
  ];

  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          {
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            abstract: post.tldr,
            url: absoluteUrl(url),
            mainEntityOfPage: absoluteUrl(url),
            datePublished: post.date,
            dateModified: post.updated ?? post.date,
            author: { "@id": PERSON_ID, name: siteConfig.name, url: absoluteUrl("/about/") },
            publisher: { "@id": PERSON_ID },
            isPartOf: { "@id": WEBSITE_ID },
            image: absoluteUrl(project?.icon ?? siteConfig.logo),
            keywords: post.tags.join(", "),
            articleBody: post.body.map((b) => ("text" in b ? plain(b.text) : b.items.map(plain).join(" "))).join("\n\n"),
            ...(project ? { about: { "@type": "SoftwareApplication", name: project.title, url: absoluteUrl(`/projects/${project.id}/`) } } : {}),
          },
          ...(post.faqs?.length ? [faqSchema(post.faqs)] : []),
        ]}
      />
      <article className="mx-auto max-w-3xl">
        <Breadcrumbs items={crumbs} />
        <div className="flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <span key={t} className="rounded-full border border-line-strong px-3 py-1 text-xs text-foreground/75">
              {t}
            </span>
          ))}
        </div>
        <h1 className="display mt-6 text-5xl !leading-[0.95] sm:text-7xl">{post.title}</h1>
        <div className="mt-8 flex items-center gap-3 text-sm text-muted">
          <span className="relative h-10 w-10 overflow-hidden rounded-full ring-1 ring-white/15">
            <Image src={siteConfig.logo} alt="" fill sizes="40px" className="object-cover" />
          </span>
          <span>
            By{" "}
            <Link href="/about/" rel="author" className="text-foreground hover:text-violet-soft">
              {siteConfig.name}
            </Link>
            <br />
            <time dateTime={post.date}>{dateLabel(post.date)}</time> · {readingMinutes(post)} min read
          </span>
        </div>

        <div className="mt-12">
          <Tldr text={post.tldr} />
        </div>
        <div className="mt-12">
          <Blocks blocks={post.body} />
        </div>

        {project && (
          <Link
            href={`/projects/${project.id}/`}
            className="group mt-14 flex items-center gap-4 rounded-3xl border border-line p-5 transition-colors hover:border-line-strong hover:bg-white/[0.03]"
          >
            <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-[24%] ring-1 ring-white/15">
              <Image src={project.icon} alt="" fill sizes="56px" className="object-cover" />
            </span>
            <span>
              <span className="block font-display text-xl font-semibold tracking-[-0.03em]">{project.title}</span>
              <span className="text-sm text-muted">See features, stack and store links</span>
            </span>
            <ArrowUpRight className="ml-auto h-5 w-5 text-subtle group-hover:text-foreground" />
          </Link>
        )}

        {post.faqs && post.faqs.length > 0 && <Faqs faqs={post.faqs} />}

        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="font-display text-3xl font-semibold tracking-[-0.04em]">Keep reading</h2>
            <div className="mt-6 divide-y divide-line border-y border-line">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}/`} className="group block py-5">
                  <p className="font-display text-xl font-semibold tracking-[-0.03em] group-hover:text-violet-soft">{r.title}</p>
                  <p className="mt-1 text-sm text-muted">{r.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
      <ContactCta />
    </PageShell>
  );
}
