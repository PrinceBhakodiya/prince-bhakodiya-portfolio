"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

const posts = [
  {
    title: "Architecting Real-time Ride Systems at Scale",
    date: "Mar 2025",
    tag: "Architecture",
    readTime: "8 min",
  },
  {
    title: "Building Production LLM Pipelines with LangChain",
    date: "Feb 2025",
    tag: "AI",
    readTime: "6 min",
  },
  {
    title: "From MVP to 100K Users: Startup Engineering Lessons",
    date: "Jan 2025",
    tag: "Startup",
    readTime: "10 min",
  },
];

export function BlogPreview() {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="text-xs font-medium uppercase tracking-widest text-blue-400">
            Blog
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Engineering insights</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post, i) => (
            <GlassCard key={post.title} delay={i * 0.1}>
              <span className="text-xs font-medium text-blue-400">{post.tag}</span>
              <h3 className="mt-2 font-semibold leading-snug">{post.title}</h3>
              <p className="mt-3 text-xs text-muted-foreground">
                {post.date} · {post.readTime}
              </p>
              <button className="mt-4 flex items-center gap-1 text-sm text-blue-400 transition-colors hover:text-blue-300">
                Read more <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
