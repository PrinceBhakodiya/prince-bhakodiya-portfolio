"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";
import { siteConfig } from "@/data/site";
import { projects } from "@/data/projects";
import { hirePages } from "@/data/hire";
import { posts } from "@/data/blog";
import { scrollToId } from "@/lib/scroll";

const columns = [
  {
    title: "Pages",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about/" },
      { label: "Projects", href: "/projects/" },
      { label: "Blog", href: "/blog/" },
      { label: "Hire me", href: "/hire/" },
    ],
  },
  { title: "Hire", links: hirePages.map((h) => ({ label: h.title, href: `/hire/${h.slug}/` })) },
  { title: "Projects", links: projects.map((p) => ({ label: p.title, href: `/projects/${p.id}/` })) },
  { title: "Latest writing", links: posts.slice(0, 5).map((p) => ({ label: p.title, href: `/blog/${p.slug}/` })) },
];

export function Footer() {
  const onHome = usePathname() === "/";
  return (
    <footer className="relative overflow-hidden border-t border-line px-4 pt-16 sm:px-8">
      <div className="mx-auto grid max-w-[1440px] gap-10 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.4fr]">
        {columns.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <p className="eyebrow !text-[0.66rem]">{c.title}</p>
            <ul className="mt-4 space-y-2.5">
              {c.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[15px] text-muted transition-colors hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="mx-auto mt-14 flex max-w-[1440px] flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {siteConfig.name} · {siteConfig.jobTitle} · {siteConfig.location}
        </p>
        <button
          onClick={() => (onHome ? scrollToId("top") : window.scrollTo({ top: 0, behavior: "smooth" }))}
          className="glass flex h-11 w-fit items-center gap-2 rounded-full px-5 text-sm"
        >
          Back to top <ArrowUp className="h-4 w-4" />
        </button>
      </div>
      <p
        aria-hidden
        className="serif-accent pointer-events-none mt-6 select-none text-center text-[34vw] leading-[0.78] !text-white/[0.045] sm:text-[26vw]"
      >
        Prince
      </p>
    </footer>
  );
}
