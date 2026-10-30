import type { Project, ProjectDiagram } from "@/lib/data";
import styles from "./ProjectArtwork.module.css";

/** Static, theme-aware artwork: HTML labels stay readable at any card width. */
export default function ProjectArtwork({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  const diagram: ProjectDiagram = project.diagram ?? {
    kind: "flow",
    heading: project.category ?? "Project overview",
    note: project.title,
    items: (project.stack ?? []).slice(0, 3).map((tool) => ({ label: tool, value: "" })),
  };
  const total = diagram.items.reduce((sum, item) => sum + (item.amount ?? 0), 0);
  const description = `${diagram.heading}. ${diagram.items.map((item) => `${item.label}: ${item.value}`).join(". ")}. ${diagram.note}.`;

  return (
    <div
      role={compact ? undefined : "img"}
      aria-label={compact ? undefined : description}
      aria-hidden={compact || undefined}
      className={`${styles.artwork} ${compact ? styles.compact : ""}`}
    >
      <div className={styles.inner} aria-hidden="true">
        <div className={styles.heading}>
          <span className={styles.marker} />
          <span>{diagram.heading}</span>
        </div>

        {diagram.kind === "bars" ? (
          <div className={styles.bars}>
            {diagram.items.map((item) => (
              <div key={item.label} className={styles.barRow}>
                <div className={styles.barLabel}><span>{item.label}</span><strong>{item.value}</strong></div>
                <div className={styles.barTrack}>
                  <span style={{ width: `${Math.min(1, Math.max(0, item.amount ?? 0)) * 100}%` }} />
                </div>
              </div>
            ))}
            <div className={styles.axis}><span>0</span><span>1.0</span></div>
          </div>
        ) : diagram.kind === "distribution" ? (
          <div className={styles.distribution}>
            <div className={styles.segments}>
              {diagram.items.map((item) => (
                <span key={item.label} style={{ flex: item.amount ?? 0 }} />
              ))}
            </div>
            <div className={styles.legend}>
              {diagram.items.map((item) => (
                <div key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
            <span className={styles.axis}>{total.toLocaleString("en-US")} students</span>
          </div>
        ) : (
          <div className={styles.flow}>
            {diagram.items.map((item, index) => (
              <div key={item.label} className={styles.node}>
                <svg viewBox="0 0 48 40" focusable="false">
                  {index === 0 ? (
                    <g fill="none" stroke="currentColor" strokeWidth="1.5">
                      <ellipse cx="24" cy="9" rx="16" ry="5" />
                      <path d="M8 9v22c0 7 32 7 32 0V9M8 20c0 7 32 7 32 0" />
                    </g>
                  ) : index === 1 ? (
                    <g fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="m9 10 30 20M9 30l30-20M9 10h30M9 30h30" />
                      {[[9, 10], [9, 30], [24, 20], [39, 10], [39, 30]].map(([cx, cy]) => (
                        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" className={styles.nodeDot} />
                      ))}
                    </g>
                  ) : (
                    <g fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="5" y="4" width="38" height="32" rx="4" />
                      <path d="M5 13h38M13 21h9M13 27h9M29 21h6M29 27h6" />
                    </g>
                  )}
                </svg>
                <strong>{item.label}</strong>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
        )}

        <div className={styles.footnote}>
          <span>{diagram.note}</span>
          <span className={styles.endmark}>↗</span>
        </div>
      </div>
    </div>
  );
}
