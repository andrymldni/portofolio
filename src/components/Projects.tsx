"use client";
import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

export type Project = {
  title: string;
  stack?: string[];
  link?: string;
  image?: string;
  category?: string;
  desc?: string;
};

const DATA: Project[] = [
  {
    title: "Human Resources Analytics",
    stack: ["Python", "Docker", "Metabase"],
    link: "https://github.com/andrymldni/Dicoding-HR-Analytics",
    image: "/proyek1.jpeg",
    category: "AI/ML",
    desc: "Predict employee churn and retention dashboard.",
  },
  {
    title: "Human Stress Detection",
    stack: ["Python", "TensorFlow", "Pipeline"],
    link: "https://github.com/andrymldni/Dicoding-MLOps-Pipeline",
    image: "/proyek2.jpeg",
    category: "AI/ML",
    desc: "Detect stress from diary-like text using DL binary classifier.",
  },
  {
    title: "Certification Success Prediction",
    stack: ["Python", "Neural Network, Streamlit"],
    link: "https://github.com/andrymldni/Dicoding-ML-Terapan/blob/main/Laporan%20Proyek%20Machine%20Learning%20-%20Andry.md",
    image: "/proyek3.jpeg",
    category: "ML",
    desc: "Predict assessment outcomes with NN for consistency and efficiency.",
  },
  {
    title: "Book Recommendation System",
    stack: ["Python"],
    link: "https://github.com/andrymldni/Dicoding-ML-Terapan/blob/main/Laporan%20Proyek%20Machine%20Learning%202%20-%20Andry.md",
    image: "/proyek4.jpg",
    category: "ML",
    desc: "Personalized book recommendations via ML.",
  },
];

const defaultImage = "/placeholder.png";

export default function Projects({
  projectsData,
}: {
  projectsData?: Project[];
}) {
  const reduce = useReducedMotion();
  const list = useMemo(
    () => (projectsData && projectsData.length > 0 ? projectsData : DATA),
    [projectsData]
  );

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
            className="group relative card p-0 overflow-hidden"
            whileHover={reduce ? undefined : { y: -4 }}
            whileTap={reduce ? undefined : { scale: 0.995 }}
          >
            <div className="relative h-44 w-full">
              <Image
                src={
                  p.image && p.image.startsWith("/") ? p.image : defaultImage
                }
                alt={p.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
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
                    className="opacity-80 hover:opacity-100"
                    aria-label={`Kunjungi proyek ${p.title}`}
                    title="Buka tautan"
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
              </header>
              <div className="mt-2 flex items-center gap-2">
                {p.category && (
                  <span className="inline-block text-xs px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded-full">
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
                  "radial-gradient(600px circle at var(--mx,50%) var(--my,50%), rgba(129,140,248,0.12), transparent 40%)",
              }}
            />
          </Card>
        ))}
      </Grid>
    </div>
  );
}
