import { Cursor } from "@/components/cursor";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Shipping } from "@/components/shipping";
import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { Stack } from "@/components/stack";
import { Services } from "@/components/services";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Cursor />
      <Nav />
      <main className="relative">
        <Hero />
        <Shipping />
        <About />
        <Experience />
        <Stack />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
