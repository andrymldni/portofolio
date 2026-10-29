"use client";
import { MotionConfig } from "framer-motion";

/**
 * Reduced motion uses short opacity-only entrances: the loader fades out in
 * 300ms, and hero, section titles and page transitions omit travel, blur,
 * wipes and scrambling. Framer also honours the OS preference globally.
 * Continuous, automatic and scroll-linked effects remain static: certificate
 * autoplay, marquee, role rotation, parallax, tilt and card scale/dimming.
 * Components always render motion elements — never a plain tag swapped
 * in on the client — so server and client markup match.
 */
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
