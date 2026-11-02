"use client";

import { motion } from "framer-motion";
import { services } from "@/data/services";
import { Reveal, SectionTitle } from "./reveal";

export function Services() {
  return (
    <section id="services" className="relative px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1440px]">
        <SectionTitle eyebrow="Services" title="What I build." serif="From idea to app store." />

        <div className="mt-16 grid gap-px overflow-hidden rounded-[32px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon: Icon, title, description }, i) => (
            <Reveal key={title} delay={(i % 4) * 0.05} className="h-full">
              <motion.div
                whileHover="hover"
                className="group relative flex h-full flex-col bg-[#0e0d14] p-7 sm:p-8"
              >
                <motion.div
                  variants={{ hover: { opacity: 1 } }}
                  initial={{ opacity: 0 }}
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_70%_at_20%_0%,rgba(139,92,246,0.18),transparent_70%)]"
                />
                <div className="relative flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-line-strong bg-white/[0.03]">
                    <Icon className="h-5 w-5 text-violet-soft" />
                  </span>
                  <span className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="relative mt-10 font-display text-2xl font-semibold tracking-[-0.04em]">{title}</h3>
                <p className="relative mt-3 text-[15px] leading-relaxed text-muted">{description}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
