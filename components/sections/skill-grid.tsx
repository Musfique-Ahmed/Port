import { FadeUp, Stagger, Item } from "@/components/motion/reveal";
import { SectionHeader } from "./section-header";
import {
  Code2,
  Database,
  Server,
  Brain,
  Eye,
  Network,
  Boxes,
  LineChart,
  Wrench,
  GitBranch,
  Container,
  FileSpreadsheet,
} from "lucide-react";

type Skill = { name: string; hint?: string };
type Group = { title: string; Icon: React.ComponentType<{ className?: string }>; items: Skill[] };

const GROUPS: Group[] = [
  {
    title: "Languages",
    Icon: Code2,
    items: [
      { name: "Python", hint: "ML · scripting" },
      { name: "SQL", hint: "analytics · ETL" },
      { name: "TypeScript", hint: "apps · APIs" },
    ],
  },
  {
    title: "Web & Backend",
    Icon: Server,
    items: [
      { name: "Next.js", hint: "App Router · RSC" },
      { name: "FastAPI", hint: "async APIs" },
      { name: "React", hint: "19" },
    ],
  },
  {
    title: "Machine Learning",
    Icon: Brain,
    items: [
      { name: "Machine Learning", hint: "tabular · classical" },
      { name: "Deep Learning", hint: "CNNs · Transformers" },
      { name: "PyTorch", hint: "training · eval" },
      { name: "TensorFlow", hint: "legacy + serving" },
    ],
  },
  {
    title: "Computer Vision & NLP",
    Icon: Eye,
    items: [
      { name: "Computer Vision", hint: "YOLO · detection" },
      { name: "NLP", hint: "Bangla · Banglish" },
      { name: "LLMs", hint: "fine-tune · eval" },
    ],
  },
  {
    title: "Data Engineering",
    Icon: Database,
    items: [
      { name: "Data Engineering", hint: "pipelines · dbt-style" },
      { name: "Power BI", hint: "dashboards" },
      { name: "Excel", hint: "the original IDE" },
    ],
  },
  {
    title: "Tools & Storage",
    Icon: Wrench,
    items: [
      { name: "Git", hint: "branching · review" },
      { name: "Docker", hint: "containers · compose" },
      { name: "MongoDB", hint: "document store" },
      { name: "MySQL", hint: "relational" },
    ],
  },
];

export function SkillGrid() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container">
        <SectionHeader
          eyebrow="Skills"
          title="Tools, organized by what I use them for."
          description="No progress bars. Just the stack, grouped honestly."
        />

        <Stagger className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {GROUPS.map((g) => (
            <Item key={g.title}>
              <FadeUp y={16}>
                <div className="group h-full rounded-2xl border border-hairline bg-surface p-6 transition-all duration-300 hover:border-white/15 hover:bg-surface-2">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-hairline bg-surface-2 text-muted-1 transition-colors group-hover:border-accent/40 group-hover:text-accent-fg">
                      <g.Icon className="h-4 w-4" />
                    </span>
                    <h3 className="text-base font-semibold text-white">{g.title}</h3>
                  </div>
                  <ul className="mt-5 space-y-2.5">
                    {g.items.map((it) => (
                      <li
                        key={it.name}
                        className="flex items-center justify-between gap-3 border-b border-dashed border-hairline pb-2 last:border-0 last:pb-0"
                      >
                        <span className="text-sm text-white">{it.name}</span>
                        {it.hint && (
                          <span className="font-mono text-[11px] text-muted-2">
                            {it.hint}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}