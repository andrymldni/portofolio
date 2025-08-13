"use client";
import { motion, useReducedMotion } from "framer-motion";
import {
  Monitor,
  Globe,
  MapPin,
  Mail,
  LineChart,
  Users,
  Rocket,
} from "lucide-react";

export default function About() {
  const reduce = useReducedMotion();
  const Card: any = reduce ? "div" : motion.div;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card
        initial={{ x: -20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", duration: 0.6 }}
        className="card p-6 flex flex-col gap-4"
      >
        <h3 className="text-lg md:text-xl font-semibold flex items-center gap-2">
          <Monitor size={18} /> About
        </h3>
        <p className="text-base text-white/70 leading-relaxed">
          <em>
            I am a Data Science graduate from Universitas Pembangunan Nasional
            "Veteran" Jawa Timur with a strong passion for leveraging Machine
            Learning, Deep Learning, and Computer Vision to create impactful
            solutions. For my thesis, I developed an AI-based system for
            detecting online gambling advertisements, integrated into a web
            application to support end-to-end content moderation for images and
            text. Proficient in Python, SQL, and data visualization, I also
            bring strong communication, problem-solving, and team collaboration
            skills. I am committed to continuous learning and contributing to
            innovations that deliver real value to businesses and society.
          </em>
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
            <span className="rounded-lg bg-indigo-500/20 p-2">
              <Globe size={16} />
            </span>
            <div>
              <p className="text-xs text-white/60">Residence</p>
              <p className="text-sm font-medium">ID</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
            <span className="rounded-lg bg-indigo-500/20 p-2">
              <MapPin size={16} />
            </span>
            <div>
              <p className="text-xs text-white/60">Address</p>
              <p className="text-sm font-medium">Surabaya</p>
            </div>
          </div>
          <div className="sm:col-span-2 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
            <span className="rounded-lg bg-indigo-500/20 p-2">
              <Mail size={16} />
            </span>
            <div className="min-w-0">
              <p className="text-xs text-white/60">E-mail</p>
              <a
                href="mailto:andrymldni@gmail.com"
                className="text-sm font-medium hover:underline truncate"
              >
                andrymldni@gmail.com
              </a>
            </div>
          </div>
        </div>
        <a
          href="/CV_andrymldni.pdf"
          target="_blank"
          className="mt-4 card px-3 py-2 text-sm md:text-base w-fit"
          aria-label="See CV"
        >
          📄 See CV
        </a>
      </Card>

      <div className="grid gap-6">
        <Card
          initial={{ x: 20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", duration: 0.6 }}
          className="card p-6"
        >
          <h3 className="text-lg md:text-xl font-semibold flex items-center gap-2">
            <LineChart size={18} /> What I Do — Data Science
          </h3>
          <p className="text-base text-white/70 mt-2 leading-relaxed">
            Full-cycle model development: from data exploration, cleaning, and
            feature engineering to building tree-based and deep learning models,
            complemented by light MLOps practices for tracking, serving, and
            monitoring.
          </p>
        </Card>
        <Card
          initial={{ x: 20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", duration: 0.6 }}
          className="card p-6"
        >
          <h3 className="text-lg md:text-xl font-semibold flex items-center gap-2">
            <Users size={18} /> Engage with a Community
          </h3>
          <p className="text-base text-white/70 mt-2 leading-relaxed">
            Engaged in community knowledge sharing, basic mentorship, and
            technical documentation to facilitate easy replication of knowledge
            for the team.
          </p>
        </Card>
        <Card
          initial={{ x: 20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", duration: 0.6 }}
          className="card p-6"
        >
          <h3 className="text-lg md:text-xl font-semibold flex items-center gap-2">
            <Rocket size={18} /> Loading a Project
          </h3>
          <p className="text-base text-white/70 mt-2 leading-relaxed">
            Configuration and initialization of ML projects: environment setup,
            data loading pipelines, and integration of pre-built models and
            scripts to accelerate development.
          </p>
        </Card>
      </div>
    </div>
  );
}
