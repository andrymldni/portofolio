"use client";
import { motion } from "framer-motion";
import { Briefcase, Users, GraduationCap, Award } from "lucide-react";

type TimelineItemData = {
  period: string;
  company: string;
  role: string;
  desc: string;
};

type TimelineItemProps = TimelineItemData & { iconColorClass: string };

const EXPERIENCES: TimelineItemData[] = [
  {
    period: "Feb 2024 – Jul 2024",
    company: "Bangkit Academy led by Google, Tokopedia, Gojek, & Traveloka",
    role: "Machine Learning Cohort",
    desc: "Completed 11 intensive courses in Python, data analysis, machine learning, and TensorFlow, including developing a plant leaf disease detection model with treatment recommendations. Achieved a 96% score in the English for Business Communication training program.",
  },
  {
    period: "Jul 2023 – Dec 2023",
    company: "BPJS Ketenagakerjaan",
    role: "Data Analyst (Internship)",
    desc: "Prepared and verified participant data for accuracy and completeness before system entry, while managing records for efficient retrieval and structured archiving. Supported administrative tasks related to social security services and insurance, and developed a predictive model for Work Accident Insurance claims using LSTM as the final internship project.",
  },
];

const ORGANIZATIONS: TimelineItemData[] = [
  {
    period: "Jul 2025 – Present",
    company: "GDG Surabaya Organizer",
    role: "Volunteer",
    desc: "Supported event logistics and coordination to ensure the smooth execution of GDG Surabaya activities. Collaborated with the organizing team to manage resources, schedules, and venue arrangements, while preparing technical requirements and materials for workshops, meetups, and conferences. Engaged with participants and speakers to provide on-site assistance and deliver a positive event experience.",
  },
];

const EDUCATIONS = [
  {
    degree: "S1 – Data Science",
    school: "UPN 'Veteran' Jawa Timur",
    period: "Aug 2021 – Jul 2025",
  },
];

const CERTS = [
  { name: "Alibaba Cloud Big Data", year: "2024" },
  { name: "Belajar Pengembangan Machine Learning", year: "2024" },
  { name: "Machine Learning Operations (MLOps)", year: "2024" },
];

function TimelineItem({
  iconColorClass,
  period,
  company,
  role,
  desc,
}: TimelineItemProps) {
  return (
    <li className="mb-10 ml-6">
      <span
        className={`absolute -left-[7px] mt-1.5 flex h-4 w-4 items-center justify-center rounded-full ring-2 ring-[rgb(var(--bg))] ${iconColorClass}`}
      >
        <div className="h-2 w-2 rounded-full bg-white" />
      </span>
      <div>
        <h3 className="text-lg md:text-xl font-semibold text-white">{role}</h3>
        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm md:text-base text-white/70">
          <span>{company}</span>
          <span className="text-white/50">{period}</span>
        </div>
        <p className="mt-3 text-sm md:text-base text-white/80 leading-relaxed">
          {desc}
        </p>
      </div>
    </li>
  );
}

export default function Resume() {
  return (
    <div className="space-y-8">
      <motion.section
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="card p-6"
      >
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Briefcase className="h-6 w-6 text-indigo-300" />
            <h3 className="text-2xl font-bold">Experience</h3>
          </div>
          <ol className="relative border-l border-white/10">
            {EXPERIENCES.map((exp, index) => (
              <TimelineItem
                key={`exp-${index}`}
                {...exp}
                iconColorClass="bg-indigo-500"
              />
            ))}
          </ol>
        </div>
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Users className="h-6 w-6 text-emerald-300" />
            <h3 className="text-2xl font-bold">Organization</h3>
          </div>
          <ol className="relative border-l border-white/10">
            {ORGANIZATIONS.map((org, index) => (
              <TimelineItem
                key={`org-${index}`}
                {...org}
                iconColorClass="bg-emerald-500"
              />
            ))}
          </ol>
        </div>
      </motion.section>
      <div className="grid gap-8 md:grid-cols-2">
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="card p-6"
        >
          <div className="flex items-center gap-3">
            <GraduationCap className="h-6 w-6 text-indigo-300" />
            <h3 className="text-xl md:text-2xl font-semibold">Education</h3>
          </div>
          <ul className="mt-4 space-y-3 text-sm md:text-base text-white/70">
            {EDUCATIONS.map((ed) => (
              <li key={ed.degree}>
                <span className="block font-medium text-white">
                  {ed.degree}
                </span>
                <span>{ed.school}</span>
                <span className="ml-2 text-white/50">({ed.period})</span>
              </li>
            ))}
          </ul>
        </motion.section>
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="card p-6"
        >
          <div className="flex items-center gap-3">
            <Award className="h-6 w-6 text-emerald-300" />
            <h3 className="text-xl md:text-2xl font-semibold">
              Certifications
            </h3>
          </div>
          <ul className="mt-4 space-y-2 text-sm md:text-base text-white/70">
            {CERTS.map((c) => (
              <li key={c.name} className="flex items-baseline">
                <span className="font-medium text-white">{c.name}</span>
                <span className="ml-auto text-white/50">{c.year}</span>
              </li>
            ))}
          </ul>
        </motion.section>
      </div>
    </div>
  );
}
