"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown } from "lucide-react";
import { rise, stagger } from "@/components/ui/Reveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { socialLinks } from "@/lib/data";

const ROLES = [
  "Data Engineer",
  "Data Analyst",
  "Business Intelligence",
  "Data Scientist",
];

export default function Hero() {
  const reduce = usePrefersReducedMotion();
  const [typedRole, setTypedRole] = useState(ROLES[0]);

  useEffect(() => {
    if (reduce) return;
    let role = 0;
    let length = ROLES[0].length;
    let erasing = true;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      length += erasing ? -1 : 1;
      setTypedRole(ROLES[role].slice(0, length));
      let delay = erasing ? 45 : 85;
      if (length === 0) {
        role = (role + 1) % ROLES.length;
        erasing = false;
        delay = 350;
      } else if (length === ROLES[role].length) {
        erasing = true;
        delay = 2200;
      }
      timer = setTimeout(tick, delay);
    };
    // Start with a readable role, then type and erase the complete cycle.
    timer = setTimeout(tick, 2200);
    return () => clearTimeout(timer);
  }, [reduce]);

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
            <motion.p variants={rise} className="font-mono text-sm text-muted">
              $ whoami
            </motion.p>

            <motion.h1
              variants={rise}
              className="mt-4 text-[clamp(3rem,7.5vw,6.5rem)] font-bold leading-[0.95] tracking-[-0.04em]"
            >
              Andry Syva
              <br />
              Maldini
            </motion.h1>

            <motion.div
              variants={rise}
              className="mt-6 flex min-h-[1.6em] items-center justify-center font-mono text-[clamp(0.875rem,3.8vw,1.375rem)] text-brand md:justify-start"
            >
              <span className="sr-only">{ROLES.join(", ")}</span>
              <span aria-hidden="true" className="whitespace-nowrap">
                {"> "}{reduce ? ROLES[0] : typedRole}
                <span className="role-caret">▍</span>
              </span>
            </motion.div>

            <motion.p
              variants={rise}
              className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg md:mx-0"
            >
              <span className="mb-3 block">Data Analyst at Bank Rakyat Indonesia · Jakarta</span>
              I turn raw data into decisions — ETL pipelines, predictive
              models, and BI dashboards that support real operations. Always
              up for data collaborations.
            </motion.p>

            <motion.div
              variants={rise}
              className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start"
            >
              <a href="#contact" className="btn-primary font-mono">
                ./say-hello
              </a>
              <a href="#projects" className="btn-secondary font-mono">
                ls projects/
              </a>
            </motion.div>

            <motion.div
              variants={rise}
              className="mt-8 flex items-center justify-center gap-5 md:justify-start"
            >
              {Object.values(socialLinks).map((s) => (
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
              style={{ rotateX: reduce ? 0 : rotateX, rotateY: reduce ? 0 : rotateY, transformPerspective: 800 }}
              className="overflow-hidden rounded-xl border border-line bg-surface"
            >
              <div className="flex items-center gap-2 border-b border-line px-4 py-3 font-mono text-xs text-muted">
                <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-muted/40" />
                <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-muted/40" />
                <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-muted/40" />
                <span className="ml-2">profile.jpeg</span>
              </div>
              <div className="relative aspect-[4/5] bg-steel">
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
