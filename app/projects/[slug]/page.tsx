import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink, BookOpen } from "lucide-react";
import { getProject, projects } from "@/lib/projects";
import { ProjectThumb } from "@/components/project-thumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { FadeUp, Stagger, Item } from "@/components/motion/reveal";
import { AnimatedCounter } from "@/components/motion/animated-counter";

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

        <FadeUp delay={0.05} className="mt-8 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="accent">{project.category}</Badge>
              <Badge variant="outline">{project.status}</Badge>
              <span className="font-mono text-[11px] text-muted-2">
                {project.year}
              </span>
            </div>
            <h1 className="mt-5 text-display-2">{project.title}</h1>
            <p className="mt-5 max-w-2xl text-base text-muted-1 md:text-lg">
              {project.shortDescription}
            </p>
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
          </div>
          <div className="lg:col-span-5">
            <ProjectThumb project={project} large />
          </div>
        </FadeUp>
      </div>

      {/* Body */}
      <div className="container mt-20">
        <Stagger className="grid gap-12 lg:grid-cols-12">
          <Item>
            <FadeUp>
              <Section id="overview" title="Overview" />
              <p className="mt-4 max-w-3xl text-muted-1">{project.solution}</p>
            </FadeUp>
          </Item>

          <Item>
            <FadeUp>
              <Section id="problem" title="Problem statement" />
              <p className="mt-4 max-w-3xl text-muted-1">{project.problem}</p>
            </FadeUp>
          </Item>

          <Item>
            <FadeUp>
              <Section id="architecture" title="Architecture" />
              <pre className="mt-4 overflow-x-auto rounded-xl border border-hairline bg-surface p-5 font-mono text-[12.5px] leading-relaxed text-muted-1">
                {project.architecture}
              </pre>
            </FadeUp>
          </Item>

          <Item>
            <FadeUp>
              <Section id="stack" title="Tech stack" />
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <Badge key={t} variant="accent">
                    {t}
                  </Badge>
                ))}
              </div>
            </FadeUp>
          </Item>

          <Item>
            <FadeUp>
              <Section id="features" title="Key features" />
              <ul className="mt-4 max-w-3xl space-y-2 text-muted-1">
                {project.features.map((f, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-2 inline-block h-px w-3 shrink-0 bg-accent" />
                    {f}
                  </li>
                ))}
              </ul>
            </FadeUp>
          </Item>

          <Item>
            <FadeUp>
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <Section id="challenges" title="Challenges" />
                  <ul className="mt-4 space-y-2 text-muted-1">
                    {project.challenges.map((c, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="mt-2 inline-block h-px w-3 shrink-0 bg-accent" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <Section id="outcomes" title="Results" />
                  <ul className="mt-4 grid grid-cols-3 gap-3">
                    {project.outcomes.map((o, i) => (
                      <li
                        key={i}
                        className="rounded-xl border border-hairline bg-surface p-4"
                      >
                        <div className="text-xl font-semibold tracking-tight text-white md:text-2xl">
                          {o.value}
                        </div>
                        <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted-2">
                          {o.label}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeUp>
          </Item>

          {project.futureWork && project.futureWork.length > 0 && (
            <Item>
              <FadeUp>
                <Section id="future" title="Future improvements" />
                <ul className="mt-4 max-w-3xl space-y-2 text-muted-1">
                  {project.futureWork.map((f, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-2 inline-block h-px w-3 shrink-0 bg-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
              </FadeUp>
            </Item>
          )}
        </Stagger>

        <div className="mt-24">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-2">
            More projects
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="group rounded-2xl border border-hairline bg-surface p-5 transition-colors hover:border-white/15"
              >
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{p.category}</Badge>
                  <span className="font-mono text-[10px] text-muted-2">{p.year}</span>
                </div>
                <h3 className="mt-3 text-base font-semibold text-white">{p.title}</h3>
                <p className="mt-1.5 line-clamp-2 text-xs text-muted-1">
                  {p.shortDescription}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function Section({ id, title }: { id: string; title: string }) {
  return (
    <div id={id} className="flex items-baseline gap-3">
      <span className="font-mono text-[10px] text-muted-2">§</span>
      <h2 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
        {title}
      </h2>
    </div>
  );
}