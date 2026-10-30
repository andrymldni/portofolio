"use client";
import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowUpRight, GitBranch } from "lucide-react";
import { EASE_OUT, rise, stagger } from "@/components/ui/Reveal";
import HeroChart from "@/components/effects/HeroChart";
import MagneticLink from "@/components/ui/MagneticLink";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useDesktopMotion, usePointerSurface } from "@/hooks/usePointerSurface";
import { canEnhanceEntrance, useProgressiveEntrance } from "@/hooks/useProgressiveEntrance";
import { socialLinks } from "@/lib/data";

const ROLES = [
  "Data Analyst",
  "Data Engineer",
  "Data Scientist",
];

function NameLine({ text, offset }: { text: string; offset: number }) {
  return (
    <>
      {Array.from(text).map((character, index) => (
        <span
          key={`${character}-${index}`}
          className="name-letter"
          style={{ "--letter-index": offset + index } as CSSProperties}
        >
          {character === " " ? "\u00a0" : character}
        </span>
      ))}
    </>
  );
}

export default function Hero() {
  const reduce = usePrefersReducedMotion();
  const desktopMotion = useDesktopMotion();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(
      () => setIdx((i) => (i + 1) % ROLES.length),
      3200
    );
    return () => clearInterval(t);
  }, [reduce]);

  // Scroll-linked hand-off: as the hero leaves, the copy drifts up and dims
  // while the photo rises a little faster, so About appears to slide in
  // over it. Static on touch and under reduced motion.
  const sectionRef = useRef<HTMLElement | null>(null);
  useProgressiveEntrance(sectionRef, true);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const loaderAnimation = document.getElementById("opening-loader")?.getAnimations?.()[0];
    const loaderRunning = loaderAnimation?.playState === "running";
    // A slow hydration must never hide a hero that is already readable.
    if (!loaderRunning && !canEnhanceEntrance(section)) return;
    const elapsed = loaderRunning && typeof loaderAnimation.currentTime === "number"
      ? loaderAnimation.currentTime / 1000
      : 0;
    section.style.setProperty("--hero-intro-delay", `${loaderRunning ? Math.max(0, 0.25 - elapsed) : 0}s`);
    section.setAttribute("data-hero-intro", "");
    return () => {
      section.removeAttribute("data-hero-intro");
      section.style.removeProperty("--hero-intro-delay");
    };
  }, []);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, desktopMotion ? -48 : 0]);
  const copyOpacity = useTransform(
    scrollYProgress,
    [0, 0.75],
    [1, desktopMotion ? 0.15 : 1]
  );
  const photoY = useTransform(scrollYProgress, [0, 1], [0, desktopMotion ? -110 : 0]);

  // Subtle 3D tilt on the portrait, desktop-with-mouse only.
  const photoRef = useRef<HTMLDivElement | null>(null);
  usePointerSurface(photoRef, 8);

  return (
    <section
      ref={sectionRef}
      className="hero-surface relative isolate grid min-h-[calc(100svh-4rem)] items-center pb-20 pt-10 md:pb-24 md:pt-12"
    >
      <div className="grid items-center gap-12 md:grid-cols-[1.15fr_0.85fr] md:gap-10 lg:gap-16">
        {/* Copy */}
        <motion.div style={{ y: copyY, opacity: copyOpacity }} className="relative">
          <div aria-hidden="true" className="hero-name-glow" />
          <HeroChart />
          <motion.div
            variants={stagger(0, 0.06)}
            initial={false}
            animate="show"
            className="text-center md:text-left"
          >
            <motion.p variants={rise} data-hero-rise className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-ink">
              <span aria-hidden="true" className="status-dot h-2 w-2 shrink-0 rounded-full bg-ok" />
              Open to data collaborations
            </motion.p>
            <motion.p variants={rise} data-hero-rise className="text-sm font-medium text-muted">
              Data Analyst at Bank Rakyat Indonesia · Jakarta
            </motion.p>

            <h1
              className="mt-4 text-[2.75rem] font-extrabold leading-[1.02] tracking-[-0.02em] sm:text-6xl lg:text-[4.5rem]"
            >
              <span className="sr-only">Andry Syva Maldini</span>
              <span aria-hidden="true" className="name-mask block overflow-hidden pb-[0.08em]">
                <span className="name-line block">
                  <NameLine text="Andry Syva" offset={0} />
                </span>
              </span>
              <span aria-hidden="true" className="name-mask -mt-[0.08em] block overflow-hidden pb-[0.08em]">
                <span className="name-line name-line-last block">
                  <NameLine text="Maldini" offset={10} />
                </span>
              </span>
            </h1>

            <motion.div
              variants={rise}
              data-hero-rise
              className="mt-5 flex min-h-[1.6em] items-center justify-center text-xl font-semibold sm:text-2xl md:justify-start"
            >
              <span className="sr-only">{ROLES.join(", ")}</span>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  aria-hidden="true"
                  key={idx}
                  initial={{ y: reduce ? 0 : 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: reduce ? 0 : -12, opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                  className="inline-block text-brand"
                >
                  {ROLES[idx]}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            <motion.p
              variants={rise}
              data-hero-rise
              className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg md:mx-0"
            >
              I turn raw data into decisions — ETL pipelines, predictive
              models, and BI dashboards that support real operations.
            </motion.p>

            <motion.div
              variants={rise}
              data-hero-rise
              className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start"
            >
              <MagneticLink href="#projects" className="btn-primary hero-action magnetic-link">
                View projects
                <ArrowUpRight size={16} aria-hidden="true" />
              </MagneticLink>
              <MagneticLink href="#contact" className="btn-secondary hero-action magnetic-link">
                Say hello
              </MagneticLink>
              <a
                href="#signal-path"
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 text-sm text-brand underline-offset-4 hover:underline md:justify-start"
              >
                <GitBranch size={15} aria-hidden="true" />
                Step inside the BRILink pipeline
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </motion.div>

            <motion.div
              variants={rise}
              data-hero-rise
              className="mt-8 flex items-center justify-center gap-5 md:justify-start"
            >
              {Object.values(socialLinks).map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="link-nudge text-muted transition-colors hover:text-ink"
                >
                  <s.icon size={20} strokeWidth={1.75} />
                </a>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Portrait */}
        <motion.div
          style={{ y: photoY }}
          className="hero-portrait-wrap mx-auto w-64 sm:w-72 md:w-full md:max-w-[19rem] lg:max-w-[22rem]"
        >
          <motion.div
            variants={rise}
            initial={false}
            animate="show"
            custom={0.35}
            className="hero-portrait-enter hero-portrait-frame [perspective:900px]"
          >
            <div className="hero-portrait-label"><span>Data / Analytics</span><span aria-hidden="true">↗</span></div>
            <div
              ref={photoRef}
              className="pointer-surface pointer-tilt relative aspect-[4/5]"
            >
              <div aria-hidden="true" className="hero-portrait-glow" />
              <div
                aria-hidden="true"
                className="hero-portrait-rail absolute inset-0"
              />
              <div className="hero-portrait-curtain relative h-full w-full overflow-hidden rounded-lg border border-line bg-surface">
                <Image
                  src="/profile.jpeg"
                  alt="Portrait of Andry Syva Maldini"
                  draggable={false}
                  fill
                  priority
                  sizes="(max-width: 640px) 16rem, (max-width: 768px) 18rem, (max-width: 1024px) 19rem, 22rem"
                  className="select-none object-cover [-webkit-user-drag:none]"
                />
              </div>
            </div>
            <div className="hero-portrait-caption"><span>Based in Jakarta, Indonesia</span><span className="text-brand" aria-hidden="true">●</span></div>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to the About section"
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.35 }}
        className="hero-scroll-cue absolute bottom-6 left-1/2 -translate-x-1/2 text-muted transition-colors hover:text-ink"
      >
        <ArrowDown size={20} strokeWidth={1.75} />
      </motion.a>
    </section>
  );
}
