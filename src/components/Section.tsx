"use client";
import { motion, useReducedMotion } from "framer-motion";
import { PropsWithChildren } from "react";

export default function Section({
  id,
  title,
  subtitle,
  center,
  children,
}: PropsWithChildren<{
  id?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}>) {
  const reduce = useReducedMotion();
  return (
    <section
      id={id || title.toLowerCase().replace(/\s+/g, "-")}
      className="py-16 md:py-24"
    >
      {reduce ? (
        <header className={`mb-8 ${center ? "text-center" : ""}`}>
          <h2 className="text-2xl md:text-3xl font-semibold">{title}</h2>
          {subtitle && (
            <p className="mt-2 text-white/60 max-w-2xl mx-auto">{subtitle}</p>
          )}
        </header>
      ) : (
        <motion.header
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", duration: 0.6 }}
          className={`mb-8 ${center ? "text-center" : ""}`}
        >
          <h2 className="text-2xl md:text-3xl font-semibold">{title}</h2>
          {subtitle && (
            <p className="mt-2 text-white/60 max-w-2xl mx-auto">{subtitle}</p>
          )}
        </motion.header>
      )}
      {reduce ? (
        <div>{children}</div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      )}
    </section>
  );
}
