import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, Sparkles, X } from "lucide-react";
import { memo, useEffect, useRef, useState } from "react";
import { navItems, profile, socials } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function NavbarComponent() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const scrolledRef = useRef(false);

  useEffect(() => {
    let rafId = 0;
    const update = () => {
      rafId = 0;
      const nextScrolled = window.scrollY > 20;
      if (scrolledRef.current !== nextScrolled) {
        scrolledRef.current = nextScrolled;
        setScrolled(nextScrolled);
      }
    };
    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-4 z-[110] px-4">
        <motion.nav
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "mx-auto flex max-w-6xl items-center justify-between rounded-lg border px-4 py-3 transition-all duration-300",
            scrolled || open
              ? "border-white/[0.14] bg-background/[0.92] shadow-xl shadow-black/25 md:bg-background/[0.84]"
              : "border-white/10 bg-background/[0.72] md:bg-white/[0.055]",
          )}
        >
          <a href="#home" className="font-display text-base font-bold text-white" onClick={() => setOpen(false)}>
            {profile.brand}
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-white"
              >
                {item.label}
                <span className="absolute inset-x-3 bottom-1 h-px scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </div>

          <Button asChild size="sm" className="hidden md:inline-flex">
            <a href="#contact">Contact Me</a>
          </Button>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">
            {open ? <X /> : <Menu />}
          </Button>
        </motion.nav>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] overflow-y-auto bg-background/94 md:hidden"
          >
            <div className="absolute inset-0 bg-aurora-field opacity-70" />
            <div className="section-grid absolute inset-0 opacity-35" />
            <div className="noise-layer absolute inset-0" />
            <motion.div
              initial={{ y: 28, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex min-h-screen flex-col px-6 pb-10 pt-28"
            >
              <div className="mb-8 inline-flex w-fit items-center gap-2 rounded-md border border-primary/25 bg-primary/[0.08] px-3 py-2 text-xs font-semibold text-primary">
                <Sparkles className="size-4" />
                Navigate PARTH.AI
              </div>

              <nav className="space-y-3">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.34, delay: index * 0.04 }}
                    className="group flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.055] px-5 py-4 font-display text-2xl font-bold text-white transition hover:border-primary/55 hover:bg-primary/[0.1]"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                    <ArrowUpRight className="size-5 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </motion.a>
                ))}
              </nav>

              <div className="mt-auto space-y-4 pt-8">
                <Button asChild className="w-full" size="lg">
                  <a href="#contact" onClick={() => setOpen(false)}>
                    Contact Me <ArrowUpRight />
                  </a>
                </Button>
                <div className="grid grid-cols-3 gap-2">
                  {socials.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target={item.href.startsWith("mailto") ? undefined : "_blank"}
                        rel="noreferrer"
                        className="grid h-12 place-items-center rounded-md border border-white/10 bg-white/[0.055] text-muted-foreground transition hover:border-primary/45 hover:text-primary"
                        aria-label={item.label}
                        onClick={() => setOpen(false)}
                      >
                        <Icon className="size-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export const Navbar = memo(NavbarComponent);
