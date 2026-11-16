import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { experiences } from "@/data/experience";
import { projects } from "@/data/projects";
import { hirePages } from "@/data/hire";
import { PageShell, Breadcrumbs } from "@/components/page-shell";
import { ContactCta, Faqs, Tldr } from "@/components/content";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl, breadcrumbSchema, faqSchema, pageMetadata, personSchema } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Prince Bhakodiya — Full Stack Developer & Tech Lead, Ahmedabad",
  description: siteConfig.bio,
  path: "/about/",
  type: "profile",
  keywords: ["Prince Bhakodiya", "who is Prince Bhakodiya", "Prince Bhakodiya developer", "Prince Bhakodiya Ahmedabad"],
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about/" },
];

const faqs = [
  { q: "Who is Prince Bhakodiya?", a: siteConfig.bio },
  {
    q: "Where is Prince Bhakodiya based?",
    a: "Prince Bhakodiya is based in Ahmedabad, Gujarat, India, and works with clients in Ahmedabad, across India and abroad.",
  },
  {
    q: "What has Prince Bhakodiya built?",
    a: `Apps and platforms including ${projects.map((p) => p.title).join(", ")}.`,
  },
  {
    q: "What technologies does Prince Bhakodiya use?",
    a: `${siteConfig.knowsAbout.slice(0, 10).join(", ")}, and more.`,
  },
  {
    q: "How can I contact Prince Bhakodiya?",
    a: `On WhatsApp at ${siteConfig.contact.whatsappDisplay} or by email at ${siteConfig.contact.emailAddress}.`,
  },
];

export default function AboutPage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          {
            "@type": "ProfilePage",
            url: absoluteUrl("/about/"),
            name: `About ${siteConfig.name}`,
            mainEntity: personSchema(),
          },
          faqSchema(faqs),
        ]}
      />
      <Breadcrumbs items={crumbs} />
      <div className="flex items-center gap-5">
        <span className="relative h-20 w-20 overflow-hidden rounded-3xl ring-1 ring-white/15">
          <Image src={siteConfig.logo} alt={siteConfig.name} fill sizes="80px" className="object-cover" preload />
        </span>
        <div>
          <p className="eyebrow">About</p>
          <p className="mt-2 text-muted">{siteConfig.location}</p>
        </div>
      </div>
      <h1 className="display mt-8 text-6xl sm:text-8xl lg:text-[7.5rem]">{siteConfig.name}</h1>
      <p className="serif-accent mt-3 text-3xl sm:text-5xl">{siteConfig.jobTitle}</p>
      <div className="mt-10 max-w-3xl">
        <Tldr text={siteConfig.bio} label="Who I am" />
      </div>

      <dl className="mt-14 grid gap-6 border-y border-line py-10 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Based in", "Ahmedabad, Gujarat, India"],
          ["Role", siteConfig.jobTitle],
          ["Experience", "5+ years, intern to Tech Lead"],
          ["Shipped", `${projects.length} products, 100K+ users`],
        ].map(([k, v]) => (
          <div key={k}>
            <dt className="eyebrow !text-[0.66rem]">{k}</dt>
            <dd className="mt-2 text-lg">{v}</dd>
          </div>
        ))}
      </dl>

      <section className="mt-20">
        <h2 className="font-display text-3xl font-semibold tracking-[-0.04em]">Experience</h2>
        <ol className="mt-8 space-y-8 border-l border-line pl-6">
          {experiences.map((e) => (
            <li key={e.year + e.title} className="relative">
              <span className="absolute -left-[29px] top-2 h-2.5 w-2.5 rounded-full bg-violet-soft" />
              <p className="font-mono text-sm text-subtle">{e.year}</p>
              <h3 className="mt-1 font-display text-2xl font-semibold tracking-[-0.03em]">{e.title}</h3>
              <p className="mt-2 max-w-3xl text-muted">{e.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-20">
        <h2 className="font-display text-3xl font-semibold tracking-[-0.04em]">What I work with</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {siteConfig.knowsAbout.map((k) => (
            <span key={k} className="rounded-full border border-line-strong px-4 py-1.5">
              {k}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <h2 className="font-display text-3xl font-semibold tracking-[-0.04em]">Find me</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {[
            ["GitHub", siteConfig.links.github],
            ["LinkedIn", siteConfig.links.linkedin],
            ["Instagram", siteConfig.links.instagram],
          ].map(([label, href]) => (
            <a key={label} href={href} target="_blank" rel="me noopener noreferrer" className="btn-dark rounded-full px-5 py-3">
              {label}
            </a>
          ))}
          {hirePages.slice(0, 3).map((h) => (
            <Link key={h.slug} href={`/hire/${h.slug}/`} className="rounded-full border border-line-strong px-5 py-3 hover:bg-white/[0.05]">
              {h.title}
            </Link>
          ))}
        </div>
      </section>

      <Faqs faqs={faqs} />
      <ContactCta />
    </PageShell>
  );
}
