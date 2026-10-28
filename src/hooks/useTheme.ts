"use client";
import { useSyncExternalStore } from "react";
import { flushSync } from "react-dom";

const THEME_EVENT = "portfolio-theme-change";
let transitioning = false;

function subscribe(onChange: () => void) {
  window.addEventListener(THEME_EVENT, onChange);
  return () => window.removeEventListener(THEME_EVENT, onChange);
}

export function useTheme() {
  return useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.theme || "dark",
    () => null
  );
}

/** Keep the existing theme key and root attribute as the source of truth. */
export function toggleTheme(origin?: HTMLElement) {
  if (transitioning) return;
  const root = document.documentElement;
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  const update = () => {
    flushSync(() => {
      root.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {}
      window.dispatchEvent(new Event(THEME_EVENT));
    });
  };

  if (
    !origin ||
    typeof document.startViewTransition !== "function" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    update();
    return;
  }

  const rect = origin.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  const radius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );
  root.style.setProperty("--theme-x", `${x}px`);
  root.style.setProperty("--theme-y", `${y}px`);
  root.style.setProperty("--theme-radius", `${radius}px`);
  root.dataset.themeTransition = "";
  transitioning = true;

  const cleanup = () => {
    delete root.dataset.themeTransition;
    root.style.removeProperty("--theme-x");
    root.style.removeProperty("--theme-y");
    root.style.removeProperty("--theme-radius");
    transitioning = false;
  };

  try {
    const transition = document.startViewTransition(update);
    // A hidden tab or an interrupted capture may skip animation; the update still runs.
    void transition.ready.catch(() => {});
    void transition.finished.then(cleanup, cleanup);
  } catch {
    cleanup();
    update();
  }
}
