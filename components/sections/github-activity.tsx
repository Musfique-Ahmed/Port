import {
  getRecentRepos,
  getProfile,
  buildHeatmapGrid,
  fetchContributionGraphQL,
  fetchContributionCountsViaApi,
  countsToLevels,
  scrapeContributionLevels,
  type GitHubRepo,
  type GitHubProfile,
} from "@/lib/github";
import { FadeUp, Stagger, Item } from "@/components/motion/reveal";
import { SectionHeader } from "./section-header";
import { Github, Star, GitFork, ExternalLink, Calendar, Hash } from "lucide-react";
import Link from "next/link";

// Force this section to render at request time with 1-hour revalidation.
export const revalidate = 3600;

function fmtRelative(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diff = Math.max(0, now - then);
  const day = 24 * 60 * 60 * 1000;
  if (diff < day) return "today";
  if (diff < 2 * day) return "yesterday";
  if (diff < 30 * day) return `${Math.floor(diff / day)}d ago`;
  if (diff < 365 * day) return `${Math.floor(diff / (30 * day))}mo ago`;
  return `${Math.floor(diff / (365 * day))}y ago`;
}

function LanguageDot({ lang }: { lang: string | null }) {
  // A tiny visual cue per language. Not exhaustive — only the common ones.
  const COLORS: Record<string, string> = {
    TypeScript: "#3178C6",
    JavaScript: "#F7DF1E",
    Python: "#3572A5",
    Java: "#B07219",
    "C++": "#F34B7D",
    C: "#555555",
    Go: "#00ADD8",
    Rust: "#DEA584",
    Ruby: "#701516",
    HTML: "#E34C26",
    CSS: "#563D7C",
    Shell: "#89E051",
    Jupyter: "#DA5B0B",
    Dart: "#00B4AB",
    Swift: "#F05138",
    Kotlin: "#A97BFF",
  };
  const color = (lang && COLORS[lang]) ?? "#71717A";
  return (
    <span
      className="inline-block h-2 w-2 rounded-full"
      style={{ backgroundColor: color }}
      aria-hidden
    />
  );
}

function HeatmapGrid({
  grid,
}: {
  grid: ReturnType<typeof buildHeatmapGrid>;
}) {
  return (
    <div className="flex gap-[3px]">
      {grid.map((col, i) => (
        <div key={i} className="flex flex-col gap-[3px]">
          {col.map((cell) => (
            <div
              key={cell.date}
              title={`${cell.date} · ${cell.count} commit${cell.count === 1 ? "" : "s"}`}
              className="h-[11px] w-[11px] rounded-sm transition-colors"
              style={{ backgroundColor: HEATMAP_LEVEL_BG[cell.level] }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

// GitHub's own contribution-graph palette (dark mode). Used directly so
// the heatmap matches the reference exactly. These are GitHub's published
// dark-mode hex values from their primer/css repo.
const HEATMAP_LEVEL_BG: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: "#161B22", // empty — matches GitHub dark bg
  1: "#033A16", // muted green
  2: "#196C2E", // medium green
  3: "#2EA043", // bright green
  4: "#39D353", // vivid green (most active)
};

function cn(...c: (string | false | undefined | null)[]) {
  return c.filter(Boolean).join(" ");
}

async function HeatmapBlock() {
  // Prefer scraping the contribution SVG (more complete data), fall back to
  // the Events API aggregation, fall back to nothing.
  // Three data sources, fetched in parallel:
//   1. GraphQL: canonical contribution graph (token-authenticated, same
//      data GitHub's profile page hydrates to). Includes the year total.
//   2. Stats API: top-12 repos aggregated (fallback).
//   3. HTML scrape: pre-hydration, often stale (last resort).
  const [graph, statsCounts, scraped] = await Promise.all([
    fetchContributionGraphQL(),
    fetchContributionCountsViaApi(),
    scrapeContributionLevels(),
  ]);

  // Prefer GraphQL (canonical); fall back to Stats API (top repos only);
  // then to HTML scrape (often stale); then to nothing.
  const rawCounts = graph?.dailyCounts ?? statsCounts ?? null;
  const dayCounts: Map<string, number> = rawCounts
    ? countsToLevels(rawCounts)
    : (scraped ?? new Map<string, number>());

  // Year total from GraphQL (canonical); no fallback because the year
  // total isn't critical and a wrong number looks worse than no number.
  const yearTotal = graph?.totalContributions ?? null;

  // 52 weeks ≈ 1 year matches GitHub's own profile heatmap range.
  const grid = buildHeatmapGrid(dayCounts, 52);
  const hasActivity =
    dayCounts.size > 0 && Array.from(dayCounts.values()).some((v) => v > 0);

  // Build month labels along the top axis.
  const monthLabels: { col: number; label: string }[] = [];
  let lastMonth = "";
  grid.forEach((col, i) => {
    const m = new Date(col[0].date).toLocaleString("en-US", { month: "short" });
    if (m !== lastMonth) {
      monthLabels.push({ col: i, label: m });
      lastMonth = m;
    }
  });

  return (
    <div className="rounded-2xl border border-hairline bg-surface p-6 md:p-7">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-hairline bg-surface-2 text-muted-1">
            <Github className="h-4 w-4" />
          </span>
          <div>
            <div className="text-sm font-semibold text-white">Currently shipping</div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-muted-2">
              Last 12 months · public activity
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-mono text-[10px] uppercase tracking-wider text-muted-2">
            Last year
          </div>
          <div className="text-2xl font-semibold tracking-tight text-white">
            {yearTotal !== null ? yearTotal.toLocaleString() : "—"}
          </div>
          <div className="mt-0.5 font-mono text-[10px] text-muted-2">
            contributions
          </div>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <div className="min-w-fit">
          {/* Month labels */}
          <div className="relative mb-2 ml-9 h-3 text-[10px] font-mono uppercase tracking-wider text-muted-2">
            {monthLabels.map((m) => (
              <span
                key={m.col}
                className="absolute"
                style={{ left: `${m.col * 14}px` }}
              >
                {m.label}
              </span>
            ))}
          </div>
          <div className="flex gap-3">
            {/* Day labels */}
            <div className="flex flex-col gap-[3px] pt-[1px] font-mono text-[10px] uppercase text-muted-2">
              <span className="h-[11px]">Mon</span>
              <span className="h-[11px]" />
              <span className="h-[11px]">Wed</span>
              <span className="h-[11px]" />
              <span className="h-[11px]">Fri</span>
              <span className="h-[11px]" />
              <span className="h-[11px]" />
            </div>
            <HeatmapGrid grid={grid} />
          </div>
          {/* Legend */}
          <div className="mt-4 flex items-center justify-end gap-[3px] font-mono text-[10px] uppercase tracking-wider text-muted-2">
            <span className="mr-1.5">Less</span>
            {([0, 1, 2, 3, 4] as const).map((l) => (
              <span
                key={l}
                className="h-[11px] w-[11px] rounded-sm"
                style={{ backgroundColor: HEATMAP_LEVEL_BG[l] }}
              />
            ))}
            <span className="ml-1.5">More</span>
          </div>
        </div>
      </div>

      {!hasActivity && (
        <p className="mt-4 rounded-lg border border-dashed border-hairline bg-surface-2 px-3 py-2 text-xs text-muted-1">
          Couldn't read the contributions graph right now. Visit{" "}
          <a
            href="https://github.com/Musfique-Ahmed"
            target="_blank"
            rel="noreferrer"
            className="text-accent-fg underline-offset-4 hover:underline"
          >
            the profile
          </a>{" "}
          directly.
        </p>
      )}

      <div className="mt-5 flex items-center justify-between border-t border-hairline pt-4">
        <p className="text-xs text-muted-1">
          Pulled live from{" "}
          <a
            href="https://github.com/Musfique-Ahmed"
            target="_blank"
            rel="noreferrer"
            className="text-accent-fg underline-offset-4 hover:underline"
          >
            github.com/Musfique-Ahmed
          </a>{" "}
          · refreshes hourly
        </p>
      </div>
    </div>
  );
}

async function ProfileStrip({ profile }: { profile: GitHubProfile | null }) {
  if (!profile) return null;
  const since = new Date(profile.created_at).getFullYear();
  return (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-2">
      <span className="flex items-center gap-2">
        <Calendar className="h-3.5 w-3.5" />
        On GitHub since {since}
      </span>
      <span className="flex items-center gap-2">
        <Hash className="h-3.5 w-3.5" />
        {profile.public_repos} public repos
      </span>
      <span className="flex items-center gap-2">
        <Github className="h-3.5 w-3.5" />
        {profile.followers} followers · {profile.following} following
      </span>
    </div>
  );
}

function RepoCard({ repo }: { repo: GitHubRepo }) {
  return (
    <Link
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      className="group flex h-full flex-col rounded-2xl border border-hairline bg-surface p-5 transition-all duration-200 hover:border-white/20 hover:bg-surface-2"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Github className="h-3.5 w-3.5 shrink-0 text-muted-2" />
            <span className="truncate font-mono text-xs text-white">
              {repo.name}
            </span>
          </div>
        </div>
        <ExternalLink className="h-3.5 w-3.5 text-muted-2 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
      </div>
      <p className="mt-3 line-clamp-3 min-h-[3.6em] text-xs text-muted-1">
        {repo.description || "No description provided."}
      </p>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-4">
        <div className="flex items-center gap-1.5 text-xs text-muted-1">
          <LanguageDot lang={repo.language} />
          <span>{repo.language ?? "—"}</span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[11px] text-muted-2">
          <span className="flex items-center gap-1">
            <Star className="h-3 w-3" />
            {repo.stargazers_count}
          </span>
          <span className="flex items-center gap-1">
            <GitFork className="h-3 w-3" />
            {repo.forks_count}
          </span>
        </div>
      </div>
      <div className="mt-3 border-t border-dashed border-hairline pt-3 font-mono text-[10px] uppercase tracking-wider text-muted-2">
        Updated {fmtRelative(repo.pushed_at)}
      </div>
    </Link>
  );
}

export async function GitHubActivity() {
  // Server component fetches in parallel.
  const [profile, repos] = await Promise.all([getProfile(), getRecentRepos(6)]);

  return (
    <section className="relative py-24 md:py-32">
      <div className="container">
        <FadeUp>
          <SectionHeader
            eyebrow="Open source"
            title="Public work, in public."
            description="Repos I actually own and ship. Pulled live from GitHub — refreshes every hour."
          />
        </FadeUp>

        <FadeUp delay={0.05} className="mt-10">
          <ProfileStrip profile={profile} />
        </FadeUp>

        <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <FadeUp>
              <HeatmapBlock />
            </FadeUp>
          </div>

          <div className="lg:col-span-7">
            <Stagger>
              <div className="grid gap-4 sm:grid-cols-2">
                {repos.length > 0 ? (
                  repos.map((repo) => (
                    <Item key={repo.id}>
                      <FadeUp y={12}>
                        <RepoCard repo={repo} />
                      </FadeUp>
                    </Item>
                  ))
                ) : (
                  <div className="col-span-full flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-hairline p-10 text-center">
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-2">
                      GitHub API rate-limited
                    </div>
                    <p className="max-w-sm text-sm text-muted-1">
                      The unauthenticated GitHub API allows 60 requests/hour.
                      Add a <code className="font-mono text-xs text-accent-fg">GITHUB_TOKEN</code> env
                      var (a classic PAT with no scopes is enough) to lift this
                      to 5,000/hour.
                    </p>
                    <a
                      href="https://github.com/Musfique-Ahmed?tab=repositories"
                      target="_blank"
                      rel="noreferrer"
                      className="text-accent-fg underline-offset-4 hover:underline"
                    >
                      View all repositories on GitHub →
                    </a>
                  </div>
                )}
              </div>
            </Stagger>
          </div>
        </div>

        <FadeUp className="mt-10 flex items-center justify-center">
          <Link
            href="https://github.com/Musfique-Ahmed?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-5 py-2.5 text-sm text-foreground transition-colors hover:border-white/20 hover:bg-surface-2"
          >
            <Github className="h-4 w-4 text-muted-1 transition-colors group-hover:text-white" />
            Browse all repositories
            <ExternalLink className="h-3.5 w-3.5 text-muted-2 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}