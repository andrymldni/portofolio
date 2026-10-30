"use client";
import { useRef, useState, type CSSProperties, type RefObject } from "react";
import { motion, useScroll, useTransform, type MotionStyle, type MotionValue } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { experience, type ExperienceEntry } from "@/lib/data";
import { VIEWPORT } from "@/components/ui/Reveal";
import { useProgressiveEntrance } from "@/hooks/useProgressiveEntrance";
import DecodeTitle from "@/components/ui/DecodeTitle";
import styles from "./Experience.module.css";

function ExperienceItem({
  entry,
  isLast,
  index,
  timelineRef,
  scrollYProgress,
}: {
  entry: ExperienceEntry;
  isLast: boolean;
  index: number;
  timelineRef: RefObject<HTMLOListElement | null>;
  scrollYProgress: MotionValue<number>;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement | null>(null);
  useProgressiveEntrance(ref, false, true, VIEWPORT.margin);

  const progress = useTransform(scrollYProgress, (value) => {
    const item = ref.current;
    const timeline = timelineRef.current;
    if (!item || !timeline || isLast) return 0;

    // Measure normal-flow heights, not sticky offsetTop (which moves on scroll).
    // Reading current heights also accommodates expanded bullets and wrapping.
    let top = 0;
    let previous = item.previousElementSibling;
    while (previous instanceof HTMLElement) {
      top += previous.offsetHeight;
      previous = previous.previousElementSibling;
    }
    const distance = value * timeline.clientHeight - (top - index * 24);
    return Math.min(1, Math.max(0, distance / Math.max(1, item.offsetHeight - 24)));
  });
  const scale = useTransform(progress, [0, 1], [1, 0.94]);
  const brightness = useTransform(progress, [0, 1], [1, 0.84]);

  const current = /\bPresent\b/i.test(entry.period);
  const visible = open ? entry.bullets : entry.bullets.slice(0, 2);
  const hiddenCount = entry.bullets.length - 2;

  return (
    <li
      ref={ref}
      data-experience-reveal
      className={`${styles.item} relative pb-10 pl-8 last:pb-0`}
      style={{ "--stack-index": index } as CSSProperties}
    >
      <span
        aria-hidden="true"
        className="absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-brand/50 bg-canvas"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-brand" />
      </span>
      {!isLast && (
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-[7px] top-6 w-px bg-line"
        />
      )}

      <motion.div
        className={`${styles.card} card p-5 sm:p-6 ${current ? styles.current : ""}`}
        style={{ "--stack-scale": scale, "--stack-brightness": brightness } as MotionStyle}
      >
        <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold leading-snug text-ink">
              {entry.role}
            </h3>
            <p className="mt-1 text-sm text-muted">
              {entry.org}
              {entry.location ? ` · ${entry.location}` : ""}
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-start gap-1 sm:items-end">
            <p className="font-mono text-sm text-muted">{entry.period}</p>
            {current && (
              <span className="rounded-full bg-brand/10 px-2 py-0.5 font-mono text-[11px] font-medium text-brand">
                Current
              </span>
            )}
          </div>
        </div>

        {visible.length > 0 && (
          <ul className="mt-4 space-y-2">
            {visible.map((bullet) => (
              <li
                key={bullet}
                className="flex gap-2 text-sm leading-relaxed text-muted"
              >
                <span
                  aria-hidden="true"
                  className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand/60"
                />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}

        {hiddenCount > 0 && (
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-brand transition-colors hover:text-ink"
          >
            {open ? "Show less" : `Show ${hiddenCount} more`}
            <ChevronDown
              size={14}
              aria-hidden="true"
              className={`transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>
        )}
      </motion.div>
    </li>
  );
}

export default function Experience() {
  const timelineRef = useRef<HTMLOListElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 96px", "end 96px"],
  });

  return (
    <section id="experience" className="relative py-12 md:py-16">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.5fr)] lg:gap-14">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="section-kicker mb-4">
            <span aria-hidden="true" className="h-px w-6 bg-brand" />
            02 / Experience
          </p>
          <h2
            className="text-2xl font-bold leading-tight tracking-tight md:text-[2rem]"
            style={{ backgroundImage: "none", WebkitTextFillColor: "currentColor" }}
          >
            <DecodeTitle title="Experience" />
          </h2>
          <p className="mt-3 max-w-sm leading-relaxed text-muted">
            A timeline of the roles behind the CV, from banking analytics to
            social-security data work.
          </p>
          <p className="mt-6 font-mono text-xs font-medium uppercase tracking-[0.12em] text-muted">
            {experience.length} roles
          </p>
        </div>

        <ol ref={timelineRef} className="relative isolate min-w-0 md:pb-[20vh]" aria-label="Work experience timeline">
          {experience.map((entry, index) => (
            <ExperienceItem
              key={`${entry.role}-${entry.org}-${entry.period}`}
              entry={entry}
              isLast={index === experience.length - 1}
              index={index}
              timelineRef={timelineRef}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
