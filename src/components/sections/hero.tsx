"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { siteConfig } from "@/data/site";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Button } from "@/components/ui/button";

const HeroScene = dynamic(
  () => import("@/components/effects/hero-scene").then((m) => m.HeroScene),
  { ssr: false }
);

const codeSnippets = [
  "await deploy({ scale: 'auto' })",
  "socket.on('ride:update')",
  "const app = createEcosystem()",
  "pipeline.run('production')",
];

const orbitTech = ["Flutter", "Node.js", "Next.js", "AWS", "AI", "MongoDB"];

function TypingText() {
  const texts = siteConfig.typingTexts;
  const [textIndex, setTextIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIndex];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          if (display.length < current.length) {
            setDisplay(current.slice(0, display.length + 1));
          } else {
            setTimeout(() => setDeleting(true), 2000);
          }
        } else {
          if (display.length > 0) {
            setDisplay(display.slice(0, -1));
          } else {
            setDeleting(false);
            setTextIndex((i) => (i + 1) % texts.length);
          }
        }
      },
      deleting ? 40 : 80
    );
    return () => clearTimeout(timeout);
  }, [display, deleting, textIndex, texts]);

  return (
    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
      {display}
      <span className="animate-pulse">|</span>
    </span>
  );
}

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
      <HeroScene />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

      {/* Floating code snippets */}
      {codeSnippets.map((code, i) => (
        <motion.div
          key={code}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4, y: [0, -12, 0] }}
          transition={{
            opacity: { delay: 1 + i * 0.2, duration: 0.8 },
            y: { duration: 4 + i, repeat: Infinity, ease: "easeInOut" },
          }}
          className="pointer-events-none absolute hidden font-mono text-xs text-blue-400/60 lg:block"
          style={{
            left: `${10 + i * 22}%`,
            top: `${25 + (i % 2) * 30}%`,
          }}
        >
          <div className="rounded-lg border border-white/5 bg-white/5 px-3 py-2 backdrop-blur-sm">
            {code}
          </div>
        </motion.div>
      ))}

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 text-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-blue-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Available for ambitious projects
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Hi, I&apos;m{" "}
          <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
            Prince Bhakodiya
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
        >
          Full Stack Developer • Tech Lead • Product Builder
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mx-auto mt-4 max-w-xl text-muted-foreground"
        >
          I build{" "}
          <TypingText />
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mx-auto mt-6 max-w-2xl text-base text-zinc-500"
        >
          &ldquo;I build scalable products and software — mobile apps, backends, and
          platforms used by thousands of users.&rdquo;
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton>
            <Button asChild size="lg">
              <Link href="#projects">
                Explore Projects <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </MagneticButton>
          <MagneticButton>
            <Button variant="outline" size="lg" asChild>
              <Link href="#architecture">View Architecture</Link>
            </Button>
          </MagneticButton>
          <MagneticButton>
            <Button variant="glass" size="lg" asChild>
              <Link href="#contact">Contact Me</Link>
            </Button>
          </MagneticButton>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {siteConfig.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05 }}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4 backdrop-blur-sm"
            >
              <motion.div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent sm:text-3xl">
                {stat.value}
              </motion.div>
              <motion.div className="mt-1 text-xs text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech orbit */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="relative mx-auto mt-16 h-24 w-full max-w-md"
        >
          {orbitTech.map((tech, i) => {
            const angle = (i / orbitTech.length) * Math.PI * 2;
            const radius = 100;
            return (
              <motion.span
                key={tech}
                animate={{
                  x: Math.cos(angle + Date.now() * 0.0003) * radius,
                  y: Math.sin(angle + Date.now() * 0.0003) * 30,
                }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm"
                style={{
                  transform: `translate(calc(-50% + ${Math.cos(angle) * radius}px), calc(-50% + ${Math.sin(angle) * 40}px))`,
                }}
              >
                {tech}
              </motion.span>
            );
          })}
        </motion.div>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ delay: 1.2, y: { repeat: Infinity, duration: 2 } }}
          className="mt-16 inline-flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="h-5 w-5" />
        </motion.a>
      </div>
    </section>
  );
}
