import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Globe } from "lucide-react";
import { projects } from "@/lib/data";
import TerminalBar from "@/components/ui/TerminalBar";
import { PageReveal } from "@/components/ui/Reveal";

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
  const sections = [
    { title: "Problem", body: project.problem },
    { title: "Role", body: project.role },
    { title: "Approach", body: project.approach },
    { title: "Results", body: project.results },
  ];

  return (
    <main id="main" tabIndex={-1} className="container py-10 md:py-16">
      <Link
        href="/#projects"
        className="btn-secondary"
      >
        <ArrowLeft size={15} />
        cd ~/projects/ <span className="sr-only">Back to Projects</span>
      </Link>

      <article className="mx-auto mt-8 max-w-4xl">
        <PageReveal>
          <header className="card overflow-hidden">
            <TerminalBar>~/projects/<span className="text-brand">{project.slug}</span></TerminalBar>
            <div className="p-5 sm:p-8">
              {project.category && (
                <p className="font-mono text-xs text-muted">{project.category}</p>
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
                    <li key={tool} className="font-mono text-xs leading-relaxed text-muted">
                      [{tool.toLowerCase()}]
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
            </div>
          </header>
        </PageReveal>

        {project.image && (
          <PageReveal delay={0.08} className="card mt-6 overflow-hidden">
            <TerminalBar>~/projects/{project.slug}/preview</TerminalBar>
            <div className="relative aspect-video bg-steel">
              <Image
                src={project.image}
                alt={`Screenshot of ${project.title}${project.desc ? `: ${project.desc}` : ""}`}
                fill
                sizes="(max-width: 936px) calc(100vw - 40px), 896px"
                className="object-contain"
              />
            </div>
          </PageReveal>
        )}

        <div className="mt-6 space-y-4">
          {project.details && (
            <PageReveal delay={0.16}>
              <section className="card overflow-hidden">
                <TerminalBar>$ cat overview.md</TerminalBar>
                <div className="p-5 sm:p-8">
                  <h2 className="text-2xl font-bold tracking-tight text-ink">overview<span aria-hidden="true" className="text-brand">/</span></h2>
                  <p className="mt-4 leading-relaxed text-muted">{project.details}</p>
                </div>
              </section>
            </PageReveal>
          )}
          {sections.filter((section) => section.body).map((section, index) => (
            <PageReveal key={section.title} delay={0.24 + index * 0.06}>
              <section className="card overflow-hidden">
                <TerminalBar>$ cat {section.title.toLowerCase()}.md</TerminalBar>
                <div className="p-5 sm:p-8">
                  <h2 className="text-2xl font-bold tracking-tight text-ink">{section.title.toLowerCase()}<span aria-hidden="true" className="text-brand">/</span></h2>
                  <p className="mt-4 whitespace-pre-line leading-relaxed text-muted">{section.body}</p>
                </div>
              </section>
            </PageReveal>
          ))}
        </div>
      </article>
    </main>
  );
}
