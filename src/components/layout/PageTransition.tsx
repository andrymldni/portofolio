"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * A short panel wipe (an opacity fade with reduced motion) after path changes.
 * It only appears after a
 * navigation has committed, never blocks pointer events, and self-clears even
 * if its animation event is missed.
 */
export default function PageTransition() {
  const pathname = usePathname();
  const previous = useRef(pathname);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (previous.current === pathname) return;
    previous.current = pathname;
    setRun((value) => value + 1);
  }, [pathname]);

  useEffect(() => {
    if (!run) return;
    const timeout = window.setTimeout(() => setRun(0), 700);
    return () => window.clearTimeout(timeout);
  }, [run]);

  if (!run) return null;

  return (
    <div
      key={run}
      aria-hidden="true"
      className="page-transition-wipe"
      onAnimationEnd={() => setRun(0)}
    />
  );
}
