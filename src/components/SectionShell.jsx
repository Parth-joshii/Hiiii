import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

export function SectionShell({ id, eyebrow, title, description, children, className }) {
  return (
    <section id={id} className={cn("perf-section relative z-10 overflow-hidden py-16 md:py-20 lg:py-24", className)}>
      <div className="section-grid absolute inset-0 opacity-35" aria-hidden="true" />
      <div className="container relative">
        <Reveal className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
          <p className="mb-3 text-sm font-semibold text-primary">{eyebrow}</p>
          <h2 className="font-display text-4xl font-bold text-white md:text-5xl">{title}</h2>
          {description ? (
            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
              {description}
            </p>
          ) : null}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
