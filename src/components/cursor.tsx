"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "@/lib/use-client";

type CursorState = {
  hovering: boolean;
  label: string | null;
  pressed: boolean;
  hidden: boolean;
};

/**
 * A dot that tracks the pointer exactly, plus a ring that trails it on a spring.
 * Interactive elements grow the ring; elements with `data-cursor="Label"`
 * turn it into a violet pill showing that label.
 */
export function Cursor() {
  const enabled = useMediaQuery("(pointer: fine) and (prefers-reduced-motion: no-preference)");
  const [state, setState] = useState<CursorState>({ hovering: false, label: null, pressed: false, hidden: true });

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 380, damping: 32, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 380, damping: 32, mass: 0.6 });

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-cursor");

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement | null;
      const labelled = target?.closest<HTMLElement>("[data-cursor]");
      const interactive = target?.closest("a, button, input, textarea, select, label, [role='button']");
      const isText = !!target?.closest("input, textarea");
      setState((s) => {
        const next = {
          hovering: !!interactive && !isText,
          label: labelled?.dataset.cursor || null,
          pressed: s.pressed,
          hidden: false,
        };
        return next.hovering === s.hovering && next.label === s.label && !s.hidden ? s : next;
      });
    };
    const onDown = () => setState((s) => ({ ...s, pressed: true }));
    const onUp = () => setState((s) => ({ ...s, pressed: false }));
    const onLeave = () => setState((s) => ({ ...s, hidden: true }));

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = state.label ? 0 : state.hovering ? 56 : 34;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      {/* Trailing ring / label pill */}
      <motion.div
        className="absolute left-0 top-0"
        style={{ x: ringX, y: ringY }}
        animate={{ opacity: state.hidden ? 0 : 1 }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70"
          animate={{
            width: size,
            height: size,
            scale: state.pressed ? 0.8 : 1,
            backgroundColor: state.hovering ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0)",
            opacity: state.label ? 0 : 1,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
        />
        <AnimatePresence>
          {state.label && (
            <motion.span
              key={state.label}
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: state.pressed ? 0.9 : 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              transition={{ type: "spring", stiffness: 420, damping: 26 }}
              className="btn-glow absolute left-0 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-[13px] font-medium text-white"
            >
              {state.label}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Precise dot */}
      <motion.div className="absolute left-0 top-0" style={{ x, y }}>
        <motion.div
          className="h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
          animate={{ opacity: state.hidden || state.label ? 0 : 1, scale: state.hovering ? 0 : 1 }}
        />
      </motion.div>
    </div>
  );
}
