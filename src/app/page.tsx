"use client";
import dynamic from "next/dynamic";
import { Reveal } from "@/components/ui/Reveal";

const Hero = dynamic(() => import("@/components/sections/Hero"));
const Section = dynamic(() => import("@/components/ui/Section"));
const About = dynamic(() => import("@/components/sections/About"));
const TechCarousel = dynamic(
  () => import("@/components/sections/TechCarousel")
);
const CertificatesSlider = dynamic(
  () => import("@/components/sections/CertificatesSlider")
);
const Projects = dynamic(() => import("@/components/sections/Projects"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

export default function HomePage() {
  return (
    <main className="container">
      {/* Hero isn't wrapped in a Section so it doesn't get a "Home" heading */}
      <Hero />

      <Section id="about" title="About">
        <About />
      </Section>

      <Section
        id="tools"
        title="Tools & Technologies"
        subtitle="The stack I reach for day-to-day — from data pipelines and analysis to deployment."
      >
        <Reveal>
          <TechCarousel />
        </Reveal>
      </Section>

      <Section
        id="certifications"
        title="Certifications"
        subtitle="Credentials backing up my work in data, analytics, and cloud."
      >
        <Reveal>
          <CertificatesSlider />
        </Reveal>
      </Section>

      <Section
        id="projects"
        title="Projects"
        subtitle="Selected work — from production data pipelines to applied machine learning."
      >
        <Projects />
      </Section>

      <Section id="contact" title="Contact">
        <Contact />
      </Section>
    </main>
  );
}
