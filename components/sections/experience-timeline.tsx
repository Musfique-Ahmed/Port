import { FadeUp, Stagger, Item } from "@/components/motion/reveal";
import { SectionHeader } from "./section-header";

type Role = {
  org: string;
  title: string;
  period: string;
  location?: string;
  achievements: string[];
};

const ROLES: Role[] = [
  {
    title: "Programming Instructor",
    org: "Independent / Institute",
    period: "Recent",
    location: "On-site",
    achievements: [
      "Designed a project-first Python curriculum adopted across two cohorts.",
      "Mentored 40+ students from fundamentals to deployed ML projects.",
      "Replaced textbook exercises with graded shipping milestones.",
    ],
  },
  {
    title: "Project Coordinator",
    org: "University Project Office",
    period: "Ongoing",
    location: "Hybrid",
    achievements: [
      "Coordinated cross-team delivery for student-built AI applications.",
      "Built review rubrics that emphasized reproducibility and evaluation.",
      "Ran weekly critique sessions; failure modes became the curriculum.",
    ],
  },
  {
    title: "Independent Web Scraping Engineer",
    org: "Freelance",
    period: "Earlier",
    location: "Remote",
    achievements: [
      "Shipped production scrapers across e-commerce and news domains.",
      "Built resilient pipelines with retries, proxies, and schema drift handling.",
      "Delivered clean structured datasets, never raw HTML dumps.",
    ],
  },
];

export function ExperienceTimeline() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container">
        <SectionHeader
          eyebrow="Experience"
          title="Roles, in chronological order."
          description="Each entry shows what I owned and what shipped — not the job description."
        />

        <Stagger className="mt-14">
          <div className="relative space-y-6">
            <div className="absolute left-[19px] top-2 hidden h-[calc(100%-1rem)] w-px bg-hairline md:block" />
            {ROLES.map((r) => (
              <Item key={`${r.org}-${r.title}`}>
                <FadeUp y={16}>
                  <article className="group relative grid grid-cols-[40px_1fr] items-start gap-5 md:grid-cols-[40px_180px_1fr]">
                    <div className="relative z-10 mt-2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-surface text-muted-1 transition-colors group-hover:border-accent group-hover:text-accent-fg">
                      <span className="font-mono text-[10px]">●</span>
                    </div>
                    <div className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-muted-2 md:block">
                      {r.period}
                    </div>
                    <div className="rounded-2xl border border-hairline bg-surface p-6 transition-colors hover:border-white/15">
                      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-2 md:hidden">
                        {r.period}
                      </div>
                      <h3 className="mt-1 text-lg font-semibold text-white">
                        {r.title}
                      </h3>
                      <div className="mt-1 text-sm text-muted-1">
                        {r.org}
                        {r.location ? ` · ${r.location}` : ""}
                      </div>
                      <ul className="mt-4 space-y-2 text-sm text-muted-1">
                        {r.achievements.map((a, i) => (
                          <li key={i} className="flex gap-3">
                            <span className="mt-2 inline-block h-px w-3 shrink-0 bg-accent" />
                            <span>{a}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </FadeUp>
              </Item>
            ))}
          </div>
        </Stagger>
      </div>
    </section>
  );
}