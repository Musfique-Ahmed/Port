import { AnimatedCounter } from "@/components/motion/animated-counter";

type Metric = {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  caption?: string;
  decimals?: number;
};

const METRICS: Metric[] = [
  { label: "Published Papers", value: 1, suffix: "+", caption: "IEEE conference" },
  { label: "Shipped Projects", value: 12, suffix: "+", caption: "production & research" },
  { label: "Scholarships", value: 2, suffix: "", caption: "merit-based awards" },
  { label: "Leadership Roles", value: 4, suffix: "", caption: "club, events, mentorship" },
];

export function MetricsRow() {
  return (
    <section className="relative border-y border-hairline bg-surface/40">
      <div className="container py-14 md:py-20">
        <div className="mb-10 flex items-baseline justify-between gap-4">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-2">
            By the numbers
          </h2>
          <span className="font-mono text-[11px] text-muted-2">
            Draft · pending user confirmation
          </span>
        </div>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline md:grid-cols-4">
          {METRICS.map((m) => (
            <div key={m.label} className="bg-surface p-6 md:p-8">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-2">
                {m.label}
              </div>
              <div className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-5xl">
                <AnimatedCounter
                  to={m.value}
                  decimals={m.decimals ?? 0}
                  prefix={m.prefix ?? ""}
                  suffix={m.suffix ?? ""}
                />
              </div>
              {m.caption && (
                <div className="mt-2 text-sm text-muted-1">{m.caption}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}