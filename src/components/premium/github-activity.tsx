"use client";

import { motion } from "framer-motion";

const weeks = 12;
const days = 7;

function generateActivity() {
  return Array.from({ length: weeks }, () =>
    Array.from({ length: days }, () => Math.floor(Math.random() * 4))
  );
}

const activity = generateActivity();
const colors = ["bg-zinc-800", "bg-blue-900/60", "bg-blue-700/70", "bg-blue-500"];

export function GitHubActivity() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="mb-2 text-center text-2xl font-bold">GitHub Activity</h2>
        <p className="mb-8 text-center text-sm text-muted-foreground">
          Consistent contributions building production systems
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center gap-1 overflow-x-auto p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02]"
        >
          {activity.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {week.map((level, di) => (
                <motion.div
                  key={di}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (wi * 7 + di) * 0.01 }}
                  className={`h-3 w-3 rounded-sm ${colors[level]}`}
                />
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
