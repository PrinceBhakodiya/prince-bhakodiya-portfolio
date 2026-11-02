"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { projects, type Project } from "@/data/projects";
import { scrollToId } from "@/lib/scroll";

const BASE = 64;
const MAX = 100;
const RANGE = 170;

function DockIcon({ project, mouseX }: { project: Project; mouseX: MotionValue<number> }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [hover, setHover] = useState(false);

  // macOS magnification: icons grow with proximity to the pointer
  const distance = useTransform(mouseX, (x) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect || x === Infinity) return RANGE;
    return x - (rect.left + rect.width / 2);
  });
  const sizeRaw = useTransform(distance, [-RANGE, 0, RANGE], [BASE, MAX, BASE]);
  const size = useSpring(sizeRaw, { mass: 0.1, stiffness: 170, damping: 14 });
  const lift = useTransform(size, [BASE, MAX], [0, -14]);

  return (
    <div className="relative flex flex-col items-center">
      <AnimatePresence>
        {hover && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="glass pointer-events-none absolute -top-14 z-10 whitespace-nowrap rounded-xl px-3.5 py-2 text-sm"
          >
            <span className="font-medium">{project.title}</span>
            <span className="ml-2 text-muted">{project.kind}</span>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        ref={ref}
        onClick={() => scrollToId(`app-${project.id}`)}
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        style={{ width: size, height: size, y: lift }}
        whileTap={{ scale: 0.9 }}
        className="relative overflow-hidden rounded-[24%] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] ring-1 ring-white/15"
        aria-label={`${project.title} — ${project.kind}`}
      >
        <Image src={project.icon} alt="" fill sizes="100px" className="object-cover" unoptimized={project.icon.endsWith(".svg")} />
      </motion.button>
      <span className="mt-2 h-1 w-1 rounded-full" style={{ background: project.color }} />
    </div>
  );
}

export function Dock() {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="flex flex-col items-center">
      <p className="eyebrow mb-5">Now shipping · Pick one</p>

      {/* Desktop dock with magnification */}
      <motion.div
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="glass hidden h-[100px] items-end gap-3 rounded-[28px] px-4 pb-2 md:flex"
      >
        {projects.map((project) => (
          <DockIcon key={project.id} project={project} mouseX={mouseX} />
        ))}
        <span className="mx-1 mb-5 h-14 w-px self-end bg-white/15" />
        <div className="relative flex flex-col items-center">
          <button
            onClick={() => scrollToId("stack")}
            className="grid h-16 w-16 grid-cols-2 gap-1 rounded-[24%] bg-white/[0.06] p-2.5 ring-1 ring-white/15 transition-transform hover:-translate-y-2"
            aria-label="Tech stack"
            title="Stack folder"
          >
            {["#61DAFB", "#02569B", "#339933", "#47A248"].map((c) => (
              <span key={c} className="rounded-[5px]" style={{ background: c }} />
            ))}
          </button>
          <span className="mt-2 h-1 w-1" />
        </div>
      </motion.div>

      {/* Mobile: swipeable row */}
      <div className="no-scrollbar -mx-4 flex w-[calc(100%+2rem)] gap-3 overflow-x-auto px-4 pb-2 md:hidden">
        {projects.map((project) => (
          <button
            key={project.id}
            onClick={() => scrollToId(`app-${project.id}`)}
            className="flex shrink-0 flex-col items-center gap-2"
          >
            <span className="relative h-16 w-16 overflow-hidden rounded-[24%] ring-1 ring-white/15">
              <Image src={project.icon} alt="" fill sizes="64px" className="object-cover" unoptimized={project.icon.endsWith(".svg")} />
            </span>
            <span className="max-w-16 truncate text-[11px] text-muted">{project.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/** Overlapping icon stack, used beside section intros. */
export function IconStack() {
  return (
    <div className="flex">
      {projects.map((project, i) => (
        <motion.button
          key={project.id}
          onClick={() => scrollToId(`app-${project.id}`)}
          whileHover={{ y: -10, zIndex: 10, scale: 1.08 }}
          className="relative -ml-3 h-14 w-14 shrink-0 overflow-hidden rounded-[24%] shadow-[0_8px_20px_-6px_rgba(0,0,0,0.9)] ring-2 ring-background first:ml-0 sm:h-16 sm:w-16"
          style={{ zIndex: projects.length - i }}
          aria-label={project.title}
        >
          <Image src={project.icon} alt="" fill sizes="64px" className="object-cover" unoptimized={project.icon.endsWith(".svg")} />
        </motion.button>
      ))}
    </div>
  );
}
