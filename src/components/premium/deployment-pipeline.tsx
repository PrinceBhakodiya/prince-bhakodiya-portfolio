"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";

const steps = [
  { label: "Code Push", status: "done" },
  { label: "CI Build", status: "done" },
  { label: "Tests Pass", status: "done" },
  { label: "Docker Build", status: "active" },
  { label: "Deploy AWS", status: "pending" },
  { label: "Production Live", status: "pending" },
];

export function DeploymentPipeline() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="mb-8 text-center text-2xl font-bold">Deployment Pipeline</h2>
        <div className="space-y-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.03] px-5 py-4"
            >
              {step.status === "done" && (
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              )}
              {step.status === "active" && (
                <Loader2 className="h-5 w-5 animate-spin text-blue-400" />
              )}
              {step.status === "pending" && (
                <Circle className="h-5 w-5 text-zinc-600" />
              )}
              <span className="font-mono text-sm">{step.label}</span>
              {step.status === "active" && (
                <span className="ml-auto text-xs text-blue-400">Running...</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
