import { projects } from "@/lib/data";

// Keep the ticker grounded in the actual project stacks, in their source order.
const tools = [...new Set(projects.flatMap((project) => project.stack ?? []))];

export default function TechCarousel() {
  return (
    <div className="overflow-hidden border-y border-line py-4 font-mono text-sm text-muted">
      <div className="marquee-track flex w-max">
        {[false, true].map((duplicate) => (
          <div
            key={String(duplicate)}
            aria-hidden={duplicate || undefined}
            className={duplicate
              ? "flex shrink-0 gap-6 pr-6 motion-reduce:hidden"
              : "flex shrink-0 gap-6 pr-6 motion-reduce:shrink motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:pr-0"}
          >
            {tools.map((tool) => (
              <span key={tool} className="whitespace-nowrap">[{tool.toLowerCase()}]</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
