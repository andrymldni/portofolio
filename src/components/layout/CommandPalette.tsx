"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal, flushSync } from "react-dom";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Copy, Download, FileText, Hash, Search, SunMoon, X, type LucideIcon } from "lucide-react";
import { CONTACT_EMAIL, projects, socialLinks } from "@/lib/data";
import { useDialog } from "@/hooks/useDialog";
import { toggleTheme } from "@/hooks/useTheme";

type Command = {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  href?: string;
  external?: boolean;
  download?: boolean;
};

const commands: Command[] = [
  ...["About", "Certifications", "Projects", "Contact"].map((label) => ({
    id: `section-${label.toLowerCase()}`,
    label: `Jump to ${label}`,
    description: "Home section",
    icon: Hash,
    href: `/#${label.toLowerCase()}`,
  })),
  ...projects.map((project) => ({
    id: project.slug,
    label: project.title,
    description: `${project.category || "Project"} · Case study`,
    icon: ArrowUpRight,
    href: `/projects/${project.slug}`,
  })),
  { id: "cv", label: "Open CV", description: "View resume", icon: FileText, href: "/cv" },
  { id: "download", label: "Download CV PDF", description: "Save resume", icon: Download, href: "/Andry_Syva_Maldini_CV.pdf", download: true },
  { id: "email", label: "Copy contact email", description: CONTACT_EMAIL, icon: Copy },
  ...[socialLinks.github, socialLinks.linkedin].map((social) => ({
    id: social.label.toLowerCase(),
    label: `Open ${social.label}`,
    description: "Opens in a new tab",
    icon: social.icon,
    href: social.href,
    external: true,
  })),
  { id: "theme", label: "Toggle theme", description: "Switch light / dark mode", icon: SunMoon },
];

function PaletteDialog({ onClose }: { onClose: () => void }) {
  const { dialogRef, titleId } = useDialog(onClose);
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [status, setStatus] = useState("");
  const selectedRef = useRef<HTMLButtonElement>(null);
  const listId = `${titleId}-results`;
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const filtered = commands.filter((command) => {
    const text = `${command.label} ${command.description} ${command.id}`.toLowerCase();
    return terms.every((term) => text.includes(term));
  });

  useEffect(() => {
    selectedRef.current?.scrollIntoView({ block: "nearest", behavior: "instant" });
  }, [active, query]);

  const run = async (command: Command) => {
    if (command.id === "email") {
      try {
        await navigator.clipboard.writeText(CONTACT_EMAIL);
        setStatus("Email copied to clipboard.");
      } catch {
        setStatus(`Copy unavailable. Contact email: ${CONTACT_EMAIL}`);
      }
      return;
    }

    // Release the focus trap and scroll lock before navigation or a theme capture.
    flushSync(onClose);
    if (command.id === "theme") {
      toggleTheme();
    } else if (command.href && (command.external || command.download)) {
      const link = document.createElement("a");
      link.href = command.href;
      if (command.download) link.download = "Andry_Syva_Maldini_CV.pdf";
      if (command.external) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
      document.body.appendChild(link);
      link.click();
      link.remove();
    } else if (command.href) {
      router.push(command.href);
    }
  };

  return (
    <div className="modal-backdrop command-backdrop flex items-start justify-center p-4 pt-[12vh]" onClick={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
        className="card command-dialog flex max-h-[75dvh] w-full min-w-0 max-w-xl flex-col overflow-hidden shadow-[0_32px_64px_-24px_rgba(0,0,0,0.6)]"
      >
        <h2 id={titleId} className="sr-only">Command palette</h2>
        <div className="flex shrink-0 items-center gap-3 border-b border-line p-4">
          <Search size={18} className="shrink-0 text-muted" aria-hidden="true" />
          <input
            type="text"
            role="combobox"
            aria-label="Search actions and projects"
            aria-autocomplete="list"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={filtered[active] ? `${listId}-${filtered[active].id}` : undefined}
            aria-describedby={`${titleId}-help`}
            autoComplete="off"
            spellCheck={false}
            placeholder="Search actions and projects…"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
              setStatus("");
            }}
            onKeyDown={(event) => {
              if (event.nativeEvent.isComposing) return;
              if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                event.preventDefault();
                if (filtered.length) {
                  const direction = event.key === "ArrowDown" ? 1 : -1;
                  setActive((index) => (index + direction + filtered.length) % filtered.length);
                }
              } else if (event.key === "Enter") {
                event.preventDefault();
                if (filtered[active]) void run(filtered[active]);
              }
            }}
            className="min-w-0 flex-1 rounded bg-transparent py-1 text-sm text-ink placeholder:text-muted"
          />
          <button type="button" aria-label="Close command palette" onClick={onClose} className="shrink-0 rounded-lg p-2 text-muted hover:bg-ink/5 hover:text-ink">
            <X size={18} />
          </button>
        </div>
        <div id={listId} role="listbox" aria-label="Actions" className="min-h-0 overflow-y-auto overscroll-contain p-2">
          {filtered.map((command, index) => (
            <button
              key={command.id}
              id={`${listId}-${command.id}`}
              ref={index === active ? selectedRef : undefined}
              type="button"
              role="option"
              aria-selected={index === active}
              tabIndex={-1}
              onMouseDown={(event) => event.preventDefault()}
              onMouseMove={() => setActive(index)}
              onClick={() => void run(command)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors ${index === active ? "bg-ink/[0.06] text-ink" : "text-muted hover:bg-ink/[0.04]"}`}
            >
              <command.icon size={17} className="shrink-0 text-brand" aria-hidden="true" />
              <span className="min-w-0 flex-1">
                <span className="block break-words text-sm font-medium">{command.label}</span>
                <span className="block break-words text-xs text-muted">{command.description}</span>
              </span>
            </button>
          ))}
        </div>
        {!filtered.length && <p className="px-5 py-6 text-sm text-muted">No actions found. Try a project name or section.</p>}
        <div className="shrink-0 border-t border-line px-4 py-3 text-xs text-muted">
          <p id={`${titleId}-help`}>↑ ↓ to navigate · Enter to run · Esc to close</p>
          <p role="status" aria-live="polite" className="break-words">{status || `${filtered.length} actions available`}</p>
        </div>
      </div>
    </div>
  );
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== "k" || event.altKey || event.isComposing) return;
      const target = event.target;
      if (target instanceof HTMLElement && (target.closest("input, textarea, select, [role='textbox']") || target.isContentEditable)) return;
      // Avoid competing focus traps when a certificate or project dialog is open.
      if (document.querySelector('[role="dialog"][aria-modal="true"]')) return;
      event.preventDefault();
      if (!event.repeat) setOpen(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open command palette (Control or Command K)"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-keyshortcuts="Control+k Meta+k"
        className="inline-flex items-center gap-2 rounded-lg border border-line px-2.5 py-2 text-muted transition-colors hover:bg-ink/5 hover:text-ink"
      >
        <Search size={16} aria-hidden="true" />
        <kbd aria-hidden="true" className="font-sans text-xs">⌘/Ctrl K</kbd>
      </button>
      {open && createPortal(<PaletteDialog onClose={close} />, document.body)}
    </>
  );
}
