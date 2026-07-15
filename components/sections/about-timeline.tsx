import { FadeUp, Stagger, Item } from "@/components/motion/reveal";
import { SectionHeader } from "./section-header";
import { Code2, Brain, FlaskConical, Cpu, Users, HeartHandshake } from "lucide-react";

const STEPS = [
  {
    year: "Early",
    title: "Programming",
    body: "Started writing code to automate the small things. Python first, then SQL, TypeScript, and the boring glue that holds systems together.",
    Icon: Code2,
  },
  {
    year: "Foundation",
    title: "Data Science",
    body: "Fell into data while trying to understand a real problem. Built pipelines, dashboards, and the habit of asking what the numbers actually mean.",
    Icon: Brain,
  },
  {
    year: "Research",
    title: "First Paper",
    body: "Took an under-served corner of NLP — code-mixed Bangla-English — and built a benchmark serious enough for IEEE review.",
    Icon: FlaskConical,
  },
  {
    year: "AI",
    title: "Production Systems",
    body: "Shifted from notebooks to systems: real-time inference, model serving, evaluation harnesses. AI you can actually deploy.",
    Icon: Cpu,
  },
  {
    year: "Leadership",
    title: "UIU Data Science Club",
    body: "Founded and scaled a student community focused on shipping, not performing. Mentorship, projects, partnerships.",
    Icon: Users,
  },
  {
    year: "Now",
    title: "Community Building",
    body: "Investing time in the people around me: workshops, partnerships, and helping early engineers find their first real audience.",
    Icon: HeartHandshake,
  },
];

export function AboutTimeline() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container">
        <SectionHeader
          eyebrow="About"
          title="A timeline, not a résumé."
          description="The work in order of how it actually happened. Each phase pulled the next one into focus."
        />

        <Stagger className="relative mt-14">
          {/* line */}
          <div className="absolute left-[19px] top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-hairline via-accent/40 to-hairline md:block" />
          <ol className="space-y-6 md:space-y-8">
            {STEPS.map((s, i) => (
              <Item key={s.title}>
                <FadeUp y={16}>
                  <div className="group relative grid grid-cols-[40px_1fr] items-start gap-5 md:grid-cols-[40px_140px_1fr]">
                    <div className="relative z-10 mt-1.5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-surface text-muted-1 transition-colors group-hover:border-accent group-hover:text-accent-fg">
                      <s.Icon className="h-4 w-4" />
                    </div>
                    <div className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-muted-2 md:block">
                      {String(i + 1).padStart(2, "0")} · {s.year}
                    </div>
                    <div>
                      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-2 md:hidden">
                        {s.year}
                      </div>
                      <h3 className="mt-1 text-xl font-semibold tracking-tight text-white md:text-2xl">
                        {s.title}
                      </h3>
                      <p className="mt-2 max-w-2xl text-muted-1">{s.body}</p>
                    </div>
                  </div>
                </FadeUp>
              </Item>
            ))}
          </ol>
        </Stagger>
      </div>
    </section>
  );
}