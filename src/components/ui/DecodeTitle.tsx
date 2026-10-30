"use client";
import { useEffect, useRef } from "react";
import styles from "./DecodeTitle.module.css";

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/_#";
const DURATION = 700;

/** The real text always supplies layout, server content and the accessible name. */
export default function DecodeTitle({ title }: { title: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const overlayRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    const overlay = overlayRef.current;
    if (!element || !overlay || typeof IntersectionObserver === "undefined") return;

    let frame = 0;
    let start: number | undefined;
    let previousTick = -1;
    let running = false;
    // Touch uses an opacity entrance; character scrambling repaints every frame.
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce), (hover: none), (pointer: coarse)");
    const letters = Array.from(title);
    const finish = () => {
      running = false;
      element.removeAttribute("data-decoding");
      overlay.textContent = "";
    };
    const animate = (time: number) => {
      if (motionPreference.matches) {
        finish();
        element.setAttribute("data-title-fade", "");
        return;
      }
      start ??= time;
      const elapsed = time - start;
      if (elapsed >= DURATION) {
        finish();
        return;
      }

      // One loop per active title; limit character changes to about 30fps.
      const tick = Math.floor(elapsed / 32);
      if (tick !== previousTick) {
        previousTick = tick;
        const resolved = Math.floor((elapsed / DURATION) * letters.length);
        overlay.textContent = letters.map((letter, index) => (
          index < resolved || /\s/.test(letter)
            ? letter
            : CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]
        )).join("");
        element.setAttribute("data-decoding", "");
      }
      frame = requestAnimationFrame(animate);
    };

    // Read the preference at entry, before starting any scramble frame.
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      if (motionPreference.matches) element.setAttribute("data-title-fade", "");
      else {
        running = true;
        frame = requestAnimationFrame(animate);
      }
    }, { threshold: 0.25 });
    observer.observe(element);
    const onPreferenceChange = () => {
      if (!motionPreference.matches || !running) return;
      cancelAnimationFrame(frame);
      finish();
      element.setAttribute("data-title-fade", "");
    };
    motionPreference.addEventListener("change", onPreferenceChange);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      motionPreference.removeEventListener("change", onPreferenceChange);
      finish();
      element.removeAttribute("data-title-fade");
    };
  }, [title]);

  return (
    <span ref={ref} className={styles.title}>
      <span className={styles.text}>{title}</span>
      <span ref={overlayRef} aria-hidden="true" className={styles.overlay} />
    </span>
  );
}
