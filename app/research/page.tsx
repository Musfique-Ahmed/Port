import type { Metadata } from "next";
import { ResearchSection } from "@/components/sections/research-section";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Peer-reviewed work by Musfique Ahmed — NLP, benchmarks, and reproducibility.",
};

export default function ResearchPage() {
  return (
    <section className="pt-28 md:pt-36">
      <ResearchSection />
    </section>
  );
}