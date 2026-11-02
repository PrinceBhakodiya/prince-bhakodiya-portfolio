"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { cancelFrame, frame } from "framer-motion";
import { setLenis } from "@/lib/scroll";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      anchors: { offset: -80 },
    });
    setLenis(lenis);

    // Drive Lenis from framer-motion's frame loop so scroll position and
    // scroll-linked animations update in the same frame (no parallax judder)
    function update({ timestamp }: { timestamp: number }) {
      lenis.raf(timestamp);
    }
    frame.update(update, true);

    return () => {
      cancelFrame(update);
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
