"use client";
import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { socialLinks } from "@/lib/data";

const navItems = [
  { hash: "#about", label: "./about" },
  { hash: "#projects", label: "./projects" },
  { hash: "#contact", label: "./contact" },
];

const subscribeToMount = () => () => {};

function ThemeToggle() {
  // Keep the server and hydration output empty, then show the theme control.
  const mounted = useSyncExternalStore(subscribeToMount, () => true, () => false);
  const theme =
    typeof document !== "undefined"
      ? document.documentElement.dataset.theme
      : "dark";
  const [curr, setCurr] = useState(theme || "dark");

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
      className="rounded-lg p-2 text-ink transition-colors hover:bg-ink/5"
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
    // A section becomes current once its top passes this line. It sits
    // below the navbar's scroll-padding (5.5rem), so a section you jump to
    // from the menu lands *above* the line and lights up straight away.
    // Sections that aren't menu items (Tools) simply keep the previous item
    // active, and the last item takes over at the bottom of the page even
    // if it is shorter than the viewport.
    const PROBE_Y = 120;
    const sectionIds = ["about", "projects", "contact"];
    let ticking = false;
    const update = () => {
      ticking = false;
      setScrolled(window.scrollY > 16);
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) {
        setActive(`#${sectionIds[sectionIds.length - 1]}`);
        return;
      }
      let current = "#";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= PROBE_Y) current = `#${id}`;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isHome]);

  // On non-home pages (e.g. /cv), show the bar solid — there's no scroll
  // state to react to, and transparent-over-white content looks broken.
  const barIsScrolled = isHome ? scrolled : true;

  const handleHomeClick = (e: React.MouseEvent) => {
    if (!isHome) return; // let Link navigate normally back to "/"
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
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
      className={`sticky top-0 z-50 font-mono transition-[background-color,border-color,box-shadow] duration-300 ${
        barIsScrolled
          ? "border-b border-line bg-canvas/95 shadow-[0_12px_32px_-24px_rgba(0,0,0,0.45)]"
          : "border-b border-transparent bg-transparent"
      }`}
      role="navigation"
      aria-label="Primary"
    >
      <nav className="container flex h-16 items-center justify-between gap-3">
        <Link
          href="/"
          onClick={handleHomeClick}
          className="rounded font-semibold tracking-tight text-ink"
        >
          <span className="text-brand">~/</span>andry
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((n) => (
            <li key={n.hash}>
              <Link
                href={hrefFor(n.hash)}
                aria-current={isHome && active === n.hash ? "location" : undefined}
                onClick={n.hash === "#" ? handleHomeClick : undefined}
                className={`relative rounded-full px-3.5 py-2 text-sm transition-colors ${
                  isHome && active === n.hash
                    ? "text-brand"
                    : "text-muted hover:text-ink"
                }`}
              >
                {isHome && active === n.hash && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-ink/[0.06]"
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
              className="inline-flex items-center rounded-lg border border-brand px-3.5 py-1.5 text-sm font-semibold text-brand transition-colors hover:bg-brand/10"
            >
              cv.pdf
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
            className="rounded-lg p-2 text-ink transition-colors hover:bg-ink/5"
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
            className="border-t border-line bg-canvas md:hidden"
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
                    aria-current={isHome && active === n.hash ? "location" : undefined}
                    onClick={(e) => {
                      if (n.hash === "#") handleHomeClick(e);
                      else setOpen(false);
                    }}
                    className={`block rounded-lg px-3 py-2 transition-colors ${
                      isHome && active === n.hash
                        ? "bg-ink/[0.06] text-brand"
                        : "text-muted hover:text-ink"
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
                  className="inline-flex rounded-lg border border-brand px-3.5 py-1.5 text-sm text-brand hover:bg-brand/10"
                >
                  cv.pdf
                </Link>
              </motion.li>
              <li className="flex gap-4 pt-2 text-muted">
                {Object.values(socialLinks).map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-ink"
                    aria-label={social.label}
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
