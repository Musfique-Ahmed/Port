"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { ProjectThumb } from "@/components/project-thumb";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/lib/projects";
import { cn } from "@/lib/utils";

export function ProjectBento() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section className="relative py-24 md:py-32">
      <div className="container">
        <div className="mb-14 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent-fg">
              Projects
            </span>
            <h2 className="mt-3 text-display-2">
              Selected work, with receipts.
            </h2>
          </div>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 self-start text-sm text-muted-1 transition-colors hover:text-white"
          >
            View all projects
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Featured bento */}
        <div className="grid gap-5 md:grid-cols-2">
          {featured.map((p, i) => (
            <FeaturedCard key={p.slug} project={p} tall={i === 0} />
          ))}
        </div>

        {/* Rest */}
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((p) => (
            <ProjectCard key={p.slug} project={p} compact />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({
  project,
  tall,
}: {
  project: (typeof projects)[number];
  tall?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-hairline bg-surface transition-colors hover:border-white/15"
      )}
    >
      <Link href={`/projects/${project.slug}`} className="block">
        <ProjectThumb project={project} large className="rounded-none border-0" />
        <div className="p-6 md:p-8">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-2">
              {project.category} · {project.year}
            </span>
            <ArrowUpRight className="h-4 w-4 text-muted-2 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
          </div>
          <h3
            className={cn(
              "mt-3 font-semibold tracking-tight text-white",
              tall ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
            )}
          >
            {project.title}
          </h3>
          <p className="mt-2 text-sm text-muted-1 md:text-base">
            {project.shortDescription}
          </p>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.tech.slice(0, 5).map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
            {project.tech.length > 5 && (
              <Badge variant="outline">+{project.tech.length - 5}</Badge>
            )}
          </div>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] text-muted-2">
            {project.outcomes.slice(0, 3).map((o) => (
              <span key={o.label}>
                <span className="text-white">{o.value}</span>{" "}
                <span className="text-muted-2">{o.label}</span>
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function ProjectCard({
  project,
  compact,
}: {
  project: (typeof projects)[number];
  compact?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-hairline bg-surface transition-colors hover:border-white/15"
    >
      <Link href={`/projects/${project.slug}`} className="block">
        <ProjectThumb project={project} className="rounded-none border-0" />
        <div className="p-5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-2">
              {project.category}
            </span>
            <ArrowUpRight className="h-3.5 w-3.5 text-muted-2 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
          </div>
          <h3 className="mt-2 text-base font-semibold tracking-tight text-white">
            {project.title}
          </h3>
          {compact && (
            <p className="mt-1.5 line-clamp-2 text-xs text-muted-1">
              {project.shortDescription}
            </p>
          )}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {project.tech.slice(0, 3).map((t) => (
                <Badge key={t} size="sm">
                  {t}
                </Badge>
              ))}
            </div>
            <span className="font-mono text-[10px] text-muted-2">
              {project.year}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}