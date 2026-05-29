import { ChevronUp, Heart, Mail, Sparkles } from "lucide-react";
import { navItems, profile, socials } from "@/data/portfolio";

const footerLinks = navItems.filter((item) => item.href !== "#contact");

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 overflow-hidden border-t border-primary/20 bg-[#05070d]/95">
      <div className="section-grid absolute inset-0 opacity-25" aria-hidden="true" />
      <div className="noise-layer absolute inset-0" aria-hidden="true" />
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-amber-300/[0.08] via-emerald-300/[0.035] to-transparent"
        aria-hidden="true"
      />

      <div className="container relative py-12 md:py-16">
        <div data-gsap-reveal className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_1fr] md:gap-16">
          <div>
            <a href="#home" className="inline-flex items-center gap-2 font-display text-2xl font-black tracking-tight text-white">
              <span className="text-gradient">{profile.brand}</span>
              <span className="text-sm font-semibold text-muted-foreground">portfolio</span>
            </a>
            <p className="mt-5 max-w-md text-base leading-8 text-muted-foreground">
              AI/ML Engineer building RAG systems, automation workflows, computer vision tools, and production-ready
              intelligent experiences.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {socials.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                    className="group inline-flex size-11 items-center justify-center rounded-md border border-white/10 bg-white/[0.045] text-muted-foreground transition duration-300 hover:-translate-y-0.5 hover:border-primary/45 hover:text-primary hover:shadow-[0_0_24px_rgba(245,196,81,0.16)]"
                    aria-label={item.label}
                  >
                    <Icon className="size-4 transition-transform duration-300 group-hover:scale-110" />
                  </a>
                );
              })}
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="font-display text-lg font-bold text-white">Quick Links</h2>
            <div className="mt-6 grid gap-4 text-muted-foreground">
              {footerLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="group inline-flex w-fit items-center gap-2 transition duration-300 hover:text-primary"
                >
                  <span className="h-px w-0 bg-gradient-to-r from-amber-300 to-emerald-300 transition-all duration-300 group-hover:w-6" />
                  {item.label}
                </a>
              ))}
              <a href="#contact" className="group inline-flex w-fit items-center gap-2 transition duration-300 hover:text-primary">
                <span className="h-px w-0 bg-gradient-to-r from-amber-300 to-emerald-300 transition-all duration-300 group-hover:w-6" />
                Contact
              </a>
            </div>
          </nav>

          <div>
            <h2 className="font-display text-lg font-bold text-white">Contact Info</h2>
            <div className="mt-6 space-y-4 text-muted-foreground">
              <a
                href={`mailto:${profile.email}`}
                className="group flex items-center gap-3 transition duration-300 hover:text-primary"
              >
                <span className="grid size-10 place-items-center rounded-md border border-primary/20 bg-primary/[0.08] text-primary transition duration-300 group-hover:border-primary/45">
                  <Mail className="size-4" />
                </span>
                <span className="break-all">{profile.email}</span>
              </a>
              <div className="flex items-center gap-3 text-sm">
                <span className="grid size-10 place-items-center rounded-md border border-white/10 bg-white/[0.045] text-primary">
                  <Sparkles className="size-4" />
                </span>
                <span>{profile.title} - {profile.location}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />

        <div className="mt-8 flex flex-col gap-5 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>&copy; {year} {profile.name}. All rights reserved.</p>
          <div className="flex items-center justify-between gap-5 md:justify-end">
            <p className="inline-flex items-center gap-2">
              Built with <Heart className="size-4 fill-primary text-primary" aria-hidden="true" /> AI precision.
            </p>
            <button
              type="button"
              onClick={scrollToTop}
              className="grid size-12 shrink-0 place-items-center rounded-md border border-primary/30 bg-primary text-primary-foreground shadow-[0_0_34px_rgba(245,196,81,0.22)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_46px_rgba(245,196,81,0.34)]"
              aria-label="Back to top"
            >
              <ChevronUp className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
