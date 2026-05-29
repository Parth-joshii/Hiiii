import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export function Reveal({ children, className, delay = 0, as = "div" }) {
  const Component = motion[as] || motion.div;

  return (
    <Component
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, margin: "-80px" }}
      transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </Component>
  );
}
