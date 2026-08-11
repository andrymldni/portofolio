"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Sun,
  Moon,
  FileText,
} from "lucide-react";

const navItems = [
  { hash: "#", label: "Home" },
  { hash: "#about", label: "About" },
  { hash: "#certifications", label: "Certifications" },
  { hash: "#projects", label: "Projects" },
  { hash: "#contact", label: "Contact" },
];

function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const theme =
    typeof document !== "undefined"
      ? document.documentElement.dataset.theme
      : "dark";
  const [curr, setCurr] = useState(theme || "dark");

  useEffect(() => setMounted(true), []);

  const toggle = () => {
    const next =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setCurr(next);
  };

  if (!mounted) return null;
  return (
    <button
      aria-label={`Switch to ${curr === "dark" ? "light" : "dark"} mode`}
      onClick={toggle}
      className="p-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
    >
      {curr === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("#");

  useEffect(() => {
    if (!isHome) return;
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (window.location.hash) {
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
      window.scrollTo(0, 0);
    }
    const NAV_H = 64;
    const sectionSelectors = ["#about", "#certifications", "#projects", "#contact"];
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
      if (window.scrollY < 10) {
        setActive("#");
        return;
      }
      const probeY = NAV_H + 1;
      let current: string | null = null;
      for (const sel of sectionSelectors) {
        const el = document.querySelector(sel) as HTMLElement | null;
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= probeY && r.bottom > probeY) {
          current = `#${el.id}`;
          break;
        }
      }
      setActive(current ?? "#");
    };
    requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // On non-home pages (e.g. /cv), show the bar solid — there's no scroll
  // state to react to, and transparent-over-white content looks broken.
  const barIsScrolled = isHome ? scrolled : true;

  const handleHomeClick = (e: React.MouseEvent) => {
    if (!isHome) return; // let Link navigate normally back to "/"
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search
    );
    setOpen(false);
    setActive("#");
  };

  // Build the right href for a section link depending on which page we're on.
  const hrefFor = (hash: string) => {
    if (hash === "#") return "/";
    return isHome ? hash : `/${hash}`;
  };

  return (
    <div
      className={`sticky top-0 z-50 transition-all ${
        barIsScrolled
          ? "bg-[rgb(var(--bg))] border-b border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
          : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Primary"
    >
      <nav className="container flex h-16 items-center justify-between gap-3">
        <Link
          href="/"
          onClick={handleHomeClick}
          className="font-semibold tracking-tight gradient-text glow-text rounded"
        >
          andrymldni.dev
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((n) => (
            <li key={n.hash}>
              <Link
                href={hrefFor(n.hash)}
                onClick={n.hash === "#" ? handleHomeClick : undefined}
                className={`relative rounded-full px-3.5 py-2 text-sm transition-colors ${
                  isHome && active === n.hash
                    ? "text-white"
                    : "text-white/75 hover:text-white"
                }`}
              >
                {isHome && active === n.hash && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/10 ring-1 ring-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{n.label}</span>
              </Link>
            </li>
          ))}
          <li className="pl-1">
            <Link
              href="/cv"
              className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 ${
                !isHome ? "ring-2 ring-white/40" : ""
              }`}
              style={{
                background:
                  "linear-gradient(135deg, rgb(var(--brand)), rgb(var(--brand-2)))",
              }}
            >
              <FileText size={14} />
              View CV
            </Link>
          </li>
          <li className="pl-1">
            <ThemeToggle />
          </li>
        </ul>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-400"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-white/10 bg-[rgb(var(--bg))]"
          >
            <ul className="container py-4 space-y-3">
              {navItems.map((n, i) => (
                <motion.li
                  key={n.hash}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={hrefFor(n.hash)}
                    onClick={(e) => {
                      if (n.hash === "#") handleHomeClick(e);
                      else setOpen(false);
                    }}
                    className={`block rounded-lg px-3 py-2 transition-colors ${
                      isHome && active === n.hash
                        ? "bg-white/10 text-white"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    {n.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: navItems.length * 0.05 }}
              >
                <Link
                  href="/cv"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-sm font-semibold text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, rgb(var(--brand)), rgb(var(--brand-2)))",
                  }}
                >
                  <FileText size={14} />
                  View CV
                </Link>
              </motion.li>
              <li className="flex gap-4 pt-2">
                <a
                  href="https://github.com/andrymldni"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/andrymldni"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="https://www.instagram.com/andrymldni"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="https://twitter.com/andrymldni"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white"
                  aria-label="Twitter"
                >
                  <Twitter size={18} />
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
