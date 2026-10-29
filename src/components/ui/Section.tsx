"use client";
import { useRef, type PropsWithChildren } from "react";
import { VIEWPORT } from "@/components/ui/Reveal";
import SectionMotif, { type SectionMotifKind } from "@/components/effects/SectionMotif";
import { useProgressiveEntrance } from "@/hooks/useProgressiveEntrance";
import DecodeTitle from "@/components/ui/DecodeTitle";

export default function Section({
  id,
  title,
  subtitle,
  className,
  layout = "stack",
  motif,
  motifAfter,
  children,
}: PropsWithChildren<{
  id?: string;
  title: string;
  subtitle?: string;
  className?: string;
  layout?: "stack" | "split" | "band";
  motif?: SectionMotifKind;
  motifAfter?: SectionMotifKind;
}>) {
  const headerRef = useRef<HTMLElement | null>(null);
  useProgressiveEntrance(headerRef, false, true, VIEWPORT.margin);
  const isSplit = layout === "split";
  const isBand = layout === "band";
  const titleClass = isBand
    ? "overflow-hidden pb-[0.08em] text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-[2.75rem]"
    : "overflow-hidden pb-[0.08em] text-2xl font-bold leading-tight tracking-tight md:text-[2rem]";

  const header = (
    <header
      ref={headerRef}
      className={`section-heading relative z-10 max-w-2xl ${
        isSplit ? "" : "mb-10 md:mb-12"
      }`}
    >
      <span
        aria-hidden="true"
        className="section-rule mb-4 block h-[3px] w-10 origin-left bg-brand"
      />
      <h2 className={titleClass}>
        <span
          className="section-title-line block"
          style={{ backgroundImage: "none", WebkitTextFillColor: "currentColor" }}
        >
          <DecodeTitle title={title} />
        </span>
      </h2>
      {subtitle && (
        <p className="section-subtitle mt-3 leading-relaxed text-muted">
          {subtitle}
        </p>
      )}
    </header>
  );

  if (isBand) {
    return (
      <section
        id={id || title.toLowerCase().replace(/\s+/g, "-")}
        className={`relative py-12 md:py-16 ${className ?? ""}`}
      >
        <div className="section-band-panel relative overflow-hidden rounded-2xl border border-line bg-surface/60 px-5 py-10 sm:px-8 md:px-10 md:py-12">
          <div className="relative">
            {motif && <SectionMotif kind={motif} placement="heading" />}
            {header}
          </div>
          {children}
          {motifAfter && <SectionMotif kind={motifAfter} placement="foot" />}
        </div>
      </section>
    );
  }

  return (
    <section
      id={id || title.toLowerCase().replace(/\s+/g, "-")}
      className={`relative py-12 md:py-16 ${className ?? ""}`}
    >
      <div
        className={
          isSplit
            ? "grid gap-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.6fr)] lg:items-start lg:gap-12"
            : ""
        }
      >
        <div className="relative">
          {!isSplit && motif && (
            <SectionMotif kind={motif} placement="heading" />
          )}
          {header}
          {isSplit && motif && (
            <SectionMotif kind={motif} placement="inline" />
          )}
        </div>
        <div className={isSplit ? "min-w-0" : ""}>{children}</div>
      </div>
      {motifAfter && <SectionMotif kind={motifAfter} placement="foot" />}
    </section>
  );
}
