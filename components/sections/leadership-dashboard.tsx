import { AnimatedCounter } from "@/components/motion/animated-counter";
import { FadeUp } from "@/components/motion/reveal";
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
  { label: "Students mentored", value: 200, suffix: "+", Icon: Users, caption: "1:1 & cohort guidance" },
  { label: "Events run", value: 24, suffix: "+", Icon: Calendar, caption: "talks · hackathons · demos" },
  { label: "Workshops delivered", value: 15, suffix: "+", Icon: Mic, caption: "ML · CV · career" },
  { label: "Industry partners", value: 8, suffix: "+", Icon: Handshake, caption: "sponsors · mentors · judges" },
  { label: "Active members", value: 350, suffix: "+", Icon: Sparkles, caption: "across cohorts" },
  { label: "Sessions hosted", value: 60, suffix: "+", Icon: Megaphone, caption: "weekly office hours" },
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

        <div className="mt-14 grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Founder story card */}
          <FadeUp className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <div className="rounded-2xl border border-hairline bg-surface p-7 md:p-8">
                <div className="flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent-fg">
                    Founder · President
                  </span>
                </div>
                <h3 className="mt-5 text-2xl font-semibold tracking-tight text-white md:text-[28px] md:leading-[1.15]">
                  A club where the homework is shipping.
                </h3>
                <p className="mt-5 text-[15px] leading-relaxed text-white/80">
                  UIU DSC exists so students leave with deployed projects, peer-reviewed
                  code, and a network that actually helps. We run weekly critique, partner
                  with industry, and put first-time speakers on real stages.
                </p>
                <ul className="mt-6 space-y-2.5 text-[14px] text-white/85">
                  {[
                    "Built a public project gallery to replace CVs with proof.",
                    "Wrote evaluation-first rubrics for project reviews.",
                    "Created a mentor pool of alumni now working in industry.",
                  ].map((t) => (
                    <li key={t} className="flex gap-3">
                      <span className="mt-[10px] inline-block h-px w-3 shrink-0 bg-accent" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap gap-1.5">
                  {["Community", "Mentorship", "Workshops", "Partnerships", "Critique"].map(
                    (t) => (
                      <span
                        key={t}
                        className="rounded-full border border-hairline bg-surface-2 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-2"
                      >
                        {t}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Stats — clean editorial grid */}
          <div className="lg:col-span-8">
            <FadeUp>
              <div className="mb-6 flex items-baseline justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-2">
                  Impact
                </span>
                <span className="font-mono text-[11px] text-muted-2">
                  illustrative · pending confirmation
                </span>
              </div>
            </FadeUp>

            <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 md:grid-cols-3">
              {IMPACTS.map((m, i) => (
                <FadeUp key={m.label} delay={i * 0.05}>
                  <div className="group relative">
                    <div className="flex items-center gap-2">
                      <m.Icon className="h-3.5 w-3.5 text-muted-2 transition-colors group-hover:text-accent-fg" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-2">
                        {m.label}
                      </span>
                    </div>
                    <div className="mt-3 text-[44px] font-semibold leading-none tracking-tight text-white md:text-[52px]">
                      <AnimatedCounter
                        to={m.value}
                        prefix={m.prefix ?? ""}
                        suffix={m.suffix ?? ""}
                      />
                    </div>
                    <div className="mt-3 h-px w-10 bg-hairline transition-all duration-300 group-hover:w-16 group-hover:bg-accent" />
                    <p className="mt-3 text-sm leading-relaxed text-muted-1">
                      {m.caption}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}