"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { services } from "@/data/services";

export function Services() {
  return (
    <section id="services" className="relative py-32">
      <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 to-transparent" />
      <motion.div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          label="Services"
          title="What I build for founders & enterprises"
          description="End-to-end engineering services for ambitious startups."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <GlassCard key={service.title} delay={i * 0.05}>
              <service.icon className="mb-4 h-8 w-8 text-blue-400" />
              <h3 className="font-semibold">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
