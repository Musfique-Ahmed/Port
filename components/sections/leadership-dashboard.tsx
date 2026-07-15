import { AnimatedCounter } from "@/components/motion/animated-counter";
import { FadeUp, Stagger, Item } from "@/components/motion/reveal";
import { SectionHeader } from "./section-header";
import { Megaphone, Calendar, Users, Handshake, Sparkles, Mic } from "lucide-react";

type Impact = {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  Icon: React.ComponentType<{ className?: string }>;
  caption: string;
};

const IMPACTS: Impact[] = [
  { label: "Students Mentored", value: 200, suffix: "+", Icon: Users, caption: "1:1 & cohort guidance" },
  { label: "Events Run", value: 24, suffix: "+", Icon: Calendar, caption: "talks · hackathons · demos" },
  { label: "Workshops Delivered", value: 15, suffix: "+", Icon: Mic, caption: "ML · CV · career" },
  { label: "Industry Partners", value: 8, suffix: "+", Icon: Handshake, caption: "sponsors · mentors · judges" },
  { label: "Active Members", value: 350, suffix: "+", Icon: Sparkles, caption: "across cohorts" },
  { label: "Sessions Hosted", value: 60, suffix: "+", Icon: Megaphone, caption: "weekly office hours" },
];

export function LeadershipDashboard() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container">
        <SectionHeader
          eyebrow="Leadership"
          title="UIU Data Science Club"
          description="Founded and scaled a student-run community focused on shipping. Below: illustrative impact, pending user confirmation."
        />

        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-12">
          <FadeUp className="lg:col-span-5">
            <div className="flex h-full flex-col justify-between rounded-2xl border border-hairline bg-surface p-8">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-fg">
                  Founder · President
                </span>
                <h3 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                  A club where the homework is shipping.
                </h3>
                <p className="mt-4 max-w-md text-muted-1">
                  UIU DSC exists so students leave with deployed projects, peer-reviewed
                  code, and a network that actually helps. We run weekly critique, partner
                  with industry, and put first-time speakers on real stages.
                </p>
              </div>
              <ul className="mt-8 space-y-3 text-sm text-muted-1">
                {[
                  "Built a public project gallery to replace CVs with proof.",
                  "Wrote evaluation-first rubrics for project reviews.",
                  "Created a mentor pool of alumni now working in industry.",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-2 inline-block h-px w-3 shrink-0 bg-accent" />
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-2">
                {["Community", "Mentorship", "Workshops", "Partnerships", "Critique"].map(
                  (t) => (
                    <span
                      key={t}
                      className="rounded-full border border-hairline bg-surface-2 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-muted-1"
                    >
                      {t}
                    </span>
                  )
                )}
              </div>
            </div>
          </FadeUp>

          <Stagger className="lg:col-span-7">
            <div className="grid h-full grid-cols-2 gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline md:grid-cols-3">
              {IMPACTS.map((m) => (
                <Item key={m.label}>
                  <FadeUp y={12}>
                    <div className="group relative h-full bg-surface p-6 transition-colors hover:bg-surface-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-2">
                          {m.label}
                        </span>
                        <m.Icon className="h-4 w-4 text-muted-1 transition-colors group-hover:text-accent-fg" />
                      </div>
                      <div className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                        <AnimatedCounter
                          to={m.value}
                          prefix={m.prefix ?? ""}
                          suffix={m.suffix ?? ""}
                        />
                      </div>
                      <div className="mt-1 text-xs text-muted-1">{m.caption}</div>
                    </div>
                  </FadeUp>
                </Item>
              ))}
            </div>
          </Stagger>
        </div>
      </div>
    </section>
  );
}