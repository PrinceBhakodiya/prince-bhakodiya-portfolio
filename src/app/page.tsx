import { Cursor } from "@/components/cursor";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Shipping } from "@/components/shipping";
import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { Stack } from "@/components/stack";
import { Services } from "@/components/services";
import { Contact } from "@/components/contact";
import { Writing } from "@/components/writing";
import { Footer } from "@/components/footer";
import { existsSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { indexable } from "@/lib/seo";

export const metadata: Metadata = { alternates: { canonical: "/" }, robots: indexable };

// The hero portrait is optional: only render (and preload) it once public/prince.png exists
const hasPortrait = existsSync(path.join(process.cwd(), "public", "prince.png"));

export default function Home() {
  return (
    <>
      <Cursor />
      <Nav />
      <main className="relative">
        <Hero hasPortrait={hasPortrait} />
        <Shipping />
        <About />
        <Experience />
        <Stack />
        <Services />
        <Writing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
