"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Thin accent bar pinned to the top of the viewport, tracking scroll position.
 * Driven purely by a spring-smoothed transform (GPU-cheap — no layout
 * thrash), so it's safe to leave running on low-end devices.
 */
export default function ScrollProgress() {
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    restDelta: 0.001,
  });

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-brand"
      style={{ scaleX }}
    />
  );
}
