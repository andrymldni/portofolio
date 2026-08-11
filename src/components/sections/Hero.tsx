"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Send,
  Rocket,
  Mouse,
  type LucideIcon,
} from "lucide-react";

const TITLES = [
  "Data Scientist",
  "Business Intelligence",
  "Data Analyst",
  "Data Engineer",
];

const SOCIALS: { label: string; href: string; icon: LucideIcon }[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/andrymldni",
    icon: Instagram,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/andrymldni",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    href: "https://github.com/andrymldni",
    icon: Github,
  },
  {
    label: "Twitter",
    href: "https://twitter.com/andrymldni",
    icon: Twitter,
  },
];

export default function Hero() {
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(
      () => setIdx((i) => (i + 1) % TITLES.length),
      2600
    );
    return () => clearInterval(t);
  }, [reduce]);

  // Subtle 3D tilt on the profile photo, desktop-with-mouse only.
  const photoRef = useRef<HTMLDivElement | null>(null);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springX = useSpring(tiltX, { stiffness: 150, damping: 14 });
  const springY = useSpring(tiltY, { stiffness: 150, damping: 14 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

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

  // One authored entrance: staggered rise with a soft blur-in, fast then
  // decelerating. Skipped entirely for prefers-reduced-motion.
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
  };
  const rise: Variants = {
    hidden: { opacity: 0, y: 26, filter: "blur(10px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative grid min-h-[calc(100vh-4rem)] place-items-center overflow-hidden pb-16 pt-16 md:pb-24 md:pt-20">
      <motion.div
        variants={container}
        initial={reduce ? undefined : "hidden"}
        animate={reduce ? undefined : "show"}
        className="relative grid w-full items-center gap-12 md:grid-cols-2"
      >
        {/* Copy */}
        <div className="text-center md:text-left">
          <motion.h1
            variants={rise}
            className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
          >
            <span className="block text-white">
              Hi there
              <motion.span
                role="img"
                aria-label="waving hand"
                className="ml-2 inline-block"
                animate={reduce ? undefined : { rotate: [0, 22, -8, 0] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  repeatDelay: 2.4,
                }}
              >
                👋
              </motion.span>
            </span>
            <span className="block text-white">I&apos;m Andry Syva</span>
            <span className="block text-white">Maldini</span>
          </motion.h1>

          <motion.div
            variants={rise}
            className="mt-4 flex min-h-[1.7em] items-center justify-center text-xl font-semibold sm:text-3xl md:justify-start"
            aria-live="polite"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={idx}
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -14, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block"
                style={{ color: "rgb(var(--brand))" }}
              >
                {TITLES[idx]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          <motion.p
            variants={rise}
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg md:mx-0"
          >
            I turn raw data into decisions — ETL pipelines, predictive models,
            and BI dashboards that support real operations. Open to new roles
            and data collaborations.
          </motion.p>

          <motion.div
            variants={rise}
            className="mt-7 flex flex-wrap items-center justify-center gap-3 md:justify-start"
          >
            <a href="#contact" className="btn-primary">
              <Send size={15} />
              Say Hello
            </a>
            <a
              href="#projects"
              className="card inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold hover:bg-white/10"
            >
              <Rocket size={15} />
              View Projects
            </a>
          </motion.div>

          <motion.div
            variants={rise}
            className="mt-7 flex items-center justify-center gap-3 md:justify-start"
          >
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="card flex h-11 w-11 items-center justify-center rounded-xl transition-transform hover:-translate-y-1 hover:bg-white/10"
              >
                <s.icon size={18} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Photo */}
        <motion.div
          ref={photoRef}
          variants={rise}
          onPointerMove={handlePhotoMove}
          onPointerLeave={resetTilt}
          style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 600 }}
          className="relative mx-auto h-48 w-48 sm:h-64 sm:w-64 md:h-72 md:w-72 lg:h-80 lg:w-80"
        >
          <div className="pointer-events-none absolute -inset-10 rounded-full bg-gradient-to-tr from-violet-500/30 via-sky-400/15 to-emerald-400/25 blur-3xl" />
          <div className="relative h-full w-full rounded-full bg-gradient-to-tr from-violet-500 via-sky-400 to-emerald-400 p-[3px]">
            <div className="relative h-full w-full overflow-hidden rounded-full">
              <Image
                src="/profile.jpeg"
                alt="Andry's photo"
                fill
                priority
                sizes="(max-width: 640px) 12rem, (max-width: 768px) 16rem, (max-width: 1024px) 18rem, 20rem"
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll cue — gentle bob toward the first section, stopped for reduced motion */}
      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={
          reduce ? { opacity: 1 } : { opacity: 1, y: [0, 6, 0] }
        }
        transition={
          reduce
            ? { duration: 0.5, delay: 0.8 }
            : { opacity: { delay: 0.9, duration: 0.6 }, y: { duration: 1.8, repeat: Infinity, ease: "easeInOut" } }
        }
        className="absolute bottom-5 left-1/2 z-10 text-white/50 transition-colors hover:text-white"
        style={{ x: "-50%" }}
      >
        <Mouse size={20} />
      </motion.a>
    </section>
  );
}
