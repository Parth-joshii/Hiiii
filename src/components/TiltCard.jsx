import { motion } from "framer-motion";
import { memo, useRef } from "react";
import { cn } from "@/lib/utils";

function TiltCardComponent({ children, className, strength = 8, ...props }) {
  const ref = useRef(null);
  const rafRef = useRef(0);
  const pointerRef = useRef({ x: 0, y: 0 });

  const handleMove = (event) => {
    const node = ref.current;
    if (!node) return;
    if (event.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)").matches) return;

    pointerRef.current = { x: event.clientX, y: event.clientY };

    if (rafRef.current) return;

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      const rect = node.getBoundingClientRect();
      const x = pointerRef.current.x - rect.left;
      const y = pointerRef.current.y - rect.top;
      const rotateX = ((y / rect.height - 0.5) * -strength).toFixed(2);
      const rotateY = ((x / rect.width - 0.5) * strength).toFixed(2);

      node.style.setProperty("--rotate-x", `${rotateX}deg`);
      node.style.setProperty("--rotate-y", `${rotateY}deg`);
      node.style.setProperty("--spot-x", `${(x / rect.width) * 100}%`);
      node.style.setProperty("--spot-y", `${(y / rect.height) * 100}%`);
    });
  };

  const handleLeave = () => {
    const node = ref.current;
    if (!node) return;
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
    node.style.setProperty("--rotate-x", "0deg");
    node.style.setProperty("--rotate-y", "0deg");
    node.style.setProperty("--spot-x", "50%");
    node.style.setProperty("--spot-y", "50%");
  };

  return (
    <motion.div
      ref={ref}
      className={cn("tilt-card relative rounded-lg", className)}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export const TiltCard = memo(TiltCardComponent);
