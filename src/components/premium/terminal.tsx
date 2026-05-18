"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal as TerminalIcon } from "lucide-react";

const commands: Record<string, string> = {
  help: "Available: about, projects, stack, contact, deploy, clear",
  about: "Prince Bhakodiya — Full Stack Developer & Product Builder",
  projects: "Antoc CRM | Vayu Ride | Gogogo Ride | Speartrades | IPOHub | Clozzet | Cravekart",
  stack: "Flutter • Node.js • Next.js • FastAPI • MongoDB • PostgreSQL • AWS • AI",
  contact: "bhakodiyaprince05@gmail.com | WhatsApp: +91 99742 04663",
  deploy: "✓ Building production systems... ✓ 100K+ users served",
  clear: "",
};

export function Terminal() {
  const [history, setHistory] = useState<string[]>([
    "Welcome to Prince's Developer Console v2.0",
    'Type "help" for available commands.',
  ]);
  const [input, setInput] = useState("");
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setCursor((c) => !c), 530);
    return () => clearInterval(interval);
  }, []);

  const runCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (trimmed === "clear") {
      setHistory([]);
      return;
    }
    const output = commands[trimmed] ?? `Command not found: ${trimmed}. Type "help".`;
    setHistory((h) => [...h, `> ${cmd}`, output]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    runCommand(input);
    setInput("");
  };

  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <TerminalIcon className="h-5 w-5 text-emerald-400" />
          <h2 className="text-2xl font-bold">Developer Console</h2>
        </div>

        <motion.div
          className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d] font-mono text-sm shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <span className="h-3 w-3 rounded-full bg-green-500/80" />
            <span className="ml-2 text-xs text-zinc-500">prince@portfolio ~ </span>
          </div>
          <div className="h-64 overflow-y-auto p-4">
            {history.map((line, i) => (
              <p
                key={i}
                className={`mb-1 ${line.startsWith(">") ? "text-blue-400" : "text-zinc-400"}`}
              >
                {line}
              </p>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex items-center border-t border-white/5 px-4 py-3">
            <span className="text-emerald-400">$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent px-2 outline-none text-zinc-200"
              placeholder="Type a command..."
              autoComplete="off"
            />
            <span className={`text-emerald-400 ${cursor ? "opacity-100" : "opacity-0"}`}>▋</span>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
