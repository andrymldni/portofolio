"use client";
import { motion, type Variants } from "framer-motion";
import { PropsWithChildren } from "react";
import { EASE_OUT, VIEWPORT, rise, stagger } from "@/components/ui/Reveal";

// The short blue rule draws itself in as the heading arrives — the one
// recurring scroll cue that ties the sections together.
const rule: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.9, ease: EASE_OUT } },
};

export default function Section({
  id,
  title,
  subtitle,
  className,
  children,
}: PropsWithChildren<{
  id?: string;
  title: string;
  subtitle?: string;
  className?: string;
}>) {
  return (
    <section
      id={id || title.toLowerCase().replace(/\s+/g, "-")}
      className={`py-16 md:py-24 ${className ?? ""}`}
    >
      <motion.header
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={stagger(0, 0.1)}
        className="mb-10 max-w-2xl md:mb-12"
      >
        <motion.span
          variants={rule}
          aria-hidden="true"
          className="mb-4 block h-[3px] w-10 origin-left bg-brand"
        />
        <motion.h2
          variants={rise}
          className="text-2xl font-semibold leading-tight tracking-tight md:text-[2rem]"
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p variants={rise} className="mt-3 leading-relaxed text-muted">
            {subtitle}
          </motion.p>
        )}
      </motion.header>
      {children}
    </section>
  );
}
