import { MetadataRoute } from "next";
import { posts } from "@/data/blog";
import { projects } from "@/data/projects";
import { hirePages } from "@/data/hire";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

const LAST_UPDATED = "2026-11-16";

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number, lastModified = LAST_UPDATED) => ({
    url: absoluteUrl(path),
    lastModified,
    priority,
  });
  return [
    page("/", 1),
    page("/about/", 0.9),
    page("/projects/", 0.9),
    page("/blog/", 0.8),
    page("/hire/", 0.8),
    ...hirePages.map((h) => page(`/hire/${h.slug}/`, 0.9)),
    ...projects.map((p) => page(`/projects/${p.id}/`, 0.8)),
    ...posts.map((p) => page(`/blog/${p.slug}/`, 0.7, p.updated ?? p.date)),
  ];
}
