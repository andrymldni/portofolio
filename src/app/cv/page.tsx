import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Resume from "@/components/resume/Resume";

export const metadata: Metadata = {
  title: "CV — Andry Syva Maldini",
  description:
    "Curriculum Vitae Andry Syva Maldini — Data Scientist, Business Intelligence, Data Analyst & Data Engineer.",
};

export default function CVPage() {
  return (
    <main className="container py-10 md:py-16">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
      >
        <ArrowLeft size={15} />
        Back to Home
      </Link>

      <div className="mt-6">
        <Resume />
      </div>
    </main>
  );
}
