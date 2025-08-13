"use client";
import dynamic from "next/dynamic";

const Hero = dynamic(() => import("@/components/Hero"), { ssr: false });
const Section = dynamic(() => import("@/components/Section"));
const About = dynamic(() => import("@/components/About"));
const Resume = dynamic(() => import("@/components/Resume"));
const Projects = dynamic(() => import("@/components/Projects"));
const Contact = dynamic(() => import("@/components/Contact"));

export default function HomePage() {
  return (
    <main className="container">
      {/* Hero tidak dibungkus Section agar tidak muncul heading "Home" */}
      <Hero />

      <Section id="about" title="About Me">
        <About />
      </Section>

      <Section id="resume" title="Resume">
        <Resume />
      </Section>

      <Section id="projects" title="Portofolio">
        <Projects />
      </Section>

      <Section id="contact" title="Contact">
        <Contact />
      </Section>
    </main>
  );
}
