import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE_URL } from "@/lib/site";

export const alt = "Andry Syva Maldini — Data Analyst, Jakarta";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Same Data Lab palette as globals.css (dark set).
const CANVAS = "#0A0B0D";
const INK = "#E8EAED";
const MUTED = "#A9AFB7";
const LIME = "#C5F82A";

export default async function OpengraphImage() {
  const hostname = new URL(SITE_URL).hostname;
  const suffixStart = hostname.lastIndexOf(".");
  // Satori needs TrueType rather than WOFF2; these are local copies of the
  // same fonts used by the site, so preview generation also works offline.
  const [nameOutline, bodyFont, monoFont] = await Promise.all([
    readFile(join(process.cwd(), "src/app/fonts/og-name.svg")),
    readFile(join(process.cwd(), "src/app/fonts/space-grotesk-latin-500-normal.ttf")),
    readFile(join(process.cwd(), "src/app/fonts/jetbrains-mono-latin-400-normal.ttf")),
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
          fontFamily: "Space Grotesk",
          fontWeight: 500,
        }}
      >
        <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: "absolute", top: 0, left: 0 }}>
          <defs>
            <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#292C30" />
            </pattern>
          </defs>
          <rect width="1200" height="630" fill="url(#dots)" />
        </svg>
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
          }}
        >
          {/* A local outline keeps the display line intact alongside smaller text. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`data:image/svg+xml;base64,${nameOutline.toString("base64")}`}
            alt="Andry Syva Maldini"
            width={744}
            height={77}
          />
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
        { name: "Space Grotesk", data: bodyFont, weight: 500, style: "normal" },
        { name: "JetBrains Mono", data: monoFont, weight: 400, style: "normal" },
      ],
    }
  );
}
