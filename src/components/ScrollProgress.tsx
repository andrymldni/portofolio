"use client";
import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin gradient bar pinned to the very top of the viewport, tracking scroll
 * position. Driven purely by a spring-smoothed transform (GPU-cheap — no
 * layout thrash), so it's safe to leave running on low-end devices.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, rgb(var(--brand)), rgb(var(--brand-2)))",
      }}
    />
  );
}
