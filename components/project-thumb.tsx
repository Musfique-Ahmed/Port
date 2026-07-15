"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/projects";

// Renders an inline SVG thumbnail per project category. No external assets needed.

type Props = { project: Project; className?: string; large?: boolean };

function Traffic() {
  return (
    <svg viewBox="0 0 800 500" className="h-full w-full">
      <defs>
        <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#111113" />
          <stop offset="1" stopColor="#0c0c0e" />
        </linearGradient>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="800" height="500" fill="url(#g1)" />
      <rect width="800" height="500" fill="url(#grid)" />
      {/* road */}
      <rect x="0" y="320" width="800" height="180" fill="#0a0a0c" />
      <g stroke="#71717a" strokeWidth="2" strokeDasharray="20 24">
        <line x1="0" y1="410" x2="800" y2="410" />
      </g>
      {/* vehicles */}
      <g>
        <rect x="120" y="280" width="80" height="50" rx="8" fill="#161618" stroke="#10B981" />
        <rect x="135" y="290" width="50" height="20" rx="4" fill="#0a0a0c" stroke="#10B981" />
        <circle cx="140" cy="335" r="6" fill="#0a0a0c" stroke="#10B981" />
        <circle cx="180" cy="335" r="6" fill="#0a0a0c" stroke="#10B981" />
      </g>
      <g>
        <rect x="260" y="240" width="70" height="55" rx="6" fill="#161618" stroke="#A1A1AA" />
        <rect x="272" y="250" width="46" height="18" rx="3" fill="#0a0a0c" stroke="#A1A1AA" />
      </g>
      {/* detection boxes */}
      <g stroke="#10B981" strokeWidth="1.5" fill="none">
        <rect x="115" y="270" width="90" height="70" />
        <text x="115" y="263" fontFamily="monospace" fontSize="11" fill="#10B981">
          helmet · 0.91
        </text>
      </g>
      <g stroke="#34D399" strokeWidth="1.5" fill="none">
        <rect x="255" y="230" width="80" height="75" />
        <text x="255" y="223" fontFamily="monospace" fontSize="11" fill="#34D399">
          signal · 0.87
        </text>
      </g>
      <g fontFamily="monospace" fontSize="11" fill="#A1A1AA">
        <text x="24" y="36">yolo-v9 · traffic · frame 0421</text>
        <text x="24" y="56">fps · 24.8 · cuda:0</text>
      </g>
      <g fontFamily="monospace" fontSize="11" fill="#10B981">
        <text x="640" y="36">▶ live</text>
      </g>
    </svg>
  );
}

function Banglish() {
  return (
    <svg viewBox="0 0 800 500" className="h-full w-full">
      <defs>
        <linearGradient id="g2" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#111113" />
          <stop offset="1" stopColor="#0c0c0e" />
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill="url(#g2)" />
      <g fontFamily="monospace" fontSize="13">
        <text x="40" y="80" fill="#A1A1AA">
          $ bench banglish-hate-v1
        </text>
        <text x="40" y="110" fill="#FFFFFF">
          macro_f1 · 0.84
        </text>
        <text x="40" y="135" fill="#A1A1AA">
          samples · 12,403 · splits · 8/1/1
        </text>
        <text x="40" y="160" fill="#34D399">
          ✓ leaderboard published
        </text>
      </g>
      {/* bar chart */}
      <g transform="translate(40,210)" fontFamily="monospace" fontSize="11" fill="#A1A1AA">
        <text x="0" y="-8">model · macro_f1</text>
        <g>
          <rect x="0" y="0" width="380" height="14" fill="#10B981" opacity="0.18" />
          <rect x="0" y="0" width="320" height="14" fill="#10B981" />
          <text x="390" y="11" fill="#FFFFFF">xlm-r-base · 0.84</text>
        </g>
        <g transform="translate(0,30)">
          <rect x="0" y="0" width="380" height="14" fill="#10B981" opacity="0.18" />
          <rect x="0" y="0" width="270" height="14" fill="#10B981" opacity="0.7" />
          <text x="390" y="11" fill="#FFFFFF">mbert · 0.71</text>
        </g>
        <g transform="translate(0,60)">
          <rect x="0" y="0" width="380" height="14" fill="#10B981" opacity="0.18" />
          <rect x="0" y="0" width="220" height="14" fill="#10B981" opacity="0.5" />
          <text x="390" y="11" fill="#FFFFFF">svm-tfidf · 0.58</text>
        </g>
        <g transform="translate(0,90)">
          <rect x="0" y="0" width="380" height="14" fill="#10B981" opacity="0.18" />
          <rect x="0" y="0" width="200" height="14" fill="#10B981" opacity="0.4" />
          <text x="390" y="11" fill="#FFFFFF">bnb · 0.52</text>
        </g>
      </g>
    </svg>
  );
}

function Ecommerce() {
  return (
    <svg viewBox="0 0 800 500" className="h-full w-full">
      <defs>
        <linearGradient id="g3" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#111113" />
          <stop offset="1" stopColor="#0c0c0e" />
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill="url(#g3)" />
      {/* fake product grid */}
      <g>
        {Array.from({ length: 8 }).map((_, i) => {
          const x = 40 + (i % 4) * 180;
          const y = 80 + Math.floor(i / 4) * 180;
          return (
            <g key={i}>
              <rect x={x} y={y} width="150" height="150" rx="14" fill="#161618" stroke="rgba(255,255,255,0.06)" />
              <rect x={x + 12} y={y + 12} width="126" height="80" rx="6" fill="#0a0a0c" />
              <rect x={x + 12} y={y + 102} width="80" height="6" rx="3" fill="#10B981" opacity="0.6" />
              <rect x={x + 12} y={y + 116} width="60" height="6" rx="3" fill="rgba(255,255,255,0.06)" />
              <text x={x + 12} y={y + 140} fontFamily="monospace" fontSize="10" fill="#A1A1AA">
                $ {(40 + i * 7).toFixed(2)}
              </text>
            </g>
          );
        })}
      </g>
      <text x="40" y="44" fontFamily="monospace" fontSize="11" fill="#A1A1AA">
        store · next.js · fastapi · mongodb · stripe
      </text>
    </svg>
  );
}

function Safety() {
  return (
    <svg viewBox="0 0 800 500" className="h-full w-full">
      <defs>
        <linearGradient id="g4" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#111113" />
          <stop offset="1" stopColor="#0c0c0e" />
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill="url(#g4)" />
      {/* phone outline */}
      <g transform="translate(280,40)">
        <rect x="0" y="0" width="240" height="420" rx="34" fill="#0a0a0c" stroke="rgba(255,255,255,0.08)" />
        <rect x="14" y="40" width="212" height="160" rx="14" fill="#161618" stroke="rgba(255,255,255,0.06)" />
        <text x="28" y="74" fontFamily="monospace" fontSize="11" fill="#A1A1AA">
          trusted contacts
        </text>
        <g fontFamily="monospace" fontSize="11" fill="#FFFFFF">
          <text x="28" y="108">● mom</text>
          <text x="28" y="132">● asif</text>
          <text x="28" y="156">● sara</text>
          <text x="28" y="180">● altman (not really)</text>
        </g>
        <circle cx="120" cy="320" r="60" fill="#10B981" opacity="0.16" />
        <circle cx="120" cy="320" r="42" fill="#10B981" />
        <text x="120" y="328" textAnchor="middle" fontFamily="monospace" fontSize="12" fill="#04130d" fontWeight="600">
          HOLD
        </text>
      </g>
    </svg>
  );
}

function Vizball() {
  return (
    <svg viewBox="0 0 800 500" className="h-full w-full">
      <defs>
        <linearGradient id="g5" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#111113" />
          <stop offset="1" stopColor="#0c0c0e" />
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill="url(#g5)" />
      <g transform="translate(60,80)">
        {/* axes */}
        <line x1="0" y1="280" x2="680" y2="280" stroke="rgba(255,255,255,0.08)" />
        <line x1="0" y1="0" x2="0" y2="280" stroke="rgba(255,255,255,0.08)" />
        {/* bars */}
        {Array.from({ length: 12 }).map((_, i) => {
          const h = Math.round(40 + Math.abs(Math.sin(i * 0.9)) * 220);
          const y = Math.round(280 - h);
          return (
            <g key={i}>
              <rect x={i * 56 + 8} y={y} width="36" height={h} rx="6" fill="#10B981" opacity={0.15 + (i % 3) * 0.2} />
              <rect x={i * 56 + 8} y={y} width="36" height={4} rx="2" fill="#34D399" />
            </g>
          );
        })}
        <text x="0" y="310" fontFamily="monospace" fontSize="11" fill="#A1A1AA">
          period · last 12 weeks
        </text>
      </g>
      <text x="40" y="44" fontFamily="monospace" fontSize="11" fill="#A1A1AA">
        vizball · possession flow · team A
      </text>
    </svg>
  );
}

function Airline() {
  return (
    <svg viewBox="0 0 800 500" className="h-full w-full">
      <defs>
        <linearGradient id="g6" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#111113" />
          <stop offset="1" stopColor="#0c0c0e" />
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill="url(#g6)" />
      {/* line */}
      <g transform="translate(40,80)">
        <line x1="0" y1="280" x2="720" y2="280" stroke="rgba(255,255,255,0.08)" />
        <line x1="0" y1="0" x2="0" y2="280" stroke="rgba(255,255,255,0.08)" />
        {/* y ticks */}
        {[0, 0.25, 0.5, 0.75, 1].map((v, i) => (
          <line
            key={i}
            x1="-4"
            x2="720"
            y1={280 - v * 240}
            y2={280 - v * 240}
            stroke="rgba(255,255,255,0.04)"
          />
        ))}
        {/* area */}
        <path
          d={`M0 200 L80 180 L160 220 L240 140 L320 160 L400 100 L480 130 L560 90 L640 110 L720 70 L720 280 L0 280 Z`}
          fill="#10B981"
          opacity="0.12"
        />
        <path
          d={`M0 200 L80 180 L160 220 L240 140 L320 160 L400 100 L480 130 L560 90 L640 110 L720 70`}
          fill="none"
          stroke="#34D399"
          strokeWidth="2"
        />
        {/* points */}
        {[
          [0, 200],
          [80, 180],
          [160, 220],
          [240, 140],
          [320, 160],
          [400, 100],
          [480, 130],
          [560, 90],
          [640, 110],
          [720, 70],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" fill="#0a0a0c" stroke="#34D399" />
        ))}
        <text x="0" y="306" fontFamily="monospace" fontSize="11" fill="#A1A1AA">
          cohort · business class · satisfaction over time
        </text>
      </g>
      <text x="40" y="44" fontFamily="monospace" fontSize="11" fill="#A1A1AA">
        airline · xgboost · roc_auc 0.93
      </text>
    </svg>
  );
}

const RENDERERS: Record<string, () => React.JSX.Element> = {
  "ai-traffic-violation-detection": Traffic,
  "banglish-hate-speech-benchmark": Banglish,
  "fullstack-ecommerce": Ecommerce,
  "my-safety-app": Safety,
  vizball: Vizball,
  "airline-customer-satisfaction": Airline,
};

export function ProjectThumb({ project, className, large }: Props) {
  const Render = RENDERERS[project.slug] ?? Traffic;
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-hairline bg-surface",
        large ? "aspect-[16/9]" : "aspect-[16/10]",
        className
      )}
    >
      <Render />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
    </div>
  );
}