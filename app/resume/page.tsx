import type { Metadata } from "next";
import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { SectionHeader } from "@/components/sections/section-header";
import { FadeUp } from "@/components/motion/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Résumé",
  description: "One-page résumé for Musfique Ahmed.",
};

export default function ResumePage() {
  return (
    <section className="relative pt-32 md:pt-44">
      <div className="container">
        <SectionHeader
          eyebrow="Résumé"
          title="A single page, in two formats."
          description="The canonical summary of what I do and where I've done it."
        />
        <FadeUp delay={0.05} className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-hairline bg-surface p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-hairline bg-surface-2 text-muted-1">
                  <FileText className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-sm font-semibold text-white">PDF</div>
                  <div className="font-mono text-[11px] text-muted-2">one-page summary</div>
                </div>
              </div>
              <Magnetic strength={0.2}>
                <Button asChild variant="primary">
                  <a href={site.resumeUrl} target="_blank" rel="noreferrer">
                    <Download className="h-4 w-4" />
                    Download
                  </a>
                </Button>
              </Magnetic>
            </div>
            <p className="mt-6 text-sm text-muted-1">
              If the link 404s, drop me a line at{" "}
              <a className="text-accent-fg underline" href={`mailto:${site.email}`}>
                {site.email}
              </a>{" "}
              and I'll send the latest version.
            </p>
          </div>
          <div className="rounded-2xl border border-hairline bg-surface p-8">
            <div className="text-sm font-semibold text-white">Quick facts</div>
            <ul className="mt-4 space-y-3 text-sm text-muted-1">
              <li>📍 Based in {site.location}</li>
              <li>🎓 B.Sc. Data Science</li>
              <li>🛠️ ML systems · full-stack · research</li>
              <li>🧪 Published in IEEE</li>
              <li>👥 Founder, UIU Data Science Club</li>
            </ul>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}