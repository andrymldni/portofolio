import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Globe } from "lucide-react";
import { projects } from "@/lib/data";
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

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  const sections: { title: string; body?: string; items?: string[] }[] = [
    { title: "Problem", body: project.problem },
    { title: "Role", body: project.role },
    { title: "Approach", items: project.approach },
    { title: "Results", body: project.results },
  ];

  return (
    <main id="main" tabIndex={-1} className="container py-10 md:py-16">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
      >
        <ArrowLeft size={15} />
        Back to Projects
      </Link>

      <PageEntrance key={project.slug} className="case-study-enter mx-auto mt-8 max-w-4xl">
        <header>
          {project.category && (
            <p className="text-sm font-medium text-brand">{project.category}</p>
          )}
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl md:text-5xl">
            {project.title}
          </h1>
          {project.desc && (
            <p className="mt-5 text-lg leading-relaxed text-muted">{project.desc}</p>
          )}
          {project.stack && (
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technology stack">
              {project.stack.map((tool) => (
                <li key={tool} className="rounded-md bg-ink/[0.06] px-2.5 py-1 text-xs font-medium text-muted">
                  {tool}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-6 flex flex-wrap gap-3">
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noreferrer" className="btn-primary">
                <Globe size={15} />
                Live demo
              </a>
            )}
            {project.link && (
              <a href={project.link} target="_blank" rel="noreferrer" className={project.demo ? "btn-secondary" : "btn-primary"}>
                <ExternalLink size={15} />
                {project.demo ? "Source code" : "View project"}
              </a>
            )}
          </div>
        </header>

        {project.image && (
          <div className="card relative mt-8 aspect-video overflow-hidden p-0">
            <Image
              src={project.image}
              alt={`Screenshot of ${project.title}${project.desc ? `: ${project.desc}` : ""}`}
              fill
              sizes="(max-width: 936px) calc(100vw - 40px), 896px"
              className="object-contain"
            />
          </div>
        )}

        <div className="mt-8 space-y-6">
          {project.details && (
            <section className="card p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-ink">Overview</h2>
              <p className="mt-3 leading-relaxed text-muted">{project.details}</p>
            </section>
          )}
          {project.highlights && project.highlights.length > 0 && (
            <section className="card p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-ink">Highlights</h2>
              <dl className="mt-4 grid gap-4 sm:grid-cols-3">
                {project.highlights.map((highlight) => (
                  <div key={`${highlight.value}-${highlight.label}`}>
                    <dt className="text-2xl font-semibold text-ink">{highlight.value}</dt>
                    <dd className="mt-1 text-sm text-muted">{highlight.label}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
          {sections.filter((section) => section.body || section.items).map((section) => (
            <section key={section.title} className="card p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-ink">{section.title}</h2>
              {section.body && (
                <p className="mt-3 whitespace-pre-line leading-relaxed text-muted">{section.body}</p>
              )}
              {section.items && (
                <ol className="mt-3 list-decimal space-y-2 pl-5 leading-relaxed text-muted">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              )}
            </section>
          ))}
        </div>
      </PageEntrance>
    </main>
  );
}
