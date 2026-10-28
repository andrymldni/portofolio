"use client";
import { Sun, Moon } from "lucide-react";
import { toggleTheme, useTheme } from "@/hooks/useTheme";

export default function ThemeToggle() {
  const theme = useTheme();
  if (!theme) return null;

  return (
    <button
      type="button"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      onClick={(event) => toggleTheme(event.currentTarget)}
      className="rounded-lg p-2 text-ink transition-colors hover:bg-ink/5"
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
