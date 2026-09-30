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
    <footer className="relative mt-16 border-t border-line">
      <div className="container flex flex-col items-center justify-between gap-6 py-8 text-xs text-muted md:flex-row">
        <div className="text-center md:text-left">
          <p className="text-sm font-medium text-ink">
            © {year} Andry Syva Maldini
          </p>
          <p className="mt-1">
            Built with Next.js, Tailwind CSS and Framer Motion
          </p>
        </div>
        <nav
          aria-label="Footer Navigation"
          className="flex flex-wrap justify-center gap-6 text-sm text-muted"
        >
          <Link href="/" className="transition-colors hover:text-ink">
            Home
          </Link>
          <Link
            href={hrefFor("#about")}
            className="transition-colors hover:text-ink"
          >
            About
          </Link>
          <Link href="/cv" className="transition-colors hover:text-ink">
            CV
          </Link>
          <Link
            href={hrefFor("#projects")}
            className="transition-colors hover:text-ink"
          >
            Projects
          </Link>
          <Link
            href={hrefFor("#contact")}
            className="transition-colors hover:text-ink"
          >
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/andrymldni"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="transition-colors hover:text-ink"
          >
            <Github size={16} />
          </a>
          <a
            href="https://www.linkedin.com/in/andrymldni"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="transition-colors hover:text-ink"
          >
            <Linkedin size={16} />
          </a>
          <a
            href="https://twitter.com/andrymldni"
            target="_blank"
            rel="noreferrer"
            aria-label="Twitter"
            className="transition-colors hover:text-ink"
          >
            <Twitter size={16} />
          </a>
          <a
            href="https://instagram.com/andrymldni"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="transition-colors hover:text-ink"
          >
            <Instagram size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
