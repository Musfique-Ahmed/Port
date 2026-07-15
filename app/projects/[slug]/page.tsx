import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Github, ExternalLink, BookOpen, Sparkles } from "lucide-react";
import { getProject, projects } from "@/lib/projects";
import { ProjectThumb } from "@/components/project-thumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { FadeUp } from "@/components/motion/reveal";
import {
  TrafficArchitecture,
  BanglishArchitecture,
  EcommerceArchitecture,
  SafetyArchitecture,
  VizballArchitecture,
  AirlineArchitecture,
} from "@/components/architecture-diagrams";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project" };
  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      type: "article",
    },
  };
}

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "architecture", label: "Architecture" },
  { id: "stack", label: "Tech stack" },
  { id: "features", label: "Key features" },
  { id: "challenges", label: "Challenges" },
  { id: "outcomes", label: "Results" },
] as const;

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const related = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <article className="pt-28 md:pt-36">
      {/* Header */}
      <div className="container">
        <FadeUp>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-2 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            All projects
          </Link>
        </FadeUp>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <FadeUp>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="accent">{project.category}</Badge>
                <Badge variant="outline">{project.status}</Badge>
                <span className="font-mono text-[11px] text-muted-2">
                  {project.year}
                </span>
              </div>
            </FadeUp>
            <FadeUp delay={0.05}>
              <h1 className="mt-5 text-display-2 text-white">{project.title}</h1>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-white/80 md:text-lg">
                {project.shortDescription}
              </p>
            </FadeUp>
            <FadeUp delay={0.15}>
              <div className="mt-7 flex flex-wrap gap-3">
                {project.github && (
                  <Magnetic strength={0.2}>
                    <Button asChild variant="outline">
                      <a href={project.github} target="_blank" rel="noreferrer">
                        <Github className="h-4 w-4" /> Source
                      </a>
                    </Button>
                  </Magnetic>
                )}
                {project.live && (
                  <Magnetic strength={0.2}>
                    <Button asChild variant="primary">
                      <a href={project.live} target="_blank" rel="noreferrer">
                        <ExternalLink className="h-4 w-4" /> Live demo
                      </a>
                    </Button>
                  </Magnetic>
                )}
                {project.blog && (
                  <Magnetic strength={0.2}>
                    <Button asChild variant="ghost">
                      <Link href={project.blog}>
                        <BookOpen className="h-4 w-4" /> Case study
                      </Link>
                    </Button>
                  </Magnetic>
                )}
              </div>
            </FadeUp>
          </div>
          <div className="lg:col-span-5">
            <FadeUp delay={0.1}>
              <ProjectThumb project={project} large />
              <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-muted-2">
                <span>{project.category}</span>
                <span>{project.year}</span>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>

      {/* Body — two-column on desktop: sticky section nav + content */}
      <div className="container mt-24 md:mt-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Side nav */}
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-2">
                On this page
              </div>
              <ul className="mt-4 space-y-1.5">
                {SECTIONS.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="group flex items-baseline gap-3 py-1.5 text-sm text-muted-1 transition-colors hover:text-white"
                    >
                      <span className="font-mono text-[10px] text-muted-2 group-hover:text-accent-fg">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{s.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Content */}
          <div className="lg:col-span-9">
            <FadeUp>
              <ProjectSection id="overview" eyebrow="01" title="Overview">
                <p className="text-[17px] leading-relaxed text-white/85">
                  {project.solution}
                </p>
              </ProjectSection>
            </FadeUp>

            <FadeUp>
              <ProjectSection id="problem" eyebrow="02" title="Problem statement">
                <p className="text-[17px] leading-relaxed text-white/85">
                  {project.problem}
                </p>
              </ProjectSection>
            </FadeUp>

            <FadeUp>
              <ProjectSection id="architecture" eyebrow="03" title="Architecture">
                {project.slug === "ai-traffic-violation-detection" ? (
                  <TrafficArchitecture />
                ) : project.slug === "banglish-hate-speech-benchmark" ? (
                  <BanglishArchitecture />
                ) : project.slug === "fullstack-ecommerce" ? (
                  <EcommerceArchitecture />
                ) : project.slug === "my-safety-app" ? (
                  <SafetyArchitecture />
                ) : project.slug === "vizball" ? (
                  <VizballArchitecture />
                ) : project.slug === "airline-customer-satisfaction" ? (
                  <AirlineArchitecture />
                ) : (
                  <pre className="overflow-x-auto rounded-xl border border-hairline bg-surface p-5 font-mono text-[12.5px] leading-relaxed text-white/90 md:text-[13px]">
                    {project.architecture}
                  </pre>
                )}
              </ProjectSection>
            </FadeUp>

            <FadeUp>
              <ProjectSection id="stack" eyebrow="04" title="Tech stack">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <Badge key={t} variant="accent">
                      {t}
                    </Badge>
                  ))}
                </div>
              </ProjectSection>
            </FadeUp>

            <FadeUp>
              <ProjectSection id="features" eyebrow="05" title="Key features">
                <ul className="space-y-3">
                  {project.features.map((f, i) => (
                    <li key={i} className="flex gap-3 text-[16px] leading-relaxed text-white/85">
                      <span className="mt-[10px] inline-block h-px w-4 shrink-0 bg-accent" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </ProjectSection>
            </FadeUp>

            <FadeUp>
              <div className="grid gap-10 md:grid-cols-2">
                <div>
                  <ProjectSection id="challenges" eyebrow="06" title="Challenges">
                    <ul className="space-y-3">
                      {project.challenges.map((c, i) => (
                        <li key={i} className="flex gap-3 text-[16px] leading-relaxed text-white/85">
                          <span className="mt-[10px] inline-block h-px w-4 shrink-0 bg-accent" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </ProjectSection>
                </div>
                <div>
                  <ProjectSection id="outcomes" eyebrow="07" title="Results">
                    <ul className="grid grid-cols-1 gap-3">
                      {project.outcomes.map((o) => (
                        <li
                          key={o.label}
                          className="rounded-xl border border-hairline bg-surface p-5"
                        >
                          <div className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                            {o.value}
                          </div>
                          <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted-2">
                            {o.label}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </ProjectSection>
                </div>
              </div>
            </FadeUp>

            {project.futureWork && project.futureWork.length > 0 && (
              <FadeUp>
                <ProjectSection id="future" eyebrow="08" title="Future improvements">
                  <ul className="space-y-3">
                    {project.futureWork.map((f, i) => (
                      <li key={i} className="flex gap-3 text-[16px] leading-relaxed text-white/85">
                        <span className="mt-[10px] inline-block h-px w-4 shrink-0 bg-accent" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </ProjectSection>
              </FadeUp>
            )}

            <FadeUp>
              <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-hairline bg-surface p-6 md:p-8">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-2">
                    Like this work?
                  </div>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-white md:text-2xl">
                    Let's build something together.
                  </h3>
                </div>
                <Magnetic strength={0.2}>
                  <Button asChild variant="accent">
                    <a href={`mailto:${site.email}?subject=Project: ${project.title}`}>
                      <Sparkles className="h-4 w-4" />
                      Get in touch
                    </a>
                  </Button>
                </Magnetic>
              </div>
            </FadeUp>
          </div>
        </div>

        {/* Related */}
        <div className="mt-24 md:mt-32">
          <div className="flex items-end justify-between gap-4">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent-fg">
                More work
              </span>
              <h2 className="mt-3 text-display-3 text-white">Related projects</h2>
            </div>
            <Link
              href="/projects"
              className="group hidden items-center gap-2 text-sm text-muted-1 transition-colors hover:text-white md:inline-flex"
            >
              View all
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="group rounded-2xl border border-hairline bg-surface p-1 transition-colors hover:border-white/15"
              >
                <ProjectThumb project={p} />
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{p.category}</Badge>
                    <span className="font-mono text-[10px] text-muted-2">
                      {p.year}
                    </span>
                  </div>
                  <h3 className="mt-3 text-base font-semibold text-white">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-sm text-muted-1">
                    {p.shortDescription}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function ProjectSection({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-32 border-t border-hairline py-12 first:border-t-0 first:pt-0 md:py-14">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-[11px] tracking-[0.18em] text-accent-fg">
          §{eyebrow}
        </span>
        <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
          {title}
        </h2>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}