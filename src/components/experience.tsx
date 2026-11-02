"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experiences } from "@/data/experience";
import { Reveal, SectionTitle } from "./reveal";
import { cn } from "@/lib/utils";

export function Experience() {
  const [open, setOpen] = useState(0);

  return (
    <section id="experience" className="relative px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1440px]">
        <SectionTitle
          eyebrow="Experience"
          title="Five years in."
          serif="Intern to Tech Lead."
          aside={
            <p className="text-lg leading-relaxed text-muted sm:text-xl lg:pb-4">
              Every role added a layer — from fixing bugs on real client projects to designing the systems whole teams
              build on.
            </p>
          }
        />

        <div className="mt-16 border-t border-line">
          {experiences.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.year} delay={i * 0.05}>
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="group block w-full border-b border-line py-7 text-left sm:py-9"
                >
                  <div className="grid items-baseline gap-2 sm:grid-cols-[200px_1fr_auto] sm:gap-8">
                    <span className="font-mono text-sm text-muted">{item.year}</span>
                    <span
                      className={cn(
                        "display text-[2.4rem] transition-colors duration-300 sm:text-6xl",
                        isOpen ? "text-foreground" : "text-foreground/45 group-hover:text-foreground"
                      )}
                    >
                      {item.title}
                    </span>
                    <span className="hidden items-center gap-3 text-muted sm:flex">
                      {item.company}
                      <span
                        className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-full border border-line-strong text-lg transition-transform duration-300",
                          isOpen && "rotate-45 border-violet bg-violet text-white"
                        )}
                      >
                        +
                      </span>
                    </span>
                  </div>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-5 pt-6 sm:grid-cols-[200px_1fr] sm:gap-8">
                          <span className="text-sm text-muted sm:hidden">{item.company}</span>
                          <span className="hidden sm:block" />
                          <div>
                            <p className="max-w-3xl text-lg leading-relaxed text-muted">{item.description}</p>
                            <div className="mt-5 flex flex-wrap gap-2">
                              {item.tags.map((tag) => (
                                <span key={tag} className="rounded-full border border-line-strong px-3.5 py-1 text-sm">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
