"use client";
import { IconType } from "react-icons";
import {
  SiPython,
  SiApacheairflow,
  SiApachespark,
  SiPostgresql,
  SiGooglebigquery,
  SiMysql,
  SiDocker,
  SiGooglecloud,
  SiLinux,
  SiGrafana,
  SiTensorflow,
  SiScikitlearn,
  SiGit,
  SiMetabase,
} from "react-icons/si";
import { Database, BarChart3 } from "lucide-react";

type Tool = { name: string; icon: IconType | typeof Database; brandColor: string };

const TOOLS: Tool[] = [
  { name: "Python", icon: SiPython, brandColor: "#3776AB" },
  { name: "SQL", icon: Database, brandColor: "#38bdf8" },
  { name: "Apache Spark", icon: SiApachespark, brandColor: "#E25A1C" },
  { name: "Airflow", icon: SiApacheairflow, brandColor: "#017CEE" },
  { name: "PostgreSQL", icon: SiPostgresql, brandColor: "#4169E1" },
  { name: "BigQuery", icon: SiGooglebigquery, brandColor: "#4285F4" },
  { name: "MySQL", icon: SiMysql, brandColor: "#4479A1" },
  { name: "Docker", icon: SiDocker, brandColor: "#2496ED" },
  { name: "Google Cloud", icon: SiGooglecloud, brandColor: "#4285F4" },
  { name: "Linux", icon: SiLinux, brandColor: "#FCC624" },
  { name: "Grafana", icon: SiGrafana, brandColor: "#F46800" },
  { name: "TensorFlow", icon: SiTensorflow, brandColor: "#FF6F00" },
  { name: "Scikit-learn", icon: SiScikitlearn, brandColor: "#F7931E" },
  { name: "Power BI", icon: BarChart3, brandColor: "#F2C811" },
  { name: "Git", icon: SiGit, brandColor: "#F05032" },
  { name: "Metabase", icon: SiMetabase, brandColor: "#509EE3" },
];

// Duplicated once for a seamless infinite loop (see .marquee-track keyframes)
const LOOP = [...TOOLS, ...TOOLS];

function ToolCard({ tool }: { tool: Tool }) {
  const Icon = tool.icon;
  return (
    <div className="card flex w-32 shrink-0 flex-col items-center gap-3 px-4 py-5 sm:w-36">
      <Icon size={30} color={tool.brandColor} aria-hidden />
      <span className="text-xs sm:text-sm font-medium text-white/80 text-center">
        {tool.name}
      </span>
    </div>
  );
}

export default function TechCarousel() {
  return (
    <div className="marquee-mask -mx-4 overflow-hidden px-4">
      <div className="marquee-track flex w-max gap-4">
        {LOOP.map((tool, i) => (
          <ToolCard key={`${tool.name}-${i}`} tool={tool} />
        ))}
      </div>
    </div>
  );
}
