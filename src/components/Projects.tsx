"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import Image from "next/image";
import { projects, type Project } from "@/lib/data";

const defaultImage = "/placeholder.png";

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
        className="card relative w-full max-w-lg overflow-hidden p-0"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/70"
        >
          <X size={16} />
        </button>

        {project.image && (
          <div className="relative h-44 w-full sm:h-56">
            <Image
              src={project.image.startsWith("/") ? project.image : defaultImage}
              alt={project.title}
              fill
              sizes="(max-width: 640px) 100vw, 32rem"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          </div>
        )}

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
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="cv-download-btn mt-6"
            >
              <ExternalLink size={15} />
              View Project
            </a>
          )}
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
  const list = projectsData && projectsData.length > 0 ? projectsData : projects;
  const [active, setActive] = useState<Project | null>(null);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  };
  const item = {
    hidden: { y: 18, opacity: 0, scale: 0.98 },
    show: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 16 },
    },
  };

  const Grid: any = reduce ? "div" : motion.div;
  const Card: any = reduce ? "article" : motion.article;

  return (
    <div>
      <Grid
        {...(reduce
          ? {}
          : {
              variants: container,
              initial: "hidden",
              whileInView: "show",
              viewport: { once: true, margin: "-100px" },
            })}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {list.map((p) => (
          <Card
            key={p.title}
            {...(reduce ? {} : { variants: item })}
            className="group relative card cursor-pointer p-0 overflow-hidden text-left"
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
            <div className="relative h-44 w-full">
              <Image
                src={
                  p.image && p.image.startsWith("/") ? p.image : defaultImage
                }
                alt={p.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
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
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-hidden
              style={{
                background:
                  "radial-gradient(600px circle at var(--mx,50%) var(--my,50%), rgba(168,85,247,0.14), transparent 40%)",
              }}
            />
          </Card>
        ))}
      </Grid>

      <AnimatePresence>
        {active && (
          <ProjectModal project={active} onClose={() => setActive(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
