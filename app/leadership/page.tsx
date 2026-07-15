import type { Metadata } from "next";
import { LeadershipDashboard } from "@/components/sections/leadership-dashboard";

export const metadata: Metadata = {
  title: "Leadership",
  description: "Founding and scaling UIU Data Science Club.",
};

export default function LeadershipPage() {
  return (
    <section className="pt-28 md:pt-36">
      <LeadershipDashboard />
    </section>
  );
}