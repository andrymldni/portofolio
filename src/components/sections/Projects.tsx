"use client";
import { useCallback, useId, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { flushSync } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ExternalLink,
  ArrowUpRight,
  ChevronDown,
  Github,
  Globe,
  X,
  Brain,
  Database,
  BarChart3,
  Workflow,
  ScanEye,
  Languages,
  Boxes,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { projects, type Project } from "@/lib/data";
import { EASE_OUT, useReveal } from "@/components/ui/Reveal";
import { useDialog } from "@/hooks/useDialog";
import { usePointerSurface } from "@/hooks/usePointerSurface";

const screenshotAlt = (project: Project) =>
  `Screenshot of ${project.title}${project.desc ? `: ${project.desc}` : ` (${project.category ?? "project"})`}`;

// Match the grid's md/lg breakpoints without listening to every resize frame.
function subscribeColumns(onChange: () => void) {
  const queries = [768, 1024].map((width) => window.matchMedia(`(min-width: ${width}px)`));
  queries.forEach((query) => query.addEventListener("change", onChange));
  return () => queries.forEach((query) => query.removeEventListener("change", onChange));
}

function getColumns() {
  return window.matchMedia("(min-width: 1024px)").matches
    ? 3
    : window.matchMedia("(min-width: 768px)").matches ? 2 : 1;
}

const getServerColumns = () => 1;

/** Category → icon + muted tint, used as the cover when a project has no screenshot. */
const CATEGORY_META: Record<string, { icon: LucideIcon; tint: string }> = {
  "Data Engineering": { icon: Database, tint: "cover-blue" },
  "AI/ML": { icon: Brain, tint: "cover-graphite" },
  "Data Analytics": { icon: BarChart3, tint: "cover-mist" },
  MLOps: { icon: Workflow, tint: "cover-slate" },
  "Computer Vision": { icon: ScanEye, tint: "cover-graphite" },
  NLP: { icon: Languages, tint: "cover-mist" },
};
const DEFAULT_META = { icon: Boxes, tint: "cover-slate" };

function ProjectCover({ category }: { category?: string }) {
  const meta = (category && CATEGORY_META[category]) || DEFAULT_META;
  const Icon = meta.icon;
  return (
    <div
      className={`flex h-full w-full items-center justify-center ${meta.tint}`}
      aria-hidden="true"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-xl border border-line bg-canvas/60 text-ink">
        <Icon size={24} strokeWidth={1.75} />
      </span>
    </div>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
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
        <div className="sticky top-3 z-10 flex h-0 justify-end pr-3">
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-white transition-colors hover:bg-black/75"
          >
            <X size={16} />
          </button>
        </div>

        <div className="relative h-44 w-full sm:h-56">
          {project.image ? (
            <Image
              src={project.image}
              alt={screenshotAlt(project)}
              fill
              sizes="(max-width: 640px) 100vw, 32rem"
              className="object-cover"
            />
          ) : (
            <ProjectCover category={project.category} />
          )}
        </div>

        <div className="p-6">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
            {project.category && <p>{project.category}</p>}
            {project.courseProject && (
              <span className="rounded-md border border-line px-2 py-0.5">Course project</span>
            )}
          </div>
          <h3 id={titleId} className="mt-2 text-xl font-semibold text-ink">
            {project.title}
          </h3>
          {project.stack && (
            <p className="mt-1 text-sm text-muted">
              {project.stack.join(" · ")}
            </p>
          )}
          <p className="mt-4 text-sm leading-relaxed text-ink/85">
            {project.details ?? project.desc}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={`/projects/${project.slug}`} className="btn-secondary">
              Read case study
            </Link>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="btn-primary link-nudge"
              >
                <Globe size={15} />
                Live demo
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className={`link-nudge ${project.demo ? "btn-secondary" : "btn-primary"}`}
              >
                {project.demo ? (
                  <Github size={15} />
                ) : (
                  <ExternalLink size={15} />
                )}
                {project.demo ? "Source code" : "View project"}
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({
  project: p,
  delay,
  wide = false,
  revealed,
  onReveal,
  onOpen,
}: {
  project: Project;
  delay: number;
  wide?: boolean;
  revealed: boolean;
  onReveal: (slug: string) => void;
  onOpen: (p: Project) => void;
}) {
  // Preserve the initial decision while mounted; filters remember previously seen cards.
  const [alreadyRevealed] = useState(revealed);
  const reveal = useReveal(delay, alreadyRevealed);
  const tiltRef = useRef<HTMLDivElement | null>(null);
  usePointerSurface(tiltRef, 4);
  return (
    <motion.article
      {...reveal}
      onViewportEnter={() => onReveal(p.slug)}
      className={`min-w-0 [perspective:1000px] ${wide ? "md:col-span-2" : ""}`}
    >
      <div ref={tiltRef} className={`pointer-surface pointer-tilt group card interactive-card project-card relative flex h-full cursor-pointer flex-col overflow-hidden p-0 text-left ${wide ? "md:flex-row" : ""}`}>
        <div
          className={`relative w-full shrink-0 overflow-hidden border-b border-line ${
            wide
              ? "h-44 sm:h-56 md:h-auto md:min-h-[22rem] md:w-[45%] md:border-b-0 md:border-r"
              : p.flagship ? "h-44 sm:h-56" : "h-36 sm:h-40"
          }`}
        >
          {p.image ? (
            <Image
              src={p.image}
              alt={screenshotAlt(p)}
              fill
              sizes={p.flagship
                ? "(min-width: 1152px) 540px, (min-width: 768px) calc(50vw - 36px), calc(100vw - 40px)"
                : "(min-width: 1152px) 352px, (min-width: 1024px) calc(33vw - 32px), (min-width: 768px) calc(50vw - 36px), calc(100vw - 40px)"}
              className="project-image object-cover"
              loading="lazy"
            />
          ) : (
            <ProjectCover category={p.category} />
          )}
          {p.flagship && (
            <span className="pointer-events-none absolute left-3 top-3 rounded-md bg-canvas/90 px-2 py-1 font-mono text-[11px] font-medium text-ink">
              Flagship
            </span>
          )}
          <span className="pointer-events-none absolute bottom-2 right-2 rounded-md bg-canvas/90 px-2 py-1 text-[11px] font-medium text-ink opacity-0 transition-opacity group-hover:opacity-100">
            Click for details
          </span>
        </div>
        <div className={`flex min-w-0 flex-1 flex-col ${p.flagship ? "p-5 sm:p-6" : "p-4 sm:p-5"}`}>
          <header className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h4 className={`font-semibold leading-snug ${p.flagship ? "text-xl md:text-2xl" : "text-lg"}`}>
                <button
                  type="button"
                  aria-haspopup="dialog"
                  aria-label={`Open details for ${p.title}`}
                  className="text-left after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-inset focus-visible:after:ring-brand"
                  onClick={(e) => {
                    e.currentTarget.focus();
                    onOpen(p);
                  }}
                >
                  {p.title}
                </button>
              </h4>
              {p.stack && (
                <p className="mt-1 text-sm text-muted">{p.stack.join(" · ")}</p>
              )}
            </div>
            <div className="flex shrink-0 items-center gap-3 pt-1">
              {p.demo && (
                <a
                  href={p.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="link-nudge relative z-10 text-muted transition-colors hover:text-ink"
                  aria-label={`Open live demo for ${p.title}`}
                  title="Live demo"
                >
                  <Globe size={17} />
                </a>
              )}
              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="link-nudge relative z-10 text-muted transition-colors hover:text-ink"
                  aria-label={`Visit project ${p.title}`}
                  title="Open link"
                >
                  <ExternalLink size={17} />
                </a>
              )}
            </div>
          </header>
          <div className="mt-3 flex flex-wrap gap-2 font-mono text-xs text-muted">
            {p.category && (
              <span className="rounded-md bg-ink/[0.06] px-2 py-0.5">{p.category}</span>
            )}
            {p.courseProject && (
              <span className="rounded-md border border-line px-2 py-0.5">Course project</span>
            )}
          </div>
          {p.desc && (
            <p className={`mt-3 text-sm leading-relaxed text-muted ${p.flagship ? "md:text-base" : ""}`}>
              {p.desc}
            </p>
          )}
          {p.flagship && Boolean(p.highlights?.length) && (
            <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-line pt-4">
              {p.highlights?.map((highlight) => (
                <div key={`${highlight.value}-${highlight.label}`} className="flex min-w-0 flex-col">
                  <dt className="order-2 mt-1 text-[11px] leading-snug text-muted sm:text-xs">{highlight.label}</dt>
                  <dd className="break-words font-mono text-lg font-medium tracking-tight text-ink sm:text-xl">{highlight.value}</dd>
                </div>
              ))}
            </dl>
          )}
          <Link
            href={`/projects/${p.slug}`}
            aria-label={`Read case study: ${p.title}`}
            className="link-nudge relative z-10 mt-auto inline-flex w-fit items-center gap-1.5 pt-4 text-sm font-medium text-brand transition-colors hover:text-ink"
          >
            Read case study
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects({
  projectsData,
}: {
  projectsData?: Project[];
}) {
  const source =
    projectsData && projectsData.length > 0 ? projectsData : projects;
  const categories = useMemo(
    () => [
      "All",
      ...Array.from(
        new Set(source.map((p) => p.category).filter(Boolean) as string[]),
      ),
    ],
    [source],
  );
  const [activeCategory, setActiveCategory] = useState("All");
  const [expanded, setExpanded] = useState(false);
  const groupId = useId();
  const moreId = `${groupId}-more`;
  const moreRef = useRef<HTMLElement | null>(null);
  const list = useMemo(
    () =>
      activeCategory === "All"
        ? source
        : source.filter((p) => p.category === activeCategory),
    [source, activeCategory],
  );
  const [active, setActive] = useState<Project | null>(null);
  const closeModal = useCallback(() => setActive(null), []);
  const [revealed, setRevealed] = useState<ReadonlySet<string>>(() => new Set());
  const markRevealed = useCallback((slug: string) => {
    setRevealed((seen) => seen.has(slug) ? seen : new Set(seen).add(slug));
  }, []);
  const columns = useSyncExternalStore(subscribeColumns, getColumns, getServerColumns);
  const flagships = list.filter((project) => project.flagship);
  const moreProjects = list.filter((project) => !project.flagship);
  // A filter with no flagship should show its matching projects immediately.
  const canCollapse = flagships.length > 0 && moreProjects.length > 0;

  const toggleExpanded = () => {
    if (!expanded) {
      // Remove display:none before moving keyboard focus into the revealed cards.
      flushSync(() => setExpanded(true));
      const firstNewCard = moreRef.current?.querySelector("article");
      firstNewCard?.querySelector<HTMLButtonElement>("h4 button")?.focus({ preventScroll: true });
      firstNewCard?.scrollIntoView({ block: "nearest", behavior: "instant" });
      return;
    }

    const heading = moreRef.current?.closest("section#projects")?.querySelector("h2");
    const belowHeading = heading && heading.getBoundingClientRect().top < 0;
    flushSync(() => setExpanded(false));
    if (belowHeading) {
      heading.scrollIntoView({
        block: "start",
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      });
    }
  };

  return (
    <div>
      {categories.length > 2 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setActiveCategory(cat);
                setExpanded(false);
              }}
              aria-pressed={activeCategory === cat}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors sm:text-sm ${
                activeCategory === cat
                  ? "border-ink bg-ink text-canvas"
                  : "border-line text-muted hover:border-ink/30 hover:text-ink"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {flagships.length > 0 && (
        <section aria-labelledby={`${groupId}-flagships`}>
          <h3 id={`${groupId}-flagships`} className="mb-5 font-mono text-xs font-medium uppercase tracking-[0.12em] text-muted">
            Flagship projects
          </h3>
          <div className="grid gap-6 md:grid-cols-2">
            {flagships.map((p, index) => (
              <ProjectCard
                key={p.slug}
                project={p}
                delay={(index % Math.min(columns, 2)) * 0.06}
                wide={index === 0 && flagships.length % 2 === 1}
                revealed={revealed.has(p.slug)}
                onReveal={markRevealed}
                onOpen={setActive}
              />
            ))}
          </div>
        </section>
      )}

      {moreProjects.length > 0 && (
        <section
          ref={moreRef}
          id={moreId}
          aria-labelledby={`${moreId}-heading`}
          className={`${flagships.length ? "mt-10 border-t border-line pt-8" : ""} ${canCollapse && !expanded ? "hidden md:block" : ""}`}
        >
          <h3 id={`${moreId}-heading`} className="mb-5 font-mono text-xs font-medium uppercase tracking-[0.12em] text-muted">
            More projects
          </h3>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {moreProjects.map((p, index) => (
              <ProjectCard
                key={p.slug}
                project={p}
                delay={(index % columns) * 0.06}
                revealed={revealed.has(p.slug)}
                onReveal={markRevealed}
                onOpen={setActive}
              />
            ))}
          </div>
        </section>
      )}

      {canCollapse && (
        <div className="mt-6 md:hidden">
          <button
            type="button"
            onClick={toggleExpanded}
            aria-expanded={expanded}
            aria-controls={moreId}
            className="btn-secondary w-full"
          >
            {expanded ? "Show fewer" : `Show all ${list.length} projects`}
            <ChevronDown size={16} aria-hidden="true" className={expanded ? "rotate-180" : ""} />
          </button>
        </div>
      )}

      <AnimatePresence>
        {active && (
          <ProjectModal project={active} onClose={closeModal} />
        )}
      </AnimatePresence>
    </div>
  );
}
