"use client";
import { MotionConfig } from "framer-motion";

/** Respect the user's motion preference throughout the site. */
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
