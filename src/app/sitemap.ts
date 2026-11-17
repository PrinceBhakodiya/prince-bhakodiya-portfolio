import { MetadataRoute } from "next";
import { posts } from "@/data/blog";
import { projects } from "@/data/projects";
import { hirePages } from "@/data/hire";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

/**
 * lastmod must be honest, or search engines learn to ignore it. Bump a date here
 * only when that page's content really changes. Blog posts use their own dates.
 */
const UPDATED = {
  home: "2026-11-17",
  about: "2026-11-17",
  projects: "2026-11-17",
  hire: "2026-11-17",
  blogIndex: "2026-11-16",
};

const newest = (dates: string[]) => dates.sort().at(-1)!;

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, lastModified: string) => ({ url: absoluteUrl(path), lastModified });
  const postDate = (p: (typeof posts)[number]) => p.updated ?? p.date;
  return [
    page("/", UPDATED.home),
    page("/about/", UPDATED.about),
    page("/projects/", UPDATED.projects),
    page("/blog/", newest([UPDATED.blogIndex, ...posts.map(postDate)])),
    page("/hire/", UPDATED.hire),
    ...hirePages.map((h) => page(`/hire/${h.slug}/`, UPDATED.hire)),
    ...projects.map((p) => page(`/projects/${p.id}/`, UPDATED.projects)),
    ...posts.map((p) => page(`/blog/${p.slug}/`, postDate(p))),
  ];
}
