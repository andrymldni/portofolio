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
    const letters = Array.from(title);
    const finish = () => {
      element.removeAttribute("data-decoding");
      overlay.textContent = "";
    };
    const animate = (time: number) => {
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

    // This is a one-shot entrance, so it also plays with reduced motion.
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      frame = requestAnimationFrame(animate);
    }, { threshold: 0.25 });
    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      finish();
    };
  }, [title]);

  return (
    <span ref={ref} className={styles.title}>
      <span className={styles.text}>{title}</span>
      <span ref={overlayRef} aria-hidden="true" className={styles.overlay} />
    </span>
  );
}
