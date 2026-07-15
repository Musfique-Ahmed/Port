import type { Metadata } from "next";
import { AboutTimeline } from "@/components/sections/about-timeline";
import { SkillGrid } from "@/components/sections/skill-grid";
import { SectionHeader } from "@/components/sections/section-header";
import { FadeUp } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story of Musfique Ahmed — programming to data science to research to AI to leadership.",
};

export default function AboutPage() {
  return (
    <>
      <section className="relative pt-32 md:pt-44">
        <div className="container">
          <FadeUp>
            <SectionHeader
              eyebrow="About"
              title="Programming, then data, then research — in that order."
              description="I started writing code because I wanted to automate the boring parts of my day. I stayed because the systems got interesting. Here's the arc."
            />
          </FadeUp>
          <FadeUp delay={0.05} className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              { k: "Based in", v: "Dhaka, Bangladesh" },
              { k: "Studying", v: "B.Sc. Data Science" },
              { k: "Available for", v: "AI/ML engineering, research collaborations" },
            ].map((it) => (
              <div
                key={it.k}
                className="rounded-2xl border border-hairline bg-surface p-6"
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-2">
                  {it.k}
                </div>
                <div className="mt-2 text-base text-white">{it.v}</div>
              </div>
            ))}
          </FadeUp>
        </div>
      </section>
      <AboutTimeline />
      <SkillGrid />
    </>
  );
}