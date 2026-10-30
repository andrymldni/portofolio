"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, ChevronDown, GitBranch, Layers3 } from "lucide-react";
import { brilinkPipeline, projects } from "@/lib/data";
import { useProgressiveEntrance } from "@/hooks/useProgressiveEntrance";
import styles from "./SignalPath.module.css";

const project = projects.find((entry) => entry.slug === brilinkPipeline.projectSlug);
const { stages, review } = brilinkPipeline;
type Selection = (typeof stages)[number]["id"] | typeof review.id;

/** A text equivalent of both the main route and its confidence branch. */
function PipelineTranscript() {
  return (
    <>
      <ol className={styles.transcriptList}>
        {stages.map((stage) => (
          <li key={stage.id}>
            <strong>{stage.label}</strong>
            <p>{project?.approach?.[stage.approachIndex]}</p>
          </li>
        ))}
      </ol>
      <div className={styles.transcriptReview}>
        <strong>{review.label}</strong>
        <p>{review.evidence}</p>
      </div>
    </>
  );
}

export default function SignalPath() {
  const [selected, setSelected] = useState<Selection>("collect");
  const [announcement, setAnnouncement] = useState("");
  const regionRef = useRef<HTMLElement>(null);
  const instanceId = useId();
  const inspectorId = `${instanceId}-inspector`;
  const titleId = `${instanceId}-title`;
  const helpId = `${instanceId}-help`;
  useProgressiveEntrance(regionRef);

  if (!project) return null;

  const stageIndex = stages.findIndex((stage) => stage.id === selected);
  const isReview = selected === "review";
  const current = isReview ? review : stages[stageIndex];
  const evidence = "approachIndex" in current
    ? project.approach?.[current.approachIndex]
    : current.evidence;

  const select = (id: Selection) => {
    setSelected(id);
    const item = id === "review" ? review : stages.find((stage) => stage.id === id)!;
    setAnnouncement(`${item.label}. ${item.title} Evidence updated below the pipeline.`);
  };

  return (
    <section
      ref={regionRef}
      id="signal-path"
      aria-labelledby={titleId}
      className={styles.feature}
      data-calm-reveal
    >
      <div className={styles.intro}>
        <div>
          <p className={styles.eyebrow}><GitBranch size={15} aria-hidden="true" /> Inside the work</p>
          <h3 id={titleId}>Trace the signal<span aria-hidden="true">.</span></h3>
        </div>
        <p className={styles.introCopy}>
          Before the dashboard, there&apos;s a chain of decisions.
          Step inside the BRILink sentiment pipeline and see where trust is built.
        </p>
      </div>

      <div className={styles.console}>
        <div className={styles.consoleBar}>
          <span className={styles.consoleName}><Layers3 size={15} aria-hidden="true" /> BRILink / signal path</span>
          <span className={styles.documented}>Documented architecture</span>
        </div>

        <div className={styles.schematic} data-signal-interactive>
          <div className={styles.mapHeading}>
            <p id={helpId}>Select a stage to inspect the evidence.</p>
            <span aria-hidden="true">01 <span className={styles.smallRule} /> 05</span>
          </div>
          <ol className={styles.stages} aria-label="BRILink pipeline stages">
            {stages.map((stage, index) => (
              <li
                key={stage.id}
                className={styles.stage}
                data-traced={index < (isReview ? 2 : stageIndex)}
              >
                <button
                  type="button"
                  className={styles.stageButton}
                  onClick={() => select(stage.id)}
                  aria-pressed={selected === stage.id}
                  aria-controls={inspectorId}
                  aria-describedby={helpId}
                  aria-label={`${index + 1}. ${stage.label}: ${stage.value} ${stage.metric}. Inspect evidence`}
                  data-on-route={isReview && stage.id === "score" ? "true" : undefined}
                >
                  <span className={styles.stageNumber} aria-hidden="true">0{index + 1}</span>
                  <span className={styles.stageLabel}>{stage.label}</span>
                  <span className={styles.stageTool}>{stage.tool}</span>
                  <span className={styles.stageMetric}><strong>{stage.value}</strong> {stage.metric}</span>
                </button>
              </li>
            ))}
          </ol>

          <div className={styles.branchRow}>
            <p className={styles.orchestration}><span>Across the flow</span> Airflow orchestration</p>
            <div className={styles.branch} data-active={isReview || selected === "score"}>
              <button
                type="button"
                className={styles.reviewButton}
                aria-pressed={isReview}
                aria-controls={inspectorId}
                onClick={() => select("review")}
              >
                <GitBranch size={16} aria-hidden="true" />
                <span><span className={styles.branchQuestion}>Low confidence?</span><strong>Inspect human review</strong></span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <div
          id={inspectorId}
          role="region"
          aria-label={`${current.label} evidence`}
          className={styles.inspector}
          data-signal-interactive
        >
          {/* Only the content fades. Controls keep their DOM nodes and focus. */}
          <div key={selected} className={styles.inspectorContent}>
            <div className={styles.evidence}>
              <p className={styles.eyebrow}>
                {isReview ? "Branch / Human review" : `Stage 0${stageIndex + 1} / ${current.label}`}
              </p>
              <h4>{current.title}</h4>
              <p className={styles.evidenceText}>{evidence}</p>
              <p className={styles.evidenceSource}><span aria-hidden="true">↳</span> From the project&apos;s documented {isReview ? "workflow" : "approach"}</p>
            </div>

            <div className={styles.stageDetail}>
              <div className={styles.metricHeadline}>
                {"value" in current ? (
                  <><strong>{current.value}</strong><span>{current.metric}<small>{current.tool}</small></span></>
                ) : (
                  <><GitBranch className={styles.reviewIcon} size={40} aria-hidden="true" /><span className={styles.reviewHeadline}>Human review<small>{current.tool}</small></span></>
                )}
              </div>
              <dl className={styles.flowDetail}>
                <div><dt>Input</dt><dd>{current.input}</dd></div>
                <div>
                  <dt><ArrowDown className={styles.flowArrow} size={14} aria-hidden="true" />Output</dt>
                  <dd>{current.output}</dd>
                </div>
              </dl>
              <dl className={styles.supporting}>
                {current.supporting.map((fact) => (
                  <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>
                ))}
              </dl>
            </div>
          </div>

          <div className={styles.inspectorFooter}>
            <span className={styles.inspectionPosition}>
              {isReview ? "Confidence branch" : `${String(stageIndex + 1).padStart(2, "0")} / 05 stages`}
            </span>
            <button
              type="button"
              className={styles.nextButton}
              aria-controls={inspectorId}
              onClick={() => select(isReview ? "score" : stages[(stageIndex + 1) % stages.length].id)}
            >
              {isReview ? "Back to scoring" : stageIndex === stages.length - 1 ? "Back to collection" : `Next: ${stages[stageIndex + 1].label}`}
              <ArrowRight size={15} aria-hidden="true" />
            </button>
          </div>
        </div>

        <p role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</p>

        <noscript>
          <style>{"#signal-path [data-signal-interactive], #signal-path [data-signal-transcript] { display: none; }"}</style>
          <div className={styles.staticTranscript}><PipelineTranscript /></div>
        </noscript>

        <details className={styles.transcript} data-signal-transcript>
          <summary>Read the complete pipeline <ChevronDown size={16} aria-hidden="true" /></summary>
          <PipelineTranscript />
        </details>

        <footer className={styles.consoleFooter}>
          <p>Independent portfolio project.<br />Not affiliated with BRI.</p>
          <Link href={`/projects/${project.slug}`} className={styles.caseLink}>
            Read the case study <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </footer>
      </div>
    </section>
  );
}
