import { memo, useEffect, useRef } from "react";

function ScrollProgressComponent() {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    let rafId = 0;

    const update = () => {
      rafId = 0;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      element.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
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
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed left-0 top-0 z-[70] h-0.5 w-full origin-left scale-x-0 bg-[linear-gradient(90deg,#f5c451_0%,#fb7185_26%,#a78bfa_50%,#38bdf8_73%,#86efac_100%)]"
    />
  );
}

export const ScrollProgress = memo(ScrollProgressComponent);
