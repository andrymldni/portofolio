"use client";
import { MotionConfig } from "framer-motion";

/**
 * Entrance motion plays regardless of the OS "reduce motion" flag. Windows
 * turns that flag on whenever "Animation effects" is off, which is common
 * and rarely means the person wants a static site; honouring it globally
 * made the portfolio look broken. Continuous and automatic motion still
 * honours the preference: certificate autoplay, the tools marquee, hero
 * role rotation, and hero scroll parallax and pointer tilt.
 * Components always render motion elements — never a plain tag swapped
 * in on the client — so server and client markup match.
 */
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MotionConfig reducedMotion="never">{children}</MotionConfig>;
}
