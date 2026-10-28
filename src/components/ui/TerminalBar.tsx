import type { ReactNode } from "react";

/** Shared window chrome; the dots are decoration, never pretend controls. */
export default function TerminalBar({
  children,
  prefix = "",
  title,
  action,
  className = "",
}: {
  children: ReactNode;
  prefix?: string;
  title?: string;
  action?: ReactNode;
  className?: string;
}) {
  const fullTitle = title ?? (
    typeof children === "string" || typeof children === "number"
      ? `${prefix}${children}`
      : undefined
  );
  return (
    <div className={`flex min-w-0 shrink-0 items-center gap-3 border-b border-line bg-surface px-4 font-mono text-xs text-muted ${action ? "h-[61px]" : "h-[41px]"} ${className}`}>
      <span aria-hidden="true" className="flex shrink-0 gap-1.5">
        <span className="h-2 w-2 rounded-full bg-muted/40" />
        <span className="h-2 w-2 rounded-full bg-muted/40" />
        <span className="h-2 w-2 rounded-full bg-muted/40" />
      </span>
      <span title={fullTitle} className="flex min-w-0 flex-1 whitespace-nowrap">
        {prefix && <span className="shrink-0">{prefix}</span>}
        <span className="min-w-0 truncate">{children}</span>
      </span>
      {action}
    </div>
  );
}
