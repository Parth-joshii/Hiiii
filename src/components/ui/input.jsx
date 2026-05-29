import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => (
  <input
    type={type}
    className={cn(
      "flex h-12 w-full rounded-md border border-white/[0.12] bg-white/[0.055] px-4 py-3 text-sm text-foreground outline-none transition-all duration-300 placeholder:text-muted-foreground focus:border-primary/60 focus:bg-white/[0.085] focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    ref={ref}
    {...props}
  />
));
Input.displayName = "Input";

export { Input };
