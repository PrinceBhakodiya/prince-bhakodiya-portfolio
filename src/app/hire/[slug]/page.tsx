import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { getHirePage, hirePages } from "@/data/hire";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { PageShell, Breadcrumbs } from "@/components/page-shell";
import { ContactCta, Faqs, ProjectCard, Tldr } from "@/components/content";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl, breadcrumbSchema, faqSchema, pageMetadata, PERSON_ID } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return hirePages.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const h = getHirePage(slug)!;
  return pageMetadata({ title: h.metaTitle, description: h.description, path: `/hire/${h.slug}/`, keywords: h.keywords });
}

const steps = [
  ["Talk", "A short call or WhatsApp chat about your users, goals and timeline."],
  ["Plan", "A written scope with screens, features and milestones you can hold me to."],
  ["Build", "Weekly progress with test builds you can install on your own phone."],
  ["Ship", "Store releases or deployment, then support and updates after launch."],
];

const areaSchema = (area: string) =>
  area === "India"
    ? { "@type": "Country", name: "India" }
    : area === "Gujarat"
      ? { "@type": "State", name: "Gujarat", containedInPlace: { "@type": "Country", name: "India" } }
      : { "@type": "City", name: area, containedInPlace: { "@type": "State", name: "Gujarat" } };

export default async function HirePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const h = getHirePage(slug);
  if (!h) notFound();

  const work = h.projectIds.map((id) => projects.find((p) => p.id === id)!).filter(Boolean);
  const url = `/hire/${h.slug}/`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Hire", path: "/hire/" },
    { name: h.title, path: url },
  ];

  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          {
            "@type": "Service",
            "@id": absoluteUrl(`${url}#service`),
            name: `${h.service} — ${h.area}`,
            serviceType: h.service,
            description: h.description,
            url: absoluteUrl(url),
            provider: { "@id": PERSON_ID },
            areaServed: areaSchema(h.area),
          },
          faqSchema(h.faqs),
        ]}
      />
      <Breadcrumbs items={crumbs} />
      <p className="eyebrow">Hire · {h.area}</p>
      <h1 className="display mt-5 text-6xl sm:text-8xl lg:text-[7rem]">{h.title}</h1>
      <p className="serif-accent mt-3 text-3xl sm:text-4xl">{siteConfig.name}</p>
      <div className="mt-10 max-w-3xl">
        <Tldr text={h.description} label="Who I am" />
      </div>
      <div className="prose-dark mt-10 max-w-3xl">
        {h.intro.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a
          href={siteConfig.contact.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-glow flex h-14 items-center justify-center gap-2 rounded-full px-7 font-medium text-white"
        >
          <MessageCircle className="h-4 w-4" /> Message me on WhatsApp
        </a>
        <Link href="/projects/" className="btn-dark flex h-14 items-center justify-center rounded-full px-7">
          See my projects
        </Link>
      </div>

      <section className="mt-20 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-[-0.04em]">What you get</h2>
          <ul className="mt-6 space-y-3">
            {h.offer.map((o) => (
              <li key={o} className="flex gap-3 text-lg text-foreground/85">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-soft" /> {o}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-[-0.04em]">How we&apos;ll work</h2>
          <ol className="mt-6 space-y-5">
            {steps.map(([t, d], i) => (
              <li key={t} className="flex gap-4">
                <span className="font-mono text-sm text-violet-soft">0{i + 1}</span>
                <span>
                  <span className="block text-lg font-medium">{t}</span>
                  <span className="text-muted">{d}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mt-20">
        <h2 className="font-display text-3xl font-semibold tracking-[-0.04em]">Apps I&apos;ve shipped</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {work.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </section>

      <div className="mt-16 grid grid-cols-2 gap-6 border-y border-line py-10 sm:grid-cols-4">
        {siteConfig.stats.map((s) => (
          <div key={s.label}>
            <p className="font-display text-4xl font-semibold tracking-[-0.05em]">{s.value}</p>
            <p className="eyebrow mt-2 !text-[0.66rem]">{s.label}</p>
          </div>
        ))}
      </div>

      <Faqs faqs={h.faqs} />

      <section className="mt-16">
        <h2 className="eyebrow">Also available as</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {hirePages
            .filter((o) => o.slug !== h.slug)
            .map((o) => (
              <Link key={o.slug} href={`/hire/${o.slug}/`} className="rounded-full border border-line-strong px-4 py-2 text-sm transition-colors hover:bg-white/[0.06]">
                {o.title}
              </Link>
            ))}
        </div>
      </section>
      <ContactCta />
    </PageShell>
  );
}
