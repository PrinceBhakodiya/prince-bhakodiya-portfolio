import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { hirePages } from "@/data/hire";
import { siteConfig } from "@/data/site";
import { PageShell, Breadcrumbs } from "@/components/page-shell";
import { ContactCta } from "@/components/content";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

const description = `Hire ${siteConfig.name}, a Flutter, full stack and Node.js developer in Ahmedabad, Gujarat, for app development, web development and technical leadership across India.`;

export const metadata = pageMetadata({ title: "Hire a Developer in Ahmedabad & India", description, path: "/hire/" });

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Hire", path: "/hire/" },
];

export default function HireIndex() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Breadcrumbs items={crumbs} />
      <p className="eyebrow">Hire me</p>
      <h1 className="display mt-5 text-5xl sm:text-7xl">
        Hire a Flutter & full stack developer <span className="serif-accent tracking-normal">in Ahmedabad.</span>
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{description}</p>
      <div className="mt-14 grid gap-4 sm:grid-cols-2">
        {hirePages.map((h) => (
          <Link key={h.slug} href={`/hire/${h.slug}/`} className="group rounded-3xl border border-line p-7 transition-colors hover:border-line-strong hover:bg-white/[0.03]">
            <p className="flex items-start justify-between gap-4 font-display text-2xl font-semibold tracking-[-0.035em] group-hover:text-violet-soft">
              {h.title}
              <ArrowUpRight className="h-5 w-5 shrink-0 text-subtle" />
            </p>
            <p className="mt-3 text-muted">{h.description}</p>
          </Link>
        ))}
      </div>
      <ContactCta />
    </PageShell>
  );
}
