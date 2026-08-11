"use client";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ExternalLink,
  Github,
  X,
  Brain,
  Sparkles,
  BarChart3,
  Workflow,
  ScanEye,
  Languages,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { projects, type Project } from "@/lib/data";

/** Category → icon + gradient used to render a cover when a project has no screenshot. */
const CATEGORY_META: Record<string, { icon: LucideIcon; gradient: string }> = {
  "AI/ML": {
    icon: Brain,
    gradient: "linear-gradient(135deg, #6d28d9, #a855f7 60%, #38bdf8)",
  },
  ML: {
    icon: Sparkles,
    gradient: "linear-gradient(135deg, #3730a3, #6366f1 55%, #38bdf8)",
  },
  "Data Analytics": {
    icon: BarChart3,
    gradient: "linear-gradient(135deg, #0f766e, #10b981 55%, #a3e635)",
  },
  MLOps: {
    icon: Workflow,
    gradient: "linear-gradient(135deg, #b45309, #f59e0b 55%, #fbbf24)",
  },
  "Computer Vision": {
    icon: ScanEye,
    gradient: "linear-gradient(135deg, #9f1239, #f43f5e 55%, #fb7185)",
  },
  NLP: {
    icon: Languages,
    gradient: "linear-gradient(135deg, #155e75, #06b6d4 55%, #67e8f9)",
  },
};
const DEFAULT_META = {
  icon: Sparkles,
  gradient: "linear-gradient(135deg, rgb(var(--brand)), rgb(var(--brand-2)))",
};

function ProjectCover({
  category,
  className,
}: {
  category?: string;
  size?: "sm" | "lg";
  className?: string;
}) {
  const meta = (category && CATEGORY_META[category]) || DEFAULT_META;
  const Icon = meta.icon;
  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden ${className ?? ""}`}
      style={{ background: meta.gradient }}
      aria-hidden="true"
    >
      <Icon
        size={112}
        strokeWidth={1}
        className="pointer-events-none absolute -bottom-5 -right-5 rotate-12 text-white/15"
      />
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm ring-1 ring-white/25">
        <Icon size={26} className="text-white" strokeWidth={1.75} />
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

        <div className="relative h-44 w-full sm:h-56">
          {project.image ? (
            <>
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 640px) 100vw, 32rem"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            </>
          ) : (
            <ProjectCover category={project.category} />
          )}
        </div>

        <div className="p-6">
          {project.category && (
            <span className="inline-block rounded-full bg-violet-500/20 px-2.5 py-1 text-xs font-medium text-violet-300">
              {project.category}
            </span>
          )}
          <h3 className="mt-3 text-xl font-bold text-white">
            {project.title}
          </h3>
          {project.stack && (
            <p className="mt-1 text-sm text-white/50">
              {project.stack.join(" · ")}
            </p>
          )}
          <p className="mt-4 text-sm leading-relaxed text-white/75">
            {project.details ?? project.desc}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="cv-download-btn"
              >
                <Sparkles size={15} />
                Live Demo
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className={
                  project.demo
                    ? "card inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold hover:bg-white/10"
                    : "cv-download-btn"
                }
              >
                {project.demo ? <Github size={15} /> : <ExternalLink size={15} />}
                {project.demo ? "Source Code" : "View Project"}
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects({
  projectsData,
}: {
  projectsData?: Project[];
}) {
  const reduce = useReducedMotion();
  const source =
    projectsData && projectsData.length > 0 ? projectsData : projects;
  const categories = useMemo(
    () => [
      "All",
      ...Array.from(
        new Set(source.map((p) => p.category).filter(Boolean) as string[])
      ),
    ],
    [source]
  );
  const [activeCategory, setActiveCategory] = useState("All");
  const list = useMemo(
    () =>
      activeCategory === "All"
        ? source
        : source.filter((p) => p.category === activeCategory),
    [source, activeCategory]
  );
  const [active, setActive] = useState<Project | null>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const Card: any = reduce ? "article" : motion.article;

  return (
    <div>
      {categories.length > 2 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors sm:text-sm ${
                activeCategory === cat
                  ? "border-transparent text-white"
                  : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
              }`}
              style={
                activeCategory === cat
                  ? {
                      background:
                        "linear-gradient(135deg, rgb(var(--brand)), rgb(var(--brand-2)))",
                    }
                  : undefined
              }
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, index) => (
          <Card
            key={p.title}
            {...(reduce
              ? {}
              : {
                  initial: { opacity: 0, y: 28 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, margin: "-60px" },
                  transition: {
                    duration: 0.5,
                    delay: Math.min(index * 0.07, 0.35),
                    ease: [0.16, 1, 0.3, 1],
                  },
                })}
            onPointerMove={handlePointerMove}
            className={`group relative card cursor-pointer overflow-hidden p-0 text-left ${
              p.featured ? "sm:col-span-2" : ""
            }`}
            whileHover={reduce ? undefined : { y: -4 }}
            whileTap={reduce ? undefined : { scale: 0.995 }}
            onClick={() => setActive(p)}
            role="button"
            tabIndex={0}
            aria-haspopup="dialog"
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") setActive(p);
            }}
          >
              <div
                className={`relative w-full ${p.featured ? "h-52 sm:h-64" : "h-44"}`}
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
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                {p.featured && (
                  <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white backdrop-blur-md">
                    Featured
                  </span>
                )}
                <span className="pointer-events-none absolute bottom-2 right-2 rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-medium text-white opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">
                  Click for details
                </span>
              </div>
              <div className="p-5">
                <header className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold">
                      {p.title}
                    </h3>
                    {p.stack && (
                      <p className="text-sm text-white/60 mt-1">
                        {p.stack.join(" · ")}
                      </p>
                    )}
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    {p.demo && (
                      <a
                        href={p.demo}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="opacity-80 hover:opacity-100"
                        aria-label={`Open live demo for ${p.title}`}
                        title="Live demo"
                      >
                        <Sparkles size={17} />
                      </a>
                    )}
                    {p.link && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="opacity-80 hover:opacity-100"
                        aria-label={`Visit project ${p.title}`}
                        title="Buka tautan"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </header>
                <div className="mt-2 flex items-center gap-2">
                  {p.category && (
                    <span className="inline-block text-xs px-2 py-1 bg-violet-500/20 text-violet-300 rounded-full">
                      {p.category}
                    </span>
                  )}
                </div>
                {p.desc && (
                  <p className="mt-3 text-sm md:text-base leading-relaxed text-white/70">
                    {p.desc}
                  </p>
                )}
              </div>
              <span
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                aria-hidden
                style={{
                  background:
                    "radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), rgba(168,85,247,0.14), transparent 40%)",
                }}
              />
          </Card>
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
