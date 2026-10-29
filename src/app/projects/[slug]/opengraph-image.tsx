import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { projects } from "@/lib/data";

export const alt = "Project case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) notFound();
  const stack = project.stack?.slice(0, 4) ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#111418",
          color: "#e6e9ee",
          padding: "64px 72px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ width: "48px", height: "4px", background: "#6ea8ff" }} />
            <div
              style={{
                display: "flex",
                border: "1px solid rgba(110, 168, 255, 0.35)",
                borderRadius: "8px",
                padding: "7px 14px",
                color: "#6ea8ff",
                fontSize: "22px",
                fontWeight: 600,
              }}
            >
              {project.category ?? "Project"}
            </div>
          </div>
          <div style={{ color: "#9aa3ad", fontSize: "20px", letterSpacing: "0.12em" }}>
            ANDRY SYVA MALDINI
          </div>
        </div>

        <div
          style={{
            display: "flex",
            maxWidth: "1020px",
            fontSize: project.title.length > 34 ? "58px" : "68px",
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            color: "#e6e9ee",
          }}
        >
          {project.title}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid rgba(230, 233, 238, 0.14)",
            paddingTop: "26px",
          }}
        >
          <div style={{ display: "flex", gap: "10px" }}>
            {stack.map((tool) => (
              <div
                key={tool}
                style={{
                  display: "flex",
                  borderRadius: "7px",
                  background: "#191d23",
                  border: "1px solid rgba(230, 233, 238, 0.12)",
                  padding: "8px 14px",
                  color: "#9aa3ad",
                  fontSize: "20px",
                }}
              >
                {tool}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", color: "#9aa3ad", fontSize: "20px" }}>
            Case study
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
