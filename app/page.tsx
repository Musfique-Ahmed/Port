import { Hero } from "@/components/sections/hero";
import { MetricsRow } from "@/components/sections/metrics-row";
import { AboutTimeline } from "@/components/sections/about-timeline";
import { SkillGrid } from "@/components/sections/skill-grid";
import { ProjectBento } from "@/components/sections/project-bento";
import { ResearchSection } from "@/components/sections/research-section";
import { LeadershipDashboard } from "@/components/sections/leadership-dashboard";
import { ContactPanel } from "@/components/sections/contact-panel";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MetricsRow />
      <AboutTimeline />
      <SkillGrid />
      <ProjectBento />
      <ResearchSection />
      <LeadershipDashboard />
      <ContactPanel />
    </>
  );
}