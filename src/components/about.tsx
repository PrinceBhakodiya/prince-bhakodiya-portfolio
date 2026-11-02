"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { siteConfig } from "@/data/site";
import { projects } from "@/data/projects";
import { MacWindow } from "./mac-window";
import { Reveal, SectionTitle } from "./reveal";

type Line = { kind: "cmd" | "out"; text: string; accent?: boolean };

const script: Line[] = [
  { kind: "cmd", text: "whoami" },
  { kind: "out", text: `${siteConfig.name} — Full Stack Developer & Tech Lead` },
  { kind: "cmd", text: "cat focus.txt" },
  { kind: "out", text: "Mobile apps · Backends · Real-time systems · AI" },
  { kind: "cmd", text: "ls ~/shipped" },
  { kind: "out", text: projects.map((p) => p.title.toLowerCase().replace(/\s+/g, "-")).join("  "), accent: true },
  { kind: "cmd", text: "echo $STACK" },
  { kind: "out", text: "Flutter · Node.js · Next.js · MongoDB · AWS" },
  { kind: "cmd", text: "./availability --check" },
  { kind: "out", text: "✓ Open to freelance, full-time and consulting" },
];

/** Types the script line by line once it scrolls into view. */
function Terminal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const [line, setLine] = useState(0);
  const [chars, setChars] = useState(0);

  useEffect(() => {
    if (!inView || line >= script.length) return;
    const current = script[line];
    if (current.kind === "out") {
      const t = setTimeout(() => {
        setLine((l) => l + 1);
        setChars(0);
      }, 260);
      return () => clearTimeout(t);
    }
    if (chars < current.text.length) {
      const t = setTimeout(() => setChars((c) => c + 1), 45);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setLine((l) => l + 1);
      setChars(0);
    }, 350);
    return () => clearTimeout(t);
  }, [inView, line, chars]);

  return (
    <div ref={ref}>
      <MacWindow title="prince — zsh — 80×24" bodyClassName="min-h-[380px] p-5 font-mono text-[13px] leading-7 sm:p-6 sm:text-sm">
        {script.slice(0, line + 1).map((l, i) => {
          if (i === line && l.kind === "out") return null;
          const text = i === line ? l.text.slice(0, chars) : l.text;
          return l.kind === "cmd" ? (
            <p key={i} className="break-words">
              <span className="text-[#28c840]">➜</span> <span className="text-violet-soft">~</span>{" "}
              <span className="text-foreground">{text}</span>
              {i === line && <span className="animate-blink ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-foreground" />}
            </p>
          ) : (
            <p key={i} className={l.accent ? "break-words text-[#7dd3fc]" : "break-words text-muted"}>
              {text}
            </p>
          );
        })}
        {line >= script.length && (
          <p>
            <span className="text-[#28c840]">➜</span> <span className="text-violet-soft">~</span>{" "}
            <span className="animate-blink inline-block h-4 w-2 translate-y-0.5 bg-foreground" />
          </p>
        )}
      </MacWindow>
    </div>
  );
}

const principles = [
  ["Ship, then polish", "Real users teach more than any spec. I get products live fast, then iterate."],
  ["Own it end to end", "From Flutter screens to sockets, queues and cloud — one person who sees the whole system."],
  ["Built for scale", "Architecture that holds up when a ride app hits rush hour or a trading feed spikes."],
];

export function About() {
  return (
    <section id="about" className="relative px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1440px]">
        <SectionTitle eyebrow="About" title="Hi, I'm Prince." serif="I build things people use." />

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <div className="space-y-6 text-lg leading-relaxed text-muted sm:text-xl">
              <p>
                I&apos;m a <span className="text-foreground">Full Stack Developer and Tech Lead</span> who started as an
                intern in 2021 and now leads engineering across mobility, fintech, CRM and quick-commerce products.
              </p>
              <p>
                My sweet spot is the whole product: <span className="text-foreground">Flutter apps</span> on the front,{" "}
                <span className="text-foreground">Node.js and FastAPI</span> services behind them, real-time layers with
                Socket.IO, and the AWS and Firebase infrastructure that keeps it all running.
              </p>
              <p>
                Lately I&apos;m bringing <span className="serif-accent text-[1.15em]">LLMs and automation</span> into
                products — WhatsApp workflows, document analysis and smart assistants.
              </p>
            </div>

            <div className="mt-12 divide-y divide-line border-y border-line">
              {principles.map(([title, body], i) => (
                <div key={title} className="grid grid-cols-[48px_1fr] gap-4 py-6">
                  <span className="font-mono text-sm text-subtle">0{i + 1}</span>
                  <div>
                    <p className="font-display text-xl font-semibold tracking-[-0.03em]">{title}</p>
                    <p className="mt-1 text-muted">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:sticky lg:top-28 lg:self-start">
            <Terminal />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
