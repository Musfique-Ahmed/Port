// Server-side fetchers for the github-readme-stats vercel service.
// Returns the raw SVG markup so we can inline it (no <img> wrapper, no
// CORS, no layout shift). Hourly cache via revalidate in the consumer.

const USER = "Musfique-Ahmed";

const ENDPOINTS = {
  stats: `https://github-readme-stats-sigma-five.vercel.app/api?username=${USER}&show_icons=true&theme=radical&include_all_commits=true&count_private=true`,
  streak: `https://github-readme-streak-stats-eight.vercel.app/?user=${USER}&theme=radical`,
  topLangs: `https://github-readme-stats-sigma-five.vercel.app/api/top-langs/?username=${USER}&layout=compact&theme=radical&langs_count=8`,
} as const;

export type ReadmeStatsKey = keyof typeof ENDPOINTS;

async function fetchSvg(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: { Accept: "image/svg+xml" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const text = await res.text();
    // Strip the XML declaration if present so we can inline cleanly.
    return text.replace(/<\?xml[^?]*\?>\s*/, "").trim();
  } catch {
    return null;
  }
}

export async function getReadmeStatsSvg(
  key: ReadmeStatsKey
): Promise<string | null> {
  return fetchSvg(ENDPOINTS[key]);
}

export async function getAllReadmeStats(): Promise<{
  stats: string | null;
  streak: string | null;
  topLangs: string | null;
}> {
  const [stats, streak, topLangs] = await Promise.all([
    getReadmeStatsSvg("stats"),
    getReadmeStatsSvg("streak"),
    getReadmeStatsSvg("topLangs"),
  ]);
  return { stats, streak, topLangs };
}