import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SectionShell } from "@/components/SectionShell";
import { profile, socials } from "@/data/portfolio";
import { saveInquiry } from "@/lib/inquiries";

const initialForm = {
  name: "",
  email: "",
  message: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactSection() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const update = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
    setSubmitStatus("idle");
  };

  const validate = () => {
    const nextErrors = {};
    if (form.name.trim().length < 2) nextErrors.name = "Please add your name.";
    if (!emailPattern.test(form.email.trim())) nextErrors.email = "Please enter a valid email.";
    if (form.message.trim().length < 12) nextErrors.message = "Please share a little more detail.";
    return nextErrors;
  };

  const submit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    const inquiryResult = await saveInquiry({
      type: "contact-form",
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
      source: "portfolio contact form",
    });
    setIsSubmitting(false);

    if (!inquiryResult?.ok) {
      setSubmitStatus("error");
      return;
    }

    setSubmitStatus(inquiryResult.storage === "database" ? "stored" : "saved_local");
    setForm(initialForm);
  };

  const statusMessage = {
    stored: "Message saved in the database.",
    saved_local: "Message received locally. Add MONGODB_URI to store production enquiries in the database.",
    error: `Message could not be sent automatically. Please email ${profile.email} directly.`,
  }[submitStatus];
  const statusIsError = submitStatus === "error";

  return (
    <SectionShell
      id="contact"
      eyebrow="Contact"
      title="Let's build an intelligent experience"
      description="Open to AI/ML engineering opportunities, internship collaborations, and ambitious AI product ideas."
      className="pb-12"
    >
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div data-gsap-reveal className="glass-panel edge-highlight rounded-lg p-6 md:p-8">
          <p className="text-sm font-semibold text-primary">Direct Signal</p>
          <h3 className="mt-3 font-display text-3xl font-bold text-white">Available for AI/ML roles and product collaborations.</h3>
          <div className="mt-8 space-y-4">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.04] p-4 text-sm text-muted-foreground transition-colors hover:border-primary/[0.45] hover:text-white"
            >
              <Mail className="size-5 text-primary" />
              {profile.email}
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {socials.map((item) => {
              const Icon = item.icon;
              return (
                <Button key={item.label} asChild variant="outline" size="sm">
                  <a href={item.href} target={item.href.startsWith("mailto") ? undefined : "_blank"} rel="noreferrer">
                    <Icon /> {item.label}
                  </a>
                </Button>
              );
            })}
          </div>
        </div>

        <form data-gsap-reveal onSubmit={submit} noValidate className="glass-panel edge-highlight rounded-lg p-6 md:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-white">
              Name
              <Input
                name="name"
                value={form.name}
                onChange={update}
                placeholder="Your name"
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
                className={errors.name ? "border-rose-300/60 focus:border-rose-300 focus:ring-rose-300/20" : ""}
              />
              {errors.name ? (
                <span className="flex items-center gap-1.5 text-xs text-rose-200">
                  <AlertCircle className="size-3.5" /> {errors.name}
                </span>
              ) : null}
            </label>
            <label className="space-y-2 text-sm font-medium text-white">
              Email
              <Input
                name="email"
                type="email"
                value={form.email}
                onChange={update}
                placeholder="you@example.com"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                className={errors.email ? "border-rose-300/60 focus:border-rose-300 focus:ring-rose-300/20" : ""}
              />
              {errors.email ? (
                <span className="flex items-center gap-1.5 text-xs text-rose-200">
                  <AlertCircle className="size-3.5" /> {errors.email}
                </span>
              ) : null}
            </label>
          </div>
          <label className="mt-4 block space-y-2 text-sm font-medium text-white">
            Message
            <Textarea
              name="message"
              value={form.message}
              onChange={update}
              placeholder="Tell me what you want to build..."
              aria-invalid={Boolean(errors.message)}
              className={errors.message ? "border-rose-300/60 focus:border-rose-300 focus:ring-rose-300/20" : ""}
            />
            {errors.message ? (
              <span className="flex items-center gap-1.5 text-xs text-rose-200">
                <AlertCircle className="size-3.5" /> {errors.message}
              </span>
            ) : null}
          </label>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">Typical focus: RAG, automation, NLP, vision, AI workflows.</p>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"} <Send />
            </Button>
          </div>
          <AnimatePresence>
            {submitStatus !== "idle" ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className={`mt-5 flex items-center gap-3 rounded-md border p-3 text-sm ${
                  statusIsError
                    ? "border-rose-300/25 bg-rose-300/[0.08] text-rose-100"
                    : "border-emerald-300/25 bg-emerald-300/[0.08] text-emerald-100"
                }`}
              >
                {statusIsError ? <AlertCircle className="size-5 text-rose-200" /> : <CheckCircle2 className="size-5 text-emerald-200" />}
                {statusMessage}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </form>
      </div>
    </SectionShell>
  );
}
