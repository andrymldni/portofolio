"use client";
import { useCallback, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ExternalLink,
  ArrowUpRight,
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

// Match the grid's sm/lg breakpoints without listening to every resize frame.
function subscribeColumns(onChange: () => void) {
  const queries = [640, 1024].map((width) => window.matchMedia(`(min-width: ${width}px)`));
  queries.forEach((query) => query.addEventListener("change", onChange));
  return () => queries.forEach((query) => query.removeEventListener("change", onChange));
}

function getColumns() {
  return window.matchMedia("(min-width: 1024px)").matches
    ? 3
    : window.matchMedia("(min-width: 640px)").matches ? 2 : 1;
}

const getServerColumns = () => 1;

// Pack each desktop row in DOM order, expanding its last card to fill spare
// columns. Filtering cannot leave holes or reorder keyboard navigation.
function desktopCells(list: Project[]) {
  let column = 0;
  const cells: { span: number; delay: number }[] = [];
  for (const project of list) {
    const span = project.featured ? 2 : 1;
    if (column + span > 3) {
      cells[cells.length - 1].span += 3 - column;
      column = 0;
    }
    cells.push({ span, delay: column * 0.06 });
    column = (column + span) % 3;
  }
  if (column && cells.length) cells[cells.length - 1].span += 3 - column;
  return cells;
}

const spanClasses = ["", "lg:col-span-1", "lg:col-span-2", "lg:col-span-3"];

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
          {project.category && (
            <p className="text-xs font-medium text-muted">{project.category}</p>
          )}
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
  span,
  revealed,
  onReveal,
  onOpen,
}: {
  project: Project;
  delay: number;
  span: number;
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
      className={`min-w-0 [perspective:1000px] ${spanClasses[span]}`}
    >
      <div ref={tiltRef} className="pointer-surface pointer-tilt group card interactive-card project-card relative flex h-full cursor-pointer flex-col overflow-hidden p-0 text-left">
        <div
          className={`relative w-full shrink-0 overflow-hidden border-b border-line ${
            p.featured ? "h-44 sm:h-48 lg:h-72" : "h-44 sm:h-48"
          }`}
        >
          {p.image ? (
            <Image
              src={p.image}
              alt={screenshotAlt(p)}
              fill
              sizes={`(min-width: 1152px) ${span * 376 - 24}px, (min-width: 1024px) calc(${span * 100 / 3}vw - ${8 * span + 24}px), (min-width: 768px) calc(50vw - 36px), (min-width: 640px) calc(50vw - 32px), calc(100vw - 40px)`}
              className="project-image object-cover"
              loading="lazy"
            />
          ) : (
            <ProjectCover category={p.category} />
          )}
          {p.featured && (
            <span className="pointer-events-none absolute left-3 top-3 rounded-md bg-canvas/90 px-2 py-1 text-[11px] font-semibold text-ink">
              Featured
            </span>
          )}
          <span className="pointer-events-none absolute bottom-2 right-2 rounded-md bg-canvas/90 px-2 py-1 text-[11px] font-medium text-ink opacity-0 transition-opacity group-hover:opacity-100">
            Click for details
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <header className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="text-lg font-semibold leading-snug md:text-xl">
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
              </h3>
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
          {p.category && (
            <span className="mt-3 inline-block self-start rounded-md bg-ink/[0.06] px-2 py-0.5 text-xs font-medium text-muted">
              {p.category}
            </span>
          )}
          {p.desc && (
            <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
              {p.desc}
            </p>
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
  const cells = useMemo(() => desktopCells(list), [list]);

  return (
    <div>
      {categories.length > 2 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
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

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, index) => (
          <ProjectCard
            key={p.slug}
            project={p}
            delay={columns === 3 ? cells[index].delay : (index % columns) * 0.06}
            span={cells[index].span}
            revealed={revealed.has(p.slug)}
            onReveal={markRevealed}
            onOpen={setActive}
          />
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <ProjectModal project={active} onClose={closeModal} />
        )}
      </AnimatePresence>
    </div>
  );
}
