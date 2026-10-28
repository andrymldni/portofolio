import type { ReactNode } from "react";

function MotifFrame({ children, className }: { children: ReactNode; className: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 44 140"
      fill="none"
      className={`page-motif ${className}`}
    >
      {children}
    </svg>
  );
}

/**
 * Decorative data marks in the page gutters. Static by design: they sit
 * outside the content column, stay under the scroll trace and never affect
 * layout.
 */
export default function PageDataMotifs() {
  return (
    <div aria-hidden="true" className="page-motifs">
      <MotifFrame className="page-motif--left page-motif--1">
        <path d="M2 18V138M2 138H42" stroke="rgb(var(--ink))" strokeOpacity="0.45" strokeWidth="0.75" />
        <path d="M2 112L12 96L22 102L32 70L42 58" stroke="currentColor" strokeWidth="1" />
        <circle cx="12" cy="96" r="1.7" fill="currentColor" />
        <circle cx="22" cy="102" r="1.7" fill="currentColor" />
        <circle cx="32" cy="70" r="1.7" fill="currentColor" />
      </MotifFrame>

      <MotifFrame className="page-motif--right page-motif--2">
        <path d="M2 138H42" stroke="rgb(var(--ink))" strokeOpacity="0.45" strokeWidth="0.75" />
        <rect x="4" y="104" width="5" height="34" fill="currentColor" opacity="0.55" />
        <rect x="13" y="88" width="5" height="50" fill="currentColor" opacity="0.7" />
        <rect x="22" y="112" width="5" height="26" fill="currentColor" opacity="0.45" />
        <rect x="31" y="72" width="5" height="66" fill="currentColor" opacity="0.8" />
      </MotifFrame>

      <MotifFrame className="page-motif--left page-motif--3">
        <path d="M2 20V138" stroke="rgb(var(--ink))" strokeOpacity="0.45" strokeWidth="0.75" />
        <path
          d="M2 40H8M2 58H6M2 76H8M2 94H6M2 112H8M2 130H6"
          stroke="rgb(var(--ink))"
          strokeOpacity="0.55"
          strokeWidth="0.75"
        />
        <path d="M8 118L17 96L26 104L35 78L42 84" stroke="currentColor" strokeWidth="1" />
      </MotifFrame>

      <MotifFrame className="page-motif--right page-motif--4">
        <path d="M2 18V138M2 138H42" stroke="rgb(var(--ink))" strokeOpacity="0.45" strokeWidth="0.75" />
        <path d="M2 120C12 116 14 88 24 92S34 60 42 52" stroke="currentColor" strokeWidth="1" />
        <circle cx="8" cy="70" r="1.5" fill="currentColor" />
        <circle cx="21" cy="48" r="1.5" fill="currentColor" />
        <circle cx="36" cy="80" r="1.5" fill="currentColor" />
      </MotifFrame>
    </div>
  );
}
