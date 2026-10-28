export type SectionMotifKind =
  | "scatter"
  | "bars"
  | "sparkline"
  | "ticks"
  | "donut"
  | "band";

type Props = {
  kind: SectionMotifKind;
  placement: "heading" | "foot";
};

/**
 * A small data mark for the empty space beside a section heading or below a
 * section's content. Decorative and static; the surrounding CSS decides when
 * it is visible at responsive sizes.
 */
export default function SectionMotif({ kind, placement }: Props) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 160 80"
      fill="none"
      className={`section-motif section-motif--${kind} section-motif--${placement}`}
    >
      {kind === "scatter" && (
        <>
          <path d="M8 12V72H152" stroke="rgb(var(--ink))" strokeOpacity="0.5" />
          <path d="M14 60L38 48L62 54L88 32L116 38L146 18" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="14" cy="60" r="2.2" fill="currentColor" />
          <circle cx="38" cy="48" r="2.2" fill="currentColor" />
          <circle cx="62" cy="54" r="2.2" fill="currentColor" />
          <circle cx="88" cy="32" r="2.2" fill="currentColor" />
          <circle cx="116" cy="38" r="2.2" fill="currentColor" />
          <circle cx="146" cy="18" r="2.2" fill="currentColor" />
        </>
      )}

      {kind === "bars" && (
        <>
          <path d="M8 72H152" stroke="rgb(var(--ink))" strokeOpacity="0.5" />
          <rect x="16" y="46" width="8" height="26" fill="currentColor" opacity="0.65" />
          <rect x="38" y="32" width="8" height="40" fill="currentColor" opacity="0.8" />
          <rect x="60" y="52" width="8" height="20" fill="currentColor" opacity="0.5" />
          <rect x="82" y="22" width="8" height="50" fill="currentColor" opacity="0.85" />
          <rect x="104" y="38" width="8" height="34" fill="currentColor" opacity="0.7" />
          <rect x="126" y="14" width="8" height="58" fill="currentColor" opacity="0.9" />
        </>
      )}

      {kind === "sparkline" && (
        <>
          <path d="M8 12V72" stroke="rgb(var(--ink))" strokeOpacity="0.5" />
          <path
            d="M8 24H16M8 40H14M8 56H16M8 72H14"
            stroke="rgb(var(--ink))"
            strokeOpacity="0.55"
          />
          <path d="M18 62L38 46L58 54L78 30L98 38L118 20L146 28" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="78" cy="30" r="2" fill="currentColor" />
          <circle cx="118" cy="20" r="2" fill="currentColor" />
        </>
      )}

      {kind === "ticks" && (
        <>
          <path
            d="M8 20H152M8 40H152M8 60H152"
            stroke="rgb(var(--ink))"
            strokeOpacity="0.32"
          />
          <path
            d="M20 20V28M44 20V26M68 20V28M92 20V26M116 20V28M140 20V26"
            stroke="rgb(var(--ink))"
            strokeOpacity="0.55"
          />
          <path d="M20 52L44 44L68 48L92 34L116 38L140 26" stroke="currentColor" strokeWidth="1.5" />
        </>
      )}

      {kind === "donut" && (
        <>
          <circle
            cx="80"
            cy="40"
            r="24"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="113 38"
            transform="rotate(-90 80 40)"
          />
          <circle cx="80" cy="40" r="12" stroke="rgb(var(--ink))" strokeOpacity="0.45" />
          <path d="M80 12V18M80 62V68M52 40H58M102 40H108" stroke="rgb(var(--ink))" strokeOpacity="0.4" />
        </>
      )}

      {kind === "band" && (
        <>
          <path d="M8 40H152" stroke="rgb(var(--ink))" strokeOpacity="0.35" />
          <path
            d="M12 40V48M22 40V54M32 40V46M42 40V52M52 40V44M62 40V55M72 40V47M82 40V51M92 40V45M102 40V54M112 40V48M122 40V52M132 40V46M142 40V53M150 40V48"
            stroke="rgb(var(--ink))"
            strokeOpacity="0.45"
          />
          <path d="M14 32L34 28L54 34L74 24L94 30L114 20L134 26L148 18" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="74" cy="24" r="2" fill="currentColor" />
          <circle cx="134" cy="26" r="2" fill="currentColor" />
        </>
      )}
    </svg>
  );
}
