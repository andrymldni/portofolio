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
        <p className="text-base text-white/75 leading-relaxed">
          Data Science graduate with a strong background in data pipeline
          architecture, predictive modeling, and business intelligence,
          supported by hands-on experience across government institutions
          and state-owned enterprises. Skilled in Python, SQL, Apache
          Spark, PostgreSQL, Docker, and Linux, along with Bash, Google
          Cloud, and Grafana to support operational and strategic
          decision-making. Known for being analytical, detail-oriented,
          adaptable, and comfortable working in collaborative, fast-paced
          environments.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
            <span className="rounded-lg bg-violet-500/20 p-2">
              <Globe size={16} />
            </span>
            <div>
              <p className="text-xs text-white/60">Residence</p>
              <p className="text-sm font-medium">ID</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
            <span className="rounded-lg bg-violet-500/20 p-2">
              <MapPin size={16} />
            </span>
            <div>
              <p className="text-xs text-white/60">Address</p>
              <p className="text-sm font-medium">Jakarta</p>
            </div>
          </div>
          <div className="sm:col-span-2 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
            <span className="rounded-lg bg-violet-500/20 p-2">
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
            <LineChart size={18} /> Data & Business Intelligence
          </h3>
          <p className="text-base text-white/70 mt-2 leading-relaxed">
            End-to-end data work: ETL pipelines, big data processing with
            Apache Spark, and predictive modeling — translated into Power BI
            and Metabase dashboards that support real operational decisions.
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
            Engaged in community knowledge sharing, technical event support,
            and documentation to make knowledge easy to transfer within a
            team.
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
            <Rocket size={18} /> Infrastructure & MLOps
          </h3>
          <p className="text-base text-white/70 mt-2 leading-relaxed">
            Comfortable with Docker, Linux, Bash, and Google Cloud for
            deployment, plus a working foundation in MLOps for reliable,
            production-ready data systems.
          </p>
        </Card>
      </div>
    </div>
  );
}
