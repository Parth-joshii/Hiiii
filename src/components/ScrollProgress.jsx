import { memo, useEffect, useRef } from "react";

function ScrollProgressComponent() {
  const barRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    const glow = glowRef.current;
    if (!bar || !glow) return undefined;

    let rafId = 0;

    const update = () => {
      rafId = 0;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      const clampedProgress = Math.min(1, Math.max(0, progress));
      bar.style.transform = `scaleX(${clampedProgress})`;
      glow.style.transform = `translate3d(${clampedProgress * window.innerWidth - 80}px, 0, 0)`;
      glow.style.opacity = clampedProgress > 0.01 ? "1" : "0";
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={barRef}
        aria-hidden="true"
        className="fixed left-0 top-0 z-[70] h-0.5 w-full origin-left scale-x-0 bg-[linear-gradient(90deg,#f5c451_0%,#fb7185_26%,#a78bfa_50%,#38bdf8_73%,#86efac_100%)]"
      />
      <div
        ref={glowRef}
        aria-hidden="true"
        className="fixed left-0 top-0 z-[71] h-1 w-20 -translate-x-full bg-[linear-gradient(90deg,transparent,#fff8d6,transparent)] opacity-0 blur-sm transition-opacity duration-200"
      />
    </>
  );
}

export const ScrollProgress = memo(ScrollProgressComponent);
