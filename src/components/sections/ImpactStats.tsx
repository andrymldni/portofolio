"use client";
import { useEffect, useRef } from "react";
import { briAgentCountLabel, briInternshipCoverage, projects, certifications } from "@/lib/data";

const stats = [
  { label: "BRILink agents analyzed", value: briInternshipCoverage.agents, final: briAgentCountLabel, millions: true },
  { label: "Regional offices", value: briInternshipCoverage.regionalOffices },
  { label: "Regencies", value: briInternshipCoverage.regencies },
  { label: "Projects", value: projects.length },
  { label: "Certifications", value: certifications.length },
];

export default function ImpactStats() {
  const ref = useRef<HTMLDListElement | null>(null);
  const played = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const values = element.querySelectorAll<HTMLElement>("[data-count]");
    // Leave text static on touch: no per-frame text paints during mobile scrolling.
    const media = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let frame = 0;
    let observer: IntersectionObserver | undefined;
    const restore = () => values.forEach((value, index) => {
      value.textContent = stats[index].final ?? String(stats[index].value);
    });
    const update = () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      restore();
      if (!media.matches || played.current) return;
      observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        observer?.disconnect();
        played.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / 1100);
          const eased = 1 - (1 - progress) ** 3;
          values.forEach((value, index) => {
            const stat = stats[index];
            value.textContent = stat.millions
              ? `${(stat.value * eased / 1_000_000).toFixed(2)}M+`
              : String(Math.round(stat.value * eased));
          });
          if (progress < 1) frame = requestAnimationFrame(tick);
          else restore();
        };
        frame = requestAnimationFrame(tick);
      }, { threshold: 0 });
      observer.observe(element);
    };
    update();
    media.addEventListener("change", update);
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      media.removeEventListener("change", update);
      restore();
    };
  }, []);

  return (
    <dl ref={ref} aria-label="BRI internship coverage and portfolio counts" className="mb-8 grid grid-cols-2 gap-x-6 gap-y-6 border-y border-line py-6 sm:grid-cols-3 lg:grid-cols-5">
      {stats.map((stat) => (
        <div key={stat.label} className="min-w-0 last:col-span-2 sm:last:col-span-1">
          <dt className="text-xs leading-relaxed text-muted">{stat.label}</dt>
          <dd className="mt-2 text-2xl font-semibold tabular-nums tracking-tight text-ink sm:text-3xl">
            <span className="sr-only">{stat.final ?? stat.value}</span>
            <span aria-hidden="true" data-count>{stat.final ?? stat.value}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
