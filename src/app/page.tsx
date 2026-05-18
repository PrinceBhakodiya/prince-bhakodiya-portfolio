import { LoadingScreen } from "@/components/layout/loading-screen";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MouseGlow } from "@/components/effects/mouse-glow";
import { ParticleBackground } from "@/components/effects/particle-background";
import { AnimatedGrid } from "@/components/effects/animated-grid";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { TechStack } from "@/components/sections/tech-stack";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Services } from "@/components/sections/services";
import { Architecture } from "@/components/sections/architecture";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";
import { Terminal } from "@/components/premium/terminal";
import { DeploymentPipeline } from "@/components/premium/deployment-pipeline";
import { GitHubActivity } from "@/components/premium/github-activity";
import { LiveActivity } from "@/components/premium/live-activity";
import { BlogPreview } from "@/components/premium/blog-preview";
import { Ecosystem } from "@/components/premium/ecosystem";
import { AIAssistant } from "@/components/premium/ai-assistant";

function GradientOrbs() {
  return (
    <>
      <div className="gradient-blur absolute -left-32 top-1/4 h-96 w-96 bg-blue-600/30" />
      <div
        className="gradient-blur absolute -right-32 top-1/2 h-80 w-80 bg-purple-600/25"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="gradient-blur absolute left-1/2 bottom-0 h-64 w-64 bg-cyan-500/20"
        style={{ animationDelay: "4s" }}
      />
    </>
  );
}

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <Navbar />

      <main className="relative">
        <ParticleBackground />
        <AnimatedGrid />
        <MouseGlow />
        <GradientOrbs />

        <Hero />
        <LiveActivity />
        <About />
        <TechStack />
        <Projects />
        <Ecosystem />
        <Experience />
        <Services />
        <Architecture />
        <DeploymentPipeline />
        <GitHubActivity />
        <Terminal />
        <Testimonials />
        <BlogPreview />
        <Contact />
      </main>

      <Footer />
      <AIAssistant />
    </>
  );
}
