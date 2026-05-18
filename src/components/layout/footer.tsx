"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Code, Globe, Share2 } from "lucide-react";
import { siteConfig } from "@/data/site";

const footerLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] py-16">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="text-center md:text-left">
            <Link href="#" className="flex items-center gap-2 justify-center md:justify-start">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-xs font-bold text-white">
                PB
              </span>
              <span className="font-semibold">{siteConfig.name}</span>
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              Full Stack Developer • Building scalable products
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex gap-4">
            {[
              { icon: Code, href: siteConfig.links.github },
              { icon: Globe, href: siteConfig.links.linkedin },
              { icon: Share2, href: siteConfig.links.instagram },
            ].map(({ icon: Icon, href }) => (
              <Link
                key={href}
                href={href}
                target="_blank"
                className="text-muted-foreground transition-colors hover:text-blue-400"
              >
                <Icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className="mx-auto mt-12 h-px max-w-md bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"
        />

        <p className="mt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved. Built with Next.js
          & precision.
        </p>
      </div>
    </footer>
  );
}
