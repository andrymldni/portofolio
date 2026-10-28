import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Github,
  Globe,
} from "lucide-react";
import { projects, type Project } from "@/lib/data";
import { PageEntrance } from "@/components/ui/Reveal";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

function getProject(slug: string) {
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) notFound();
  return project;
}

const screenshotAlt = (project: Project) =>
  `Screenshot of ${project.title}${project.desc ? `: ${project.desc}` : ` (${project.category ?? "project"})`}`;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  const url = `/projects/${project.slug}`;
  const description = project.desc ?? project.details;
  return {
    title: project.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      url,
      title: project.title,
      description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description,
    },
  };
}

function SectionHeading({ title, id }: { title: string; id: string }) {
  return (
    <div className="flex items-center gap-3">
      <span aria-hidden="true" className="h-px w-8 shrink-0 bg-brand/60" />
      <h2 id={id} className="text-xl font-semibold tracking-tight text-ink">
        {title}
      </h2>
    </div>
  );
}

function ProjectNavCard({
  project,
  direction,
}: {
  project: Project;
  direction: "previous" | "next";
}) {
  const isPrevious = direction === "previous";
  return (
    <Link
      href={`/projects/${project.slug}`}
      aria-label={`${isPrevious ? "Previous" : "Next"} project: ${project.title}`}
      className="card interactive-card group flex min-w-0 items-center gap-4 p-3 sm:p-4"
    >
      <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-line bg-steel">
        {project.image ? (
          <Image
            src={project.image}
            alt={screenshotAlt(project)}
            fill
            loading="eager"
            sizes="96px"
            className="object-cover"
          />
        ) : (
          <span aria-hidden="true" className="block h-full w-full bg-ink/[0.04]" />
        )}
      </div>
      <div className="min-w-0">
        <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
          {isPrevious && <ArrowLeft size={13} aria-hidden="true" />}
          {isPrevious ? "Previous" : "Next"}
          {!isPrevious && <ArrowRight size={13} aria-hidden="true" />}
        </span>
        <span className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-ink">
          {project.title}
        </span>
        {project.category && (
          <span className="mt-0.5 block text-xs text-muted">{project.category}</span>
        )}
      </div>
    </Link>
  );
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  const projectIndex = projects.findIndex((entry) => entry.slug === project.slug);
  const previousProject = projects[(projectIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const hasHighlights = Boolean(project.highlights?.length);

  return (
    <main id="main" tabIndex={-1} className="container py-10 md:py-16">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
      >
        <ArrowLeft size={15} aria-hidden="true" />
        Back to Projects
      </Link>

      <PageEntrance key={project.slug} className="case-study-enter mx-auto mt-8 max-w-5xl">
        <header className="max-w-3xl">
          {project.category && (
            <p className="text-sm font-medium text-brand">{project.category}</p>
          )}
          <h1 className="mt-3 break-words text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl md:text-5xl">
            {project.title}
          </h1>
          {project.desc && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{project.desc}</p>
          )}
          {project.stack && (
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technology stack">
              {project.stack.map((tool) => (
                <li
                  key={tool}
                  className="rounded-md bg-ink/[0.06] px-2.5 py-1 text-xs font-medium text-muted"
                >
                  {tool}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-6 flex flex-wrap gap-3">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="btn-primary link-nudge"
              >
                <Github size={15} aria-hidden="true" />
                GitHub repo
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary link-nudge"
              >
                <Globe size={15} aria-hidden="true" />
                Live demo
              </a>
            )}
          </div>
        </header>

        {project.image && (
          <div className="card relative mt-8 aspect-[16/9] overflow-hidden bg-ink/[0.03] p-0 sm:mt-10">
            <Image
              src={project.image}
              alt={screenshotAlt(project)}
              fill
              priority
              sizes="(max-width: 1152px) calc(100vw - 40px), 1104px"
              className="object-contain"
            />
          </div>
        )}

        {hasHighlights && (
          <dl className="mt-6 grid grid-cols-3 gap-2 sm:mt-8 sm:gap-4">
            {project.highlights?.map((highlight) => (
              <div
                key={`${highlight.value}-${highlight.label}`}
                className="card min-w-0 px-3 py-4 sm:px-5 sm:py-5"
              >
                <dt className="break-words text-lg font-semibold tracking-tight text-ink sm:text-3xl">
                  {highlight.value}
                </dt>
                <dd className="mt-1 text-[11px] leading-snug text-muted sm:text-xs">
                  {highlight.label}
                </dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-start lg:gap-12">
          <div className="min-w-0 space-y-8">
            {project.problem && (
              <section aria-labelledby="problem">
                <SectionHeading title="Problem" id="problem" />
                <p className="mt-4 leading-relaxed text-muted">{project.problem}</p>
              </section>
            )}

            {project.role && (
              <section aria-labelledby="role" className="border-t border-line pt-8">
                <SectionHeading title="Role" id="role" />
                <p className="mt-4 leading-relaxed text-muted">{project.role}</p>
              </section>
            )}

            {project.approach && project.approach.length > 0 && (
              <section aria-labelledby="approach" className="border-t border-line pt-8">
                <SectionHeading title="Approach" id="approach" />
                <ol className="mt-5">
                  {project.approach.map((step, index) => (
                    <li key={step} className="flex gap-4 pb-6 last:pb-0">
                      <div className="flex flex-col items-center">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brand/45 bg-surface text-xs font-semibold text-brand">
                          {index + 1}
                        </span>
                        {index < project.approach!.length - 1 && (
                          <span aria-hidden="true" className="mt-2 w-px flex-1 bg-brand/30" />
                        )}
                      </div>
                      <p className="min-w-0 pt-1.5 text-sm leading-relaxed text-muted sm:text-base">
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {project.results && (
              <section aria-labelledby="results" className="border-t border-line pt-8">
                <SectionHeading title="Results" id="results" />
                <p className="mt-4 leading-relaxed text-muted">{project.results}</p>
              </section>
            )}
          </div>

          <aside className="lg:sticky lg:top-24">
            <div className="card p-5 sm:p-6">
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                At a glance
              </h2>
              <dl className="mt-4 space-y-5 text-sm">
                {project.category && (
                  <div>
                    <dt className="text-xs font-medium text-muted">Category</dt>
                    <dd className="mt-1 text-ink">{project.category}</dd>
                  </div>
                )}
                {project.stack && project.stack.length > 0 && (
                  <div>
                    <dt className="text-xs font-medium text-muted">Stack</dt>
                    <dd className="mt-2 flex flex-wrap gap-1.5">
                      {project.stack.map((tool) => (
                        <span
                          key={tool}
                          className="rounded-md bg-ink/[0.06] px-2 py-0.5 text-xs font-medium text-muted"
                        >
                          {tool}
                        </span>
                      ))}
                    </dd>
                  </div>
                )}
                {(project.link || project.demo) && (
                  <div>
                    <dt className="text-xs font-medium text-muted">Links</dt>
                    <dd className="mt-2 flex flex-col gap-2">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className="link-nudge inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-brand"
                        >
                          <Github size={14} aria-hidden="true" />
                          GitHub repo
                          <ArrowUpRight size={13} aria-hidden="true" />
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="link-nudge inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-brand"
                        >
                          <ExternalLink size={14} aria-hidden="true" />
                          Live demo
                          <ArrowUpRight size={13} aria-hidden="true" />
                        </a>
                      )}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </aside>
        </div>

        <nav aria-label="Project navigation" className="mt-14 border-t border-line pt-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <ProjectNavCard project={previousProject} direction="previous" />
            <ProjectNavCard project={nextProject} direction="next" />
          </div>
        </nav>
      </PageEntrance>
    </main>
  );
}
