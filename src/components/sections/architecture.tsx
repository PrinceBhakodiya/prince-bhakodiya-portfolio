"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { SectionHeading } from "@/components/ui/section-heading";

const nodes = [
  { id: "clients", label: "Mobile & Web Clients", x: 50, y: 10 },
  { id: "gateway", label: "API Gateway", x: 50, y: 28 },
  { id: "api", label: "REST / GraphQL APIs", x: 20, y: 50 },
  { id: "socket", label: "WebSocket Layer", x: 80, y: 50 },
  { id: "services", label: "Microservices", x: 35, y: 72 },
  { id: "ai", label: "AI Services", x: 65, y: 72 },
  { id: "db", label: "MongoDB / PostgreSQL", x: 25, y: 90 },
  { id: "cache", label: "Redis Cache", x: 50, y: 90 },
  { id: "cloud", label: "AWS Cloud", x: 75, y: 90 },
];

const connections = [
  ["clients", "gateway"],
  ["gateway", "api"],
  ["gateway", "socket"],
  ["api", "services"],
  ["socket", "services"],
  ["services", "ai"],
  ["services", "db"],
  ["services", "cache"],
  ["db", "cloud"],
  ["cache", "cloud"],
];

export function Architecture() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const pulses = containerRef.current.querySelectorAll(".arch-pulse");
    gsap.to(pulses, {
      opacity: 0.3,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      stagger: 0.2,
      ease: "power2.inOut",
    });
  }, []);

  const getNode = (id: string) => nodes.find((n) => n.id === id)!;

  return (
    <section id="architecture" className="relative py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          label="Architecture"
          title="System design at scale"
          description="How I design production systems — from APIs to real-time infrastructure."
        />

        <motion.div
          ref={containerRef}
          className="relative mx-auto aspect-[16/10] max-w-4xl rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 backdrop-blur-xl"
        >
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {connections.map(([from, to]) => {
              const a = getNode(from);
              const b = getNode(to);
              return (
                <line
                  key={`${from}-${to}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke="url(#grad)"
                  strokeWidth="0.3"
                  className="arch-pulse opacity-60"
                />
              );
            })}
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>

          {nodes.map((node, i) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 px-3 py-2 text-center text-xs font-medium backdrop-blur-sm shadow-[0_0_20px_rgba(59,130,246,0.2)] sm:px-4 sm:text-sm">
                {node.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            { title: "Real-time Systems", desc: "WebSocket architecture for live updates" },
            { title: "Microservices", desc: "Modular, independently scalable services" },
            { title: "Cloud Native", desc: "AWS infrastructure with Docker & CI/CD" },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 text-center backdrop-blur-sm"
            >
              <h4 className="font-semibold">{item.title}</h4>
              <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
