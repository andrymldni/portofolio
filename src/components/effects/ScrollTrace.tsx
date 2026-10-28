"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Background "trace": one thin blue line that runs down the whole home
 * page, hugging alternate margins and crossing the page between sections,
 * and draws itself in as you scroll — like a pen following you down the
 * page — with a dot riding its tip. Faint full-width rules mark where each
 * section begins. Everything is driven straight from scroll position via
 * refs (no React re-renders per frame), and the geometry is rebuilt when
 * the page's height changes (lazy-loaded sections, images, resize).
 */
const SAMPLES = 600;

type Geometry = {
  total: number;
  ys: Float32Array; // y of the path at k/SAMPLES of its length
};

export default function ScrollTrace() {
  const reduce = usePrefersReducedMotion();
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Off on touch devices. On phones this document-tall SVG is repainted on
  // every scroll frame and rebuilt whenever the URL bar resizes the
  // viewport, which made scrolling stutter; the section rules are drawn in
  // CSS there instead (same `(pointer: coarse)` query in globals.css).
  // Starts off so the server and first client render match.
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(pointer: coarse)");
    const update = () => setEnabled(!mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);
  const active = isHome && enabled && !reduce;

  const svgRef = useRef<SVGSVGElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const rulesRef = useRef<SVGGElement | null>(null);
  const dotRef = useRef<SVGGElement | null>(null);
  const geom = useRef<Geometry | null>(null);

  const { scrollY } = useScroll();
  // The spring makes the pen tip lag the scroll a touch, so it visibly
  // catches up instead of teleporting.
  const smoothY = useSpring(scrollY, { stiffness: 140, damping: 26, mass: 0.6 });

  const paint = (y: number) => {
    const g = geom.current;
    const path = pathRef.current;
    const dot = dotRef.current;
    if (!g || !path || !dot) return;
    // The tip sits a little below the middle of the viewport.
    const target = y + window.innerHeight * 0.62;
    let lo = 0;
    let hi = SAMPLES;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (g.ys[mid] < target) lo = mid + 1;
      else hi = mid;
    }
    const len = (Math.min(lo, SAMPLES) / SAMPLES) * g.total;
    path.style.strokeDashoffset = `${g.total - len}`;
    const p = path.getPointAtLength(len);
    dot.setAttribute("transform", `translate(${p.x} ${p.y})`);
    dot.style.opacity = len > 4 ? "1" : "0";
  };

  useEffect(() => {
    if (!active) return;
    const svg = svgRef.current;
    const path = pathRef.current;
    const rules = rulesRef.current;
    if (!svg || !path || !rules) return;

    const build = () => {
      const shell = document.querySelector<HTMLElement>(".app-shell");
      const main = document.querySelector<HTMLElement>("main");
      const hero = document.querySelector<HTMLElement>("main > section");
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("main > section[id]")
      ).filter((s) => s !== hero);
      if (!shell || !main || !hero || sections.length === 0) return;

      const w = document.documentElement.clientWidth;
      const bounds = main.getBoundingClientRect();
      // Keep the entire trace (including its halo) outside the content and
      // the carousels' negative margins. Narrow layouts have no trace.
      const gutter = Math.min(bounds.left, w - bounds.right);
      if (gutter < 48) {
        svg.style.display = "none";
        geom.current = null;
        return;
      }
      svg.style.display = "";
      const h = shell.offsetHeight;
      svg.setAttribute("width", `${w}`);
      svg.setAttribute("height", `${h}`);
      svg.setAttribute("viewBox", `0 0 ${w} ${h}`);

      const top = (el: HTMLElement) => el.getBoundingClientRect().top + window.scrollY;
      const margin = gutter / 2;
      let previousX = w / 2;
      let previousY = top(hero) + hero.offsetHeight;
      let d = `M ${previousX} ${previousY}`;
      // Each crossing is a bounded Bezier within the adjacent sections'
      // padding. Straight vertical segments cannot drift over section text.
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const styles = getComputedStyle(section);
        const y = top(section);
        const x = i % 2 === 0 ? w - margin : margin;
        const entry = y + parseFloat(styles.paddingTop) - 16;
        const exit = y + section.offsetHeight - parseFloat(styles.paddingBottom) + 16;
        const middle = (previousY + entry) / 2;
        d += ` C ${previousX} ${middle}, ${x} ${middle}, ${x} ${entry}`;
        d += ` L ${x} ${exit}`;
        previousX = x;
        previousY = exit;
      }
      path.setAttribute("d", d);

      // Section rules: a hairline where each section starts.
      rules.innerHTML = sections
        .map((s) => {
          const y = Math.round(top(s)) + 0.5;
          return `<line x1="0" y1="${y}" x2="${w}" y2="${y}" />`;
        })
        .join("");

      const total = path.getTotalLength();
      const ys = new Float32Array(SAMPLES + 1);
      for (let k = 0; k <= SAMPLES; k++) {
        ys[k] = path.getPointAtLength((k / SAMPLES) * total).y;
      }
      path.style.strokeDasharray = `${total}`;
      geom.current = { total, ys };
      paint(smoothY.get());
    };

    build();
    // Coalesce bursts of size changes (lazy sections, images) into one
    // rebuild per frame — each rebuild samples the whole path.
    let raf = 0;
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(build);
    };
    const shell = document.querySelector(".app-shell");
    const ro = new ResizeObserver(schedule);
    // Root content width changes when a scrollbar appears/disappears, even
    // without a window resize (for example when a dialog locks scrolling).
    ro.observe(document.documentElement);
    if (shell) ro.observe(shell);
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", schedule);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useMotionValueEvent(smoothY, "change", (v) => {
    if (active) paint(v);
  });

  if (!active) return null;

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      className="scroll-trace"
      width="0"
      height="0"
    >
      <g ref={rulesRef} className="scroll-trace-rules" />
      <path
        ref={pathRef}
        className="scroll-trace-line"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{ strokeDasharray: 0, strokeDashoffset: 0 }}
      />
      <g ref={dotRef} className="scroll-trace-dot" style={{ opacity: 0 }}>
        <circle r="14" className="scroll-trace-dot-halo" />
        <circle r="4.5" />
      </g>
    </svg>
  );
}
