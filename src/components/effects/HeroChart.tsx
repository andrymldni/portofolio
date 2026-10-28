"use client";
import { useEffect, useRef } from "react";
import { useDesktopMotion } from "@/hooks/usePointerSurface";

/**
 * Decorative line chart behind the hero copy. The server renders the final,
 * fully drawn chart; only a desktop pointer with motion enabled restarts it
 * as a one-shot draw after hydration.
 */
export default function HeroChart() {
  const chartRef = useRef<SVGSVGElement | null>(null);
  const desktopMotion = useDesktopMotion();

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart || !desktopMotion) return;
    const frame = requestAnimationFrame(() => {
      chart.setAttribute("data-chart-ready", "");
    });
    return () => {
      cancelAnimationFrame(frame);
      chart.removeAttribute("data-chart-ready");
    };
  }, [desktopMotion]);

  return (
    <svg
      ref={chartRef}
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 640 360"
      preserveAspectRatio="xMidYMid slice"
      className="hero-chart pointer-events-none absolute inset-0 -z-10 h-full w-full"
    >
      <g
        className="hero-chart-axes"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <path d="M24 80H616M24 160H616M24 240H616M24 320H616" />
        <path d="M24 60V320M172 60V320M320 60V320M468 60V320" opacity="0.55" />
      </g>
      <path
        className="hero-chart-line"
        d="M24 276C74 268 96 236 142 240S214 206 264 214S338 160 392 176S486 108 616 92"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
      />
      <g className="hero-chart-points" fill="currentColor">
        <circle cx="24" cy="276" r="3.5" />
        <circle cx="142" cy="240" r="3.5" />
        <circle cx="264" cy="214" r="3.5" />
        <circle cx="392" cy="176" r="3.5" />
        <circle cx="616" cy="92" r="3.5" />
      </g>
    </svg>
  );
}
