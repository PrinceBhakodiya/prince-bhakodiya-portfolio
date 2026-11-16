import { articles } from "./articles";
import { caseStudies } from "./case-studies";
import type { Block, Post } from "./blog-types";

export type { Block, Post };

/** Newest first; case studies and articles share one feed. */
export const posts: Post[] = [...articles, ...caseStudies].sort((a, b) => b.date.localeCompare(a.date));

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const postsForProject = (projectId: string) => posts.filter((p) => p.projectId === projectId);

/** Rough reading time at ~220 words per minute. */
export function readingMinutes(post: Post) {
  const text = [post.tldr, ...post.body.map((b) => ("text" in b ? b.text : b.items.join(" ")))].join(" ");
  return Math.max(1, Math.round(text.split(/\s+/).length / 220));
}

/** Plain-text version of a block, without [label](url) link syntax. */
export const plain = (text: string) => text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
