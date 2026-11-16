import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import type { Block } from "@/data/blog";
import type { Project } from "@/data/projects";
import { siteConfig } from "@/data/site";

/** Inline text with [label](href) links. Internal links use next/link so crawlers and prefetch both see them. */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (!m) return part;
        const [, label, href] = m;
        return href.startsWith("/") ? (
          <Link key={i} href={href}>
            {label}
          </Link>
        ) : (
          <a key={i} href={href} target="_blank" rel="noopener noreferrer">
            {label}
          </a>
        );
      })}
    </>
  );
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose-dark">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return <h2 key={i}>{b.text}</h2>;
          case "h3":
            return <h3 key={i}>{b.text}</h3>;
          case "p":
            return (
              <p key={i}>
                <RichText text={b.text} />
              </p>
            );
          case "callout":
            return (
              <aside key={i} className="callout">
                <RichText text={b.text} />
              </aside>
            );
          case "ul":
          case "ol": {
            const List = b.type;
            return (
              <List key={i}>
                {b.items.map((item, j) => (
                  <li key={j}>
                    <RichText text={item} />
                  </li>
                ))}
              </List>
            );
          }
        }
      })}
    </div>
  );
}

/** Direct answer box at the top of a page: the part AI answer engines quote. */
export function Tldr({ text, label = "In short" }: { text: string; label?: string }) {
  return (
    <div className="glass rounded-3xl p-6 sm:p-8">
      <p className="eyebrow !text-violet-soft">{label}</p>
      <p className="mt-3 text-lg leading-relaxed text-foreground/90 sm:text-xl">{text}</p>
    </div>
  );
}

/** Native <details> keeps every answer in the HTML (crawlable) while staying collapsible. */
export function Faqs({ faqs, title = "Frequently asked questions" }: { faqs: { q: string; a: string }[]; title?: string }) {
  return (
    <section className="mt-20">
      <h2 className="font-display text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">{title}</h2>
      <div className="mt-8 divide-y divide-line border-y border-line">
        {faqs.map((f) => (
          <details key={f.q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-lg font-medium">
              <h3>{f.q}</h3>
              <span className="mt-1 text-2xl leading-none text-violet-soft transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 max-w-3xl leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.id}/`}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-white/[0.02] p-6 transition-colors hover:border-line-strong hover:bg-white/[0.04]"
    >
      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
        style={{ background: `radial-gradient(60% 60% at 80% 0%, ${project.color}22, transparent 70%)` }}
      />
      <div className="relative flex items-center gap-4">
        <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-[24%] ring-1 ring-white/15">
          <Image src={project.icon} alt={`${project.title} app icon`} fill sizes="56px" className="object-cover" />
        </span>
        <div className="min-w-0">
          <p className="font-display text-xl font-semibold tracking-[-0.03em]">{project.title}</p>
          <p className="text-sm text-muted">
            {project.category} · {project.kind}
          </p>
        </div>
        <ArrowUpRight className="ml-auto h-5 w-5 shrink-0 text-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
      </div>
      <p className="relative mt-4 line-clamp-3 text-[15px] leading-relaxed text-muted">{project.description}</p>
      <div className="relative mt-5 flex flex-wrap gap-1.5">
        {project.tech.slice(0, 4).map((t) => (
          <span key={t} className="rounded-full border border-line px-2.5 py-0.5 text-xs text-foreground/75">
            {t}
          </span>
        ))}
      </div>
    </Link>
  );
}

/** End-of-page call to action with direct contact links. */
export function ContactCta({ heading = "Have a project in mind?" }: { heading?: string }) {
  return (
    <section className="mt-24 overflow-hidden rounded-[36px] border border-line bg-[radial-gradient(80%_120%_at_50%_0%,rgba(139,92,246,0.25),transparent)] px-6 py-14 text-center sm:px-12">
      <h2 className="display text-5xl sm:text-7xl">{heading}</h2>
      <p className="serif-accent mt-3 text-3xl sm:text-4xl">Let&apos;s ship it.</p>
      <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
        <a
          href={siteConfig.contact.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-glow flex h-14 items-center justify-center gap-2 rounded-full px-7 text-[16px] font-medium text-white"
        >
          <MessageCircle className="h-4 w-4" /> WhatsApp {siteConfig.contact.whatsappDisplay}
        </a>
        <a href={siteConfig.contact.email} className="btn-dark flex h-14 items-center justify-center gap-2 rounded-full px-7 text-[16px]">
          {siteConfig.contact.emailAddress}
        </a>
      </div>
    </section>
  );
}
