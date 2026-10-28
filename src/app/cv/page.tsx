import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Resume from "@/components/resume/Resume";

const TITLE = "CV — Andry Syva Maldini";
const DESCRIPTION =
  "Curriculum Vitae Andry Syva Maldini — Data Scientist, Business Intelligence, Data Analyst & Data Engineer.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/cv" },
  openGraph: {
    url: "/cv",
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function CVPage() {
  return (
    <main id="main" tabIndex={-1} className="container py-10 md:py-16">
      <Link
        href="/"
        className="btn-secondary print:hidden"
      >
        <ArrowLeft size={15} />
        cd ~/ <span className="sr-only">Back to Home</span>
      </Link>

      <div className="mt-6">
        <Resume />
      </div>
    </main>
  );
}
