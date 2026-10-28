"use client";
import { useEffect, useSyncExternalStore, type RefObject } from "react";

const QUERY = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
const subscribe = (onChange: () => void) => {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
};

export function useDesktopMotion() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => false);
}

/** Pointer tilt writes only CSS variables, at most once per animation frame. */
export function usePointerSurface<T extends HTMLElement>(ref: RefObject<T | null>, maxTilt = 0) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const media = window.matchMedia(QUERY);
    let frame = 0;
    let clientX = 0;
    let clientY = 0;
    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      element.style.setProperty("--tilt-angle", "0deg");
    };
    const paint = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
      const axisX = 1 - y * 2;
      const axisY = x * 2 - 1;
      const magnitude = Math.hypot(axisX, axisY);
      element.style.setProperty("--tilt-axis-x", `${magnitude ? axisX / magnitude : 1}`);
      element.style.setProperty("--tilt-axis-y", `${magnitude ? axisY / magnitude : 0}`);
      element.style.setProperty("--tilt-angle", `${Math.min(1, magnitude) * maxTilt}deg`);
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      clientX = event.clientX;
      clientY = event.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const update = () => {
      reset();
      element.removeEventListener("pointermove", move);
      if (media.matches) element.addEventListener("pointermove", move, { passive: true });
    };
    update();
    element.addEventListener("pointerleave", reset);
    element.addEventListener("pointercancel", reset);
    media.addEventListener("change", update);
    return () => {
      reset();
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", reset);
      element.removeEventListener("pointercancel", reset);
      media.removeEventListener("change", update);
    };
  }, [ref, maxTilt]);
}
