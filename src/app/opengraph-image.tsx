import { ImageResponse } from "next/og";

export const alt = "Andry Syva Maldini — Data Analyst, Jakarta";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Same palette as globals.css (dark set): graphite, light grey, blue.
const CANVAS = "#111418";
const INK = "#e6e9ee";
const MUTED = "#9aa3ad";
const BLUE = "#6ea8ff";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: CANVAS,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 64,
            height: 4,
            background: BLUE,
          }}
        />
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 28,
            fontWeight: 500,
            color: MUTED,
          }}
        >
          Data Analyst at Bank Rakyat Indonesia · Jakarta
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 84,
            fontWeight: 700,
            letterSpacing: -2,
            lineHeight: 1,
            color: INK,
          }}
        >
          Andry Syva Maldini
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 34,
            fontWeight: 500,
            color: INK,
            opacity: 0.85,
          }}
        >
          Data pipelines, predictive models and BI dashboards.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 64,
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            color: MUTED,
          }}
        >
          <div style={{ display: "flex" }}>
            andrymldni<span style={{ color: BLUE }}>.dev</span>
          </div>
          <div style={{ display: "flex" }}>
            Python · SQL · Airflow · Power BI · Docker
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
