"use client";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { experience, type ExperienceEntry } from "@/lib/data";
import { VIEWPORT } from "@/components/ui/Reveal";
import { useProgressiveEntrance } from "@/hooks/useProgressiveEntrance";

function ExperienceItem({
  entry,
  isLast,
}: {
  entry: ExperienceEntry;
  isLast: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement | null>(null);
  useProgressiveEntrance(ref, false, true, VIEWPORT.margin);

  const current = /\bPresent\b/i.test(entry.period);
  const visible = open ? entry.bullets : entry.bullets.slice(0, 2);
  const hiddenCount = entry.bullets.length - 2;

  return (
    <li
      ref={ref}
      data-experience-reveal
      className="relative pb-10 pl-8 last:pb-0"
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

      <div className="card p-5 sm:p-6">
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
            <p className="text-sm text-muted">{entry.period}</p>
            {current && (
              <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[11px] font-semibold text-brand">
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
      </div>
    </li>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="relative py-12 md:py-16">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.5fr)] lg:gap-14">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <span
            aria-hidden="true"
            className="mb-4 block h-[3px] w-10 origin-left bg-brand"
          />
          <h2 className="text-2xl font-bold leading-tight tracking-tight md:text-[2rem]">
            Experience
          </h2>
          <p className="mt-3 max-w-sm leading-relaxed text-muted">
            A timeline of the roles behind the CV, from banking analytics to
            social-security data work.
          </p>
          <p className="mt-6 text-xs font-medium uppercase tracking-[0.16em] text-muted">
            {experience.length} roles
          </p>
        </div>

        <ol aria-label="Work experience timeline">
          {experience.map((entry, index) => (
            <ExperienceItem
              key={`${entry.role}-${entry.org}-${entry.period}`}
              entry={entry}
              isLast={index === experience.length - 1}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
