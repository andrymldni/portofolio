"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MessageSquare, User } from "lucide-react";

export default function Contact() {
  const [sent, setSent] = useState<false | "loading" | "ok" | "err">(false);
  const EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "andrymldni@gmail.com";

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
    const subject = encodeURIComponent(`[Portfolio] Pesan dari ${name}`);
    const body = encodeURIComponent(
      `Dari: ${name} <${fromEmail}>\n\nPesan:\n${message}\n\n— dikirim dari andry.dev`
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
    <div className="card p-6">
      <motion.form
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        onSubmit={handleSubmit}
        className="grid gap-4"
        aria-describedby="form-status"
      >
        <div>
          <label
            className="text-base font-medium text-white/80 flex items-center gap-2"
            htmlFor="name"
          >
            <User size={14} /> Nama
          </label>
          <input
            id="name"
            name="name"
            required
            type="text"
            className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm md:text-base focus-visible:ring-2 focus-visible:ring-indigo-400"
            placeholder="Nama kamu"
            autoComplete="name"
          />
        </div>
        <div>
          <label
            className="text-base font-medium text-white/80 flex items-center gap-2"
            htmlFor="email"
          >
            <Mail size={14} /> Email
          </label>
          <input
            id="email"
            name="email"
            required
            type="email"
            className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm md:text-base focus-visible:ring-2 focus-visible:ring-indigo-400"
            placeholder="kamu@contoh.com"
            autoComplete="email"
          />
        </div>
        <div>
          <label
            className="text-base font-medium text-white/80 flex items-center gap-2"
            htmlFor="message"
          >
            <MessageSquare size={14} /> Pesan
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm md:text-base focus-visible:ring-2 focus-visible:ring-indigo-400"
            placeholder="Hai, saya tertarik berkolaborasi..."
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
          className="card px-4 py-2 text-sm md:text-base w-fit flex items-center gap-2 disabled:opacity-60"
          type="submit"
        >
          <Send size={14} />{" "}
          {sent === "loading" ? "Mengirim..." : "Kirim via Gmail"}
        </motion.button>
        <p
          id="form-status"
          className="text-xs md:text-sm text-white/50"
          aria-live="polite"
        >
          {sent === "ok" && "✅ Dialihkan ke Gmail/Email klien kamu. (Demo)"}
          {sent === "err" &&
            "⚠️ Gagal membuka klien email. Coba lagi atau kirim manual."}
        </p>
        <p className="text-xs md:text-sm text-white/50">
          Atau kirim langsung ke{" "}
          <a className="underline hover:text-white" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
        </p>
      </motion.form>
    </div>
  );
}
