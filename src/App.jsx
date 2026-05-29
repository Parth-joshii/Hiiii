import { lazy, Suspense, useEffect, useState } from "react";
import { BackgroundSystem } from "@/components/BackgroundSystem";
import { Footer } from "@/components/Footer";
import { IntroSoundGate } from "@/components/IntroSoundGate";
import { Navbar } from "@/components/Navbar";
import { ScrollProgress } from "@/components/ScrollProgress";
import { useSmoothAnchors } from "@/hooks/useSmoothAnchors";
import { HeroSection } from "@/sections/HeroSection";

const AboutSection = lazy(() => import("@/sections/AboutSection").then((module) => ({ default: module.AboutSection })));
const SkillsSection = lazy(() => import("@/sections/SkillsSection").then((module) => ({ default: module.SkillsSection })));
const ProjectsSection = lazy(() => import("@/sections/ProjectsSection").then((module) => ({ default: module.ProjectsSection })));
const ExperienceSection = lazy(() => import("@/sections/ExperienceSection").then((module) => ({ default: module.ExperienceSection })));
const CertificationsSection = lazy(() =>
  import("@/sections/CertificationsSection").then((module) => ({ default: module.CertificationsSection })),
);
const ContactSection = lazy(() => import("@/sections/ContactSection").then((module) => ({ default: module.ContactSection })));
const ChatAssistant = lazy(() => import("@/components/ChatAssistant").then((module) => ({ default: module.ChatAssistant })));
const MouseGlow = lazy(() => import("@/components/MouseGlow").then((module) => ({ default: module.MouseGlow })));

function runWhenIdle(callback, timeout = 800) {
  if ("requestIdleCallback" in window) {
    const id = window.requestIdleCallback(callback, { timeout });
    return () => window.cancelIdleCallback(id);
  }

  const id = window.setTimeout(callback, Math.min(timeout, 420));
  return () => window.clearTimeout(id);
}

function SectionSkeleton() {
  return (
    <div className="relative z-10 py-16 md:py-20">
      <div className="container">
        <div className="mx-auto h-8 max-w-md rounded-md bg-white/[0.045]" />
        <div className="mx-auto mt-4 h-4 max-w-xl rounded-md bg-white/[0.035]" />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="h-64 rounded-lg border border-white/10 bg-white/[0.035]" />
          <div className="h-64 rounded-lg border border-white/10 bg-white/[0.035]" />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [assistantReady, setAssistantReady] = useState(false);
  const [mouseGlowReady, setMouseGlowReady] = useState(false);

  useSmoothAnchors();

  useEffect(() => {
    let cancelled = false;
    let cleanupReveal = () => {};
    let cleanupScrollEffects = () => {};

    const cancelIdle = runWhenIdle(async () => {
      const [{ initGsapReveal }, { initScrollEffects }] = await Promise.all([
        import("@/animations/gsapReveal"),
        import("@/animations/scrollEffects"),
      ]);
      if (!cancelled) {
        cleanupReveal = initGsapReveal();
        cleanupScrollEffects = initScrollEffects();
      }
    }, 1000);

    return () => {
      cancelled = true;
      cancelIdle();
      cleanupReveal();
      cleanupScrollEffects();
    };
  }, []);

  useEffect(() => {
    return runWhenIdle(() => {
      setAssistantReady(true);

      const canUseMouseGlow = window.matchMedia("(prefers-reduced-motion: no-preference) and (pointer: fine) and (min-width: 1280px)")
        .matches;

      if (canUseMouseGlow) {
        setMouseGlowReady(true);
      }
    }, 900);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <BackgroundSystem />
      <ScrollProgress />
      <IntroSoundGate />
      {mouseGlowReady ? (
        <Suspense fallback={null}>
          <MouseGlow />
        </Suspense>
      ) : null}
      <Navbar />
      {assistantReady ? (
        <Suspense fallback={null}>
          <ChatAssistant />
        </Suspense>
      ) : null}
      <main>
        <HeroSection />
        <Suspense fallback={<SectionSkeleton />}>
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ExperienceSection />
          <CertificationsSection />
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
