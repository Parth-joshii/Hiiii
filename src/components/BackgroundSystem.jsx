import { memo, useEffect, useRef } from "react";

function BackgroundSystemComponent() {
  const layersRef = useRef([]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return undefined;

    const layers = layersRef.current.filter(Boolean);
    const strengths = [-0.05, -0.1, -0.16, -0.07];
    let rafId = 0;

    const update = () => {
      rafId = 0;
      const scrollY = window.scrollY || 0;

      layers.forEach((layer, index) => {
        layer.style.transform = `translate3d(0, ${scrollY * strengths[index]}px, 0)`;
      });
    };

    const requestUpdate = () => {
      if (!rafId) rafId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        ref={(node) => {
          layersRef.current[0] = node;
        }}
        className="absolute inset-x-[-8%] inset-y-[-18%] bg-aurora-field opacity-80 will-change-transform"
      />
      <div
        ref={(node) => {
          layersRef.current[1] = node;
        }}
        className="aurora-band absolute inset-x-[-16%] top-[-24%] hidden h-[86vh] opacity-55 will-change-transform lg:block"
      />
      <div
        ref={(node) => {
          layersRef.current[2] = node;
        }}
        className="section-grid absolute inset-x-[-10%] inset-y-[-20%] opacity-30 will-change-transform"
      />
      <div
        ref={(node) => {
          layersRef.current[3] = node;
        }}
        className="noise-layer absolute inset-x-[-8%] inset-y-[-14%] hidden will-change-transform md:block"
      />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background via-background/80 to-transparent" />
    </div>
  );
}

export const BackgroundSystem = memo(BackgroundSystemComponent);
