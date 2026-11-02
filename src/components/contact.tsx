"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy, Send, Paperclip } from "lucide-react";
import { siteConfig } from "@/data/site";
import { MacWindow } from "./mac-window";
import { Reveal } from "./reveal";

const topics = ["Mobile app", "Full product", "Backend / APIs", "AI integration", "Hiring"];

export function Contact() {
  const [topic, setTopic] = useState(topics[0]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`${topic} — from ${name || "your portfolio"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}`);
    window.location.href = `mailto:${siteConfig.contact.emailAddress}?subject=${subject}&body=${body}`;
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.contact.emailAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = siteConfig.contact.email;
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden px-4 py-24 sm:px-8 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(139,92,246,0.25),transparent)]" />

      <div className="relative mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[1fr_1fr] lg:items-center">
        <Reveal className="min-w-0">
          <p className="eyebrow">Contact</p>
          <h2 className="display mt-6 text-[3.6rem] sm:text-8xl lg:text-[8.5rem]">
            Got an idea?
          </h2>
          <p className="serif-accent mt-2 text-4xl sm:text-6xl">Let&apos;s ship it.</p>
          <p className="mt-8 max-w-md text-lg text-muted">
            Freelance builds, full-time roles or a second pair of eyes on your architecture — I usually reply within a
            day.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href={siteConfig.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow flex h-14 items-center justify-center gap-2 rounded-full px-7 text-[16px] font-medium text-white"
            >
              WhatsApp {siteConfig.contact.whatsappDisplay} <ArrowUpRight className="h-4 w-4" />
            </a>
            <button onClick={copy} className="btn-dark flex h-14 items-center justify-center gap-2 rounded-full px-7 text-[16px]">
              {copied ? <Check className="h-4 w-4 text-[#28c840]" /> : <Copy className="h-4 w-4" />}
              {copied ? "Email copied" : siteConfig.contact.emailAddress}
            </button>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-muted">
            {[
              ["GitHub", siteConfig.links.github],
              ["LinkedIn", siteConfig.links.linkedin],
              ["Instagram", siteConfig.links.instagram],
            ].map(([label, href]) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-1 transition-colors hover:text-foreground">
                {label}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="min-w-0">
          {/* Mail-style compose window */}
          <MacWindow title="New Message" className="lg:rotate-[1.5deg]">
            <form onSubmit={send}>
              <div className="flex items-center gap-3 border-b border-line px-5 py-3.5 text-[15px]">
                <span className="w-16 text-subtle">To:</span>
                <span className="rounded-full bg-violet/20 px-3 py-0.5 text-violet-soft">Prince Bhakodiya</span>
              </div>
              <label className="flex items-center gap-3 border-b border-line px-5 py-3.5 text-[15px]">
                <span className="w-16 text-subtle">From:</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  autoComplete="name"
                  className="flex-1 bg-transparent text-[16px] outline-none placeholder:text-subtle"
                />
              </label>
              <div className="flex items-center gap-3 border-b border-line px-5 py-3 text-[15px]">
                <span className="w-16 shrink-0 text-subtle">About:</span>
                <div className="no-scrollbar flex min-w-0 gap-1.5 overflow-x-auto">
                  {topics.map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setTopic(t)}
                      className={
                        t === topic
                          ? "shrink-0 rounded-full bg-foreground px-3 py-1 text-sm text-background"
                          : "shrink-0 rounded-full border border-line-strong px-3 py-1 text-sm text-muted hover:text-foreground"
                      }
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me about what you're building…"
                rows={7}
                required
                className="block w-full resize-none bg-transparent px-5 py-4 text-[16px] leading-relaxed outline-none placeholder:text-subtle"
              />
              <div className="flex items-center justify-between border-t border-line px-5 py-3.5">
                <Paperclip className="h-4 w-4 text-subtle" />
                <button type="submit" className="btn-glow flex h-11 items-center gap-2 rounded-full px-5 text-[15px] font-medium text-white">
                  Send <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </MacWindow>
        </Reveal>
      </div>
    </section>
  );
}
