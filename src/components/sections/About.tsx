"use client";
import { motion } from "framer-motion";
import { Reveal, RevealGroup, rise } from "@/components/ui/Reveal";
import { CONTACT_EMAIL } from "@/lib/data";
import TerminalBar from "@/components/ui/TerminalBar";
import { panelSpotlight } from "@/lib/panelSpotlight";

const FACTS: { label: string; value: string; href?: string }[] = [
  { label: "Based in", value: "Jakarta, Indonesia" },
  { label: "Currently", value: "Data Analyst, Bank Rakyat Indonesia" },
  {
    label: "Education",
    value: "B.Sc. Data Science, UPN “Veteran” Jawa Timur — GPA 3.71",
  },
  {
    label: "Email",
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
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
    <div className="grid items-start gap-6 md:grid-cols-[1fr_1.1fr]">
      <Reveal {...panelSpotlight} className="panel-spotlight card min-w-0 overflow-hidden">
        <TerminalBar>~/about.md</TerminalBar>
        <div className="p-5 sm:p-7">
          <p className="text-base leading-relaxed text-ink sm:text-lg">
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
                className="grid gap-1 border-b border-line py-4 text-sm sm:grid-cols-[6rem_minmax(0,1fr)] sm:gap-4"
              >
                <dt className="font-mono text-xs text-muted">{f.label}</dt>
                <dd className="break-words font-medium text-ink">
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
        </div>
      </Reveal>

      <RevealGroup {...panelSpotlight} delay={0.1} gap={0.12} className="panel-spotlight card min-w-0 overflow-hidden">
        <TerminalBar>~/focus.md</TerminalBar>
        <p className="px-5 pt-6 font-mono text-xs text-muted sm:px-7">What I work on</p>
        <ol className="px-5 pb-2 sm:px-7">
          {FOCUS.map((item, i) => (
            <motion.li
              key={item.title}
              variants={rise}
              className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-3 border-b border-line py-5 last:border-0"
            >
              <span className="font-mono text-xs text-brand">
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
