import { siteConfig } from "@/data/site";
import { projects } from "@/data/projects";
import { posts, plain } from "@/data/blog";
import { hirePages } from "@/data/hire";
import { absoluteUrl } from "./seo";

/** Markdown summary for AI assistants, following the llms.txt convention. */
export function llmsTxt(full: boolean) {
  const lines: string[] = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.bio}`,
    "",
    `- Location: ${siteConfig.address.city}, ${siteConfig.address.region}, ${siteConfig.address.country}`,
    `- Role: ${siteConfig.jobTitle}`,
    `- Contact: ${siteConfig.contact.emailAddress}, WhatsApp ${siteConfig.contact.whatsappDisplay}`,
    `- GitHub: ${siteConfig.links.github}`,
    `- LinkedIn: ${siteConfig.links.linkedin}`,
    `- Skills: ${siteConfig.knowsAbout.join(", ")}`,
    "",
    "## Pages",
    `- [About ${siteConfig.name}](${absoluteUrl("/about/")}): profile, experience and FAQs`,
    `- [Projects](${absoluteUrl("/projects/")}): every app and platform he has shipped`,
    `- [Blog](${absoluteUrl("/blog/")}): case studies and engineering articles`,
    "",
    "## Hire",
    ...hirePages.map((h) => `- [${h.title}](${absoluteUrl(`/hire/${h.slug}/`)}): ${h.description}`),
    "",
    "## Projects",
    ...projects.map((p) => `- [${p.title}](${absoluteUrl(`/projects/${p.id}/`)}): ${p.description} Stack: ${p.tech.join(", ")}.`),
    "",
    "## Blog",
    ...posts.map((p) => `- [${p.title}](${absoluteUrl(`/blog/${p.slug}/`)}): ${p.tldr}`),
  ];

  if (full) {
    for (const p of posts) {
      lines.push("", "---", "", `## ${p.title}`, "", `URL: ${absoluteUrl(`/blog/${p.slug}/`)}`, "", plain(p.tldr), "");
      for (const b of p.body) {
        if (b.type === "h2" || b.type === "h3") lines.push(`### ${b.text}`, "");
        else if (b.type === "ul" || b.type === "ol") lines.push(...b.items.map((i) => `- ${plain(i)}`), "");
        else lines.push(plain(b.text), "");
      }
      for (const f of p.faqs ?? []) lines.push(`**${f.q}** ${f.a}`, "");
    }
  }
  return lines.join("\n");
}
