"use client";
import { MotionConfig } from "framer-motion";

/**
 * Motion plays regardless of the OS "reduce motion" flag. Windows turns
 * that flag on whenever "Animation effects" is off, which is common and
 * rarely means the person wants a static site; honouring it made the
 * portfolio look broken. The two input-driven motions (hero parallax and
 * pointer tilt) still check useReducedMotion() themselves. Components
 * always render motion elements — never a plain tag swapped in on the
 * client — so server and client markup match.
 */
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MotionConfig reducedMotion="never">{children}</MotionConfig>;
}
