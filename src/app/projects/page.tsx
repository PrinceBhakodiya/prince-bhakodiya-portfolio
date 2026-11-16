import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { PageShell, Breadcrumbs } from "@/components/page-shell";
import { ProjectCard, ContactCta } from "@/components/content";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl, breadcrumbSchema, pageMetadata, PERSON_ID } from "@/lib/seo";

const description = `Apps and platforms built and shipped by ${siteConfig.name}, a full stack and Flutter developer in Ahmedabad: ride-hailing, fintech, quick commerce, PropTech, marketplaces and CRM.`;

export const metadata = pageMetadata({
  title: "Projects — Apps & Platforms I've Shipped",
  description,
  path: "/projects/",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects/" },
];

export default function ProjectsPage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          {
            "@type": "CollectionPage",
            name: "Projects by Prince Bhakodiya",
            url: absoluteUrl("/projects/"),
            description,
            author: { "@id": PERSON_ID },
            mainEntity: {
              "@type": "ItemList",
              itemListElement: projects.map((p, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: absoluteUrl(`/projects/${p.id}/`),
                name: p.title,
              })),
            },
          },
        ]}
      />
      <Breadcrumbs items={crumbs} />
      <p className="eyebrow">Projects · {projects.length} shipped</p>
      <h1 className="display mt-5 text-6xl sm:text-8xl">Things I&apos;ve shipped.</h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{description}</p>
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
      <ContactCta />
    </PageShell>
  );
}
