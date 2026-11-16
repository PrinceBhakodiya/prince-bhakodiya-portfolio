import { posts } from "@/data/blog";
import { ogCard, ogSize } from "@/lib/og";

export const dynamicParams = false;
export const alt = "Prince Bhakodiya";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug)!;
  return ogCard({ eyebrow: p.kind === "case-study" ? "Case study" : "Blog", title: p.title });
}
