"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowDown, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/site";
import { scrollToId } from "@/lib/scroll";
import { Dock } from "./dock";
import { ease } from "./reveal";
import { useClock, useMediaQuery } from "@/lib/use-client";

function formatLocalTime() {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: siteConfig.timeZone,
  })
    .format(new Date())
    .toUpperCase();
}

function LocalTime() {
  const time = useClock(formatLocalTime);
  return <span className="tabular-nums">{time ?? "—"}</span>;
}

// Deterministic per-letter scatter (same on server and client, so no hydration mismatch)
const scatter = (i: number, salt: number) => {
  const x = Math.sin((i + 1) * 12.9898 + salt * 78.233) * 43758.5453;
  // Two decimals: the server and the browser serialise long floats differently
  return Math.round((x - Math.floor(x)) * 100) / 100;
};

// Drop timing (seconds). Letters land in a scattered order rather than left to right.
const FALL = 1.15;
const IMPACT = 0.52; // fraction of FALL at which a letter first hits the baseline
const dropDelay = (i: number, salt: number) => 0.25 + salt * 0.35 + scatter(i, salt * 10) * 0.85;
const LAST_LANDING = 0.25 + 0.35 + 0.85 + FALL * IMPACT;

/** Little dust puff where a letter hits the baseline. */
function Dust({ delay }: { delay: number }) {
  return (
    <span className="pointer-events-none absolute inset-x-0 bottom-[0.06em] flex justify-center" aria-hidden>
      {[-1, -0.4, 0.4, 1].map((dir) => (
        <motion.span
          key={dir}
          className="absolute h-[0.05em] w-[0.05em] rounded-full bg-violet-soft/80"
          initial={{ opacity: 0, x: 0, y: 0, scale: 0.4 }}
          animate={{
            opacity: [0, 0.9, 0],
            x: ["0em", `${dir * 0.35}em`],
            y: ["0em", "-0.12em", "-0.02em"],
            scale: [0.4, 1, 0.6],
          }}
          transition={{ duration: 0.6, delay, ease: "easeOut" }}
        />
      ))}
    </span>
  );
}

/**
 * Each letter drops from the top edge of the page with gravity: it accelerates,
 * squashes on impact, bounces twice and settles. Nothing fades or blurs; the
 * letters are solid the whole way down. Once landed they can be grabbed and
 * flung (desktop), and they spring back home.
 */
function FallingWord({
  text,
  salt,
  reduced,
  draggable,
}: {
  text: string;
  salt: number;
  reduced: boolean;
  draggable: boolean;
}) {
  return (
    <span className="inline-flex whitespace-nowrap" aria-hidden>
      {text.split("").map((char, i) => {
        const delay = dropDelay(i, salt);
        const r = scatter(i, salt * 7 + 3);
        return (
          <span key={i} className="relative inline-block">
            {/* Fall: transform only, origin at the feet so the squash looks grounded */}
            <motion.span
              className="inline-block origin-bottom will-change-transform"
              initial={reduced ? false : { y: "-120vh", scaleY: 1.18, scaleX: 0.9 }}
              animate={{
                y: ["-120vh", "0vh", "-5vh", "0vh", "-1.2vh", "0vh"],
                scaleY: [1.18, 1.18, 0.74, 1.06, 0.94, 1],
                scaleX: [0.9, 0.9, 1.2, 0.97, 1.03, 1],
              }}
              transition={{
                duration: FALL,
                delay,
                times: [0, IMPACT, 0.7, 0.84, 0.92, 1],
                ease: ["easeIn", "easeOut", "easeIn", "easeOut", "easeIn"],
              }}
            >
              {/* Interaction layer, separate from the fall so units never fight */}
              <motion.span
                className={draggable ? "inline-block cursor-grab active:cursor-grabbing" : "inline-block"}
                data-cursor={draggable ? "Drag" : undefined}
                drag={draggable}
                dragSnapToOrigin
                dragElastic={0.55}
                dragTransition={{ bounceStiffness: 260, bounceDamping: 12 }}
                whileDrag={{ scale: 1.12, rotate: (r - 0.5) * 30, color: "#a78bfa", zIndex: 30 }}
                whileHover={{
                  y: -14,
                  rotate: (r - 0.5) * 10,
                  color: "#a78bfa",
                  transition: { type: "spring", stiffness: 420, damping: 14 },
                }}
              >
                {char}
              </motion.span>
            </motion.span>
            {!reduced && <Dust delay={delay + FALL * IMPACT - 0.02} />}
          </span>
        );
      })}
    </span>
  );
}

function Currently() {
  const items = siteConfig.currently;
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 3200);
    return () => clearInterval(id);
  }, [items.length]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="eyebrow">Currently</p>
        <div className="flex items-center gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Show item ${i + 1}`}
              className="h-1.5 rounded-full bg-white/20 transition-all duration-500"
              style={{ width: i === index ? 28 : 6, background: i === index ? "var(--violet-soft)" : undefined }}
            />
          ))}
        </div>
      </div>
      <div className="relative mt-5 h-9 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.45, ease }}
            className="font-display text-2xl font-semibold tracking-[-0.04em] sm:text-[28px]"
          >
            {items[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const nameY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const reduced = useReducedMotion() ?? false;
  const canDrag = useMediaQuery("(pointer: fine)");
  const [portrait, setPortrait] = useState(false);
  const portraitRef = useRef<HTMLImageElement>(null);

  // The image may finish loading before hydration, when onLoad has not been attached yet
  useEffect(() => {
    const img = portraitRef.current;
    if (img?.complete && img.naturalWidth > 0) setPortrait(true);
  }, []);

  return (
    <section ref={ref} id="top" className="relative overflow-hidden px-4 pb-16 pt-28 sm:px-8 sm:pt-32">
      {/* Atmosphere */}
      <motion.div
        style={{ scale: glowScale }}
        className="pointer-events-none absolute left-1/2 top-[-10%] h-[720px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(139,92,246,0.38),rgba(109,40,217,0.12)_55%,transparent)]"
      />
      <div className="grid-floor pointer-events-none absolute inset-x-0 bottom-0 h-[420px]" />

      <div className="relative mx-auto max-w-[1440px]">
        {/* Top row */}
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            onClick={() => scrollToId("contact")}
            className="glass group flex items-center gap-3 rounded-full p-1.5 pr-1.5 text-left"
          >
            <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-violet/60">
              <Image src={siteConfig.logo} alt="" fill sizes="44px" className="object-cover" />
              <span className="absolute bottom-0.5 right-0.5 h-2.5 w-2.5 rounded-full bg-[#28c840] ring-2 ring-background" />
            </span>
            <span className="pr-2">
              <span className="block text-[15px] font-medium">Open to collaborations</span>
              <span className="block text-xs text-muted">Freelance · Full-time · Consulting</span>
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-violet text-white transition-transform group-hover:translate-x-0.5">
              <ArrowRight className="h-4 w-4" />
            </span>
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-sm sm:text-right"
          >
            <span className="block font-medium">Based in {siteConfig.location}</span>
            <span className="block text-muted">
              Local time <LocalTime />
            </span>
          </motion.p>
        </div>

        {/* Name, centred, with the portrait standing between the words */}
        <div className="relative mt-12 sm:mt-10">
          {/* Portrait: drop a transparent cut-out at /public/prince.png and it appears here */}
          <motion.div
            style={{ y: photoY }}
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center"
          >
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 60, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 60, damping: 16, delay: LAST_LANDING }}
              className="relative h-[118%] w-[62%] max-w-[520px] sm:w-[44%] lg:w-[30%]"
              style={{ aspectRatio: "4 / 5" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- optional file; must fail silently */}
              <img
                ref={portraitRef}
                src="/prince.png"
                alt=""
                className={`absolute inset-0 h-full w-full object-contain object-bottom transition-opacity duration-700 [mask-image:linear-gradient(to_bottom,black_75%,transparent)] ${portrait ? "opacity-100" : "opacity-0"}`}
                onLoad={() => setPortrait(true)}
              />
            </motion.div>
          </motion.div>
          {!portrait && (
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/35 blur-[90px] sm:h-96 sm:w-[34rem]" />
          )}

          <motion.h1
            style={{ y: nameY }}
            // A small jolt when the last letter hits the floor
            animate={reduced ? undefined : { x: [0, -7, 6, -3, 2, 0] }}
            transition={{ duration: 0.45, delay: LAST_LANDING, ease: "easeOut" }}
            className="display relative flex flex-col items-center text-center text-[18.5vw] text-[#f3f2f5] lg:flex-row lg:justify-center lg:gap-[0.22em] lg:text-[10.6vw] 2xl:text-[156px]"
          >
            <span className="sr-only">{siteConfig.name}</span>
            <FallingWord text="Prince" salt={0} reduced={reduced} draggable={canDrag} />
            <FallingWord text="Bhakodiya" salt={1} reduced={reduced} draggable={canDrag} />
          </motion.h1>

          {/* The floor the letters land on: lights up under the impacts, then rests */}
          <motion.div
            aria-hidden
            className="relative mx-auto mt-1 h-px w-full max-w-[1100px] origin-center bg-gradient-to-r from-transparent via-violet-soft to-transparent"
            initial={reduced ? false : { scaleX: 0.2, opacity: 0 }}
            animate={{ scaleX: [0.2, 1, 1], opacity: [0, 1, 0.35] }}
            transition={{ duration: 1.6, delay: 0.75, times: [0, 0.5, 1], ease: "easeOut" }}
          />

          {/* Hand-written hint, desktop only */}
          {canDrag && !reduced && (
            <motion.p
              aria-hidden
              initial={{ opacity: 0, y: 8, rotate: -6 }}
              animate={{ opacity: 1, y: 0, rotate: -6 }}
              transition={{ duration: 0.6, delay: LAST_LANDING + 0.6, ease }}
              className="serif-accent pointer-events-none absolute -bottom-12 right-[6%] hidden items-center gap-2 text-2xl lg:flex"
            >
              <svg width="44" height="28" viewBox="0 0 44 28" fill="none" className="-scale-x-100 rotate-[200deg]">
                <path d="M2 4c10 2 22 8 30 20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M26 22l6 3 1-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              psst — throw the letters around
            </motion.p>
          )}
        </div>

        {/* Intro + currently */}
        <div className="mt-14 grid gap-10 border-t border-line pt-8 lg:mt-20 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: LAST_LANDING - 0.2, ease }}
            className="max-w-3xl text-xl leading-[1.55] text-muted sm:text-2xl lg:text-[27px]"
          >
            Full Stack Developer and <span className="text-foreground">Tech Lead</span>. I design, build and ship
            products for <span className="serif-accent text-[1.15em]">Android, iOS and the web</span> — ride-hailing,
            fintech, quick-commerce and CRM platforms used by <span className="text-foreground">100K+ people</span>,
            from the first screen to the last API.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: LAST_LANDING - 0.05, ease }}
            className="flex flex-col justify-between gap-8"
          >
            <Currently />
            <div className="grid gap-4 sm:grid-cols-2">
              <button
                onClick={() => scrollToId("shipping")}
                className="btn-glow flex h-16 items-center justify-center gap-2 rounded-full text-[17px] font-medium text-white transition-transform active:scale-[0.97]"
              >
                See what&apos;s shipping <ArrowDown className="h-4 w-4" />
              </button>
              <a
                href={siteConfig.contact.email}
                className="btn-dark flex h-16 items-center justify-center gap-2 rounded-full text-[17px] font-medium transition-transform active:scale-[0.97]"
              >
                Work with me <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: LAST_LANDING + 0.15, ease }}
          className="mt-16"
        >
          <Dock />
        </motion.div>
      </div>
    </section>
  );
}
