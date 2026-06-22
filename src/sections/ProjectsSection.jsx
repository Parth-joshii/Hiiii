import { ArrowUpRight, Github, RadioTower } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SectionShell } from "@/components/SectionShell";
import { TiltCard } from "@/components/TiltCard";
import { projects } from "@/data/portfolio";

function ArchitectureFlow({ nodes = [] }) {
  return (
    <div className="absolute inset-x-5 top-5 hidden items-center justify-center gap-1.5 sm:flex sm:gap-2">
      {nodes.map((node, index) => (
        <div key={node} className="flex min-w-0 flex-1 items-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.48, delay: index * 0.06 }}
            className="relative min-w-0 flex-1 overflow-hidden rounded-md border border-white/10 bg-background/70 px-2.5 py-2 text-center text-[10px] font-semibold text-white/82 transition-colors group-hover:border-primary/45 group-hover:text-white sm:text-[11px]"
          >
            <span className="relative z-10 block truncate">{node}</span>
            <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/80 to-transparent" />
          </motion.div>
          {index < nodes.length - 1 ? (
            <div className="relative mx-1 h-px w-5 shrink-0 overflow-hidden bg-white/15 sm:w-7">
              <span className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-transparent via-primary/70 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function ProjectVisual({ project }) {
  const Icon = project.icon;

  return (
    <div className="relative h-44 overflow-hidden border-b border-white/10 bg-black/30 sm:h-52">
      <div className="absolute inset-x-[-6%] inset-y-[-16%] bg-grid-large bg-[length:44px_44px] opacity-30" data-parallax="-14" />
      <div
        className="absolute inset-x-[-8%] inset-y-[-18%] bg-[radial-gradient(ellipse_at_35%_24%,rgba(45,212,191,0.28),transparent_44%),radial-gradient(ellipse_at_72%_78%,rgba(245,196,81,0.18),transparent_42%)]"
        data-parallax="-24"
      />
      <ArchitectureFlow nodes={project.architecture} />
      <div className="absolute left-6 bottom-16 grid size-14 place-items-center rounded-md border border-white/[0.15] bg-white/[0.08] text-primary shadow-glow" data-parallax="-18">
        <Icon className="size-7" />
      </div>
      <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-primary">{project.signal}</p>
          <p className="mt-1 text-sm text-white">{project.metric}</p>
        </div>
        <RadioTower className="size-5 text-amber-300" />
      </div>
    </div>
  );
}

export function ProjectsSection() {
  return (
    <SectionShell
      id="projects"
      eyebrow="Projects"
      title="Cinematic AI builds with real technical depth"
      description="Each system is shaped around retrieval quality, automation reliability, and interfaces that make AI feel useful."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {projects.map((project) => (
          <TiltCard
            key={project.title}
            data-gsap-reveal
            className="glass-panel edge-highlight group flex min-h-[500px] flex-col overflow-hidden rounded-lg"
            strength={5}
          >
            <ProjectVisual project={project} />
            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-display text-2xl font-bold text-white transition-colors group-hover:text-primary">{project.title}</h3>
              <p className="mt-4 leading-7 text-muted-foreground">{project.description}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.highlights.map((item) => (
                  <span key={item} className="rounded-sm border border-white/10 bg-white/[0.06] px-2.5 py-1 text-xs text-muted-foreground">
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row">
                <Button asChild variant="outline" size="sm">
                  <a href={project.githubUrl} target="_blank" rel="noreferrer">
                    <Github /> GitHub
                  </a>
                </Button>
                <Button asChild size="sm">
                  <a href={project.demoUrl} target="_blank" rel="noreferrer">
                    Live Demo <ArrowUpRight />
                  </a>
                </Button>
              </div>
            </div>
          </TiltCard>
        ))}
      </div>
    </SectionShell>
  );
}
