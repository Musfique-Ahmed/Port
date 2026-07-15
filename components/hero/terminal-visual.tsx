"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Line =
  | { kind: "prompt"; text: string }
  | { kind: "out"; text: string; tone?: "muted" | "accent" | "warn" | "ok" };

const SCRIPT: Line[] = [
  { kind: "prompt", text: "$ musfique --describe" },
  { kind: "out", text: "AI Engineer · Data Scientist · Researcher", tone: "ok" },
  { kind: "out", text: "" },
  { kind: "prompt", text: "$ inference --model yolo-v9 --stream traffic-bd.mp4" },
  { kind: "out", text: "→ loading weights · 41.2 MB", tone: "muted" },
  { kind: "out", text: "→ frame 0421 · helmet_violation · 0.91", tone: "accent" },
  { kind: "out", text: "→ frame 0422 · signal_jump     · 0.87", tone: "accent" },
  { kind: "out", text: "→ frame 0423 · lane_violation  · 0.79", tone: "accent" },
  { kind: "out", text: "✓ stream · 24.8 FPS · CUDA:0", tone: "ok" },
  { kind: "out", text: "" },
  { kind: "prompt", text: "$ bench banglish-hate-v1 --f1" },
  { kind: "out", text: "→ tokenizing 12,403 code-mixed samples…", tone: "muted" },
  { kind: "out", text: "macro_f1 = 0.842  (sota on BanglaHate split)", tone: "accent" },
  { kind: "out", text: "" },
  { kind: "prompt", text: "$ git log --oneline | head -6" },
  { kind: "out", text: "a3f2c1  feat: safety app push notifications", tone: "muted" },
  { kind: "out", text: "d8e1a9  chore: dataset cards + DOI", tone: "muted" },
  { kind: "out", text: "1c7b40  ieee: camera-ready revision", tone: "muted" },
];

export function TerminalVisual({ className }: { className?: string }) {
  const [lines, setLines] = React.useState<Line[]>([]);
  const [done, setDone] = React.useState(false);
  const indexRef = React.useRef(0);

  React.useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    function step() {
      if (cancelled) return;
      if (indexRef.current >= SCRIPT.length) {
        setDone(true);
        timer = setTimeout(() => {
          if (cancelled) return;
          setLines([]);
          indexRef.current = 0;
          setDone(false);
          timer = setTimeout(step, 350);
        }, 3200);
        return;
      }

      const line = SCRIPT[indexRef.current++];
      if (line.kind === "prompt") {
        // typewriter for prompts
        const text = line.text;
        let i = 0;
        const typer = setInterval(() => {
          if (cancelled) return clearInterval(typer);
          i++;
          setLines((prev) => {
            const next = [...prev];
            next[next.length - 1] = { kind: "prompt", text: text.slice(0, i) };
            return next;
          });
          if (i >= text.length) {
            clearInterval(typer);
            timer = setTimeout(() => {
              setLines((prev) => [...prev, { kind: "out", text: "" }]);
              timer = setTimeout(step, 80);
            }, 220);
          }
        }, 22);
      } else {
        setLines((prev) => [...prev.slice(0, prev.length - 1), line, { kind: "out", text: "" }]);
        timer = setTimeout(step, line.text === "" ? 80 : 220 + Math.random() * 180);
      }
    }

    // initial empty trailing line
    setLines([{ kind: "out", text: "" }]);
    timer = setTimeout(step, 400);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-hairline bg-surface",
        className
      )}
    >
      {/* window chrome */}
      <div className="flex items-center justify-between border-b border-hairline px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </div>
        <div className="font-mono text-[11px] text-muted-2">
          ~/musfique — zsh
        </div>
        <div className="font-mono text-[10px] text-muted-2 opacity-0">status</div>
      </div>

      <div className="relative">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-12"
          style={{
            background:
              "linear-gradient(to bottom, var(--surface) 0%, transparent 100%)",
          }}
        />
        <div className="relative max-h-[420px] min-h-[360px] overflow-hidden p-5 font-mono text-[12.5px] leading-relaxed">
          {lines.map((l, i) => (
            <div
              key={i}
              className={cn(
                "whitespace-pre-wrap break-all",
                l.kind === "prompt" && "text-white",
                l.kind === "out" && l.tone === "muted" && "text-muted-1",
                l.kind === "out" && l.tone === "accent" && "text-accent-fg",
                l.kind === "out" && l.tone === "ok" && "text-accent-fg",
                l.kind === "out" && l.tone === "warn" && "text-amber-300",
                l.kind === "out" && !l.tone && "text-white"
              )}
            >
              {l.kind === "prompt" ? (
                <>
                  <span className="select-none text-accent">➜</span>{" "}
                  {l.text.replace(/^\$ /, "")}
                </>
              ) : (
                l.text
              )}
            </div>
          ))}
          {!done && (
            <div className="text-white">
              <span className="text-accent">➜</span>{" "}
              <span className="inline-block h-[1em] w-2 translate-y-[2px] animate-blink bg-accent align-middle" />
            </div>
          )}
        </div>
      </div>

      {/* soft glow corner */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-accent/20 blur-3xl"
      />
    </motion.div>
  );
}