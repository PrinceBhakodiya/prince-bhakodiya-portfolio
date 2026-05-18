"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";

const timeline = [
  {
    year: "2021",
    title: "Intern",
    desc: "Started as a software development intern — learning how real products are built and shipped.",
  },
  {
    year: "2022",
    title: "App Developer",
    desc: "Shipped Flutter mobile apps end to end, from UI and APIs to store releases.",
  },
  {
    year: "2023",
    title: "Full Stack @ Startup",
    desc: "Grew into full stack work — mobile, backends, real-time systems, and cloud deployments.",
  },
  {
    year: "2024",
    title: "Senior Engineer",
    desc: "Owned larger products at scale — ride-hailing, CRM, fintech, and delivery platforms.",
  },
  {
    year: "2026",
    title: "Tech Lead",
    desc: "Leading engineering and building multiple production products across domains.",
  },
];

const expertise = [
  "Flutter",
  "Node.js",
  "FastAPI",
  "Next.js",
  "MongoDB",
  "PostgreSQL",
  "AWS",
  "Firebase",
  "Redis",
  "Docker",
  "WebSockets",
  "AI Integrations",
  "Scalable System Design",
];

export function About() {
  return (
    <section id="about" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          label="About"
          title="Building scalable products & software"
          description="From mobile apps to real-time platforms — I ship production software that scales."
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full">
              <h3 className="text-xl font-semibold">The Journey</h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                As a full stack engineer and tech lead, I&apos;ve spent years building
                production-grade products that solve real-world problems. From ride-hailing
                apps serving 100K+ users to CRM platforms, crypto analytics, and quick-commerce
                — every build is made to scale.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                My expertise spans Flutter mobile apps, Node.js and FastAPI backends, real-time
                systems, payments, and cloud infrastructure. I focus on shipping reliable
                software — end to end, from idea to the app store.
              </p>
            </GlassCard>
          </Reveal>

          <div className="space-y-4">
            {timeline.map((item, i) => (
              <Reveal key={item.year} delay={i * 0.1}>
                <GlassCard className="flex gap-4" hover={false}>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 font-mono text-sm font-bold text-blue-400">
                    {item.year}
                  </div>
                  <div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.3}>
          <div className="mt-12 flex flex-wrap justify-center gap-2">
            {expertise.map((skill) => (
              <motion.span
                key={skill}
                whileHover={{ scale: 1.05 }}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-blue-500/30 hover:text-blue-400"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
