import { Reveal } from "@/components/ui/Reveal";
import Hero from "@/components/sections/Hero";
import Section from "@/components/ui/Section";
import About from "@/components/sections/About";
import ImpactStats from "@/components/sections/ImpactStats";
import TechCarousel from "@/components/sections/TechCarousel";
import CertificatesSlider from "@/components/sections/CertificatesSlider";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <main id="main" tabIndex={-1} className="container">
      {/* Hero isn't wrapped in a Section so it doesn't get a "Home" heading */}
      <Hero />

      <Section id="about" title="About">
        <ImpactStats />
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
