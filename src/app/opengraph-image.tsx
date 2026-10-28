import { ImageResponse } from "next/og";
import { SITE_URL } from "@/lib/site";

export const alt = "Andry Syva Maldini — Data Analyst, Jakarta";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Same Data Lab palette as globals.css (dark set).
const CANVAS = "#0A0B0D";
const INK = "#E8EAED";
const MUTED = "#A9AFB7";
const LIME = "#C5F82A";

async function loadFont(family: string, text: string) {
  const stylesheet = await fetch(
    `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`
  );
  if (!stylesheet.ok) throw new Error("Unable to load OG font stylesheet");
  const css = await stylesheet.text();
  const url = css.match(/src: url\(([^)]+)\)/)?.[1];
  if (!url) throw new Error("Missing OG font source");
  const response = await fetch(url);
  if (!response.ok) throw new Error("Unable to load OG font");
  return response.arrayBuffer();
}

export default async function OpengraphImage() {
  const hostname = new URL(SITE_URL).hostname;
  const suffixStart = hostname.lastIndexOf(".");
  const [displayFont, bodyFont, monoFont] = await Promise.all([
    loadFont("Space+Grotesk:wght@700", "Andry Syva Maldini"),
    loadFont(
      "Space+Grotesk:wght@500",
      `Data Analyst at Bank Rakyat Indonesia · Jakarta Data pipelines, predictive models and BI dashboards. Python · SQL · Airflow · Power BI · Docker ${hostname}`
    ),
    loadFont("JetBrains+Mono", "$ whoami"),
  ]);
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
          backgroundColor: CANVAS,
          backgroundImage: "radial-gradient(circle, #292C30 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          fontFamily: "Space Grotesk",
          fontWeight: 500,
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "JetBrains Mono",
            fontSize: 24,
            color: LIME,
          }}
        >
          $ whoami
        </div>
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
            fontFamily: "Space Grotesk",
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
            {hostname.slice(0, suffixStart)}
            <span style={{ color: LIME }}>{hostname.slice(suffixStart)}</span>
          </div>
          <div style={{ display: "flex" }}>
            Python · SQL · Airflow · Power BI · Docker
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Space Grotesk", data: displayFont, weight: 700, style: "normal" },
        { name: "Space Grotesk", data: bodyFont, weight: 500, style: "normal" },
        { name: "JetBrains Mono", data: monoFont, weight: 400, style: "normal" },
      ],
    }
  );
}
