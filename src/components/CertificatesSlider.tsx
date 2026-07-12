"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  X,
} from "lucide-react";
import Image from "next/image";
import { certifications, type Certification } from "@/lib/data";

const AUTOPLAY_MS = 4200;

function CertModal({
  cert,
  onClose,
}: {
  cert: Certification;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="modal-backdrop flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={cert.name}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ type: "spring", duration: 0.45, bounce: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="card relative max-h-[85vh] w-full max-w-lg overflow-y-auto overscroll-contain p-0"
      >
        <div className="sticky top-3 z-10 flex h-0 justify-end pr-3">
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/70"
          >
            <X size={16} />
          </button>
        </div>

        {cert.image ? (
          <div className="relative h-64 w-full bg-black/20 sm:h-80">
            <Image
              src={cert.image}
              alt={cert.name}
              fill
              sizes="(max-width: 640px) 100vw, 32rem"
              className="object-contain"
            />
          </div>
        ) : (
          <div className="flex h-40 w-full items-center justify-center bg-gradient-to-br from-violet-500/20 to-sky-400/20">
            <Award size={40} style={{ color: "rgb(var(--brand))" }} />
          </div>
        )}

        <div className="p-6">
          <h3 className="text-lg font-bold text-white">{cert.name}</h3>
          <p className="mt-1 text-sm text-white/60">
            {cert.issuer} · {cert.year}
          </p>
          {cert.link && (
            <a
              href={cert.link}
              target="_blank"
              rel="noreferrer"
              className="cv-download-btn mt-5"
            >
              <ExternalLink size={15} />
              View Certificate
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/** Shortest signed distance from `index` to `i` on a ring of size `n`. */
function ringOffset(i: number, index: number, n: number) {
  let raw = i - index;
  if (raw > n / 2) raw -= n;
  if (raw < -n / 2) raw += n;
  return raw;
}

export default function CertificatesSlider() {
  const n = certifications.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [active, setActive] = useState<Certification | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const next = useCallback(() => setIndex((i) => (i + 1) % n), [n]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + n) % n), [n]);

  useEffect(() => {
    if (paused || active) return;
    const id = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, active, next]);

  const handleCardClick = (i: number, cert: Certification) => {
    if (i === index) {
      setActive(cert);
    } else {
      setIndex(i);
    }
  };

  return (
    <div
      ref={wrapRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative"
    >
      <motion.div
        className="relative -mx-4 h-[320px] touch-pan-y overflow-hidden px-4 sm:h-[300px] cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragStart={() => setPaused(true)}
        onDragEnd={(_, info) => {
          const SWIPE_THRESHOLD = 45;
          if (info.offset.x < -SWIPE_THRESHOLD) next();
          else if (info.offset.x > SWIPE_THRESHOLD) prev();
          setPaused(false);
        }}
      >
        {certifications.map((cert, i) => {
          const offset = ringOffset(i, index, n);
          const abs = Math.abs(offset);
          if (abs > 2) return null;

          const isActive = offset === 0;
          const x = offset * 78; // % of card width, via translate below
          const scale = isActive ? 1 : abs === 1 ? 0.82 : 0.66;
          const opacity = isActive ? 1 : abs === 1 ? 0.55 : 0.22;
          const z = 10 - abs;

          return (
            <motion.div
              key={cert.name}
              className="absolute left-1/2 top-1/2 w-[240px] sm:w-[280px]"
              style={{ zIndex: z }}
              animate={{
                x: `calc(-50% + ${x}%)`,
                y: "-50%",
                scale,
                opacity,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
            >
              <button
                type="button"
                onClick={() => handleCardClick(i, cert)}
                aria-label={
                  isActive ? `Open ${cert.name}` : `Show ${cert.name}`
                }
                className={`card group block w-full overflow-hidden p-0 text-left transition-shadow ${
                  isActive ? "shadow-[0_20px_50px_-15px_rgba(168,85,247,0.45)]" : ""
                }`}
              >
                {cert.image ? (
                  <div className="relative h-36 w-full">
                    <Image
                      src={cert.image}
                      alt={cert.name}
                      fill
                      sizes="(max-width: 640px) 240px, 280px"
                      className="object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    {isActive && (
                      <span className="pointer-events-none absolute bottom-2 right-2 rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-medium text-white opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">
                        View certificate
                      </span>
                    )}
                  </div>
                ) : (
                  <div
                    className="m-5 mb-0 flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{
                      background:
                        "linear-gradient(135deg, rgb(var(--brand)), rgb(var(--brand-2)))",
                    }}
                  >
                    <Award size={20} className="text-white" />
                  </div>
                )}
                <div className="flex flex-col gap-1 p-5">
                  <h4 className="text-sm font-semibold leading-snug text-white">
                    {cert.name}
                  </h4>
                  <p className="text-xs text-white/60">{cert.issuer}</p>
                  <span className="mt-2 text-xs font-medium text-white/40">
                    {cert.year}
                  </span>
                </div>
              </button>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Controls */}
      <div className="mt-4 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous certificate"
          className="card flex h-9 w-9 items-center justify-center hover:bg-white/10"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="flex items-center gap-1.5">
          {certifications.map((cert, i) => (
            <button
              key={cert.name}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to ${cert.name}`}
              aria-current={i === index}
              className="p-1.5"
            >
              <span
                className="block h-1.5 rounded-full transition-all"
                style={{
                  width: i === index ? 20 : 6,
                  background:
                    i === index
                      ? "rgb(var(--brand))"
                      : "rgba(255,255,255,0.25)",
                }}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Next certificate"
          className="card flex h-9 w-9 items-center justify-center hover:bg-white/10"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <AnimatePresence>
        {active && <CertModal cert={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </div>
  );
}
