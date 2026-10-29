"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown } from "lucide-react";
import { EASE_OUT, rise, stagger } from "@/components/ui/Reveal";
import HeroChart from "@/components/effects/HeroChart";
import MagneticLink from "@/components/ui/MagneticLink";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useDesktopMotion, usePointerSurface } from "@/hooks/usePointerSurface";
import { useProgressiveEntrance } from "@/hooks/useProgressiveEntrance";
import { socialLinks } from "@/lib/data";

const ROLES = [
  "Data Analyst",
  "Data Engineer",
  "Data Scientist",
];

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
            variants={stagger(0.1, 0.1)}
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
                <span className="name-line block">Andry Syva</span>
              </span>
              <span aria-hidden="true" className="name-mask -mt-[0.08em] block overflow-hidden pb-[0.08em]">
                <span className="name-line name-line-last block">Maldini</span>
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
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
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
              models, and BI dashboards that support real operations. Always
              up for data collaborations.
            </motion.p>

            <motion.div
              variants={rise}
              data-hero-rise
              className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start"
            >
              <MagneticLink href="#contact" className="btn-primary hero-action magnetic-link">
                Say hello
              </MagneticLink>
              <MagneticLink href="#projects" className="btn-secondary hero-action magnetic-link">
                View projects
              </MagneticLink>
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
          className="mx-auto w-56 sm:w-64 md:w-full md:max-w-[19rem] lg:max-w-[22rem]"
        >
          <motion.div
            variants={rise}
            initial={false}
            animate="show"
            custom={0.35}
            className="hero-portrait-enter [perspective:900px]"
          >
            <div
              ref={photoRef}
              className="pointer-surface pointer-tilt relative aspect-[4/5]"
            >
              <div aria-hidden="true" className="hero-portrait-glow" />
              {/* Offset grey block behind the photo: a paper cut-out, not a glow. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 translate-x-4 translate-y-4 rounded-[1.75rem] border border-brand/25 bg-steel"
              />
              <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] border border-line bg-surface">
                <Image
                  src="/profile.jpeg"
                  alt="Portrait of Andry Syva Maldini"
                  fill
                  priority
                  sizes="(max-width: 640px) 14rem, (max-width: 768px) 16rem, (max-width: 1024px) 19rem, 22rem"
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to the About section"
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="hero-scroll-cue absolute bottom-6 left-1/2 -translate-x-1/2 text-muted transition-colors hover:text-ink"
      >
        <ArrowDown size={20} strokeWidth={1.75} />
      </motion.a>
    </section>
  );
}
