"use client";
import { motion, type HTMLMotionProps, type Variants } from "framer-motion";
import { useRef, type CSSProperties } from "react";
import { useProgressiveEntrance } from "@/hooks/useProgressiveEntrance";

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** Reveal variants shared across sections so every entrance moves the same way. */
export const rise: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT, delay },
  }),
};

export const stagger = (delayChildren = 0, staggerChildren = 0.09): Variants => ({
  hidden: {},
  show: { transition: { delayChildren, staggerChildren } },
});

/** Fire once the element is 72px inside the bottom edge of the viewport. */
export const VIEWPORT = { once: true, margin: "0px 0px -72px 0px" } as const;

type RevealProps = HTMLMotionProps<"div"> & { delay?: number };

/** A small, one-shot entrance, also usable on semantic motion elements. */
export function useReveal(delay = 0, alreadyRevealed = false) {
  const ref = useRef<HTMLDivElement | null>(null);
  useProgressiveEntrance(ref, false, !alreadyRevealed);
  return {
    ref,
    initial: false as const,
    "data-calm-reveal": true,
    style: { "--reveal-delay": `${delay}s` } as CSSProperties,
    // Retain viewport callbacks used to remember revealed project cards.
    viewport: { once: true, amount: 0 } as const,
  };
}

/** A block that fades and rises the first time it scrolls into view. */
export function Reveal({ delay = 0, children, ...rest }: RevealProps) {
  const reveal = useReveal(delay);
  return (
    <motion.div
      {...reveal}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Keep case-study navigation native; enhance its static article after hydration. */
export function PageEntrance({ children, ...rest }: HTMLMotionProps<"article">) {
  const ref = useRef<HTMLElement | null>(null);
  useProgressiveEntrance(ref, true);
  return <motion.article ref={ref} initial={false} {...rest}>{children}</motion.article>;
}

type RevealGroupProps = HTMLMotionProps<"div"> & { delay?: number; gap?: number };

/**
 * Staggers its children: any descendant motion element with
 * `variants={rise}` rises in sequence once the group scrolls into view.
 */
export function RevealGroup({ delay = 0, gap = 0.09, children, ...rest }: RevealGroupProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={stagger(delay, gap)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
