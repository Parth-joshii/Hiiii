import { motion, useMotionValue, useSpring } from "framer-motion";
import { memo, useEffect } from "react";

function MouseGlowComponent() {
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const springX = useSpring(x, { stiffness: 95, damping: 24, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 95, damping: 24, mass: 0.4 });

  useEffect(() => {
    const isDesktopPointer = window.matchMedia("(pointer: fine) and (min-width: 768px)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isDesktopPointer || reducedMotion) return undefined;

    let rafId = 0;
    let nextX = -500;
    let nextY = -500;

    const commit = () => {
      x.set(nextX);
      y.set(nextY);
      rafId = 0;
    };

    const update = (event) => {
      nextX = event.clientX;
      nextY = event.clientY;

      if (!rafId) {
        rafId = requestAnimationFrame(commit);
      }
    };

    window.addEventListener("pointermove", update, { passive: true });

    return () => {
      window.removeEventListener("pointermove", update);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [x, y]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-40 hidden size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(45,212,191,0.16),rgba(244,114,182,0.07)_34%,transparent_68%)] md:block"
      style={{ x: springX, y: springY }}
    />
  );
}

export const MouseGlow = memo(MouseGlowComponent);
