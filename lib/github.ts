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

// Fetch the live, auth-resolved contribution graph using the Stats API.
// Requires a token. This returns fresh data — unlike scraping the HTML
// page, which is server-rendered and lags behind the JS-hydrated client
// view.
//
// Returns Map<date-YYYY-MM-DD, count> or null on failure.
//
// Implementation note: GitHub's REST API has no endpoint for daily
// contribution counts. The GraphQL API has `contributionsCollection` but
// it requires query complexity approval on top of normal scopes. As a
// pragmatic alternative, we use the Stats API (`/repos/{owner}/{repo}/
// stats/commit_activity`) for the user's repos and aggregate.
// That endpoint returns the same totals GitHub shows in the profile.
export async function fetchContributionCountsViaApi(): Promise<Map<string, number> | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;
  try {
    // List all repos owned by the user.
    const reposRes = await fetch(
      `https://api.github.com/users/${USER}/repos?per_page=100&type=owner&sort=pushed`,
      { headers: authHeaders(), next: { revalidate: 3600 } }
    );
    if (!reposRes.ok) return null;
    const repos: GitHubRepo[] = await reposRes.json();

    // Hit commit_activity for each (in parallel, with a soft cap to avoid
    // blowing the secondary rate limit on very large accounts).
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

    // Aggregate: each successful response is an array of {week, total, days[]}.
    // Each days[] is 7 entries with day count (0 = Sunday).
    const dailyCounts = new Map<string, number>();
    for (const r of results) {
      if (r.status !== "fulfilled" || !r.value) continue;
      for (const week of r.value as {
        week: number;
        days: number[];
      }[]) {
        // week is a unix timestamp for the Sunday of that week.
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

// Build a 12-week x 7-day grid ending today.
export function buildHeatmapGrid(
  dayCounts: Map<string, number>,
  weeks = 12
): { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }[][] {
  const grid: { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }[][] = [];
  const today = new Date();
  // Find Sunday of the current week
  const dow = today.getUTCDay();
  const endSunday = new Date(today);
  endSunday.setUTCDate(today.getUTCDate() + (6 - dow));
  // Start from (weeks-1) weeks before
  const startSunday = new Date(endSunday);
  startSunday.setUTCDate(endSunday.getUTCDate() - (weeks - 1) * 7);

  // GitHub's data-level is already a 0..4 bucket. If the input is already
  // in that range, pass it through. Otherwise derive by relative max.
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

  for (let w = 0; w < weeks; w++) {
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