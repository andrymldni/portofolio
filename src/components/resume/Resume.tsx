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
    role: "Data Analyst",
    org: "PT Bank Rakyat Indonesia (Persero) Tbk",
    location: "Jakarta",
    period: "Sep 2026 – Present",
    bullets: [],
  },
  {
    role: "Data Analyst Intern",
    org: "PT Bank Rakyat Indonesia — BRILink Business Group",
    location: "Jakarta",
    period: "Nov 2025 – May 2026",
    bullets: [
      "Extracted, reconciled, and analyzed transactional data covering 1.19M+ BRILink agents across 18 regional offices using Python and SQL, resolving cross-system discrepancies and turning findings into business narratives for leadership reviews.",
      "Built interactive Power BI dashboards tracking 150 product features across all 18 regional offices, giving management granular, real-time KPI and performance views for each region.",
      "Developed K-Means clustering models on 120 transaction features to uncover sales patterns across 586 regencies, shaping market-penetration strategies aimed at improving agent profitability.",
      "Engineered a data-driven Acquisition Scorecard by statistically profiling 4,631 high-tier agents across 5 financial dimensions, replacing subjective field recruitment with a prioritized pipeline of high-yield prospects.",
    ],
  },
  {
    role: "Data Analyst Intern",
    org: "BPJS Ketenagakerjaan Tanjung Perak",
    location: "Surabaya",
    period: "Jul 2023 – Dec 2023",
    bullets: [
      "Processed, reconciled, and validated 7,000+ participant records across legacy operational systems, improving data quality and the accuracy of claim-status tracking.",
      "Developed an LSTM-based forecasting model for Work Accident Insurance (JKK) claims, improving accuracy by 17% over baseline methods.",
      "Built Python automation scripts that removed manual data-entry bottlenecks in reporting workflows, improving processing efficiency by about 15%.",
      "Designed dashboards and structured reports on claim and participant trends, streamlining data requests and supporting data-driven decisions.",
    ],
  },
];

const ORGANIZATION: Entry[] = [
  {
    role: "Technical & Event Support (Volunteer)",
    org: "Google Developer Group (GDG) Surabaya",
    location: "Surabaya",
    period: "Jul 2025 – Aug 2025",
    bullets: [
      "Coordinated end-to-end workshop and meetup logistics for 150+ participants, covering venue readiness, registration flow, session transitions, and on-site troubleshooting.",
      "Worked with speakers, sponsors, and vendors to align technical requirements and schedules, keeping run-of-show updates and handoffs on time.",
      "Prepared AV and connectivity setups for live sessions, and wrote post-event reports to improve future event execution.",
    ],
  },
];

type Publication = {
  title: string;
  venue: string;
  date: string;
  link: string;
  note: string;
};

const PUBLICATIONS: Publication[] = [
  {
    title:
      "Multimodal Detection of Covert Online Gambling Advertisements Using Faster R-CNN and TrOCR",
    venue: "Journal Bit-Tech, Vol. 8 No. 1",
    date: "Aug 2025",
    link: "https://doi.org/10.32877/bt.v8i1.2769",
    note: "Combines Faster R-CNN (98.1% AP) for visual cues, TrOCR (4.6% CER) for in-image text, and a BERT classifier (99% accuracy) in a Flask app that screens social-media images and videos in real time.",
  },
  {
    title:
      "Development of Extraction-based Text Summarization Application to Improve Children's Literacy in Storybook Reading",
    venue: "2022 IEEE 8th Information Technology International Seminar (ITIS) · Co-author",
    date: "Oct 2022",
    link: "https://ieeexplore.ieee.org/document/10009964",
    note: "An extractive summarization app that condenses children's storybooks into their key ideas to support early reading literacy.",
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
      <div className="cv-divider mt-2 w-full" />
    </div>
  );
}

function EntryBlock({ entry }: { entry: Entry }) {
  return (
    <div className="mb-6 last:mb-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
        <h4 className="font-bold text-slate-900">{entry.role}</h4>
        {entry.location && (
          <span
            className="cv-accent text-sm italic"
          >
            {entry.location}
          </span>
        )}
      </div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
        <p className="text-sm text-slate-500">{entry.org}</p>
        <span className="text-xs italic text-slate-400">{entry.period}</span>
      </div>
      {entry.bullets.length > 0 && (
        <ul className="mt-2 space-y-1.5">
          {entry.bullets.map((b, i) => (
            <li
              key={i}
              className="flex gap-2 text-sm leading-relaxed text-slate-700"
            >
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400" />
              {b}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function PublicationBlock({ pub }: { pub: Publication }) {
  return (
    <div className="mb-6 last:mb-0">
      <a
        href={pub.link}
        target="_blank"
        rel="noreferrer"
        className="font-bold text-slate-900 hover:underline"
      >
        {pub.title}
      </a>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
        <p className="text-sm text-slate-500">{pub.venue}</p>
        <span className="text-xs italic text-slate-400">{pub.date}</span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-slate-700">{pub.note}</p>
    </div>
  );
}

export default function Resume() {
  return (
    <div className="flex flex-col items-center">
      {/* Stand-out download action, sitting above the document */}
      <a href="/Andry_Syva_Maldini_CV.pdf" download className="btn-primary mb-8">
        <Download size={16} />
        Download CV
      </a>

      {/* Inline CV — a white "paper" document stacked over the dark backdrop */}
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="cv-paper w-full max-w-4xl overflow-hidden"
      >
        <div className="p-6 sm:p-10 md:p-14">
          {/* Header */}
          <header className="border-b border-slate-200 pb-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Andry Syva{" "}
              <span className="cv-accent">Maldini</span>
            </h1>
            <p className="mt-1 text-sm sm:text-base italic text-slate-500">
              Data Scientist · Business Intelligence · Data Analyst · Data
              Engineer
            </p>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs sm:text-sm text-slate-600">
              <span className="flex items-center gap-1.5">
                <Phone size={14} className="shrink-0" />
                +62 858-9581-2699
              </span>
              <a
                href="mailto:andrymldni@gmail.com"
                className="flex items-center gap-1.5 hover:text-slate-900"
              >
                <Mail size={14} className="shrink-0" />
                andrymldni@gmail.com
              </a>
              <a
                href="https://andrymldni.dev"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-slate-900"
              >
                <Globe size={14} className="shrink-0" />
                andrymldni.dev
              </a>
              <a
                href="https://github.com/andrymldni"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-slate-900"
              >
                <Github size={14} className="shrink-0" />
                andrymldni
              </a>
              <a
                href="https://www.linkedin.com/in/andrymldni"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-slate-900"
              >
                <Linkedin size={14} className="shrink-0" />
                andrymldni
              </a>
              <span className="flex items-center gap-1.5">
                Jakarta, Indonesia
              </span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Data Analyst at Bank Rakyat Indonesia and Data Science graduate
              with a strong background in data pipeline architecture,
              predictive modeling, and business intelligence, supported by
              hands-on experience across government institutions
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
                <EntryBlock key={e.role + e.org + e.period} entry={e} />
              ))}
            </section>

            <section>
              <SectionHeading>Organizational Experience</SectionHeading>
              {ORGANIZATION.map((e) => (
                <EntryBlock key={e.role} entry={e} />
              ))}
            </section>

            <section>
              <SectionHeading>Publications</SectionHeading>
              {PUBLICATIONS.map((p) => (
                <PublicationBlock key={p.link} pub={p} />
              ))}
            </section>

            <div className="grid gap-10 sm:grid-cols-2">
              <section>
                <SectionHeading>Education</SectionHeading>
                {EDUCATION.map((ed) => (
                  <div key={ed.school}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                      <h4 className="font-bold text-slate-900">{ed.school}</h4>
                      <span className="text-xs italic text-slate-400">
                        {ed.period}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500">{ed.degree}</p>
                    <p className="mt-1 text-sm text-slate-600">{ed.note}</p>
                  </div>
                ))}
              </section>

              <section>
                <SectionHeading>Certifications</SectionHeading>
                <ul className="space-y-1.5">
                  {CERTIFICATIONS.map((c) => (
                    <li
                      key={c}
                      className="flex gap-2 text-sm leading-relaxed text-slate-700"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400" />
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
                      className="cv-accent text-xs font-bold uppercase tracking-wide"
                    >
                      {s.label}
                    </dt>
                    <dd className="mt-1 text-sm text-slate-600 leading-relaxed">
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
