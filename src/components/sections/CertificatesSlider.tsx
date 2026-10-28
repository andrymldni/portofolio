"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Pause,
  Play,
  X,
} from "lucide-react";
import Image from "next/image";
import { certifications, type Certification } from "@/lib/data";
import { EASE_OUT } from "@/components/ui/Reveal";
import { useDialog } from "@/hooks/useDialog";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import TerminalBar from "@/components/ui/TerminalBar";

const AUTOPLAY_MS = 4200;

function CertModal({
  cert,
  onClose,
}: {
  cert: Certification;
  onClose: () => void;
}) {
  const { dialogRef, titleId } = useDialog(onClose);

  return (
    <motion.div
      className="modal-backdrop flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.4, ease: EASE_OUT }}
        onClick={(e) => e.stopPropagation()}
        className="card relative max-h-[85vh] w-full max-w-lg overflow-y-auto overscroll-contain p-0 shadow-[0_32px_64px_-24px_rgba(0,0,0,0.6)]"
      >
        <TerminalBar className="sticky top-0 z-20" action={
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-line text-ink transition-colors hover:bg-steel"
          >
            <X size={16} />
          </button>
        }>
          ~/credentials/<span className="text-brand">{cert.year}</span>
        </TerminalBar>

        {cert.image ? (
          <div className="relative h-64 w-full bg-steel sm:h-80">
            <Image
              src={cert.image}
              alt={cert.name}
              fill
              sizes="(max-width: 640px) 100vw, 32rem"
              className="object-contain"
            />
          </div>
        ) : (
          <div className="flex h-40 w-full items-center justify-center bg-steel">
            <Award size={40} strokeWidth={1.5} className="text-ink" />
          </div>
        )}

        <div className="p-6">
          <h3 id={titleId} className="text-lg font-semibold text-ink">{cert.name}</h3>
          <p className="mt-3 font-mono text-xs leading-relaxed text-muted">
            {cert.issuer} · {cert.year}
          </p>
          {cert.link && (
            <a
              href={cert.link}
              target="_blank"
              rel="noreferrer"
              className="btn-primary mt-5"
            >
              <ExternalLink size={15} />
              View certificate
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
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const reduce = usePrefersReducedMotion();
  const [active, setActive] = useState<Certification | null>(null);
  const closeModal = useCallback(() => setActive(null), []);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const next = useCallback(() => setIndex((i) => (i + 1) % n), [n]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + n) % n), [n]);

  useEffect(() => {
    if (reduce || paused || hovered || focused || dragging || active) return;
    const id = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [reduce, paused, hovered, focused, dragging, active, next]);

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
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
      }}
      className="relative"
    >
      <motion.div
        className="relative -mx-5 h-[400px] cursor-grab touch-pan-y overflow-hidden px-5 sm:h-[380px] active:cursor-grabbing md:-mx-6 md:px-6"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragStart={() => setDragging(true)}
        onDragEnd={(_, info) => {
          const SWIPE_THRESHOLD = 45;
          if (info.offset.x < -SWIPE_THRESHOLD) next();
          else if (info.offset.x > SWIPE_THRESHOLD) prev();
          setDragging(false);
        }}
      >
        {certifications.map((cert, i) => {
          const offset = ringOffset(i, index, n);
          const abs = Math.abs(offset);
          if (abs > 2) return null;

          const isActive = offset === 0;
          const x = offset * 78; // % of card width, via translate below
          const scale = isActive ? 1 : abs === 1 ? 0.82 : 0.66;
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
              }}
              transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 28 }}
            >
              <div
                className={`card group relative block w-full overflow-hidden p-0 text-left ${
                  isActive ? "ring-1 ring-brand" : ""
                }`}
              >
                <TerminalBar>~/credentials/{cert.year}</TerminalBar>
                {cert.image ? (
                  <div className="relative h-36 w-full">
                    <Image
                      src={cert.image}
                      alt={cert.name}
                      fill
                      sizes="(max-width: 640px) 240px, 280px"
                      className="object-cover"
                    />
                    {isActive && (
                      <span className="pointer-events-none absolute bottom-2 right-2 rounded-md bg-canvas px-2 py-1 font-mono text-[11px] text-ink opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                        View certificate
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="m-5 mb-0 flex h-11 w-11 items-center justify-center rounded-lg bg-steel text-ink">
                    <Award size={20} strokeWidth={1.75} />
                  </div>
                )}
                <div className="flex flex-col gap-1 p-5">
                  <h3 className="text-sm font-semibold leading-snug text-ink">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.currentTarget.focus();
                        handleCardClick(i, cert);
                      }}
                      aria-haspopup={isActive ? "dialog" : undefined}
                      aria-label={isActive ? `Open ${cert.name}` : `Show ${cert.name}`}
                      className="text-left after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-inset focus-visible:after:ring-brand"
                    >
                      {cert.name}
                    </button>
                  </h3>
                  <p className="mt-2 font-mono text-xs leading-relaxed text-muted">{cert.issuer}</p>
                  <span className="mt-2 font-mono text-xs text-muted">
                    {cert.year}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Controls */}
      <div className="mt-4 flex justify-center">
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          disabled={reduce}
          className="card inline-flex items-center gap-2 px-3 py-2 font-mono text-xs text-ink disabled:cursor-default"
        >
          {paused || reduce ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
          {reduce ? "Autoplay off (reduced motion)" : paused ? "Play autoplay" : "Pause autoplay"}
        </button>
      </div>
      <div className="mt-4 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous certificate"
          className="card flex h-9 w-9 items-center justify-center text-ink hover:bg-ink/5"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="flex flex-wrap items-center justify-center gap-1.5">
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
                className={`block h-1.5 rounded-sm transition-colors ${
                  i === index ? "bg-brand" : "bg-ink/25"
                }`}
                style={{ width: i === index ? 20 : 6 }}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Next certificate"
          className="card flex h-9 w-9 items-center justify-center text-ink hover:bg-ink/5"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <AnimatePresence>
        {active && <CertModal cert={active} onClose={closeModal} />}
      </AnimatePresence>
    </div>
  );
}
