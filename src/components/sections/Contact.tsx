"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Mail,
  MessageSquare,
  User,
  Phone,
  MapPin,
  Copy,
  Check,
  Github,
  Linkedin,
  Instagram,
  Twitter,
} from "lucide-react";

const EMAIL = "andrymldni@gmail.com";
const PHONE = "+62 858-9581-2699";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/andrymldni", icon: Github },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/andrymldni",
    icon: Linkedin,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/andrymldni",
    icon: Instagram,
  },
  { label: "Twitter", href: "https://twitter.com/andrymldni", icon: Twitter },
];

function QuickContactCard({
  icon: Icon,
  label,
  value,
  href,
  copyable,
}: {
  icon: any;
  label: string;
  value: string;
  href?: string;
  copyable?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  const Wrapper = copyable ? "button" : "a";
  const wrapperProps = copyable
    ? { onClick: handleCopy, type: "button" as const }
    : { href, target: "_blank", rel: "noreferrer" };

  return (
    <Wrapper
      {...(wrapperProps as any)}
      className="card group flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-white/10"
    >
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(168,85,247,0.25), rgba(56,189,248,0.25))",
        }}
      >
        <Icon size={17} style={{ color: "rgb(var(--brand))" }} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs text-white/50">{label}</span>
        <span className="block truncate text-sm font-medium text-white">
          {value}
        </span>
      </span>
      {copyable && (
        <span className="shrink-0 text-white/40 group-hover:text-white/70">
          {copied ? (
            <Check size={16} className="text-emerald-400" />
          ) : (
            <Copy size={16} />
          )}
        </span>
      )}
    </Wrapper>
  );
}

export default function Contact() {
  const [sent, setSent] = useState<false | "loading" | "ok" | "err">(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const honey = (form.get("company") as string) || "";
    if (honey) return;

    const name = (form.get("name") as string)?.trim();
    const fromEmail = (form.get("email") as string)?.trim();
    const message = (form.get("message") as string)?.trim();
    if (!name || !fromEmail || !message) return;

    setSent("loading");
    const subject = encodeURIComponent(`[Portfolio] Message from ${name}`);
    const body = encodeURIComponent(
      `From: ${name} <${fromEmail}>\n\nMessage:\n${message}\n\n— sent from andrymldni.dev`
    );

    try {
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${subject}&body=${body}`;
      const opened = window.open(gmailUrl, "_blank", "noopener,noreferrer");
      if (!opened)
        window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
      setSent("ok");
      (e.currentTarget as HTMLFormElement).reset();
      setTimeout(() => setSent(false), 5000);
    } catch {
      setSent("err");
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {/* Left — headline + quick contact */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="lg:col-span-2 flex flex-col gap-6"
      >
        <div>
          <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight text-white">
            Let&apos;s talk,{" "}
            <span className="gradient-text glow-text">shall we? 👋</span>
          </h3>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-white/65">
            Open to new roles, data project collaborations, or just
            geeking out about data & AI. Click the email to copy it, or
            fill out the form on the right.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <QuickContactCard
            icon={Mail}
            label="Email — click to copy"
            value={EMAIL}
            copyable
          />
          <QuickContactCard
            icon={Phone}
            label="Phone"
            value={PHONE}
            href={`tel:${PHONE.replace(/[^+\d]/g, "")}`}
          />
          <QuickContactCard
            icon={MapPin}
            label="Location"
            value="Jakarta, Indonesia"
            href="https://www.google.com/maps/place/Jakarta"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="card flex h-11 w-11 items-center justify-center rounded-full transition-transform hover:-translate-y-1 hover:bg-white/10"
            >
              <s.icon size={17} />
            </a>
          ))}
        </div>
      </motion.div>

      {/* Right — redesigned form */}
      <motion.div
        initial={{ opacity: 0, x: 16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="lg:col-span-3 relative rounded-3xl p-[1.5px]"
        style={{
          background:
            "linear-gradient(135deg, rgba(168,85,247,0.55), rgba(56,189,248,0.35), rgba(168,85,247,0.15))",
        }}
      >
        <form
          onSubmit={handleSubmit}
          className="grid gap-4 rounded-[calc(1.5rem-1.5px)] bg-[rgb(var(--bg))]/95 p-6 sm:p-8 backdrop-blur-xl"
          aria-describedby="form-status"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative">
              <User
                size={15}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
              />
              <input
                id="name"
                name="name"
                required
                type="text"
                className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-9 pr-3 text-sm focus-visible:ring-2 focus-visible:ring-violet-400"
                placeholder="Your name"
                autoComplete="name"
              />
            </div>
            <div className="relative">
              <Mail
                size={15}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
              />
              <input
                id="email"
                name="email"
                required
                type="email"
                className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-9 pr-3 text-sm focus-visible:ring-2 focus-visible:ring-violet-400"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>
          </div>

          <div className="relative">
            <MessageSquare
              size={15}
              className="pointer-events-none absolute left-3 top-3.5 text-white/40"
            />
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-9 pr-3 text-sm focus-visible:ring-2 focus-visible:ring-violet-400"
              placeholder="Hey, I'd love to collaborate on..."
            />
          </div>

          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            name="company"
            className="hidden"
            aria-hidden="true"
          />

          <motion.button
            whileTap={{ scale: 0.98 }}
            disabled={sent === "loading"}
            className="cv-download-btn w-fit disabled:opacity-60"
            type="submit"
          >
            <Send size={15} />
            {sent === "loading" ? "Sending..." : "Send Message"}
          </motion.button>

          <p
            id="form-status"
            className="text-xs text-white/50"
            aria-live="polite"
          >
            {sent === "ok" &&
              "✅ Opened in Gmail / your email client — just hit send."}
            {sent === "err" &&
              "⚠️ Couldn't open your email client. Try again or reach out manually."}
          </p>
        </form>
      </motion.div>
    </div>
  );
}
