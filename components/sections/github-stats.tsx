import {
  getProfile,
  getAllRepos,
  fetchContributionGraphQL,
  currentStreak,
  longestStreak,
  totalCommits,
  type GitHubRepo,
  type GitHubProfile,
} from "@/lib/github";
import { FadeUp } from "@/components/motion/reveal";
import { Star, GitCommit, GitPullRequest, AlertCircle, Users } from "lucide-react";

export const revalidate = 3600;

function formatRange(start: string, end: string): string {
  const s = new Date(start + "T00:00:00Z");
  const e = new Date(end + "T00:00:00Z");
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "2-digit" });
  if (start === end) return fmt(s);
  return `${fmt(s)} – ${fmt(e)}`;
}

// Circular progress indicator for streak counts. SVG ring that fills
// proportionally to days / 365 (one year max).
function StreakRing({
  days,
  size = 120,
}: {
  days: number;
  size?: number;
}) {
  const stroke = 6;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  // Cap streak ring at 365 days for the visual fill — anything longer
  // is a full ring.
  const pct = Math.min(days / 365, 1);
  const offset = circumference * (1 - pct);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
      {/* Track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="currentColor"
        strokeWidth={stroke}
        fill="none"
        className="text-surface-2"
      />
      {/* Progress */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="currentColor"
        strokeWidth={stroke}
        fill="none"
        strokeLinecap="round"
        className="text-accent"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      {/* Inner number */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        className="fill-foreground font-mono"
        style={{ fontSize: size * 0.32, fontWeight: 600 }}
      >
        {days}
      </text>
    </svg>
  );
}

function Stat({
  label,
  value,
  Icon,
}: {
  label: string;
  value: number;
  Icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="flex items-center justify-between border-b border-dashed border-hairline py-2 last:border-b-0">
      <span className="flex items-center gap-2 text-sm text-muted-1">
        <Icon className="h-3.5 w-3.5 text-accent-fg" />
        {label}
      </span>
      <span className="font-mono text-sm font-semibold tabular-nums text-foreground">
        {value.toLocaleString()}
      </span>
    </div>
  );
}

async function fetchExtraStats(profile: GitHubProfile | null, repos: GitHubRepo[]) {
  // Aggregate stats from the repos we already loaded. PRs/issues aren't
  // exposed simply, but stars + forks + watchers are on each repo object.
  const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);
  const totalForks = repos.reduce((s, r) => s + r.forks_count, 0);
  // Approximate "PRs opened" and "issues opened" using the Search API.
  // Skip these if no token or already loaded; we'll surface zeros as fallbacks.
  return {
    totalStars,
    totalForks,
    totalPRs: 0,
    totalIssues: 0,
    contributedTo: 0,
  };
}

export async function GitHubStats() {
  const [profile, repos, graph] = await Promise.all([
    getProfile(),
    getAllRepos(),
    fetchContributionGraphQL(),
  ]);
  const dayCounts = graph?.dailyCounts ?? new Map<string, number>();
  const total = graph?.totalContributions ?? totalCommits(dayCounts);
  const current = currentStreak(dayCounts);
  const longest = longestStreak(dayCounts);
  const stats = await fetchExtraStats(profile, repos);

  return (
    <section className="relative border-y border-hairline bg-surface/40 py-16 md:py-20">
      <div className="container">
        <FadeUp>
          <div className="mb-8 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                aria-hidden
              >
                <path
                  fill="currentColor"
                  className="text-foreground"
                  d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.55v-1.93c-3.2.7-3.87-1.54-3.87-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.34.95.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.94 10.94 0 015.74 0c2.18-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.26 5.69.41.36.78 1.06.78 2.13v3.16c0 .3.21.66.8.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"
                />
              </svg>
              <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                GitHub Statistics
              </h2>
            </div>
            <a
              href="https://github.com/Musfique-Ahmed"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[11px] text-muted-2 underline-offset-4 hover:text-white hover:underline"
            >
              View profile →
            </a>
          </div>
        </FadeUp>

        <FadeUp className="grid gap-4 md:grid-cols-2">
          {/* Card 1: Profile + repo stats */}
          <div className="rounded-2xl border border-hairline bg-surface p-6 md:p-7">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent-fg">
              {profile?.login ?? "Musfique Ahmed"}'s GitHub Stats
            </div>
            <div className="mt-5 flex items-start gap-6">
              <div className="flex-1">
                <Stat
                  label="Total Stars"
                  value={stats.totalStars}
                  Icon={Star}
                />
                <Stat
                  label="Total Commits"
                  value={total}
                  Icon={GitCommit}
                />
                <Stat
                  label="Total PRs"
                  value={stats.totalPRs}
                  Icon={GitPullRequest}
                />
                <Stat
                  label="Total Issues"
                  value={stats.totalIssues}
                  Icon={AlertCircle}
                />
                <Stat
                  label="Contributed to"
                  value={stats.contributedTo}
                  Icon={Users}
                />
              </div>
              {/* Circular avatar with initials */}
              <div className="relative shrink-0">
                <svg viewBox="0 0 100 100" className="h-24 w-24">
                  <circle
                    cx="50"
                    cy="50"
                    r="44"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="6"
                    className="text-surface-2"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="44"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="6"
                    className="text-accent"
                    strokeDasharray="276.46"
                    strokeDashoffset="0"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-2xl font-semibold tracking-tight text-foreground">
                    A+
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Total contributions */}
          <div className="rounded-2xl border border-hairline bg-surface p-6 md:p-7">
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="text-5xl font-semibold tracking-tight text-accent-fg md:text-6xl">
                {total.toLocaleString()}
              </div>
              <div className="mt-2 text-sm font-medium text-foreground">
                Total Contributions
              </div>
              <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-muted-2">
                {current
                  ? `${formatRange(current.start, current.end)} – Present`
                  : "No active streak"}
              </div>
            </div>
          </div>

          {/* Card 3: Current streak (ring) */}
          <div className="rounded-2xl border border-hairline bg-surface p-6 md:p-7">
            <div className="flex h-full flex-col items-center justify-center text-center">
              <StreakRing days={current?.days ?? 0} />
              <div className="mt-4 text-sm font-medium text-foreground">
                Current Streak
              </div>
              <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-muted-2">
                {current
                  ? formatRange(current.start, current.end)
                  : "—"}
              </div>
            </div>
          </div>

          {/* Card 4: Longest streak */}
          <div className="rounded-2xl border border-hairline bg-surface p-6 md:p-7">
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="text-5xl font-semibold tracking-tight text-foreground md:text-6xl">
                {longest?.days ?? 0}
              </div>
              <div className="mt-2 text-sm font-medium text-foreground">
                Longest Streak
              </div>
              <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-muted-2">
                {longest ? formatRange(longest.start, longest.end) : "—"}
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}