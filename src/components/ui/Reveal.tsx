"use client";
import { motion, type HTMLMotionProps, type Variants } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

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

const calmRise: Variants = {
  hidden: { opacity: 0, y: 0 },
  show: ({ delay, reduced }: { delay: number; reduced: boolean }) => ({
    opacity: 1,
    // Start the offset only when revealing, so reduced motion never inherits it.
    y: reduced ? 0 : [16, 0],
    transition: { duration: 0.5, ease: EASE_OUT, delay },
  }),
};

/** A small, one-shot entrance, also usable on semantic motion elements. */
export function useReveal(delay = 0, alreadyRevealed = false) {
  const reduced = usePrefersReducedMotion();
  return {
    initial: alreadyRevealed ? false as const : "hidden",
    animate: alreadyRevealed ? { opacity: 1, y: 0 } : undefined,
    whileInView: alreadyRevealed ? undefined : "show",
    // No inset: cards visible on load or restored Back navigation reveal immediately.
    viewport: { once: true, amount: 0 } as const,
    variants: calmRise,
    custom: { delay, reduced },
  };
}

/** Short page-load entrance; like other panel entrances it always plays. */
export function PageReveal({ delay = 0, children, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE_OUT, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
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
