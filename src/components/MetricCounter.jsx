import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export function MetricCounter({ value, suffix = "", label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => `${Math.round(latest)}${suffix}`);

  useEffect(() => {
    if (!inView) return undefined;
    const controls = animate(count, value, { duration: 1.8, ease: [0.22, 1, 0.36, 1] });
    return controls.stop;
  }, [count, inView, value]);

  return (
    <div ref={ref} className="glass-panel edge-highlight rounded-lg p-5">
      <motion.div className="font-display text-3xl font-bold text-white md:text-4xl">{rounded}</motion.div>
      <p className="mt-2 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
