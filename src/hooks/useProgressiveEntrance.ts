"use client";
import { useEffect, useLayoutEffect, type RefObject } from "react";

const useClientLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/** Do not restart visible content after the browser has already painted it. */
export function canEnhanceEntrance(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const visible = rect.bottom > 0 && rect.top < window.innerHeight;
  const painted = performance.getEntriesByType("paint")
    .some((entry) => entry.name === "first-contentful-paint");
  return !visible || (!painted && document.readyState !== "complete");
}

/** Server markup is the final state. Only a hydrated element may hide/reveal. */
export function useProgressiveEntrance<T extends HTMLElement>(
  ref: RefObject<T | null>,
  onLoad = false,
  enabled = true,
  margin = "0px",
) {
  useClientLayoutEffect(() => {
    const element = ref.current;
    if (!element || !enabled) return;
    // A late hydration must not hide content the visitor is already reading.
    if (!canEnhanceEntrance(element)) return;
    if (!onLoad && typeof IntersectionObserver === "undefined") return;

    element.setAttribute("data-entrance-ready", "");
    let observer: IntersectionObserver | undefined;
    if (onLoad) {
      element.setAttribute("data-entrance-entered", "");
    } else {
      observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        element.setAttribute("data-entrance-entered", "");
        observer?.disconnect();
      }, { rootMargin: margin, threshold: 0 });
      observer.observe(element);
    }
    return () => {
      observer?.disconnect();
      element.removeAttribute("data-entrance-ready");
      element.removeAttribute("data-entrance-entered");
    };
  }, [ref, onLoad, enabled, margin]);
}
