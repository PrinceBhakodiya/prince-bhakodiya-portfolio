"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { experiences } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" className="relative py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <SectionHeading
          label="Experience"
          title="Engineering journey"
          description="From intern in 2021 to tech lead in 2026 — building products that scale."
        />

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-purple-500/30 to-transparent" />

          <motion.div className="space-y-8">
            {experiences.map((exp, i) => (
              <div key={exp.year} className="relative pl-20">
                <div className="absolute left-6 top-6 h-4 w-4 rounded-full border-2 border-blue-500 bg-background shadow-[0_0_12px_rgba(59,130,246,0.5)]" />
                <GlassCard delay={i * 0.1}>
                  <span className="font-mono text-sm text-blue-400">{exp.year}</span>
                  <h3 className="mt-1 text-lg font-semibold">{exp.title}</h3>
                  <p className="text-sm text-purple-400">{exp.company}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {exp.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/5 px-3 py-1 text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
