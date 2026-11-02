"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { techCategories } from "@/data/tech-stack";
import { featuredTechLogos } from "@/lib/tech-icons";
import { TechIcon } from "@/components/ui/tech-icon";
import { MacWindow } from "./mac-window";
import { Reveal, SectionTitle } from "./reveal";
import { cn } from "@/lib/utils";

function Marquee() {
  const items = [...featuredTechLogos, ...featuredTechLogos];
  return (
    <div className="relative overflow-hidden border-y border-line py-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
      <div className="animate-marquee flex w-max gap-12">
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-3 text-lg text-muted">
            <TechIcon name={t.name} slug={t.slug} size={26} className="bg-transparent" />
            {t.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Stack() {
  const [active, setActive] = useState(techCategories[0].id);
  const category = techCategories.find((c) => c.id === active) ?? techCategories[0];

  return (
    <section id="stack" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <SectionTitle eyebrow="Toolkit" title="The stack." serif="Picked for shipping, not for show." />
      </div>

      <div className="mt-14">
        <Marquee />
      </div>

      <div className="mx-auto mt-14 max-w-[1440px] px-4 sm:px-8">
        <Reveal>
          {/* Finder-style window: categories in the sidebar, tools as icons */}
          <MacWindow title={`~/stack/${category.id}`} bodyClassName="grid md:grid-cols-[230px_1fr]">
            <aside className="no-scrollbar flex gap-1 overflow-x-auto border-b border-line p-3 md:flex-col md:border-b-0 md:border-r md:p-4">
              <p className="eyebrow hidden px-3 pb-2 pt-1 !text-[0.6rem] md:block">Favourites</p>
              {techCategories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActive(c.id)}
                  className={cn(
                    "shrink-0 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                    c.id === active ? "bg-violet/25 text-foreground" : "text-muted hover:bg-white/[0.04] hover:text-foreground"
                  )}
                >
                  {c.title}
                </button>
              ))}
            </aside>
            <div className="min-h-[300px] p-6 sm:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4"
                >
                  {category.items.map((item, i) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ y: -6 }}
                      className="flex flex-col items-center gap-3 rounded-2xl p-4 text-center transition-colors hover:bg-white/[0.04]"
                    >
                      <span className="flex h-20 w-20 items-center justify-center rounded-[24%] bg-gradient-to-b from-white/[0.1] to-white/[0.03] ring-1 ring-white/10">
                        <TechIcon name={item.name} slug={item.icon} size={40} className="bg-transparent" />
                      </span>
                      <span className="text-sm font-medium">{item.name}</span>
                      <span className="h-1 w-16 overflow-hidden rounded-full bg-white/10">
                        <motion.span
                          className="block h-full rounded-full bg-violet-soft"
                          initial={{ width: 0 }}
                          animate={{ width: `${item.proficiency}%` }}
                          transition={{ delay: 0.2 + i * 0.05, duration: 0.6 }}
                        />
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </MacWindow>
        </Reveal>
      </div>
    </section>
  );
}
