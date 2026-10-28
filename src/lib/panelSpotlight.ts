import type { PointerEvent } from "react";

const ENABLED = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

/** Direct style updates keep pointer movement out of React's render cycle. */
export const panelSpotlight = {
  onPointerMove(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === "touch" || !window.matchMedia(ENABLED).matches) return;
    const panel = event.currentTarget;
    const rect = panel.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    // Account for the scaled certificate cards as well as ordinary panels.
    panel.style.setProperty("--spotlight-x", `${(event.clientX - rect.left) * panel.offsetWidth / rect.width}px`);
    panel.style.setProperty("--spotlight-y", `${(event.clientY - rect.top) * panel.offsetHeight / rect.height}px`);
    panel.dataset.spotlight = "active";
  },
  onPointerLeave(event: PointerEvent<HTMLElement>) {
    delete event.currentTarget.dataset.spotlight;
  },
};
