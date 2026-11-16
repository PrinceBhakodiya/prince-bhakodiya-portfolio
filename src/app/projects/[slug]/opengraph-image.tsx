import { projects } from "@/data/projects";
import { ogCard, ogSize } from "@/lib/og";

export const dynamicParams = false;
export const alt = "Prince Bhakodiya";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.find((x) => x.id === slug)!;
  return ogCard({ eyebrow: p.category, title: p.title, subtitle: p.tagline });
}
