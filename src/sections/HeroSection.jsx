import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Cpu, DatabaseZap, Send, Sparkles } from "lucide-react";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const HeroScene = lazy(() => import("@/components/HeroScene").then((module) => ({ default: module.HeroScene })));

const skillPreview = ["RAG", "NLP", "Computer Vision", "LangChain", "FastAPI"];

const mobileSignals = [
  { value: "20+", label: "AI Projects" },
  { value: "30+", label: "Tech Stack" },
  { value: "5+", label: "Certs" },
];

const readouts = [
  { label: "RAG", value: "Context aware", icon: DatabaseZap, className: "right-[26%] top-[18%]" },
  { label: "Vision", value: "Signal clarity", icon: Cpu, className: "right-10 top-[34%]" },
  { label: "Agents", value: "Workflow ready", icon: Sparkles, className: "right-[16%] bottom-[18%]" },
];

export function HeroSection() {
  const [showScene, setShowScene] = useState(false);
  const [sceneActive, setSceneActive] = useState(true);
  const sceneActiveRef = useRef(true);

  useEffect(() => {
    const canUseScene = window.matchMedia("(prefers-reduced-motion: no-preference) and (pointer: fine) and (min-width: 768px)").matches;
    if (!canUseScene) {
      return undefined;
    }

    const revealScene = () => setShowScene(true);
    let idleId;
    let timeoutId;

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(revealScene, { timeout: 320 });
    } else {
      timeoutId = window.setTimeout(revealScene, 220);
    }

    return () => {
      if (idleId) window.cancelIdleCallback(idleId);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    let rafId = 0;

    const updateSceneVisibility = () => {
      rafId = 0;
      const shouldShowScene = window.scrollY < 36;

      if (sceneActiveRef.current !== shouldShowScene) {
        sceneActiveRef.current = shouldShowScene;
        setSceneActive(shouldShowScene);
      }
    };

    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(updateSceneVisibility);
    };

    updateSceneVisibility();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onScroll, { passive: true });
    window.addEventListener("touchmove", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onScroll);
      window.removeEventListener("touchmove", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section id="home" className="relative w-full overflow-hidden bg-background md:h-screen md:min-h-[720px]">
      <div className="absolute inset-0 bg-aurora-field" />
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${sceneActive ? "opacity-70" : "opacity-0"}`}
        aria-hidden="true"
      >
        <div className="absolute left-[4%] top-[10%] h-[82vh] w-px rotate-[18deg] bg-gradient-to-b from-transparent via-amber-300/35 to-transparent" />
        <div className="absolute left-[42%] top-[-10%] h-[92vh] w-px rotate-[34deg] bg-gradient-to-b from-transparent via-sky-300/20 to-transparent" />
        <div className="absolute right-[12%] top-[3%] h-[78vh] w-px rotate-[-23deg] bg-gradient-to-b from-transparent via-violet-300/24 to-transparent" />
        <div className="absolute right-[22%] top-[23%] h-52 w-96 rounded-full border border-amber-300/20" />
        <div className="absolute right-[8%] top-[38%] h-64 w-[34rem] rounded-full border border-sky-300/15" />
        <div className="absolute right-[24%] top-[22%] h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(245,196,81,0.2),rgba(251,113,133,0.1)_32%,rgba(56,189,248,0.08)_52%,transparent_72%)] opacity-80" />
        <div className="absolute right-[18%] top-[22%] hidden h-56 w-96 rounded-lg border border-white/10 bg-black/20 bg-[linear-gradient(90deg,rgba(245,196,81,0.08)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:22px_22px] opacity-60 lg:block" />
      </div>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-large bg-[length:80px_80px] opacity-25" />
        {showScene && sceneActive ? (
          <Suspense fallback={null}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.1, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <HeroScene />
            </motion.div>
          </Suspense>
        ) : null}
      </div>
      <div className="absolute inset-0 bg-grid-large bg-[length:80px_80px] opacity-[0.22]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/[0.38] to-background" />
      <div className="noise-layer absolute inset-0" />

      {readouts.map((item) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.label}
            data-readout={item.label}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: sceneActive ? 1 : 0, y: 0, scale: sceneActive ? 1 : 0.96 }}
            transition={{ duration: sceneActive ? 0.9 : 0.2, delay: sceneActive ? 0.8 : 0 }}
            className={`glass-panel edge-highlight absolute hidden rounded-lg px-4 py-3 lg:block ${sceneActive ? "" : "pointer-events-none"} ${item.className}`}
          >
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-md bg-primary/[0.12] text-primary">
                <Icon className="size-4" />
              </span>
              <div>
                <p className="text-xs font-semibold text-white">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.value}</p>
              </div>
            </div>
          </motion.div>
        );
      })}

      <div className="container relative z-10 flex items-start pb-8 pt-[5.5rem] min-[390px]:pt-[6.5rem] min-[430px]:pb-16 md:h-full md:items-center md:pb-0 md:pt-24">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            data-hero-badge
            className="mb-4 inline-flex max-w-full items-center gap-2 rounded-md border border-primary/25 bg-primary/[0.08] px-3 py-2 text-xs font-semibold text-primary sm:mb-5 sm:gap-3 sm:text-sm md:mb-6"
          >
            <Sparkles className="size-4" />
            AI/ML Engineer - RAG, NLP, Computer Vision
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.78, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            data-parallax="-42"
            className="max-w-3xl font-display text-[2.55rem] font-bold leading-[1.04] text-white min-[390px]:text-[2.85rem] sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Building Intelligent <span className="text-gradient">AI Experiences</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            data-parallax="-26"
            className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground min-[390px]:text-base min-[390px]:leading-7 md:mt-5 md:text-lg"
          >
            AI/ML Engineer specializing in RAG systems, NLP, Computer Vision, and intelligent automation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 hidden max-w-3xl flex-wrap gap-2 md:flex"
          >
            {skillPreview.map((skill) => (
              <span
                key={skill}
                className="rounded-sm border border-amber-300/20 bg-white/[0.055] px-3 py-1.5 text-xs font-semibold text-muted-foreground"
              >
                {skill}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.44, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4"
          >
            <Button asChild size="lg">
              <a href="#projects">
                View Projects <ArrowRight />
              </a>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <a href="#contact">
                Contact Me <Send />
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.52, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 grid max-w-md grid-cols-3 gap-2 md:hidden"
          >
            {mobileSignals.map((item) => (
              <div key={item.label} className="rounded-md border border-amber-300/20 bg-white/[0.055] px-3 py-3">
                <p className="font-display text-xl font-bold leading-none text-white">{item.value}</p>
                <p className="mt-1 text-[11px] font-medium leading-4 text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 hidden max-w-md flex-wrap gap-2 min-[390px]:flex md:hidden"
          >
            {skillPreview.map((skill) => (
              <span key={skill} className="rounded-sm border border-white/10 bg-black/20 px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
                {skill}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.64, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 hidden max-w-md rounded-lg border border-white/10 bg-white/[0.045] px-4 py-3 pr-20 min-[390px]:block md:hidden"
          >
            <div className="flex items-center gap-3">
              <span className="relative flex size-2.5 shrink-0">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-40" />
                <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
              </span>
              <p className="text-xs font-semibold leading-5 text-muted-foreground">
                Open to AI/ML roles, internships, and AI product collaborations.
              </p>
            </div>
            <div className="mt-3 h-px bg-[linear-gradient(90deg,#f5c451_0%,#fb7185_32%,#38bdf8_68%,#86efac_100%)] opacity-70" />
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 text-xs font-medium text-muted-foreground sm:flex md:bottom-7"
      >
        <span className="h-10 w-px overflow-hidden bg-white/[0.15]">
          <motion.span
            className="block h-4 w-px bg-primary"
            animate={{ y: [0, 40, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
        <ArrowDown className="size-4 animate-bounce text-primary" />
      </motion.a>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
