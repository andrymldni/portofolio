"use client";
import { useRef, type PropsWithChildren } from "react";
import { VIEWPORT } from "@/components/ui/Reveal";
import { useProgressiveEntrance } from "@/hooks/useProgressiveEntrance";

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
  const headerRef = useRef<HTMLElement | null>(null);
  useProgressiveEntrance(headerRef, false, true, VIEWPORT.margin);
  return (
    <section
      id={id || title.toLowerCase().replace(/\s+/g, "-")}
      className={`py-12 md:py-16 ${className ?? ""}`}
    >
      <header
        ref={headerRef}
        className="section-heading mb-10 max-w-2xl md:mb-12"
      >
        <span
          aria-hidden="true"
          className="section-rule mb-4 block h-[3px] w-10 origin-left bg-brand"
        />
        <h2
          className="overflow-hidden pb-[0.08em] text-2xl font-semibold leading-tight tracking-tight md:text-[2rem]"
        >
          <span className="section-title-line block">{title}</span>
        </h2>
        {subtitle && (
          <p className="section-subtitle mt-3 leading-relaxed text-muted">
            {subtitle}
          </p>
        )}
      </header>
      {children}
    </section>
  );
}
