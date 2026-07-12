import { ImageResponse } from "next/og";

export const alt = "Andry Syva Maldini — Data Scientist & BI Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          background: "#0B0B0E",
          backgroundImage:
            "radial-gradient(circle at 15% 10%, rgba(168,85,247,0.35), transparent 55%), radial-gradient(circle at 90% 85%, rgba(56,189,248,0.30), transparent 55%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 30,
            fontWeight: 600,
            letterSpacing: -0.5,
            color: "#38bdf8",
          }}
        >
          andrymldni.dev
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 76,
            fontWeight: 800,
            letterSpacing: -1.5,
            color: "#ffffff",
          }}
        >
          Andry Syva Maldini
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 36,
            fontWeight: 500,
            color: "rgba(232,232,236,0.75)",
          }}
        >
          Data Scientist · Business Intelligence · Data Analyst · Data Engineer
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 56,
            gap: 14,
          }}
        >
          {["Python", "SQL", "Apache Spark", "Power BI", "Docker"].map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                padding: "10px 22px",
                borderRadius: 999,
                fontSize: 24,
                color: "#e8e8ec",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
