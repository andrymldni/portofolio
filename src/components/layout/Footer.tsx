"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const pathname = usePathname();
  const isHome = pathname === "/";

  const hrefFor = (hash: string) => (isHome ? hash : `/${hash}`);

  return (
    <footer className="relative mt-16 border-t border-white/10 bg-black/20 backdrop-blur-md">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"
        aria-hidden="true"
      />
      <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-white/60">
        <div className="text-center md:text-left">
          <p className="text-sm font-medium text-white">
            © {year} Andry Syva Maldini
          </p>
          <p className="mt-1 text-white/50">
            Built with ❤️ using Next.js, Tailwind CSS & Framer Motion
          </p>
        </div>
        <nav
          aria-label="Footer Navigation"
          className="flex flex-wrap gap-6 text-white/70 text-sm justify-center"
        >
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <Link
            href={hrefFor("#about")}
            className="hover:text-white transition-colors"
          >
            About
          </Link>
          <Link href="/cv" className="hover:text-white transition-colors">
            CV
          </Link>
          <Link
            href={hrefFor("#projects")}
            className="hover:text-white transition-colors"
          >
            Projects
          </Link>
          <Link
            href={hrefFor("#contact")}
            className="hover:text-white transition-colors"
          >
            Contact
          </Link>
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
