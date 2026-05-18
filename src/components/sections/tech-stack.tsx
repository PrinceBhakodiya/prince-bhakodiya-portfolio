"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { techCategories } from "@/data/tech-stack";
import { TechLogoCloud } from "@/components/sections/tech-logo-cloud";
import { TechIcon } from "@/components/ui/tech-icon";

export function TechStack() {
  return (
    <section id="stack" className="relative py-32">
      <motion.div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-purple-500/5" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          label="Tech Stack"
          title="Technologies I build with"
          description="A comprehensive toolkit for building production-grade systems at scale."
        />

        <TechLogoCloud />

        <motion.div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {techCategories.map((category, ci) => (
            <GlassCard key={category.id} delay={ci * 0.05} className="col-span-1">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-400">
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.items.map((item) => (
                  <div key={item.name} className="group">
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm font-medium">
                        <TechIcon
                          name={item.name}
                          slug={item.icon}
                          size={28}
                          className="rounded-md"
                        />
                        {item.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {item.proficiency}%
                      </span>
                    </div>
                    <motion.div className="h-1 overflow-hidden rounded-full bg-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 group-hover:shadow-[0_0_12px_rgba(59,130,246,0.5)]"
                      />
                    </motion.div>
                  </div>
                ))}
              </div>
            </GlassCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
