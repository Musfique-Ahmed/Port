import type { Metadata } from "next";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Roles, in chronological order — with what shipped, not the job description.",
};

export default function ExperiencePage() {
  return (
    <section className="pt-32 md:pt-44">
      <ExperienceTimeline />
    </section>
  );
}