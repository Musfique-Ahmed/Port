import Link from "next/link";
import { ArrowUpRight, Quote } from "lucide-react";
import { FadeUp, Stagger, Item } from "@/components/motion/reveal";
import { SectionHeader } from "./section-header";
import { Badge } from "@/components/ui/badge";

export type Paper = {
  title: string;
  venue: string;
  authors: string[];
  year: string;
  abstract: string;
  citation: string;
  doi?: string;
  link?: string;
  tags: string[];
};

export const papers: Paper[] = [
  {
    title: "BanglishHate: A Reproducible Benchmark for Hate Speech Detection in Code-Mixed Bangla-English",
    venue: "IEEE Conference",
    authors: ["M. Ahmed", "et al."],
    year: "2025",
    abstract:
      "We introduce BanglishHate, a labeled corpus and evaluation protocol for hate speech detection in code-mixed Bangla-English text. The benchmark ships with author-disjoint splits, calibrated baselines spanning classical and transformer families, and an error analysis targeted at ambiguous transliterated samples. We report macro-F1 across five baselines and discuss failure modes common to off-the-shelf multilingual models on this domain.",
    citation:
      "M. Ahmed, et al. 'BanglishHate: A Reproducible Benchmark for Hate Speech Detection in Code-Mixed Bangla-English.' IEEE Conf., 2025.",
    doi: "11022100",
    link: "https://ieeexplore.ieee.org/document/11022100",
    tags: ["NLP", "Benchmark", "Code-mixed", "Reproducibility"],
  },
];

export const researchInterests = [
  "Computer Vision",
  "NLP",
  "LLMs",
  "Data Engineering",
  "Responsible AI",
];

export function ResearchSection() {
  return (
    <section className="relative border-t border-hairline py-24 md:py-32">
      <div className="container">
        <SectionHeader
          eyebrow="Research"
          title="Work that survives peer review."
          description="A small but serious publication record. Each paper comes with code, data, and a reproducible protocol."
        />

        <Stagger className="mt-14 space-y-6">
          {papers.map((p) => (
            <Item key={p.title}>
              <FadeUp y={16}>
                <article className="rounded-2xl border border-hairline bg-surface p-8 md:p-10">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge variant="accent">{p.venue}</Badge>
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-2">
                      {p.year}
                    </span>
                    {p.tags.map((t) => (
                      <Badge key={t} size="sm">
                        {t}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold tracking-tight text-white md:text-3xl">
                    {p.title}
                  </h3>
                  <div className="mt-2 text-sm text-muted-1">{p.authors.join(", ")}</div>
                  <div className="mt-6 grid gap-8 md:grid-cols-3">
                    <p className="md:col-span-2 text-sm leading-relaxed text-muted-1 md:text-base">
                      <Quote className="mb-2 h-4 w-4 text-accent-fg" />
                      {p.abstract}
                    </p>
                    <div className="rounded-xl border border-hairline bg-surface-2 p-5 font-mono text-[12px]">
                      <div className="text-muted-2">Cite</div>
                      <div className="mt-2 text-muted-1">{p.citation}</div>
                      {p.doi && (
                        <div className="mt-4 text-muted-2">
                          DOI · <span className="text-muted-1">{p.doi}</span>
                        </div>
                      )}
                      {p.link && (
                        <Link
                          href={p.link}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-4 inline-flex items-center gap-1 text-accent-fg hover:underline"
                        >
                          View publication
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              </FadeUp>
            </Item>
          ))}
        </Stagger>

        <div className="mt-16">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-2">
            Research interests
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {researchInterests.map((i) => (
              <li
                key={i}
                className="rounded-full border border-hairline bg-surface-2 px-3 py-1.5 text-sm text-white"
              >
                {i}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}