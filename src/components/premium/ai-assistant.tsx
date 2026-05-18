"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send } from "lucide-react";

const responses: Record<string, string> = {
  default:
    "I'm Prince's AI assistant. Ask about projects, skills, or how to get in touch!",
  projects:
    "Prince has built Antoc CRM, Vayu & Gogogo ride-hailing, Speartrades crypto trading, IPOHub IPO research, Clozzet quick-commerce, and Cravekart corporate food delivery.",
  skills:
    "Expert in Flutter, Node.js, Next.js, FastAPI, MongoDB, PostgreSQL, AWS, AI/LLM integrations, and scalable system design.",
  contact:
    "Reach out on WhatsApp (+91 99742 04663) or email bhakodiyaprince05@gmail.com",
};

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", text: responses.default },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const lower = input.toLowerCase();
    let reply = responses.default;
    if (lower.includes("project")) reply = responses.projects;
    else if (lower.includes("skill") || lower.includes("tech")) reply = responses.skills;
    else if (lower.includes("contact") || lower.includes("hire")) reply = responses.contact;

    setMessages((m) => [
      ...m,
      { role: "user", text: input },
      { role: "assistant", text: reply },
    ]);
    setInput("");
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30"
        aria-label="AI Assistant"
      >
        {open ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-80 overflow-hidden rounded-2xl border border-white/10 bg-background/95 shadow-2xl backdrop-blur-xl sm:w-96"
          >
            <motion.div className="border-b border-white/10 bg-gradient-to-r from-blue-600/20 to-purple-600/20 px-4 py-3">
              <p className="font-semibold text-sm">AI Assistant</p>
              <p className="text-xs text-muted-foreground">Ask about Prince&apos;s work</p>
            </motion.div>
            <div className="h-64 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`rounded-xl px-3 py-2 text-sm ${
                    msg.role === "user"
                      ? "ml-8 bg-blue-600/20 text-right"
                      : "mr-8 bg-white/5"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="flex gap-2 border-t border-white/10 p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask anything..."
                className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none"
              />
              <button
                onClick={handleSend}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
