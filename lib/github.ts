// Server-side fetcher for GitHub public data. Cached for 1 hour by route
// revalidation (see /components/sections/github-activity.tsx).
//
// To raise the rate limit from 60/hr (unauthenticated, shared-IP-prone) to
// 5,000/hr, set GITHUB_TOKEN in your environment. A classic PAT with no scopes
// is sufficient — we're only reading public data.

export type GitHubRepo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  archived: boolean;
  fork: boolean;
  topics?: string[];
  pushed_at: string;
  updated_at: string;
  homepage?: string | null;
};

export type GitHubProfile = {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
};

export type GitHubEvent = {
  id: string;
  type: string;
  repo: { id: number; name: string; url: string };
  created_at: string;
  payload: {
    commits?: { sha: string; message: string }[];
    ref?: string;
    action?: string;
  };
};

const USER = "Musfique-Ahmed";
const HEADERS: HeadersInit = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
};
// Add auth header at request time if a token is available.
function authHeaders(): HeadersInit {
  const token = process.env.GITHUB_TOKEN;
  return token ? { ...HEADERS, Authorization: `Bearer ${token}` } : HEADERS;
}

export async function getProfile(): Promise<GitHubProfile | null> {
  try {
    const res = await fetch(`https://api.github.com/users/${USER}`, {
      headers: authHeaders(),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function getRecentRepos(
  limit = 6,
  options: { excludeForks?: boolean; excludeArchived?: boolean } = {}
): Promise<GitHubRepo[]> {
  const { excludeForks = true, excludeArchived = true } = options;
  try {
    const res = await fetch(
      `https://api.github.com/users/${USER}/repos?per_page=24&sort=pushed&direction=desc&type=owner`,
      {
        headers: authHeaders(),
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return [];
    const all: GitHubRepo[] = await res.json();
    return all
      .filter((r) => (!excludeForks || !r.fork) && (!excludeArchived || !r.archived))
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, limit);
  } catch {
    return [];
  }
}

export async function getRecentEvents(limit = 12): Promise<GitHubEvent[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${USER}/events/public?per_page=${limit}`,
      {
        headers: authHeaders(),
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

// Aggregate PushEvent commits into a per-day heatmap for the last 12 weeks.
// Returns Map<date-YYYY-MM-DD, count>.
export function aggregateCommitsByDay(
  events: GitHubEvent[]
): Map<string, number> {
  const map = new Map<string, number>();
  for (const e of events) {
    if (e.type !== "PushEvent") continue;
    const commits = e.payload.commits ?? [];
    const date = e.created_at.slice(0, 10);
    map.set(date, (map.get(date) ?? 0) + commits.length);
  }
  return map;
}

// Try to fetch per-day contribution data by scraping GitHub's contribution
// page. This returns JS-hydrated HTML — the server-rendered HTML can
// lag behind what the client shows after hydration. Used as a fallback
// when no token is available.
//
// Returns Map<date-YYYY-MM-DD, level 0..4> or null if parsing failed.
export async function scrapeContributionLevels(): Promise<Map<string, number> | null> {
  try {
    const res = await fetch(`https://github.com/users/${USER}/contributions`, {
      headers: { Accept: "text/html" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const html = await res.text();
    const re = /data-level="([0-4])"[\s\S]*?data-date="(\d{4}-\d{2}-\d{2})"/g;
    const map = new Map<string, number>();
    let m: RegExpExecArray | null;
    let found = 0;
    while ((m = re.exec(html)) !== null) {
      const level = Number(m[1]);
      const date = m[2];
      map.set(date, level);
      found++;
    }
    if (found < 50) return null;
    return map;
  } catch {
    return null;
  }
}

// Fetch the live, auth-resolved contribution graph via the GraphQL API.
// Requires a token. This returns the canonical contribution data — the
// same source GitHub's own profile page renders after JS hydration.
//
// Returns:
//   - dailyCounts: Map<date-YYYY-MM-DD, count>
//   - totalContributions: number
//   - activeDays: number
//
// Returns null on failure (no token, rate-limited, etc.) so callers
// can fall back to the HTML scrape.
export async function fetchContributionGraphQL(): Promise<{
  dailyCounts: Map<string, number>;
  totalContributions: number;
  activeDays: number;
} | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;
  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query {
          user(login: "${USER}") {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays { date contributionCount }
                }
              }
            }
          }
        }`,
      }),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    const calendar = json?.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar) return null;

    const dailyCounts = new Map<string, number>();
    let activeDays = 0;
    for (const week of calendar.weeks) {
      for (const day of week.contributionDays) {
        if (day.contributionCount > 0) {
          dailyCounts.set(day.date, day.contributionCount);
          activeDays++;
        }
      }
    }
    return {
      dailyCounts,
      totalContributions: calendar.totalContributions,
      activeDays,
    };
  } catch {
    return null;
  }
}

// Legacy: Stats API aggregation (kept as a fallback for edge cases
// where GraphQL returns empty). Aggregates commit_activity across the
// user's top repos. Less complete than GraphQL (only top-12 repos),
// so prefer fetchContributionGraphQL when available.
export async function fetchContributionCountsViaApi(): Promise<Map<string, number> | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;
  try {
    const reposRes = await fetch(
      `https://api.github.com/users/${USER}/repos?per_page=100&type=owner&sort=pushed`,
      { headers: authHeaders(), next: { revalidate: 3600 } }
    );
    if (!reposRes.ok) return null;
    const repos: GitHubRepo[] = await reposRes.json();

    const TOP_N = 12;
    const targets = repos.slice(0, TOP_N);
    const results = await Promise.allSettled(
      targets.map((r) =>
        fetch(`https://api.github.com/repos/${USER}/${r.name}/stats/commit_activity`, {
          headers: authHeaders(),
          next: { revalidate: 3600 },
        }).then((res) => (res.ok ? res.json() : null))
      )
    );

    const dailyCounts = new Map<string, number>();
    for (const r of results) {
      if (r.status !== "fulfilled" || !r.value) continue;
      for (const week of r.value as { week: number; days: number[] }[]) {
        const sunday = new Date(week.week * 1000);
        for (let d = 0; d < 7; d++) {
          const date = new Date(sunday);
          date.setUTCDate(sunday.getUTCDate() + d);
          const key = date.toISOString().slice(0, 10);
          const count = week.days[d] ?? 0;
          if (count > 0) {
            dailyCounts.set(key, (dailyCounts.get(key) ?? 0) + count);
          }
        }
      }
    }
    return dailyCounts.size > 0 ? dailyCounts : null;
  } catch {
    return null;
  }
}

// Bucket raw commit counts into 0..4 levels using the same thresholds
// GitHub's contribution graph uses (after some smoothing).
export function countsToLevels(
  counts: Map<string, number>
): Map<string, number> {
  const values = Array.from(counts.values());
  if (values.length === 0) return new Map();
  const max = Math.max(...values);
  const out = new Map<string, number>();
  for (const [date, count] of counts.entries()) {
    let level: 0 | 1 | 2 | 3 | 4;
    if (count === 0) level = 0;
    else if (max <= 1) level = 1;
    else if (count >= max * 0.75) level = 4;
    else if (count >= max * 0.5) level = 3;
    else if (count >= max * 0.25) level = 2;
    else level = 1;
    out.set(date, level);
  }
  return out;
}

// Scrape the "X contributions in the last year" headline from the profile
// contributions page. That number is GitHub's authoritative yearly total.
export async function scrapeYearTotal(): Promise<{ total: number; activeDays: number } | null> {
  try {
    const res = await fetch(`https://github.com/users/${USER}/contributions`, {
      headers: { Accept: "text/html" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const html = await res.text();
    // Pattern: "<N> contributions in the last year"
    const totalMatch = html.match(/(\d[\d,]*)\s+contributions?\s+in\s+the\s+last\s+year/i);
    const total = totalMatch ? Number(totalMatch[1].replace(/,/g, "")) : 0;
    // Pattern: "<N> active days" — exposed next to the level/days summary
    const activeMatch = html.match(/(\d[\d,]*)\s+active\s+days?/i);
    const activeDays = activeMatch ? Number(activeMatch[1].replace(/,/g, "")) : 0;
    if (total === 0 && activeDays === 0) return null;
    return { total, activeDays };
  } catch {
    return null;
  }
}

// Build a GitHub-aligned contribution-grid: a column per Sunday-bounded
// week, 7 rows (Sun..Sat). Date range is derived from the data, not a
// fixed number of weeks back from today. This ensures the full year of
// data GitHub returns actually renders — including the dense months
// that would otherwise fall outside a 52-week-back window.
export function buildHeatmapGrid(
  dayCounts: Map<string, number>
): { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }[][] {
  if (dayCounts.size === 0) return [];

  // Find the date range across all data points.
  const dates = Array.from(dayCounts.keys()).sort();
  const earliest = new Date(dates[0] + "T00:00:00Z");
  const latest = new Date(dates[dates.length - 1] + "T00:00:00Z");

  // Snap earliest to its preceding Sunday (column boundary).
  const startSunday = new Date(earliest);
  const startDow = startSunday.getUTCDay();
  startSunday.setUTCDate(startSunday.getUTCDate() - startDow);

  // Snap latest to its following Saturday (last row of last column).
  const endSaturday = new Date(latest);
  const endDow = endSaturday.getUTCDay();
  endSaturday.setUTCDate(endSaturday.getUTCDate() + (6 - endDow));

  const totalDays =
    Math.round((endSaturday.getTime() - startSunday.getTime()) / 86400000) + 1;
  const totalWeeks = Math.ceil(totalDays / 7);

  const counts = Array.from(dayCounts.values());
  const max = counts.length ? Math.max(...counts) : 0;
  const looksLikeLevel = counts.every((v) => v >= 0 && v <= 4);
  const bucket = (n: number): 0 | 1 | 2 | 3 | 4 => {
    if (n === 0) return 0;
    if (looksLikeLevel) return Math.min(4, Math.max(0, Math.round(n))) as 0 | 1 | 2 | 3 | 4;
    if (max <= 1) return 2;
    const r = n / max;
    if (r > 0.75) return 4;
    if (r > 0.5) return 3;
    if (r > 0.25) return 2;
    return 1;
  };

  const grid: { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }[][] = [];
  for (let w = 0; w < totalWeeks; w++) {
    const col: { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }[] = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(startSunday);
      date.setUTCDate(startSunday.getUTCDate() + w * 7 + d);
      const key = date.toISOString().slice(0, 10);
      const count = dayCounts.get(key) ?? 0;
      col.push({ date: key, count, level: bucket(count) });
    }
    grid.push(col);
  }
  return grid;
}

export function totalCommits(dayCounts: Map<string, number>): number {
  let n = 0;
  for (const v of dayCounts.values()) n += v;
  return n;
}