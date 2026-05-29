import { SectionShell } from "@/components/SectionShell";
import { experiences } from "@/data/portfolio";

export function ExperienceSection() {
  return (
    <SectionShell
      id="experience"
      eyebrow="Experience"
      title="Internship work across RAG and ML delivery"
      description="Production-facing engineering practice, from retrieval pipelines to classification workflows."
    >
      <div className="relative mx-auto max-w-5xl">
        <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-transparent via-primary to-transparent md:left-1/2" />
        <div className="space-y-8">
          {experiences.map((item, index) => {
            const Icon = item.icon;
            const alignRight = index % 2 === 0;
            return (
              <div
                key={`${item.company}-${item.period}`}
                data-gsap-reveal
                className="relative grid gap-6 pl-12 md:grid-cols-[1fr_76px_1fr] md:pl-0"
              >
                <div className={alignRight ? "hidden md:block" : "md:col-start-1"}>
                  {!alignRight ? <ExperienceCard item={item} /> : null}
                </div>

                <div className="absolute left-0 top-6 grid size-9 place-items-center rounded-md border border-primary/[0.35] bg-background text-primary shadow-glow md:static md:mx-auto md:size-12">
                  <Icon className="size-5" />
                </div>

                <div className={alignRight ? "md:col-start-3" : "hidden md:block"}>
                  {alignRight ? <ExperienceCard item={item} /> : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}

function ExperienceCard({ item }) {
  return (
    <article className="glass-panel edge-highlight rounded-lg p-6">
      <p className="text-sm font-semibold text-primary">{item.period}</p>
      <h3 className="mt-2 font-display text-2xl font-bold text-white">
        {item.role} - {item.company}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">{item.location}</p>
      <ul className="mt-5 space-y-3">
        {item.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-3 text-sm leading-6 text-muted-foreground">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
