"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Instagram, Twitter } from "lucide-react";

const TITLES = [
  "Data Scientist",
  "Data Analyst",
  "GDG Surabaya Organizer",
];

export default function Hero() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % TITLES.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative grid min-h-[80vh] place-items-center pt-10 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[url('/particles.svg')] bg-cover opacity-20" />
      <div className="relative grid w-full items-center gap-10 md:grid-cols-2">
        <div className="text-center md:text-left">
          <h1 className="font-extrabold tracking-tight leading-tight">
            <span className="inline-flex items-center gap-2 whitespace-nowrap text-3xl sm:text-5xl md:text-7xl">
              <span className="text-white">Hi There</span>
              <motion.span
                role="img"
                aria-label="waving hand"
                className="inline-block align-middle"
                animate={{ rotate: [0, 22, -8, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2 }}
              >
                👋
              </motion.span>
              <span className="text-white">,&nbsp;I am a</span>
            </span>
          </h1>
          <div
            className="mt-3 text-lg sm:text-2xl text-white/70 min-h-[1.6em]"
            aria-live="polite"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={idx}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-block"
              >
                {TITLES[idx]}
              </motion.span>
            </AnimatePresence>
          </div>
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15, type: "spring", duration: 0.7 }}
            className="mt-6 flex items-center justify-center md:justify-start gap-3 flex-wrap"
          >
            <a
              href="#contact"
              className="card px-4 py-2 text-sm bg-emerald-500/20 hover:bg-emerald-500/40"
            >
              📩 Hubungi Saya
            </a>
            <a
              href="/CV_andrymldni.pdf"
              target="_blank"
              className="card px-4 py-2 text-sm"
            >
              📄 Download CV
            </a>
          </motion.div>
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring", duration: 0.6 }}
            className="mt-5 flex items-center justify-center md:justify-start gap-3"
          >
            <a
              href="https://www.instagram.com/andrymldni"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="card p-2 rounded-xl hover:bg-white/10"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/andrymldni"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="card p-2 rounded-xl hover:bg-white/10"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://github.com/andrymldni"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="card p-2 rounded-xl hover:bg-white/10"
            >
              <Github size={18} />
            </a>
            <a
              href="https://twitter.com/andrymldni"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
              className="card p-2 rounded-xl hover:bg-white/10"
            >
              <Twitter size={18} />
            </a>
          </motion.div>
        </div>
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.9 }}
          className="relative mx-auto h-36 w-36 sm:h-48 sm:w-48 md:h-64 md:w-64"
        >
          <div className="pointer-events-none absolute -inset-6 rounded-full bg-gradient-to-tr from-indigo-500/40 via-cyan-400/20 to-emerald-400/30 blur-2xl" />
          <Image
            src="/profile.jpeg"
            alt="Foto Andry"
            fill
            priority
            sizes="(max-width: 768px) 9rem, (max-width: 1024px) 12rem, 16rem"
            className="rounded-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
