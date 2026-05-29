import { Award, BadgeCheck } from "lucide-react";
import { SectionShell } from "@/components/SectionShell";
import { certifications } from "@/data/portfolio";

export function CertificationsSection() {
  return (
    <SectionShell
      id="certifications"
      eyebrow="Certifications"
      title="Signals of continuous learning"
      description="Focused learning across generative AI, analytics, edge AI, and end-to-end machine learning delivery."
      className="py-14 md:py-16 lg:py-20"
    >
      <div className="flex flex-wrap justify-center gap-4">
        {certifications.map((cert) => (
          <article
            key={cert.name}
            data-gsap-reveal
            className="glass-panel edge-highlight group min-h-[236px] w-full rounded-lg p-5 transition-transform duration-300 hover:-translate-y-1 md:basis-[calc((100%_-_1rem)/2)] lg:basis-[calc((100%_-_2rem)/3)]"
          >
            <div className="mb-5 flex items-center justify-between gap-4">
              <div className="grid size-11 place-items-center rounded-md border border-white/[0.12] bg-white/[0.07] text-primary">
                <Award className="size-5" />
              </div>
              <BadgeCheck className="size-5 text-amber-300 opacity-80 transition-opacity group-hover:opacity-100" />
            </div>
            <h3 className="font-display text-lg font-bold leading-7 text-white">{cert.name}</h3>
            <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/10 pt-4 text-sm text-muted-foreground">
              <span>{cert.provider}</span>
              <span>{cert.date}</span>
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
