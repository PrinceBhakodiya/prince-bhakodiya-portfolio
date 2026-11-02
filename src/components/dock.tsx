"use client";

import { useRef, useState, type ReactNode } from "react";
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
import { cn } from "@/lib/utils";

const BASE = 60;
const MAX = 96;
const RANGE = 160;

type DockItem = {
  id: string;
  label: string;
  sub?: string;
  icon: ReactNode;
  /** Shown as the "app is running" dot under the icon. */
  dot?: string;
  href?: string;
  onClick?: () => void;
};

function AppArt({ project }: { project: Project }) {
  return (
    <Image
      src={project.icon}
      alt=""
      fill
      sizes="96px"
      className="object-cover"
      unoptimized={project.icon.endsWith(".svg")}
    />
  );
}

function StackFolder() {
  return (
    <span className="absolute inset-0 grid grid-cols-2 gap-[9%] bg-white/[0.14] p-[18%] backdrop-blur-xl">
      {["#61DAFB", "#02569B", "#339933", "#47A248"].map((c) => (
        <span key={c} className="rounded-[22%]" style={{ background: c }} />
      ))}
    </span>
  );
}

/** One icon per product: the IPO Buzz website shares the IPO Buzz app icon, so it stays out of the dock. */
const dockProjects = projects.filter((project) => project.id !== "ipobuzz-web");

const appItems: DockItem[] = dockProjects.map((project) => ({
  id: project.id,
  label: project.title.replace(/ Ride| Rides| CRM/g, ""),
  sub: project.kind,
  icon: <AppArt project={project} />,
  dot: project.color,
  onClick: () => scrollToId(`app-${project.id}`, -96),
}));

const stackItem: DockItem = {
  id: "stack",
  label: "Stack",
  sub: "Folder",
  icon: <StackFolder />,
  onClick: () => scrollToId("stack"),
};

/** Shared tap/click target: an internal scroll or an external link. */
function ItemTarget({
  item,
  className,
  style,
  children,
  ...rest
}: {
  item: DockItem;
  className?: string;
  style?: React.ComponentProps<typeof motion.button>["style"];
  children: ReactNode;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}) {
  const label = item.sub ? `${item.label} — ${item.sub}` : item.label;
  if (item.href) {
    return (
      <motion.a
        href={item.href}
        target={item.href.startsWith("http") ? "_blank" : undefined}
        rel="noopener noreferrer"
        aria-label={label}
        whileTap={{ scale: 0.88 }}
        className={className}
        style={style}
        {...rest}
      >
        {children}
      </motion.a>
    );
  }
  return (
    <motion.button
      type="button"
      onClick={item.onClick}
      aria-label={label}
      whileTap={{ scale: 0.88 }}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </motion.button>
  );
}

const iconShell =
  "relative block overflow-hidden rounded-[23%] shadow-[0_8px_18px_-8px_rgba(0,0,0,0.85)] ring-1 ring-inset ring-white/15";

/* ───────────────────────── macOS dock (desktop) ───────────────────────── */

function MacDockIcon({ item, mouseX }: { item: DockItem; mouseX: MotionValue<number> }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);

  // Magnification: icons grow with proximity to the pointer
  const distance = useTransform(mouseX, (x) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect || x === Infinity) return RANGE;
    return x - (rect.left + rect.width / 2);
  });
  const sizeRaw = useTransform(distance, [-RANGE, 0, RANGE], [BASE, MAX, BASE]);
  const size = useSpring(sizeRaw, { mass: 0.1, stiffness: 170, damping: 14 });

  return (
    <motion.div ref={ref} style={{ width: size }} className="relative flex flex-col items-center">
      <AnimatePresence>
        {hover && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.12 }}
            className="pointer-events-none absolute bottom-full z-10 mb-3 whitespace-nowrap rounded-lg border border-white/15 bg-[#26232f]/95 px-3 py-1.5 text-[13px] shadow-xl backdrop-blur-xl"
          >
            <span className="font-medium">{item.label}</span>
            {item.sub && <span className="ml-1.5 text-muted">{item.sub}</span>}
            <span className="absolute left-1/2 top-full -mt-[5px] h-2.5 w-2.5 -translate-x-1/2 rotate-45 border-b border-r border-white/15 bg-[#26232f]" />
          </motion.div>
        )}
      </AnimatePresence>
      <ItemTarget
        item={item}
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        style={{ width: size, height: size }}
        className={iconShell}
      >
        {item.icon}
      </ItemTarget>
      <span
        className="absolute -bottom-[7px] h-1 w-1 rounded-full"
        style={{ background: item.dot ? "rgba(255,255,255,0.75)" : "transparent" }}
      />
    </motion.div>
  );
}

function MacDock() {
  const mouseX = useMotionValue(Infinity);
  const groups = [appItems, [stackItem]];

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="dock-glass hidden h-[84px] items-end gap-2.5 rounded-[26px] px-3 pb-3 lg:flex"
    >
      {groups.map((group, g) => (
        <div key={g} className="contents">
          {g > 0 && <span className="mx-1 h-[60px] w-px self-end bg-white/20" />}
          {group.map((item) => (
            <MacDockIcon key={item.id} item={item} mouseX={mouseX} />
          ))}
        </div>
      ))}
    </motion.div>
  );
}

/* ───────────────────────── iOS home screen (phone / tablet) ───────────────────────── */

function HomeIcon({ item, index }: { item: DockItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.03 * index }}
      className="flex flex-col items-center gap-1.5"
    >
      <ItemTarget item={item} className={cn(iconShell, "aspect-square w-full")}>
        {item.icon}
      </ItemTarget>
      <span className="w-full truncate text-center text-[11px] leading-tight text-white/90 [text-shadow:0_1px_4px_rgba(0,0,0,0.6)]">
        {item.label}
      </span>
    </motion.div>
  );
}

function HomeScreen() {

  return (
    <div className="w-full max-w-[400px] lg:hidden">
      <div className="grid grid-cols-4 gap-x-[6.5%] gap-y-5 px-2">
        {appItems.map((item, i) => (
          <HomeIcon key={item.id} item={item} index={i} />
        ))}
      </div>

      {/* Page dots */}
      <div className="mt-6 flex justify-center gap-2">
        <span className="h-[7px] w-[7px] rounded-full bg-white" />
        <span className="h-[7px] w-[7px] rounded-full bg-white/30" />
      </div>

      {/* Dock bar */}
      <div className="dock-glass mt-4 flex justify-center rounded-[32px] p-[14px]">
        <ItemTarget item={stackItem} className={cn(iconShell, "aspect-square w-[21%]")}>
          {stackItem.icon}
        </ItemTarget>
      </div>
    </div>
  );
}

export function Dock() {
  return (
    <div className="flex flex-col items-center">
      <p className="eyebrow mb-6">Now shipping · Pick one</p>
      <MacDock />
      <HomeScreen />
    </div>
  );
}

/** Overlapping icon stack, used beside section intros. */
export function IconStack() {
  return (
    <div className="flex">
      {dockProjects.map((project, i) => (
        <motion.button
          key={project.id}
          onClick={() => scrollToId(`app-${project.id}`, -96)}
          whileHover={{ y: -10, zIndex: 10, scale: 1.08 }}
          className="relative -ml-3 h-14 w-14 shrink-0 overflow-hidden rounded-[24%] shadow-[0_8px_20px_-6px_rgba(0,0,0,0.9)] ring-2 ring-background first:ml-0 sm:h-16 sm:w-16"
          style={{ zIndex: dockProjects.length - i }}
          aria-label={project.title}
        >
          <AppArt project={project} />
        </motion.button>
      ))}
    </div>
  );
}
