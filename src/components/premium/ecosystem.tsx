"use client";

import { motion } from "framer-motion";

const ecosystem = [
  { name: "Mobile Apps", connections: ["API Gateway", "Push Notifications"] },
  { name: "API Gateway", connections: ["Microservices", "Auth Service"] },
  { name: "Microservices", connections: ["Databases", "AI Engine"] },
  { name: "Admin Panels", connections: ["Analytics", "CRM"] },
  { name: "AI Engine", connections: ["LLM APIs", "Data Pipeline"] },
];

export function Ecosystem() {
  return (
    <section className="py-32 overflow-hidden">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">Product Stack</h2>
        <p className="mt-4 text-muted-foreground">
          End-to-end software — mobile, APIs, and backends that power real products.
        </p>
        <div className="relative mt-16 flex flex-wrap justify-center gap-4">
          {ecosystem.map((node, i) => (
            <motion.div
              key={node.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-purple-500/10 px-6 py-4 backdrop-blur-sm"
            >
              <p className="font-semibold text-sm">{node.name}</p>
              <div className="mt-2 flex flex-wrap justify-center gap-1">
                {node.connections.map((c) => (
                  <span key={c} className="text-[10px] text-muted-foreground">
                    → {c}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
