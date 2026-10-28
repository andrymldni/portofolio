"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { useDesktopMotion } from "@/hooks/usePointerSurface";

const MAX_SHIFT = 6;
const PULL = 0.18;

/** A link that leans a few pixels toward a fine pointer, then settles back. */
export default function MagneticLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const linkRef = useRef<HTMLAnchorElement | null>(null);
  const desktopMotion = useDesktopMotion();

  useEffect(() => {
    const link = linkRef.current;
    if (!link || !desktopMotion) return;

    let frame = 0;
    let shiftX = 0;
    let shiftY = 0;

    const paint = () => {
      frame = 0;
      link.style.translate = `${shiftX}px ${shiftY}px`;
    };

    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = link.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      shiftX = Math.max(-MAX_SHIFT, Math.min(MAX_SHIFT, dx * PULL));
      shiftY = Math.max(-MAX_SHIFT, Math.min(MAX_SHIFT, dy * PULL));
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      link.style.translate = "";
    };

    link.addEventListener("pointermove", move, { passive: true });
    link.addEventListener("pointerleave", reset);
    link.addEventListener("pointercancel", reset);
    link.addEventListener("blur", reset);
    return () => {
      reset();
      link.removeEventListener("pointermove", move);
      link.removeEventListener("pointerleave", reset);
      link.removeEventListener("pointercancel", reset);
      link.removeEventListener("blur", reset);
    };
  }, [desktopMotion]);

  return (
    <a ref={linkRef} href={href} className={className}>
      {children}
    </a>
  );
}
