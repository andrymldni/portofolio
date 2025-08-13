"use client";
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 mt-16 bg-black/20 backdrop-blur-md">
      <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-white/60">
        <div className="text-center md:text-left">
          <p className="text-sm font-medium text-white">
            © {year} Andry Syva Maldini
          </p>
          <p className="mt-1 text-white/50">
            Dibuat dengan ❤️ Next.js, Tailwind CSS & Framer Motion
          </p>
        </div>
        <nav
          aria-label="Footer Navigation"
          className="flex flex-wrap gap-6 text-white/70 text-sm justify-center"
        >
          <a href="#home" className="hover:text-white transition-colors">
            Home
          </a>
          <a href="#about" className="hover:text-white transition-colors">
            About
          </a>
          <a href="#resume" className="hover:text-white transition-colors">
            Resume
          </a>
          <a href="#projects" className="hover:text-white transition-colors">
            Portofolio
          </a>
          <a href="#contact" className="hover:text-white transition-colors">
            Contact
          </a>
        </nav>
        <div className="flex gap-4 items-center">
          <a
            href="https://github.com/andrymldni"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="hover:text-white transition-colors"
          >
            <Github size={16} />
          </a>
          <a
            href="https://www.linkedin.com/in/andrymldni"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="hover:text-white transition-colors"
          >
            <Linkedin size={16} />
          </a>
          <a
            href="https://twitter.com/andrymldni"
            target="_blank"
            rel="noreferrer"
            aria-label="Twitter"
            className="hover:text-white transition-colors"
          >
            <Twitter size={16} />
          </a>
          <a
            href="https://instagram.com/andrymldni"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="hover:text-white transition-colors"
          >
            <Instagram size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
