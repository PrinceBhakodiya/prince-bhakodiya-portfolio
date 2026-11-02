"use client";

import { ArrowUp } from "lucide-react";
import { siteConfig } from "@/data/site";
import { scrollToId } from "@/lib/scroll";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line px-4 pt-14 sm:px-8">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {siteConfig.name}. Designed &amp; built by hand.
        </p>
        <button
          onClick={() => scrollToId("top")}
          className="glass flex h-11 w-fit items-center gap-2 rounded-full px-5 text-sm"
        >
          Back to top <ArrowUp className="h-4 w-4" />
        </button>
      </div>
      <p
        aria-hidden
        className="serif-accent pointer-events-none mt-6 select-none text-center text-[34vw] leading-[0.78] !text-white/[0.045] sm:text-[26vw]"
      >
        Prince
      </p>
    </footer>
  );
}
