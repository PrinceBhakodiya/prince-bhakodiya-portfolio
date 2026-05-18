"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Code,
  FileText,
  ArrowUpRight,
  Smartphone,
  Globe,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { projects } from "@/data/projects";
import { TechIconBadge } from "@/components/ui/tech-icon";
import { cn } from "@/lib/utils";

const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

export function Projects() {
  const [filter, setFilter] = useState("All");
  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          label="Projects"
          title="Production systems I've built"
          description="Real-world platforms — CRM, ride-hailing, crypto, quick commerce, and corporate food delivery."
        />

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all",
                filter === cat
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20"
                  : "border border-white/10 bg-white/5 text-muted-foreground hover:border-white/20"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <GlassCard delay={i * 0.05} className="h-full">
                  <div
                    className={cn(
                      "mb-6 h-48 rounded-xl bg-gradient-to-br",
                      project.imageBackground ?? project.gradient,
                      "relative overflow-hidden"
                    )}
                  >
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.imageAlt ?? project.title}
                        fill
                        className={cn(
                          "object-center",
                          project.imageFit === "contain"
                            ? "object-contain p-4"
                            : "object-cover"
                        )}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority={project.id === "antoc" || project.id === "vayu"}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl font-bold opacity-10">
                          {project.title.charAt(0)}
                        </span>
                      </div>
                    )}
                    {project.image && project.imageFit !== "contain" && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    )}
                    {project.architecture && (
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex flex-wrap gap-1">
                          {project.architecture.map((node, ni) => (
                            <span
                              key={node}
                              className="rounded-md border border-white/10 bg-black/40 px-2 py-1 text-[10px] font-mono text-blue-300 backdrop-blur-sm"
                            >
                              {ni > 0 && "→ "}
                              {node}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <span className="text-xs font-medium uppercase tracking-wider text-blue-400">
                        {project.category}
                      </span>
                      <h3 className="mt-1 text-xl font-bold">{project.title}</h3>
                      {project.subtitle && (
                        <p className="text-sm text-muted-foreground">{project.subtitle}</p>
                      )}
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>

                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>

                  <div className="mb-4">
                    <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Platforms
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.platforms.map((p) => (
                        <span
                          key={p}
                          className="rounded-md bg-white/5 px-2 py-1 text-xs text-muted-foreground"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <TechIconBadge key={t} name={t} />
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.links?.playStore && (
                      <Link
                        href={project.links.playStore}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-white/10"
                      >
                        <Smartphone className="h-3.5 w-3.5" />
                        {project.links.playStoreDriver ? "User App" : "Play Store"}
                      </Link>
                    )}
                    {project.links?.playStoreDriver && (
                      <Link
                        href={project.links.playStoreDriver}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-white/10"
                      >
                        <Smartphone className="h-3.5 w-3.5" /> Driver App
                      </Link>
                    )}
                    {project.links?.appStore && (
                      <Link
                        href={project.links.appStore}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-white/10"
                      >
                        <Smartphone className="h-3.5 w-3.5" /> App Store
                      </Link>
                    )}
                    {project.links?.website && (
                      <Link
                        href={project.links.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-white/10"
                      >
                        <Globe className="h-3.5 w-3.5" /> Website
                      </Link>
                    )}
                    {project.links?.demo && (
                      <Link
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-white/10"
                      >
                        <ExternalLink className="h-3.5 w-3.5" /> Demo
                      </Link>
                    )}
                    {project.links?.github && (
                      <Link
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-white/10"
                      >
                        <Code className="h-3.5 w-3.5" /> GitHub
                      </Link>
                    )}
                    {project.links?.caseStudy && (
                      <Link
                        href={project.links.caseStudy}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-white/10"
                      >
                        <FileText className="h-3.5 w-3.5" /> Case Study
                      </Link>
                    )}
                    {!project.links && (
                      <>
                        <Link
                          href="#"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-white/10"
                        >
                          <ExternalLink className="h-3.5 w-3.5" /> Demo
                        </Link>
                        <Link
                          href="#"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-white/10"
                        >
                          <Code className="h-3.5 w-3.5" /> GitHub
                        </Link>
                        <Link
                          href="#"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-white/10"
                        >
                          <FileText className="h-3.5 w-3.5" /> Case Study
                        </Link>
                      </>
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
