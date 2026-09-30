"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowDown,
  Github,
  Instagram,
  Linkedin,
  Twitter,
  type LucideIcon,
} from "lucide-react";
import { EASE_OUT, rise, stagger } from "@/components/ui/Reveal";

const ROLES = [
  "Data Analyst",
  "Business Intelligence",
  "Data Engineer",
  "Data Scientist",
];

const SOCIALS: { label: string; href: string; icon: LucideIcon }[] = [
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

export default function Hero() {
  // Only consulted for the two motions tied to input — the scroll parallax
  // and the pointer tilt. Nothing rendered depends on it, so server and
  // client markup match.
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setIdx((i) => (i + 1) % ROLES.length),
      3200
    );
    return () => clearInterval(t);
  }, []);

  // Scroll-linked hand-off: as the hero leaves, the copy drifts up and dims
  // while the photo rises a little faster, so About appears to slide in
  // over it. Ranges collapse to zero under reduced motion.
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -48]);
  const copyOpacity = useTransform(
    scrollYProgress,
    [0, 0.75],
    [1, reduce ? 1 : 0.15]
  );
  const photoY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -110]);

  // Subtle 3D tilt on the portrait, desktop-with-mouse only.
  const photoRef = useRef<HTMLDivElement | null>(null);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springX = useSpring(tiltX, { stiffness: 150, damping: 16 });
  const springY = useSpring(tiltY, { stiffness: 150, damping: 16 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);

  const handlePhotoMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse" || !photoRef.current) return;
    const rect = photoRef.current.getBoundingClientRect();
    tiltX.set((e.clientX - rect.left) / rect.width - 0.5);
    tiltY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const resetTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      className="relative grid min-h-[calc(100svh-4rem)] items-center pb-20 pt-10 md:pb-24 md:pt-12"
    >
      <div className="grid items-center gap-12 md:grid-cols-[1.15fr_0.85fr] md:gap-10 lg:gap-16">
        {/* Copy */}
        <motion.div style={{ y: copyY, opacity: copyOpacity }}>
          <motion.div
            variants={stagger(0.1, 0.1)}
            initial="hidden"
            animate="show"
            className="text-center md:text-left"
          >
            <motion.p variants={rise} className="text-sm font-medium text-muted">
              Data Analyst at Bank Rakyat Indonesia · Jakarta
            </motion.p>

            <motion.h1
              variants={rise}
              className="mt-4 text-[2.75rem] font-bold leading-[1.02] tracking-[-0.02em] sm:text-6xl lg:text-[4.5rem]"
            >
              Andry Syva
              <br />
              Maldini
            </motion.h1>

            <motion.div
              variants={rise}
              className="mt-5 flex min-h-[1.6em] items-center justify-center text-xl font-semibold sm:text-2xl md:justify-start"
              aria-live="polite"
            >
              <AnimatePresence mode="wait">
                <motion.span
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
              className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg md:mx-0"
            >
              I turn raw data into decisions — ETL pipelines, predictive
              models, and BI dashboards that support real operations. Always
              up for data collaborations.
            </motion.p>

            <motion.div
              variants={rise}
              className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start"
            >
              <a href="#contact" className="btn-primary">
                Say hello
              </a>
              <a href="#projects" className="btn-secondary">
                View projects
              </a>
            </motion.div>

            <motion.div
              variants={rise}
              className="mt-8 flex items-center justify-center gap-5 md:justify-start"
            >
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="text-muted transition-colors hover:text-ink"
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
            initial="hidden"
            animate="show"
            custom={0.35}
          >
            <motion.div
              ref={photoRef}
              onPointerMove={handlePhotoMove}
              onPointerLeave={resetTilt}
              style={{ rotateX, rotateY, transformPerspective: 800 }}
              className="relative aspect-[4/5]"
            >
              {/* Offset grey block behind the photo: a paper cut-out, not a glow. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 translate-x-4 translate-y-4 rounded-[1.75rem] bg-steel"
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
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to the About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted transition-colors hover:text-ink"
      >
        <ArrowDown size={20} strokeWidth={1.75} />
      </motion.a>
    </section>
  );
}
