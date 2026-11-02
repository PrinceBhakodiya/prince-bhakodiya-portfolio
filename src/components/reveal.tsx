"use client";

import { motion } from "framer-motion";

export const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Eyebrow + giant display title + serif subtitle, as used across sections. */
export function SectionTitle({
  eyebrow,
  title,
  serif,
  aside,
}: {
  eyebrow: string;
  title: string;
  serif?: string;
  aside?: React.ReactNode;
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="display mt-6 text-[3.4rem] sm:text-7xl lg:text-[7.5rem]">{title}</h2>
        {serif && <p className="serif-accent mt-3 text-4xl sm:text-5xl lg:text-6xl">{serif}</p>}
      </Reveal>
      {aside && <Reveal delay={0.1}>{aside}</Reveal>}
    </div>
  );
}
