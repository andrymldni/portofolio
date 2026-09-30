"use client";
import { motion } from "framer-motion";
import { Reveal, RevealGroup, rise } from "@/components/ui/Reveal";

const FACTS: { label: string; value: string; href?: string }[] = [
  { label: "Based in", value: "Jakarta, Indonesia" },
  { label: "Currently", value: "Data Analyst, Bank Rakyat Indonesia" },
  {
    label: "Education",
    value: "B.Sc. Data Science, UPN “Veteran” Jawa Timur — GPA 3.71",
  },
  {
    label: "Email",
    value: "andrymldni@gmail.com",
    href: "mailto:andrymldni@gmail.com",
  },
];

const FOCUS = [
  {
    title: "Data & business intelligence",
    body: "End-to-end data work: ETL pipelines, big-data processing with Apache Spark, and predictive models, delivered as Power BI and Metabase dashboards that real operations run on.",
  },
  {
    title: "Infrastructure & MLOps",
    body: "Docker, Linux, Bash, and Google Cloud for deployment, with a working foundation in MLOps so models and pipelines stay reliable after they ship.",
  },
  {
    title: "Community & knowledge sharing",
    body: "Technical event support with GDG Surabaya, plus the kind of documentation that makes hand-offs inside a team painless.",
  },
];

export default function About() {
  return (
    <div className="grid gap-12 md:grid-cols-[1fr_1.1fr] md:gap-16">
      <Reveal>
        <p className="text-base leading-relaxed text-ink/85 sm:text-lg">
          Data Analyst at Bank Rakyat Indonesia and a Data Science graduate
          with a background in data-pipeline architecture, predictive
          modeling, and business intelligence, built on hands-on work at a
          state-owned bank and a national social-security agency. Analytical,
          detail-oriented, and comfortable in collaborative, fast-paced
          teams.
        </p>

        <dl className="mt-8 border-t border-line">
          {FACTS.map((f) => (
            <div
              key={f.label}
              className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-line py-3 text-sm"
            >
              <dt className="text-muted">{f.label}</dt>
              <dd className="font-medium text-ink">
                {f.href ? (
                  <a href={f.href} className="hover:underline">
                    {f.value}
                  </a>
                ) : (
                  f.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <RevealGroup delay={0.1} gap={0.12}>
        <p className="text-sm font-medium text-muted">What I work on</p>
        <ol className="mt-3">
          {FOCUS.map((item, i) => (
            <motion.li
              key={item.title}
              variants={rise}
              className="grid gap-2 border-t border-line py-5 sm:grid-cols-[2.5rem_1fr] sm:gap-4"
            >
              <span className="text-sm font-medium text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-lg font-semibold leading-snug">
                  {item.title}
                </h3>
                <p className="mt-1.5 leading-relaxed text-muted">{item.body}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </RevealGroup>
    </div>
  );
}
