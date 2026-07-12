"use client";
import dynamic from "next/dynamic";

const Hero = dynamic(() => import("@/components/Hero"));
const Section = dynamic(() => import("@/components/Section"));
const About = dynamic(() => import("@/components/About"));
const TechCarousel = dynamic(() => import("@/components/TechCarousel"));
const CertificatesSlider = dynamic(
  () => import("@/components/CertificatesSlider")
);
const Projects = dynamic(() => import("@/components/Projects"));
const Contact = dynamic(() => import("@/components/Contact"));

export default function HomePage() {
  return (
    <main className="container">
      {/* Hero isn't wrapped in a Section so it doesn't get a "Home" heading */}
      <Hero />

      <Section id="about" title="About Me">
        <About />
      </Section>

      <Section
        title="Tools & Technologies"
        subtitle="The stack I reach for day-to-day — from data pipelines and analysis to deployment."
      >
        <TechCarousel />
      </Section>

      <Section
        id="certifications"
        title="Certifications"
        subtitle="Credentials backing up my work in data, analytics, and cloud."
      >
        <CertificatesSlider />
      </Section>

      <Section id="projects" title="Projects">
        <Projects />
      </Section>

      <Section id="contact" title="Contact">
        <Contact />
      </Section>
    </main>
  );
}
