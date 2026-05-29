import { motion } from "framer-motion";
import { SectionShell } from "@/components/SectionShell";
import { TiltCard } from "@/components/TiltCard";
import { skillGroups } from "@/data/portfolio";

const rowViewport = { once: false, amount: 0.35, margin: "0px 0px -6% 0px" };

function SkillRow({ skill, accent, delay }) {
  return (
    <motion.div
      data-skill-row
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={rowViewport}
      transition={{ duration: 0.46, delay, ease: [0.22, 1, 0.36, 1] }}
      whileTap={{ scale: 0.985 }}
      className="group/skill relative isolate rounded-md py-2.5 will-change-transform md:py-0"
    >
      <motion.span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-[-0.35rem] inset-y-0 z-0 rounded-md bg-gradient-to-r ${accent} md:hidden`}
        initial={{ opacity: 0, scaleX: 0.82 }}
        whileInView={{ opacity: [0, 0.14, 0.045], scaleX: [0.82, 1, 1] }}
        viewport={rowViewport}
        transition={{ duration: 0.72, delay: delay + 0.04, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="relative z-10 mb-2 flex items-center justify-between gap-3 text-sm">
        <span className="font-medium text-white">{skill.name}</span>
        <span className="text-muted-foreground">{skill.level}%</span>
      </div>
      <div className="relative z-10 h-2 overflow-hidden rounded-sm bg-white/[0.08] md:h-1.5">
        <motion.div
          data-skill-bar
          className={`h-full origin-left bg-gradient-to-r ${accent}`}
          style={{ width: `${skill.level}%` }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={rowViewport}
          transition={{
            duration: 0.82,
            delay: delay + 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
        <motion.span
          className="absolute inset-y-0 left-0 w-10 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent"
          initial={{ x: "-120%" }}
          whileInView={{ x: "260%" }}
          viewport={rowViewport}
          transition={{ duration: 0.95, delay: delay + 0.2, ease: "easeOut" }}
        />
        <motion.span
          aria-hidden="true"
          className="absolute top-1/2 hidden size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_18px_rgba(245,196,81,0.9)] md:block"
          style={{ left: `${skill.level}%` }}
          initial={{ opacity: 0, scale: 0.2 }}
          whileInView={{ opacity: 1, scale: [0.2, 1.25, 1] }}
          viewport={rowViewport}
          transition={{ duration: 0.5, delay: delay + 0.34, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.span
          aria-hidden="true"
          className="absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_20px_rgba(245,196,81,0.95)] md:hidden"
          style={{ left: `${skill.level}%` }}
          initial={{ opacity: 0, scale: 0.2 }}
          whileInView={{ opacity: 1, scale: [0.2, 1.35, 1] }}
          viewport={rowViewport}
          transition={{ duration: 0.56, delay: delay + 0.32, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  );
}

export function SkillsSection() {
  return (
    <SectionShell
      id="skills"
      eyebrow="Skill Matrix"
      title="Tools for intelligent systems"
      description="A focused stack across model workflows, APIs, automation, and production-facing interfaces."
      className="skills-section"
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {skillGroups.map((group, groupIndex) => {
          const Icon = group.icon;
          return (
            <TiltCard
              key={group.title}
              data-gsap-reveal
              className="glass-panel edge-highlight min-h-0 overflow-hidden rounded-lg p-5 md:min-h-[520px] md:p-6"
              strength={6}
            >
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${group.accent}`} />
              <div className="relative" data-parallax="-18">
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Category</p>
                    <h3 className="mt-1 font-display text-2xl font-bold text-white">{group.title}</h3>
                  </div>
                  <div className="grid size-12 place-items-center rounded-md border border-white/[0.12] bg-white/[0.07] text-primary">
                    <Icon className="size-5" />
                  </div>
                </div>

                <div className="space-y-5">
                  {group.skills.map((skill, index) => (
                    <SkillRow
                      key={skill.name}
                      skill={skill}
                      accent={group.accent}
                      delay={Math.min(0.24, groupIndex * 0.04 + index * 0.035)}
                    />
                  ))}
                </div>
              </div>
            </TiltCard>
          );
        })}
      </div>
    </SectionShell>
  );
}
