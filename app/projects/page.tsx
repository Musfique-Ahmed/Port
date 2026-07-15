import type { Metadata } from "next";
import { ProjectBento } from "@/components/sections/project-bento";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected work by Musfique Ahmed — computer vision, NLP, full-stack, and data.",
};

export default function ProjectsPage() {
  return (
    <section className="pt-28 md:pt-36">
      <ProjectBento />
    </section>
  );
}