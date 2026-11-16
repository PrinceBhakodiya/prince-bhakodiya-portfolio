import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Apple, ArrowUpRight, Globe, Play } from "lucide-react";
import { projects } from "@/data/projects";
import { postsForProject } from "@/data/blog";
import { siteConfig } from "@/data/site";
import { PageShell, Breadcrumbs } from "@/components/page-shell";
import { ContactCta, ProjectCard } from "@/components/content";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl, breadcrumbSchema, pageMetadata, PERSON_ID } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

const find = (slug: string) => projects.find((p) => p.id === slug);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = find(slug)!;
  return pageMetadata({
    title: `${p.title} — ${p.subtitle ?? p.category} | Case study`,
    description: `${p.description} Built by ${siteConfig.name} with ${p.tech.join(", ")}.`,
    path: `/projects/${p.id}/`,
    keywords: [p.title, `${p.title} app`, p.category, ...p.tech, siteConfig.name],
  });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = find(slug);
  if (!p) notFound();

  const links = [
    p.links?.playStore && { href: p.links.playStore, label: "Google Play", icon: Play },
    p.links?.playStoreDriver && { href: p.links.playStoreDriver, label: "Driver app", icon: Play },
    p.links?.appStore && { href: p.links.appStore, label: "App Store", icon: Apple },
    p.links?.website && { href: p.links.website, label: new URL(p.links.website).host.replace(/^www\./, ""), icon: Globe },
  ].filter(Boolean) as { href: string; label: string; icon: typeof Play }[];
  const stories = postsForProject(p.id);
  const others = projects.filter((o) => o.id !== p.id && o.category === p.category).concat(projects.filter((o) => o.id !== p.id && o.category !== p.category)).slice(0, 3);
  const isWeb = !!p.browser && !p.links?.playStore;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects/" },
    { name: p.title, path: `/projects/${p.id}/` },
  ];

  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          {
            "@type": isWeb ? "WebApplication" : "MobileApplication",
            name: p.title,
            description: p.description,
            url: absoluteUrl(`/projects/${p.id}/`),
            image: absoluteUrl(p.icon),
            applicationCategory: p.category,
            operatingSystem: isWeb ? "Web" : "Android, iOS",
            creator: { "@id": PERSON_ID },
            sameAs: links.map((l) => l.href),
            featureList: p.features,
          },
        ]}
      />
      <Breadcrumbs items={crumbs} />

      <div className="flex items-center gap-5">
        <span className="relative h-20 w-20 overflow-hidden rounded-[24%] shadow-[0_14px_30px_-10px_rgba(0,0,0,0.9)] ring-1 ring-white/15 sm:h-24 sm:w-24">
          <Image src={p.icon} alt={`${p.title} app icon`} fill sizes="96px" className="object-cover" preload />
        </span>
        <div>
          <p className="eyebrow">{p.category}</p>
          <p className="mt-2 text-muted">{p.kind}</p>
        </div>
      </div>
      <h1 className="display mt-8 text-6xl sm:text-8xl lg:text-[7.5rem]">{p.title}</h1>
      <p className="serif-accent mt-3 text-3xl sm:text-5xl" style={{ color: `color-mix(in oklab, ${p.color} 55%, white)` }}>
        {p.tagline}
      </p>
      <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted sm:text-xl">{p.description}</p>

      {links.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-3">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className={i === 0 ? "btn-glow flex h-12 items-center gap-2 rounded-full px-6 font-medium text-white" : "btn-dark flex h-12 items-center gap-2 rounded-full px-5"}
            >
              <l.icon className="h-4 w-4" /> {l.label} <ArrowUpRight className="h-4 w-4" />
            </a>
          ))}
        </div>
      )}

      <div className="mt-20 grid gap-12 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <h2 className="font-display text-3xl font-semibold tracking-[-0.04em]">Features</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {p.features.map((f) => (
              <li key={f} className="flex gap-3 rounded-2xl border border-line bg-white/[0.02] p-4">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: p.color }} />
                {f}
              </li>
            ))}
          </ul>
        </section>
        <aside className="space-y-10">
          <div>
            <h2 className="eyebrow">Platforms</h2>
            <ul className="mt-4 space-y-2 text-foreground/85">
              {p.platforms.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="eyebrow">Built with</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <span key={t} className="rounded-full border border-line-strong px-3 py-1 text-sm">
                  {t}
                </span>
              ))}
            </div>
          </div>
          {p.architecture && p.architecture.length > 0 && (
            <div>
              <h2 className="eyebrow">Architecture</h2>
              <ol className="mt-4 space-y-2 font-mono text-sm text-muted">
                {p.architecture.map((a, i) => (
                  <li key={a}>
                    <span className="text-subtle">{String(i + 1).padStart(2, "0")}</span> {a}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </aside>
      </div>

      {stories.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-3xl font-semibold tracking-[-0.04em]">Read the full story</h2>
          <div className="mt-6 grid gap-4">
            {stories.map((s) => (
              <Link key={s.slug} href={`/blog/${s.slug}/`} className="group rounded-3xl border border-line p-6 transition-colors hover:border-line-strong hover:bg-white/[0.03]">
                <p className="font-display text-2xl font-semibold tracking-[-0.03em] group-hover:text-violet-soft">{s.title}</p>
                <p className="mt-2 text-muted">{s.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mt-20">
        <h2 className="font-display text-3xl font-semibold tracking-[-0.04em]">More projects</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((o) => (
            <ProjectCard key={o.id} project={o} />
          ))}
        </div>
      </section>
      <ContactCta heading="Want an app like this?" />
    </PageShell>
  );
}
