import { GraduationCap, MapPin, Radio, UserRound } from "lucide-react";
import { MetricCounter } from "@/components/MetricCounter";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";
import { profile, stats } from "@/data/portfolio";
import profilePhoto from "@/assets/profile-cutout.webp";

export function AboutSection() {
  return (
    <section id="about" className="perf-section relative z-10 overflow-hidden pb-16 pt-8 md:py-20 lg:py-24">
      <div className="section-grid absolute inset-0 opacity-35" aria-hidden="true" />
      <div
        data-scroll-wash
        className="pointer-events-none absolute inset-x-[-14%] top-[20%] h-44 bg-[linear-gradient(100deg,transparent_0%,rgba(245,196,81,0.1)_24%,rgba(167,139,250,0.08)_52%,rgba(56,189,248,0.07)_78%,transparent_100%)] opacity-0 blur-2xl"
        aria-hidden="true"
      />
      <div className="container relative">
        <div className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          <Reveal>
            <TiltCard className="glass-panel edge-highlight scanline holo-surface overflow-hidden rounded-lg p-6 md:p-8" data-gsap-reveal>
              <div className="absolute inset-0 bg-grid-fine bg-[length:38px_38px] opacity-25" />
              <div className="relative">
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-primary">{profile.brand}</p>
                    <h2 className="mt-1 font-display text-2xl font-bold text-white">{profile.name}</h2>
                  </div>
                  <span className="grid size-11 place-items-center rounded-md border border-primary/30 bg-primary/10 text-primary">
                    <UserRound className="size-5" />
                  </span>
                </div>

                <div className="relative mx-auto grid h-80 w-full max-w-[24rem] place-items-center" data-parallax="-32">
                  <div className="absolute inset-x-8 bottom-6 h-24 rounded-full bg-[radial-gradient(circle,rgba(245,196,81,0.2),transparent_70%)]" />
                  <div className="absolute left-10 right-24 top-6 h-44 rounded-full bg-[radial-gradient(circle,rgba(251,113,133,0.14),transparent_72%)]" />
                  <div className="absolute left-24 right-8 top-10 h-40 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.13),transparent_72%)]" />
                  <div className="absolute size-72 rounded-full border border-dashed border-amber-300/28" />
                  <div className="relative z-10 size-64 overflow-hidden rounded-full border border-amber-200/30 bg-[radial-gradient(circle_at_35%_22%,rgba(245,196,81,0.28),transparent_32%),radial-gradient(circle_at_72%_36%,rgba(167,139,250,0.2),transparent_34%),linear-gradient(145deg,rgba(18,12,5,0.96),rgba(4,5,8,0.96))] shadow-glow">
                    <div className="absolute inset-0 bg-grid-fine bg-[length:30px_30px] opacity-20" />
                    <img
                      src={profilePhoto}
                      alt="Parth Joshi"
                      className="absolute -bottom-8 left-1/2 h-[19.5rem] w-auto -translate-x-1/2 object-contain drop-shadow-[0_0_28px_rgba(245,196,81,0.3)]"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-t from-background/30 via-transparent to-white/8" />
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Radio className="size-4 text-primary" />
                    {profile.title} building production-ready AI workflows
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <MapPin className="size-4 text-primary" />
                    {profile.location}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <GraduationCap className="size-4 text-primary" />
                    {profile.graduation}
                  </div>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          <div>
            <Reveal className="max-w-3xl" delay={0.08}>
              <p className="mb-3 text-sm font-semibold text-primary">About</p>
              <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
                Designing AI systems with cinematic polish and practical intelligence.
              </h2>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">{profile.summary}</p>
            </Reveal>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {stats.map((stat, index) => (
                <Reveal key={stat.label} delay={0.08 + index * 0.06}>
                  <MetricCounter {...stat} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
