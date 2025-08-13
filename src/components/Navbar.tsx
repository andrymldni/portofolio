"use client";
import { useEffect, useState } from "react";
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
} from "lucide-react";

const navItems = [
  { href: "#", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#resume", label: "Resume" },
  { href: "#projects", label: "Portofolio" },
  { href: "#contact", label: "Contact" },
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
      className="p-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
    >
      {curr === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("#");

  useEffect(() => {
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
    const sectionSelectors = ["#about", "#resume", "#projects", "#contact"];
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
  }, []);

  const handleHomeClick = (e: React.MouseEvent) => {
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

  return (
    <div
      className={`sticky top-0 z-50 transition-all ${
        scrolled
          ? "backdrop-blur-md bg-black/30 border-b border-white/10"
          : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Primary"
    >
      <nav className="container flex h-16 items-center justify-between gap-3">
        <a
          href="#"
          onClick={handleHomeClick}
          className="font-semibold tracking-tight gradient-text glow-text rounded"
        >
          andrymldni.dev
        </a>

        <ul className="hidden gap-6 md:flex items-center">
          {navItems.map((n) => (
            <li key={n.href}>
              {n.href === "#" ? (
                <a
                  href="#"
                  onClick={handleHomeClick}
                  className={`text-sm relative ${
                    active === "#"
                      ? "text-white"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {n.label}
                  {active === "#" && (
                    <motion.div
                      layoutId="active-underline"
                      className="absolute left-0 -bottom-1 h-[2px] w-full bg-indigo-400"
                    />
                  )}
                </a>
              ) : (
                <a
                  href={n.href}
                  className={`text-sm relative ${
                    active === n.href
                      ? "text-white"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {n.label}
                  {active === n.href && (
                    <motion.div
                      layoutId="active-underline"
                      className="absolute left-0 -bottom-1 h-[2px] w-full bg-indigo-400"
                    />
                  )}
                </a>
              )}
            </li>
          ))}
          <li className="pl-2">
            <ThemeToggle />
          </li>
        </ul>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
            className="md:hidden border-t border-white/10 bg-black/40"
          >
            <ul className="container py-4 space-y-3">
              {navItems.map((n, i) => (
                <motion.li
                  key={n.href}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {n.href === "#" ? (
                    <a
                      onClick={handleHomeClick}
                      href="#"
                      className="block py-2 text-white/80 hover:text-white"
                    >
                      {n.label}
                    </a>
                  ) : (
                    <a
                      onClick={() => setOpen(false)}
                      href={n.href}
                      className="block py-2 text-white/80 hover:text-white"
                    >
                      {n.label}
                    </a>
                  )}
                </motion.li>
              ))}
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
