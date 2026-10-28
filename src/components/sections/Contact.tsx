"use client";
import { useState } from "react";
import {
  Send,
  Mail,
  Phone,
  MapPin,
  Copy,
  Check,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { CONTACT_EMAIL, socialLinks } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

const PHONE = "+62 858-9581-2699";

function QuickContactCard({
  icon: Icon,
  label,
  value,
  href,
  copyable,
}: {
  icon: LucideIcon;
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

  const inner = (
    <>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-steel text-ink">
        <Icon size={17} strokeWidth={1.75} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs text-muted">{label}</span>
        <span className="block truncate text-sm font-medium text-ink">
          {value}
        </span>
      </span>
      {copyable && (
        <span className="shrink-0 text-muted transition-colors group-hover:text-ink">
          {copied ? (
            <Check size={16} className="text-ok" />
          ) : (
            <Copy size={16} />
          )}
        </span>
      )}
    </>
  );

  const className =
    "card interactive-card group flex w-full items-center gap-3 p-4 text-left";

  return copyable ? (
    <button type="button" onClick={handleCopy} className={className}>
      {inner}
    </button>
  ) : (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {inner}
    </a>
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
      `From: ${name} <${fromEmail}>\n\nMessage:\n${message}\n\n— sent from ${new URL(SITE_URL).hostname}`,
    );

    try {
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_EMAIL)}&su=${subject}&body=${body}`;
      let draft: Window | null = null;
      try {
        // Open a blank tab first: the noopener feature returns null even on
        // success, so it cannot distinguish a blocked popup. Detach the
        // opener before navigating to Gmail for the same isolation.
        draft = window.open("about:blank", "_blank");
        if (draft) {
          draft.opener = null;
          draft.location.replace(gmailUrl);
        }
      } catch {
        draft?.close();
        draft = null;
      }
      if (!draft) {
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
      }
      setSent("ok");
      setTimeout(() => setSent(false), 5000);
    } catch {
      setSent("err");
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
      {/* Left — headline + quick contact */}
      <Reveal className="flex flex-col gap-6 lg:col-span-2">
        <div>
          <h3 className="text-2xl font-semibold leading-tight tracking-tight text-ink sm:text-3xl">
            Let&apos;s talk, <span className="text-brand">shall we?</span>
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            Up for data project collaborations, or just geeking out about data
            and AI. Click the email to copy it, or use the form.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <QuickContactCard
            icon={Mail}
            label="Email — click to copy"
            value={CONTACT_EMAIL}
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
          {Object.values(socialLinks).map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="link-nudge flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink/30 hover:bg-ink/[0.04]"
            >
              <s.icon size={17} strokeWidth={1.75} />
            </a>
          ))}
        </div>
      </Reveal>

      {/* Right — form */}
      <Reveal delay={0.1} className="lg:col-span-3">
        <form
          onSubmit={handleSubmit}
          className="card grid gap-4 p-6 sm:p-8"
          aria-describedby="form-status"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5 text-sm">
              <span className="font-medium text-ink">Name</span>
              <input
                name="name"
                required
                type="text"
                className="field px-3"
                placeholder="Your name"
                autoComplete="name"
              />
            </label>
            <label className="grid gap-1.5 text-sm">
              <span className="font-medium text-ink">Email</span>
              <input
                name="email"
                required
                type="email"
                className="field px-3"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </label>
          </div>

          <label className="grid gap-1.5 text-sm">
            <span className="font-medium text-ink">Message</span>
            <textarea
              name="message"
              required
              rows={5}
              className="field px-3"
              placeholder="Hey, I'd love to collaborate on..."
            />
          </label>

          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            name="company"
            className="hidden"
            aria-hidden="true"
          />

          <button
            disabled={sent === "loading"}
            className="btn-primary w-fit"
            type="submit"
          >
            <Send size={15} />
            {sent === "loading" ? "Opening draft..." : "Open email draft"}
          </button>

          <p id="form-status" className="text-xs text-muted" aria-live="polite">
            {sent === "ok" &&
              "If Gmail or your email app opened, review the draft and send it there."}
            {sent === "err" &&
              "Couldn't open your email client. Try again, or email me directly."}
          </p>
        </form>
      </Reveal>
    </div>
  );
}
