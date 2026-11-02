"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { scrollToId } from "@/lib/scroll";
import { cn } from "@/lib/utils";

const links = [
  { id: "shipping", label: "Shipping" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "stack", label: "Stack" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const probe = window.innerHeight * 0.4;
      let current: string | null = null;
      for (const { id } of links) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= probe) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <motion.div className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-violet" style={{ scaleX: progress }} />

      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 pb-4 sm:px-8 sm:pt-6">
        <div
          className={cn(
            "pointer-events-none absolute inset-0 -bottom-6 bg-gradient-to-b from-background via-background/80 to-transparent transition-opacity duration-500",
            scrolled ? "opacity-100" : "opacity-0"
          )}
        />
        <div className="relative mx-auto flex max-w-[1440px] items-center justify-between gap-4">
          <button onClick={() => go("top")} className="flex items-center gap-2.5" aria-label="Back to top">
            <Image src={siteConfig.logo} alt="" width={36} height={36} className="h-9 w-9 rounded-xl" preload />
            <span className="font-display text-[19px] font-semibold tracking-[-0.04em]">
              prince<span className="text-violet-soft">.</span>dev
            </span>
          </button>

          <nav
            className={cn(
              "glass hidden items-center gap-1 rounded-full p-1.5 transition-shadow duration-500 lg:flex",
              scrolled && "shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)]"
            )}
          >
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => go(link.id)}
                className={cn(
                  "relative rounded-full px-5 py-2 text-[15px] transition-colors",
                  active === link.id ? "text-foreground" : "text-muted hover:text-foreground"
                )}
              >
                {active === link.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-white/[0.08]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href={siteConfig.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow flex h-11 items-center gap-2 rounded-full px-5 text-[15px] font-medium text-white transition-transform active:scale-95"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Let&apos;s talk</span>
              <span className="sm:hidden">Talk</span>
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              className="glass flex h-11 w-11 items-center justify-center rounded-full lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-2xl lg:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.nav
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-full flex-col justify-center gap-1 px-6"
            >
              {links.map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  onClick={() => go(link.id)}
                  className="display flex items-baseline gap-4 py-2 text-left text-5xl"
                >
                  <span className="font-mono text-xs tracking-normal text-subtle">0{i + 1}</span>
                  {link.label}
                </motion.button>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
