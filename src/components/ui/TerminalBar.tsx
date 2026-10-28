import type { ReactNode } from "react";

/** Shared window chrome; the dots are decoration, never pretend controls. */
export default function TerminalBar({
  children,
  action,
  className = "",
}: {
  children: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex min-w-0 items-center gap-3 border-b border-line bg-surface px-4 py-3 font-mono text-xs text-muted ${className}`}>
      <span aria-hidden="true" className="flex shrink-0 gap-1.5">
        <span className="h-2 w-2 rounded-full bg-muted/40" />
        <span className="h-2 w-2 rounded-full bg-muted/40" />
        <span className="h-2 w-2 rounded-full bg-muted/40" />
      </span>
      <span className="min-w-0 flex-1 break-words">{children}</span>
      {action}
    </div>
  );
}
