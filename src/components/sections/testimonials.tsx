"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <SectionHeading
          label="Testimonials"
          title="What collaborators say"
          description="Trusted by founders and teams building ambitious products."
        />

        <div className="relative min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-xl sm:p-12"
            >
              <Quote className="mb-6 h-10 w-10 text-blue-500/40" />
              <blockquote className="text-lg leading-relaxed sm:text-xl">
                &ldquo;{testimonials[current].quote}&rdquo;
              </blockquote>
              <div className="mt-8 flex items-center gap-4">
                <motion.div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-bold text-white">
                  {testimonials[current].author.charAt(0)}
                </motion.div>
                <div>
                  <p className="font-semibold">{testimonials[current].author}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[current].role} · {testimonials[current].company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all ${
                  i === current ? "w-8 bg-blue-500" : "w-2 bg-white/20"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
