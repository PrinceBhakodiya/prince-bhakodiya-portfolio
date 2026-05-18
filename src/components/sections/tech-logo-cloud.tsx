"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { featuredTechLogos, getTechIconUrlBySlug } from "@/lib/tech-icons";

export function TechLogoCloud() {
  return (
    <div className="mb-16">
      <p className="mb-6 text-center text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        Platforms & tools I build with
      </p>
      <motion.div
        className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.04 } },
        }}
      >
        {featuredTechLogos.map(({ name, slug }) => (
          <motion.div
            key={name}
            variants={{
              hidden: { opacity: 0, y: 8 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/[0.06]"
          >
            <span className="relative flex h-6 w-6 shrink-0 items-center justify-center">
              <Image
                src={getTechIconUrlBySlug(slug)}
                alt={`${name} logo`}
                width={22}
                height={22}
                className="object-contain"
                unoptimized
              />
            </span>
            <span className="text-xs font-medium text-muted-foreground">{name}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
