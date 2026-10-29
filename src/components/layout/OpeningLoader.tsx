export default function OpeningLoader() {
  return (
    <div id="opening-loader" className="opening-loader" aria-hidden="true">
      <div className="opening-loader-inner">
        <p className="opening-loader-brand">
          andrymldni<span>.dev</span>
        </p>
        <svg
          className="opening-loader-chart"
          viewBox="0 0 240 48"
          fill="none"
          focusable="false"
          aria-hidden="true"
        >
          <path
            className="opening-loader-path"
            d="M8 38L48 34L88 22L128 28L168 14L204 18L232 6"
            pathLength={1}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g className="opening-loader-points" fill="currentColor">
            <circle cx="8" cy="38" r="2" />
            <circle cx="88" cy="22" r="2" />
            <circle cx="168" cy="14" r="2" />
            <circle cx="232" cy="6" r="2" />
          </g>
        </svg>
        <span className="opening-loader-progress">
          <span />
        </span>
      </div>
    </div>
  );
}
