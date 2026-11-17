import { hirePages } from "@/data/hire";
import { ogCard, ogSize } from "@/lib/og";

export const dynamicParams = false;
export const alt = "Prince Bhakodiya";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return hirePages.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = hirePages.find((x) => x.slug === slug)!;
  return ogCard({ eyebrow: "Hire · " + p.area, title: p.title, subtitle: "Prince Bhakodiya — apps with 100K+ installs" });
}
