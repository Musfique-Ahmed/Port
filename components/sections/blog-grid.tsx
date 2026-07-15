"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Search } from "lucide-react";
import type { Post } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function BlogGrid({ posts }: { posts: Post[] }) {
  const [q, setQ] = React.useState("");
  const [active, setActive] = React.useState<string>("All");

  const categories = React.useMemo(() => {
    const set = new Set(posts.map((p) => p.frontmatter.category));
    return ["All", ...Array.from(set)];
  }, [posts]);

  const filtered = React.useMemo(() => {
    const term = q.trim().toLowerCase();
    return posts.filter((p) => {
      const cat = p.frontmatter.category;
      const inCat = active === "All" || cat === active;
      if (!inCat) return false;
      if (!term) return true;
      const haystack = [
        p.frontmatter.title,
        p.frontmatter.description,
        p.frontmatter.category,
        (p.frontmatter.tags ?? []).join(" "),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(term);
    });
  }, [posts, q, active]);

  return (
    <section className="relative py-24 md:py-32">
      <div className="container">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent-fg">
              Writing
            </span>
            <h2 className="mt-3 text-display-2">Notes from the work.</h2>
          </div>
          <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center">
            <div className="flex items-center gap-2 rounded-full border border-hairline bg-surface px-4 py-2.5 text-sm text-muted-1 md:w-72">
              <Search className="h-4 w-4 text-muted-2" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search posts…"
                className="w-full bg-transparent text-white placeholder:text-muted-2 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={cn(
                "rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors",
                active === c
                  ? "border-accent/40 bg-accent-dim text-accent-fg"
                  : "border-hairline bg-surface text-muted-1 hover:text-white"
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.article
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-2xl border border-hairline bg-surface p-6 transition-colors hover:border-white/15"
              >
                <Link href={`/blog/${p.slug}`} className="block">
                  <div className="flex items-center justify-between">
                    <Badge variant="accent">{p.frontmatter.category}</Badge>
                    <ArrowUpRight className="h-4 w-4 text-muted-2 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold leading-snug tracking-tight text-white">
                    {p.frontmatter.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-muted-1">
                    {p.frontmatter.description}
                  </p>
                  <div className="mt-6 flex items-center justify-between font-mono text-[11px] text-muted-2">
                    <time dateTime={p.frontmatter.date}>
                      {new Date(p.frontmatter.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      })}
                    </time>
                    <span>{p.readingTime}</span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </AnimatePresence>
          {filtered.length === 0 && (
            <div className="col-span-full rounded-2xl border border-dashed border-hairline p-12 text-center text-sm text-muted-1">
              No posts match that search. Try another term or clear filters.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}