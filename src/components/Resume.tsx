"use client";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  Globe,
  Github,
  Linkedin,
  Download,
} from "lucide-react";

type Entry = {
  role: string;
  org: string;
  location?: string;
  period: string;
  bullets: string[];
};

const EXPERIENCE: Entry[] = [
  {
    role: "Data Analyst Intern",
    org: "PT Bank Rakyat Indonesia",
    location: "Jakarta",
    period: "Nov 2025 – May 2026",
    bullets: [
      "Extracted, cleaned, validated, and analyzed transactional data from multiple branches using SQL and Python to identify business trends and operational opportunities.",
      "Developed Power BI dashboards and performance reports to monitor transaction volume, agent activity, and key business KPIs.",
      "Performed statistical analysis and segmentation using K-Means clustering to support business strategy and agent classification programs.",
      "Presented analytical findings and actionable recommendations to stakeholders through regular reporting and business performance reviews.",
    ],
  },
  {
    role: "Data Analyst Intern",
    org: "BPJS Ketenagakerjaan Tanjung Perak",
    location: "Surabaya",
    period: "Jul 2023 – Dec 2023",
    bullets: [
      "Processed, cleaned, and validated 7k+ participant records to ensure data accuracy, consistency, and integrity across operational systems.",
      "Conducted data analysis and reporting to identify operational trends and support decision-making processes.",
      "Built Python automation scripts for data cleaning and reporting workflows, improving processing efficiency by approximately 15%.",
      "Created dashboards and analytical reports to communicate findings and support data-driven recommendations.",
    ],
  },
];

const ORGANIZATION: Entry[] = [
  {
    role: "Event Volunteer — Staff",
    org: "Google Developer Group (GDG) Surabaya",
    location: "Surabaya",
    period: "Jul 2025 – Aug 2025",
    bullets: [
      "Managed technical setup and provided real-time troubleshooting for AV systems and internet connectivity, ensuring seamless live sessions.",
      "Responded to attendee inquiries in a polite and professional manner, providing guidance and escalating complex technical issues to the relevant team.",
      "Developed post-event documentation and reports to support knowledge transfer and improve future event execution.",
    ],
  },
];

const EDUCATION = [
  {
    school: "UPN \"Veteran\" Jawa Timur",
    degree: "Bachelor of Data Science",
    period: "Aug 2021 – Jul 2025",
    note: "GPA 3.71 / 4.00",
  },
];

const CERTIFICATIONS = [
  "BNSP Junior Web Programmer",
  "Google Data Analytics Professional Certificate",
  "Google IT Automation with Python Professional Certificate",
  "Machine Learning Operations (MLOps)",
  "Alibaba Cloud - ACA Big Data Certification",
  "Bangkit Academy 2024 - Machine Learning",
];

const SKILLS = [
  {
    label: "Technical",
    value:
      "Python, SQL, Apache Spark, PostgreSQL, BigQuery, MySQL, Google Cloud, Linux, Docker, Grafana, MLOps, TensorFlow, Scikit-learn, Power BI, Metabase",
  },
  {
    label: "Soft Skills",
    value:
      "Analytical & Critical Thinking, Problem-Solving, Stakeholder Management, Cross-Functional Collaboration",
  },
  {
    label: "Language",
    value: "Indonesian (Native), English (Professional Working Proficiency)",
  },
];

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <h3 className="cv-heading text-lg md:text-xl font-bold uppercase tracking-wide">
        {children}
      </h3>
      <div className="cv-divider mt-1.5 w-full" />
    </div>
  );
}

function EntryBlock({ entry }: { entry: Entry }) {
  return (
    <div className="mb-6 last:mb-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
        <h4 className="font-bold text-zinc-900">{entry.role}</h4>
        {entry.location && (
          <span
            className="text-sm italic"
            style={{ color: "rgb(var(--brand))" }}
          >
            {entry.location}
          </span>
        )}
      </div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
        <p className="text-sm text-zinc-500">{entry.org}</p>
        <span className="text-xs italic text-zinc-400">{entry.period}</span>
      </div>
      <ul className="mt-2 space-y-1.5">
        {entry.bullets.map((b, i) => (
          <li
            key={i}
            className="flex gap-2 text-sm leading-relaxed text-zinc-700"
          >
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-400" />
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Resume() {
  return (
    <div className="flex flex-col items-center">
      {/* Stand-out download action, sitting above the document */}
      <a href="/Andry_Syva_Maldini_CV.pdf" download className="cv-download-btn mb-8">
        <Download size={16} />
        Download CV
      </a>

      {/* Inline CV — a white "paper" document stacked over the dark backdrop */}
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ type: "spring", duration: 0.7 }}
        className="cv-paper w-full max-w-4xl overflow-hidden"
      >
        <div className="p-6 sm:p-10 md:p-14">
          {/* Header */}
          <header className="border-b border-zinc-200 pb-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900">
              Andry Syva{" "}
              <span style={{ color: "rgb(var(--brand))" }}>Maldini</span>
            </h1>
            <p className="mt-1 text-sm sm:text-base italic text-zinc-500">
              Data Scientist · Business Intelligence · Data Analyst · Data
              Engineer
            </p>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs sm:text-sm text-zinc-600">
              <span className="flex items-center gap-1.5">
                <Phone size={14} className="shrink-0" />
                +62 858-9581-2699
              </span>
              <a
                href="mailto:andrymldni@gmail.com"
                className="flex items-center gap-1.5 hover:text-zinc-900"
              >
                <Mail size={14} className="shrink-0" />
                andrymldni@gmail.com
              </a>
              <a
                href="https://andrymldni.dev"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-zinc-900"
              >
                <Globe size={14} className="shrink-0" />
                andrymldni.dev
              </a>
              <a
                href="https://github.com/andrymldni"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-zinc-900"
              >
                <Github size={14} className="shrink-0" />
                andrymldni
              </a>
              <a
                href="https://www.linkedin.com/in/andrymldni"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-zinc-900"
              >
                <Linkedin size={14} className="shrink-0" />
                andrymldni
              </a>
              <span className="flex items-center gap-1.5">
                Jakarta, Indonesia
              </span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-zinc-600">
              Data Science graduate with a strong background in data pipeline
              architecture, predictive modeling, and business intelligence,
              supported by hands-on experience across government institutions
              and state-owned enterprises. Skilled in transforming complex
              datasets into actionable insights through ETL processes, big
              data processing, forecasting, and dashboard development.
            </p>
          </header>

          {/* Body */}
          <div className="mt-8 space-y-10">
            <section>
              <SectionHeading>Work Experience</SectionHeading>
              {EXPERIENCE.map((e) => (
                <EntryBlock key={e.role + e.org} entry={e} />
              ))}
            </section>

            <section>
              <SectionHeading>Organizational Experience</SectionHeading>
              {ORGANIZATION.map((e) => (
                <EntryBlock key={e.role} entry={e} />
              ))}
            </section>

            <div className="grid gap-10 sm:grid-cols-2">
              <section>
                <SectionHeading>Education</SectionHeading>
                {EDUCATION.map((ed) => (
                  <div key={ed.school}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                      <h4 className="font-bold text-zinc-900">{ed.school}</h4>
                      <span className="text-xs italic text-zinc-400">
                        {ed.period}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-500">{ed.degree}</p>
                    <p className="mt-1 text-sm text-zinc-600">{ed.note}</p>
                  </div>
                ))}
              </section>

              <section>
                <SectionHeading>Certifications</SectionHeading>
                <ul className="space-y-1.5">
                  {CERTIFICATIONS.map((c) => (
                    <li
                      key={c}
                      className="flex gap-2 text-sm leading-relaxed text-zinc-700"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-400" />
                      {c}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <section>
              <SectionHeading>Skills</SectionHeading>
              <dl className="grid gap-4 sm:grid-cols-3">
                {SKILLS.map((s) => (
                  <div key={s.label}>
                    <dt
                      className="text-xs font-bold uppercase tracking-wide"
                      style={{ color: "rgb(var(--brand))" }}
                    >
                      {s.label}
                    </dt>
                    <dd className="mt-1 text-sm text-zinc-600 leading-relaxed">
                      {s.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
