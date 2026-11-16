import { ogCard, ogSize } from "@/lib/og";
import { siteConfig } from "@/data/site";

export const dynamic = "force-static";
export const alt = siteConfig.title;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    eyebrow: "Ahmedabad · India",
    title: siteConfig.name,
    subtitle: "Flutter & Full Stack Developer, Tech Lead. Apps used by 100K+ people.",
  });
}
