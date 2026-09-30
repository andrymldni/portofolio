"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useMotionValueEvent, useScroll, useSpring } from "framer-motion";

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

function catmullRomToBezier(pts: [number, number][]) {
  if (pts.length < 2) return "";
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(i - 1, 0)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(i + 2, pts.length - 1)];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2[0]} ${p2[1]}`;
  }
  return d;
}

export default function ScrollTrace() {
  const pathname = usePathname();
  const isHome = pathname === "/";

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
    if (!isHome) return;
    const svg = svgRef.current;
    const path = pathRef.current;
    const rules = rulesRef.current;
    if (!svg || !path || !rules) return;

    const build = () => {
      const shell = document.querySelector<HTMLElement>(".app-shell");
      const hero = document.querySelector<HTMLElement>("main > section");
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("main > section[id]")
      ).filter((s) => s !== hero);
      if (!shell || !hero || sections.length === 0) return;

      const w = window.innerWidth;
      const h = shell.offsetHeight;
      svg.setAttribute("width", `${w}`);
      svg.setAttribute("height", `${h}`);
      svg.setAttribute("viewBox", `0 0 ${w} ${h}`);

      const top = (el: HTMLElement) => el.getBoundingClientRect().top + window.scrollY;
      const margin = Math.max(24, Math.min(w * 0.055, 84));
      // Start at the hero's scroll cue, drop straight through the gap, then
      // swing out to the first margin over the (empty) right half of the
      // About header; after that, alternate margins section by section.
      const pts: [number, number][] = [[w / 2, top(hero) + hero.offsetHeight - 36]];
      sections.forEach((s, i) => {
        const x = i % 2 === 0 ? w - margin : margin;
        const y = top(s);
        const sh = s.offsetHeight;
        if (i === 0) pts.push([w / 2, y + sh * 0.08], [x, y + sh * 0.3]);
        else pts.push([x, y + sh * 0.22]);
        pts.push([x, y + sh * 0.78]);
      });
      pts.push([w / 2, h - 40]);
      path.setAttribute("d", catmullRomToBezier(pts));

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
    const shell = document.querySelector(".app-shell");
    const ro = shell ? new ResizeObserver(() => build()) : null;
    if (shell && ro) ro.observe(shell);
    window.addEventListener("resize", build);
    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", build);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHome]);

  useMotionValueEvent(smoothY, "change", (v) => paint(v));

  if (!isHome) return null;

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
