"use client";
import { motion } from "framer-motion";
import { PropsWithChildren } from "react";
import { VIEWPORT, rise, stagger } from "@/components/ui/Reveal";

const commands: Record<string, string> = {
  about: "$ cat about.md",
  tools: "$ cat stack.txt",
  certifications: "$ ls credentials/",
  projects: "$ ls projects/",
  contact: "$ mail andry",
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
        <motion.p variants={rise} className="mb-3 font-mono text-xs text-muted sm:text-sm">
          {commands[id ?? ""] ?? `$ ls ${title.toLowerCase().replace(/\s+/g, "-")}/`}
        </motion.p>
        <motion.h2
          variants={rise}
          className="text-3xl font-bold leading-tight tracking-[-0.03em] md:text-5xl"
        >
          {id === "tools" ? "tools" : title.toLowerCase()}
          <span aria-hidden="true" className="text-brand">/</span>
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
