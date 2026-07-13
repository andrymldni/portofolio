"use client";
import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  z: number; // depth 0.2–1 → speed, size, brightness
  r: number;
  tw: number; // twinkle phase
};

type Shooter = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number; // 0–1, counts down
  len: number;
};

/**
 * Ambient, looping starfield used as the site's motion background.
 * Pure canvas (no deps): drifting depth-parallax stars, soft twinkle,
 * occasional shooting stars, and a subtle cursor-parallax on desktop.
 * Fully paused (static field) for prefers-reduced-motion.
 */
export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const canHover = window.matchMedia("(hover: hover)").matches;

    // Adaptive quality: keep the effect cheap on low-end phones so it
    // doesn't compete with the rest of the page for CPU/GPU/battery.
    const nav = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean; effectiveType?: string };
    };
    const saveData = !!nav.connection?.saveData;
    const slowConnection = ["slow-2g", "2g"].includes(
      nav.connection?.effectiveType ?? ""
    );
    const lowCores = (nav.hardwareConcurrency ?? 8) <= 4;
    const lowMemory = (nav.deviceMemory ?? 8) <= 4;
    const smallScreen = Math.min(window.innerWidth, window.innerHeight) < 700;
    const lowPower =
      saveData || slowConnection || (smallScreen && (lowCores || lowMemory));

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, lowPower ? 1 : 2);
    let stars: Star[] = [];
    let shooters: Shooter[] = [];
    let raf = 0;
    let resizeTimer: ReturnType<typeof setTimeout>;
    let nextShooterAt = 0;
    let running = false;

    // Subtle parallax target — mouse position normalized to [-1, 1]
    let parallax = { x: 0, y: 0 };
    let parallaxTarget = { x: 0, y: 0 };

    const STAR_COUNT_BASE = lowPower ? 60 : 170;
    const MIN_STARS = lowPower ? 30 : 70;
    const ENABLE_SHOOTERS = !lowPower;
    const ENABLE_GLOW = !lowPower;

    const seedStars = () => {
      const count = Math.round(
        (STAR_COUNT_BASE * (width * height)) / (1440 * 900)
      );
      stars = Array.from({ length: Math.max(MIN_STARS, count) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 0.85 + 0.15,
        r: Math.random() * 1.2 + 0.3,
        tw: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedStars();
    };

    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    };

    const onPointerMove = (e: PointerEvent) => {
      parallaxTarget.x = (e.clientX / width) * 2 - 1;
      parallaxTarget.y = (e.clientY / height) * 2 - 1;
    };

    const maybeSpawnShooter = (t: number) => {
      if (t < nextShooterAt) return;
      nextShooterAt = t + 3500 + Math.random() * 5500;
      const fromLeft = Math.random() > 0.5;
      const startX = fromLeft ? -20 : width + 20;
      const startY = Math.random() * height * 0.5;
      const speed = 6 + Math.random() * 3;
      const angle = fromLeft ? 0.5 : Math.PI - 0.5;
      shooters.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed * (fromLeft ? 1 : -1),
        vy: Math.sin(angle) * speed,
        life: 1,
        len: 70 + Math.random() * 60,
      });
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);

      // ease parallax toward target for a smooth, cinematic drift
      parallax.x += (parallaxTarget.x - parallax.x) * 0.02;
      parallax.y += (parallaxTarget.y - parallax.y) * 0.02;
      const PARALLAX_RANGE = 14; // px

      for (const s of stars) {
        s.y += 0.018 * s.z;
        s.x -= 0.01 * s.z;
        if (s.y > height) s.y = 0;
        if (s.y < 0) s.y = height;
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;

        const twinkle = 0.5 + 0.5 * Math.sin(t / 1000 + s.tw);
        const alpha = (0.35 + 0.65 * twinkle) * (0.3 + 0.55 * s.z);

        const px = s.x + parallax.x * PARALLAX_RANGE * s.z;
        const py = s.y + parallax.y * PARALLAX_RANGE * s.z;

        ctx.beginPath();
        ctx.arc(px, py, s.r * s.z, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(205, 198, 255, ${alpha.toFixed(3)})`;
        ctx.fill();

        // gentle glow on the brighter, closer stars only (skipped in low-power mode)
        if (ENABLE_GLOW && s.z > 0.75) {
          ctx.beginPath();
          ctx.arc(px, py, s.r * s.z * 2.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(168, 130, 255, ${(alpha * 0.12).toFixed(3)})`;
          ctx.fill();
        }
      }

      if (ENABLE_SHOOTERS) {
        maybeSpawnShooter(t);
        shooters = shooters.filter((sh) => sh.life > 0);
        for (const sh of shooters) {
          sh.x += sh.vx;
          sh.y += sh.vy;
          sh.life -= 0.02;
          const tailX = sh.x - sh.vx * (sh.len / 8);
          const tailY = sh.y - sh.vy * (sh.len / 8);
          const grad = ctx.createLinearGradient(sh.x, sh.y, tailX, tailY);
          grad.addColorStop(0, `rgba(255, 255, 255, ${sh.life})`);
          grad.addColorStop(1, "rgba(168, 130, 255, 0)");
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(sh.x, sh.y);
          ctx.lineTo(tailX, tailY);
          ctx.stroke();
        }
      }

      if (running) raf = requestAnimationFrame(draw);
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      for (const s of stars) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * s.z, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(205, 198, 255, ${(0.35 + 0.4 * s.z).toFixed(3)})`;
        ctx.fill();
      }
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(draw);
    };
    const stop = () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    // Pause entirely while the tab is hidden — no point burning battery/CPU
    // animating a canvas nobody can see.
    const onVisibility = () => {
      if (reduceMotion) return;
      if (document.hidden) stop();
      else start();
    };

    resize();
    window.addEventListener("resize", onResize);
    if (canHover && !reduceMotion) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }
    document.addEventListener("visibilitychange", onVisibility);

    if (reduceMotion) {
      drawStatic();
    } else {
      start();
    }

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
      clearTimeout(resizeTimer);
      stop();
    };
  }, []);

  return <canvas ref={canvasRef} className="starfield" aria-hidden="true" />;
}
