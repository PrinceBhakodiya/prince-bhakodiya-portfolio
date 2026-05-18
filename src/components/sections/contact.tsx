"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Code, Globe, Share2, Mail, MessageCircle, Send } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";

const socials = [
  { icon: Code, href: siteConfig.links.github, label: "GitHub" },
  { icon: Globe, href: siteConfig.links.linkedin, label: "LinkedIn" },
  { icon: Share2, href: siteConfig.links.instagram, label: "Instagram" },
  { icon: MessageCircle, href: siteConfig.links.whatsapp, label: "WhatsApp" },
  { icon: Mail, href: siteConfig.links.email, label: "Email" },
];

export function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Portfolio inquiry from ${formState.name}`
    );
    const body = encodeURIComponent(
      `${formState.message}\n\n— ${formState.name}\nReply to: ${formState.email}`
    );
    window.location.href = `${siteConfig.contact.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          label="Contact"
          title="Let's build something extraordinary"
          description="Ready to build your next product? Get in touch."
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <GlassCard>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition-colors focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition-colors focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition-colors focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
                  placeholder="Tell me about your project..."
                />
              </div>
              <Button type="submit" className="w-full" size="lg">
                {submitted ? "Message Sent!" : (
                  <>
                    Send Message <Send className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </GlassCard>

          <div className="flex flex-col gap-6">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-8 backdrop-blur-xl"
            >
              <h3 className="text-2xl font-bold">
                Let&apos;s build something{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  extraordinary.
                </span>
              </h3>
              <p className="mt-4 text-muted-foreground">
                Whether you need a startup MVP, enterprise platform, or AI integration —
                I&apos;m ready to help you build it.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href={siteConfig.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-105"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat on WhatsApp
                  <span className="text-emerald-100/90">
                    {siteConfig.contact.whatsappDisplay}
                  </span>
                </Link>
                <Link
                  href={siteConfig.contact.email}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-105"
                >
                  <Mail className="h-4 w-4" />
                  Email Me
                  <span className="hidden text-blue-100/90 sm:inline">
                    {siteConfig.contact.emailAddress}
                  </span>
                </Link>
              </div>
              <p className="mt-3 text-xs text-muted-foreground sm:hidden">
                {siteConfig.contact.emailAddress}
              </p>
            </motion.div>

            <div className="flex flex-wrap gap-3">
              {socials.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground transition-all hover:border-blue-500/30 hover:text-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
