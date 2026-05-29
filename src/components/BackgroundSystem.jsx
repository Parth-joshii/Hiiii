import { memo } from "react";

function BackgroundSystemComponent() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-aurora-field opacity-80" />
      <div className="aurora-band absolute inset-x-[-12%] top-[-20%] hidden h-[68vh] opacity-55 lg:block" />
      <div className="section-grid absolute inset-0 opacity-30" />
      <div className="noise-layer absolute inset-0 hidden md:block" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background via-background/80 to-transparent" />
    </div>
  );
}

export const BackgroundSystem = memo(BackgroundSystemComponent);
