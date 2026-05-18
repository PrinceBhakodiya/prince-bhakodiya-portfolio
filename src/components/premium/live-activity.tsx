"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity } from "lucide-react";

const activities = [
  "Deployed Vayu API v2.4 to production",
  "Optimized MongoDB queries — 40% faster",
  "Merged PR: Real-time socket reconnection",
  "Shipped Antoc CRM broadcast feature",
  "Integrated Groq LLM into career platform",
];

export function LiveActivity() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % activities.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3">
        <Activity className="h-4 w-4 text-emerald-400 animate-pulse" />
        <span className="text-xs font-medium uppercase tracking-wider text-emerald-400">
          Live
        </span>
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-sm text-muted-foreground"
          >
            {activities[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
