"use client";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ExternalLink,
  Github,
  Globe,
  X,
  Brain,
  Cpu,
  Database,
  BarChart3,
  Workflow,
  ScanEye,
  Languages,
  Boxes,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { projects, type Project } from "@/lib/data";
import { EASE_OUT } from "@/components/ui/Reveal";
import { useRandomEntrance } from "@/components/ui/RandomReveal";

/** Category → icon + muted tint, used as the cover when a project has no screenshot. */
const CATEGORY_META: Record<string, { icon: LucideIcon; tint: string }> = {
  "Data Engineering": { icon: Database, tint: "cover-blue" },
  "AI/ML": { icon: Brain, tint: "cover-graphite" },
  ML: { icon: Cpu, tint: "cover-slate" },
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
      aria-label={project.title}
    >
      <motion.div
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
              alt={project.title}
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
          <h3 className="mt-2 text-xl font-semibold text-ink">
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
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
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
                className={project.demo ? "btn-secondary" : "btn-primary"}
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
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (p: Project) => void;
}) {
  // Each card enters differently, and differently again on every scroll.
  const entrance = useRandomEntrance(index, (index % 3) * 0.07);
  return (
    <motion.article
      ref={entrance.ref}
      initial={entrance.initial}
      animate={entrance.animate}
      style={entrance.style}
      whileHover={{ y: -3 }}
      className={`group card relative cursor-pointer overflow-hidden p-0 text-left ${
        p.featured ? "sm:col-span-2" : ""
      }`}
      onClick={() => onOpen(p)}
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      onKeyDown={(e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(p);
        }
      }}
    >
      <div
        className={`relative w-full border-b border-line ${
          p.featured ? "h-52 sm:h-64" : "h-44"
        }`}
      >
        {p.image ? (
          <Image
            src={p.image}
            alt={p.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
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
      <div className="p-5">
        <header className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold leading-snug md:text-xl">
              {p.title}
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
                onClick={(e) => e.stopPropagation()}
                className="text-muted transition-colors hover:text-ink"
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
                onClick={(e) => e.stopPropagation()}
                className="text-muted transition-colors hover:text-ink"
                aria-label={`Visit project ${p.title}`}
                title="Open link"
              >
                <ExternalLink size={17} />
              </a>
            )}
          </div>
        </header>
        {p.category && (
          <span className="mt-3 inline-block rounded-md bg-ink/[0.06] px-2 py-0.5 text-xs font-medium text-muted">
            {p.category}
          </span>
        )}
        {p.desc && (
          <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
            {p.desc}
          </p>
        )}
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
            key={p.title}
            project={p}
            index={index}
            onOpen={setActive}
          />
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <ProjectModal project={active} onClose={() => setActive(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
