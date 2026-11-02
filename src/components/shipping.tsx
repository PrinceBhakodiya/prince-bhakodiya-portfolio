"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight, Apple, Play, Globe, Smartphone, Monitor } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { scrollToId } from "@/lib/scroll";
import { cn } from "@/lib/utils";
import { IconStack } from "./dock";
import { Laptop, Phone } from "./mockups";
import { Reveal, SectionTitle, ease } from "./reveal";
import { useClock } from "@/lib/use-client";

function yearInfo(day: string) {
  const now = new Date(day);
  const year = now.getFullYear();
  const start = new Date(year, 0, 1).getTime();
  const end = new Date(year + 1, 0, 1).getTime();
  return {
    year,
    pct: Math.floor(((now.getTime() - start) / (end - start)) * 100),
    left: Math.ceil((end - now.getTime()) / 86_400_000),
  };
}

function YearProgress() {
  // Keyed on the date string so the snapshot stays stable within a day
  const day = useClock(() => new Date().toDateString(), 60 * 60_000);
  const info = day ? yearInfo(day) : null;
  const filled = info ? Math.round(info.pct / 10) : 0;

  return (
    <div className="w-full max-w-md">
      <div className="flex items-baseline justify-between">
        <p className="font-display text-lg font-semibold tracking-[-0.03em]">
          {info ? `${info.year} is ${info.pct}% done` : "This year"}
        </p>
        <p className="text-sm text-muted">{info ? `${info.left} days left` : ""}</p>
      </div>
      <div className="mt-3 flex gap-1.5">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.span
            key={i}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className="h-1.5 flex-1 origin-left rounded-full"
            style={{ background: i < filled ? "var(--violet-soft)" : "rgba(255,255,255,0.1)" }}
          />
        ))}
      </div>
      <p className="mt-3 text-sm text-muted">Prince is out-shipping the calendar.</p>
    </div>
  );
}

function StatsBar() {
  return (
    <div className="flex flex-col gap-10 border-t border-line pt-10 lg:flex-row lg:items-start lg:justify-between">
      <div className="grid grid-cols-2 gap-x-12 gap-y-8 sm:flex sm:gap-16">
        {siteConfig.stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.06}>
            <p className="font-display text-4xl font-semibold tracking-[-0.05em] sm:text-[44px]">{stat.value}</p>
            <p className="eyebrow mt-2 !text-[0.66rem]">{stat.label}</p>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.2}>
        <YearProgress />
      </Reveal>
    </div>
  );
}

function primaryLink(project: Project) {
  const l = project.links ?? {};
  if (l.playStore) return { href: l.playStore, label: "Get it on Google Play", icon: Play };
  if (l.appStore) return { href: l.appStore, label: "Download on App Store", icon: Apple };
  if (l.website) return { href: l.website, label: "Visit website", icon: Globe };
  return null;
}

function hostOf(url?: string) {
  if (!url) return null;
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return null;
  }
}

function ShowcaseCard({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Cards underneath shrink slightly as the next one slides over them
  const scale = useTransform(progress, [index / total, 1], [1, 1 - (total - index) * 0.025]);
  const primary = primaryLink(project);
  const isWeb = project.screen === "crm";
  const secondary = [
    project.links?.appStore && primary?.href !== project.links.appStore && { href: project.links.appStore, label: "App Store", icon: Apple },
    project.links?.playStoreDriver && { href: project.links.playStoreDriver, label: "Driver app", icon: Play },
    project.links?.website && primary?.href !== project.links.website && { href: project.links.website, label: "Website", icon: Globe },
  ].filter(Boolean) as { href: string; label: string; icon: typeof Play }[];
  const host = hostOf(project.links?.website);

  return (
    <div id={`app-${project.id}`} className="lg:sticky lg:top-24" style={{ scrollMarginTop: 96 }}>
      <motion.article
        style={{ scale, transformOrigin: "top center" }}
        className="relative overflow-hidden rounded-[32px] border border-line bg-[#121119] lg:h-[calc(100vh-120px)] lg:max-h-[860px] lg:min-h-[640px] lg:rounded-[44px]"
      >
        {/* Glow in the app's colour */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(70% 70% at 78% 40%, ${project.color}33, transparent 70%), radial-gradient(50% 60% at 0% 100%, ${project.color}14, transparent 70%), linear-gradient(160deg, #1a1824, #0e0d13)`,
          }}
        />

        <div className="relative grid h-full gap-10 p-6 sm:p-10 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-6 lg:p-16">
          {/* Copy */}
          <div className="flex flex-col">
            <div className="flex items-center gap-4">
              <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[24%] shadow-[0_14px_30px_-10px_rgba(0,0,0,0.9)] ring-1 ring-white/15 sm:h-20 sm:w-20">
                <Image src={project.icon} alt={`${project.title} icon`} fill sizes="80px" className="object-cover" unoptimized={project.icon.endsWith(".svg")} />
              </span>
              <div className="flex flex-col gap-2">
                <p className="font-mono text-sm text-muted">
                  {String(index + 1).padStart(2, "0")} <span className="mx-1 text-subtle">/</span> {String(total).padStart(2, "0")}
                </p>
                <span className="inline-flex w-fit items-center gap-2 whitespace-nowrap rounded-full border border-line-strong px-3 py-1 text-sm">
                  {isWeb ? <Monitor className="h-3.5 w-3.5" /> : <Smartphone className="h-3.5 w-3.5" />}
                  {project.kind}
                  <span className="hidden text-muted sm:inline">· {project.category}</span>
                </span>
              </div>
            </div>

            <h3 className="display mt-8 text-[3.2rem] sm:text-7xl lg:text-[6.2rem]">{project.title}</h3>
            <p className="serif-accent mt-2 text-3xl sm:text-4xl lg:text-[2.75rem]" style={{ color: `color-mix(in oklab, ${project.color} 55%, white)` }}>
              {project.tagline}
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{project.description}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.features.slice(0, 4).map((f) => (
                <span key={f} className="rounded-full border border-line-strong px-4 py-1.5 text-sm text-foreground/90">
                  {f}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {primary && (
                <a
                  href={primary.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-13 items-center gap-2 rounded-full px-6 text-[15px] font-medium text-black transition-transform active:scale-95"
                  style={{ background: `color-mix(in oklab, ${project.color} 35%, white)` }}
                >
                  <primary.icon className="h-4 w-4" /> {primary.label} <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
              {secondary.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-13 items-center gap-2 rounded-full border border-line-strong px-5 text-[15px] text-foreground/90 transition-colors hover:bg-white/[0.05]"
                >
                  <s.icon className="h-4 w-4" /> {s.label}
                </a>
              ))}
              {host && <span className="font-mono text-sm text-muted">{host}</span>}
            </div>
          </div>

          {/* Device */}
          <a
            href={primary?.href}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor={primary ? "Open app" : undefined}
            className="relative flex min-h-[420px] items-center justify-center lg:h-full"
            aria-label={`Open ${project.title}`}
          >
            {isWeb ? (
              <Laptop project={project} className="w-full max-w-[680px]" />
            ) : (
              <motion.div
                initial={{ y: 40, rotate: 0 }}
                whileInView={{ y: 0, rotate: -3 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease }}
                className="w-[58%] max-w-[300px] lg:w-[48%]"
              >
                <Phone project={project} />
              </motion.div>
            )}

            {/* Floating detail card */}
            <motion.div
              initial={{ opacity: 0, y: 30, x: -10 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3, ease }}
              className={cn(
                "glass absolute w-[170px] rounded-2xl p-3.5 sm:w-[250px] sm:rounded-3xl sm:p-5",
                isWeb ? "bottom-0 left-0 sm:bottom-4" : "bottom-4 -left-1 sm:bottom-6 sm:left-[4%]"
              )}
            >
              <div className="flex items-center justify-between">
                <p className="eyebrow !text-[0.62rem]">{project.overlay.label}</p>
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70" style={{ background: project.color }} />
                  <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: project.color }} />
                </span>
              </div>
              <p className="mt-2 font-display text-lg font-semibold tracking-[-0.04em] sm:mt-3 sm:text-2xl">{project.overlay.value}</p>
              <p className="mt-1 text-xs text-muted sm:text-sm">{project.overlay.meta}</p>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: "8%" }}
                  whileInView={{ width: "72%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.6, delay: 0.5, ease }}
                  className="h-full rounded-full"
                  style={{ background: project.color }}
                />
              </div>
            </motion.div>
          </a>
        </div>
      </motion.article>
    </div>
  );
}

/** Vertical app switcher pinned to the right edge while the showcase is on screen. */
function Rail({ active, visible }: { active: number; visible: boolean }) {
  return (
    <motion.nav
      aria-label="Apps"
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 20 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "glass fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-3 rounded-full px-2.5 py-5 xl:flex",
        !visible && "pointer-events-none"
      )}
    >
      <span className="font-mono text-xs text-muted">{String(active + 1).padStart(2, "0")}</span>
      <span className="h-5 w-px bg-white/15" />
      {projects.map((p, i) => (
        <button
          key={p.id}
          onClick={() => scrollToId(`app-${p.id}`, -96)}
          aria-label={p.title}
          className={cn(
            "relative h-9 w-9 overflow-hidden rounded-[24%] transition-all duration-300",
            i === active ? "scale-110 opacity-100 ring-2 ring-white/70" : "opacity-45 hover:opacity-90"
          )}
        >
          <Image src={p.icon} alt="" fill sizes="36px" className="object-cover" unoptimized={p.icon.endsWith(".svg")} />
        </button>
      ))}
      <span className="h-5 w-px bg-white/15" />
      <span className="font-mono text-xs text-muted">{String(projects.length).padStart(2, "0")}</span>
    </motion.nav>
  );
}

export function Shipping() {
  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setVisible(v > 0 && v < 1);
    // The card whose top has reached the sticky line is the one on screen
    let current = 0;
    projects.forEach((p, i) => {
      const el = document.getElementById(`app-${p.id}`);
      if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.5) current = i;
    });
    setActive(current);
  });

  return (
    <section id="shipping" className="relative px-4 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-[1440px]">
        <StatsBar />

        <div className="mt-28 sm:mt-40">
          <SectionTitle
            eyebrow="Featured · Latest releases"
            title="Now shipping."
            serif="Fresh off the workbench."
            aside={
              <div className="lg:pb-4">
                <p className="text-lg leading-relaxed text-muted sm:text-xl">
                  Apps I&apos;ve built and shipped across Android, iOS and the web — real products with real users,
                  real-time backends and payments. Scroll to step inside each one.
                </p>
                <div className="mt-8">
                  <IconStack />
                </div>
              </div>
            }
          />
        </div>

        <div ref={stackRef} className="relative mt-16 flex flex-col gap-6 sm:mt-24 lg:gap-10">
          {projects.map((project, i) => (
            <ShowcaseCard key={project.id} project={project} index={i} total={projects.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
      <Rail active={active} visible={visible} />
    </section>
  );
}
