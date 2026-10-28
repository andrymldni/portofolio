import type { CSSProperties } from "react";
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

const ROWS = [TOOLS.slice(0, 8), TOOLS.slice(8)];

function ToolCard({ tool, duplicate }: { tool: Tool; duplicate: boolean }) {
  const Icon = tool.icon;
  return (
    <div
      className="card interactive-card group tool-card flex w-32 shrink-0 flex-col items-center gap-3 px-4 py-5 sm:w-36"
      aria-hidden={duplicate || undefined}
      style={{ "--tool-color": tool.brandColor } as CSSProperties}
    >
      <Icon size={28} className="tool-icon" aria-hidden />
      <span className="text-center text-xs font-medium text-ink/80 sm:text-sm">
        {tool.name}
      </span>
    </div>
  );
}

export default function TechCarousel() {
  return (
    <div
      className="tools-marquee marquee-mask -mx-5 -my-1 space-y-4 overflow-hidden rounded-lg px-5 py-1 md:-mx-6 md:px-6"
      tabIndex={0}
      role="group"
      aria-label="Tools and technologies. Focus or hover to pause scrolling."
    >
      {ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className={`marquee-track flex w-max ${rowIndex === 1 ? "tools-track-reverse" : ""}`}>
          {/* Equal-width halves include their trailing gap for a seamless loop. */}
          {[false, true].map((duplicate) => (
            <div key={String(duplicate)} className="tools-marquee-group flex gap-4 pr-4" aria-hidden={duplicate || undefined}>
              {row.map((tool) => <ToolCard key={tool.name} tool={tool} duplicate={duplicate} />)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
