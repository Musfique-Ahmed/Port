"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Camera,
  Cpu,
  ScanSearch,
  Layers,
  GitBranch,
  Database,
  FileText,
  ArrowRight,
  CircuitBoard,
  Cog,
  Eye,
  Activity,
  Tag,
  BarChart3,
  Beaker,
  Filter,
  BookOpenCheck,
  Globe,
  Server,
  ShoppingCart,
  CreditCard,
  Package,
  Wifi,
  MapPin,
  Bell,
  ShieldAlert,
  LineChart,
  GitMerge,
  Sparkles,
  Cookie,
  KeyRound,
  Webhook,
  Inbox,
  Shield,
  Crosshair,
  Radio,
  AlertTriangle,
  BarChartHorizontal,
  DatabaseBackup,
  Wrench,
  Users,
  Trophy,
  Hourglass,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Shared building blocks                                                     */
/* -------------------------------------------------------------------------- */

type NodeProps = {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  tone?: "default" | "accent" | "muted";
  align?: "left" | "center" | "right";
  className?: string;
};

function Node({ title, subtitle, icon, tone = "default", align = "center", className }: NodeProps) {
  return (
    <div
      className={cn(
        "flex min-w-[140px] flex-col items-center gap-2 rounded-xl border bg-surface px-4 py-3 transition-colors",
        tone === "accent" && "border-accent/40 bg-accent-dim",
        tone === "muted" && "border-hairline bg-surface-2",
        tone === "default" && "border-hairline",
        align === "left" && "items-start text-left",
        align === "right" && "items-end text-right",
        className
      )}
    >
      <div
        className={cn(
          "inline-flex h-8 w-8 items-center justify-center rounded-lg border",
          tone === "accent"
            ? "border-accent/40 bg-inset text-accent-fg"
            : "border-hairline bg-surface-2 text-muted-1"
        )}
      >
        {icon}
      </div>
      <div className={cn("text-sm font-medium leading-tight text-white", align === "center" && "text-center")}>
        {title}
      </div>
      {subtitle && (
        <div
          className={cn(
            "font-mono text-[10px] uppercase tracking-wider text-muted-2",
            align === "center" && "text-center"
          )}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
}

function Connector({ label }: { label?: string }) {
  return (
    <div className="relative flex h-12 w-full items-center justify-center">
      <div className="absolute inset-x-6 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-hairline to-transparent" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-hairline bg-inset p-1">
        <ArrowRight className="h-3 w-3 text-muted-1" />
      </div>
      {label && (
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full border border-hairline bg-inset px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-2">
          {label}
        </span>
      )}
    </div>
  );
}

function VConnector() {
  return (
    <div className="relative flex w-12 items-center justify-center">
      <div className="absolute inset-y-6 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-hairline to-transparent" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-hairline bg-inset p-1">
        <ArrowRight className="h-3 w-3 rotate-90 text-muted-1" />
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-2">
      <span className="inline-block h-px w-4 bg-hairline" />
      {children}
      <span className="inline-block h-px flex-1 bg-hairline" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Animated flow wrapper                                                      */
/* -------------------------------------------------------------------------- */

function FlowStage({ index, children }: { index: number; children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: reduce ? 0 : index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* AI Traffic Violation Detection                                            */
/* -------------------------------------------------------------------------- */

export function TrafficArchitecture() {
  return (
    <div className="space-y-6">
      {/* High-level pipeline */}
      <div className="rounded-2xl border border-hairline bg-surface p-5 md:p-6">
        <SectionLabel>Pipeline · real-time inference</SectionLabel>
        <div className="mt-5 flex flex-col">
          <FlowStage index={0}>
            <Node
              title="Camera Feed"
              subtitle="RTSP · 25 FPS"
              icon={<Camera className="h-4 w-4" />}
            />
          </FlowStage>
          <Connector label="decode · resize" />
          <FlowStage index={1}>
            <Node
              title="Frame Preprocessor"
              subtitle="letterbox · normalize"
              icon={<Cog className="h-4 w-4" />}
            />
          </FlowStage>
          <Connector label="tensor · GPU" />
          <FlowStage index={2}>
            <Node
              title="YOLOv9 Detector"
              subtitle="custom head · 3 classes"
              tone="accent"
              icon={<ScanSearch className="h-4 w-4" />}
            />
          </FlowStage>
          <Connector label="boxes · scores" />
          <FlowStage index={3}>
            <Node
              title="Tracker"
              subtitle="IoU + Re-ID"
              icon={<Layers className="h-4 w-4" />}
            />
          </FlowStage>
          <Connector label="track IDs" />
          <FlowStage index={4}>
            <Node
              title="Event Classifier"
              subtitle="violation rules"
              icon={<CircuitBoard className="h-4 w-4" />}
            />
          </FlowStage>
          <Connector label="NDJSON" />
          <FlowStage index={5}>
            <Node
              title="Event Log + API"
              subtitle="FastAPI · Postgres"
              icon={<Database className="h-4 w-4" />}
            />
          </FlowStage>
        </div>
      </div>

      {/* Two parallel detail rows */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Detector internals */}
        <div className="rounded-2xl border border-hairline bg-surface p-5">
          <SectionLabel>Detector · per-class heads</SectionLabel>
          <div className="mt-5 flex flex-col">
            <Node
              title="Backbone"
              subtitle="CSP-Darknet · pretrained"
              icon={<Cpu className="h-4 w-4" />}
            />
            <VConnector />
            <Node
              title="Neck"
              subtitle="FPN · PAN · multi-scale"
              icon={<GitBranch className="h-4 w-4" />}
            />
            <VConnector />
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Helmet", v: "0.91" },
                { label: "Signal", v: "0.87" },
                { label: "Lane", v: "0.79" },
              ].map((c, i) => (
                <FlowStage key={c.label} index={i}>
                  <div className="rounded-lg border border-accent/30 bg-accent-dim p-3 text-center">
                    <div className="text-xs font-medium text-white">{c.label}</div>
                    <div className="mt-1 font-mono text-[10px] text-accent-fg">
                      τ {c.v}
                    </div>
                  </div>
                </FlowStage>
              ))}
            </div>
          </div>
        </div>

        {/* Event flow */}
        <div className="rounded-2xl border border-hairline bg-surface p-5">
          <SectionLabel>Event flow · frame to log</SectionLabel>
          <div className="mt-5 flex flex-col gap-3">
            {[
              {
                step: "1",
                title: "Detect",
                body: "Per-class boxes + scores every frame.",
                Icon: Eye,
              },
              {
                step: "2",
                title: "Track",
                body: "Match boxes to identities via IoU + Re-ID.",
                Icon: Activity,
              },
              {
                step: "3",
                title: "Classify",
                body: "Apply per-class thresholds to declare event.",
                Icon: Tag,
              },
              {
                step: "4",
                title: "Persist",
                body: "Append NDJSON record with frame, track, score.",
                Icon: FileText,
              },
            ].map((s, i) => (
              <FlowStage key={s.step} index={i}>
                <div className="flex items-start gap-3 rounded-xl border border-hairline bg-surface-2 p-3">
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent-dim font-mono text-[11px] text-accent-fg">
                    {s.step}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <s.Icon className="h-3.5 w-3.5 text-muted-1" />
                      <span className="text-sm font-medium text-white">
                        {s.title}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted-1">{s.body}</p>
                  </div>
                </div>
              </FlowStage>
            ))}
          </div>
        </div>
      </div>

      {/* Tech placement row */}
      <div className="rounded-2xl border border-hairline bg-surface p-5">
        <SectionLabel>Runtime stack</SectionLabel>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {[
            "Python",
            "PyTorch",
            "YOLOv9",
            "OpenCV",
            "FastAPI",
            "Postgres",
            "CUDA",
            "ONNX",
          ].map((t, i) => (
            <FlowStage key={t} index={i}>
              <span className="inline-flex items-center rounded-full border border-hairline bg-surface-2 px-3 py-1.5 font-mono text-[11px] text-muted-1">
                {t}
              </span>
            </FlowStage>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Banglish Hate Speech Benchmark                                             */
/* -------------------------------------------------------------------------- */

export function BanglishArchitecture() {
  return (
    <div className="space-y-6">
      {/* Pipeline */}
      <div className="rounded-2xl border border-hairline bg-surface p-5 md:p-6">
        <SectionLabel>Pipeline · corpus to leaderboard</SectionLabel>
        <div className="mt-5 flex flex-col">
          <FlowStage index={0}>
            <Node
              title="Raw Corpus"
              subtitle="12,403 samples"
              icon={<Database className="h-4 w-4" />}
            />
          </FlowStage>
          <Connector label="normalize · dedupe" />
          <FlowStage index={1}>
            <Node
              title="Annotation"
              subtitle="2-pass · adjudicated"
              icon={<Tag className="h-4 w-4" />}
            />
          </FlowStage>
          <Connector label="author-disjoint" />
          <FlowStage index={2}>
            <Node
              title="Stratified Splits"
              subtitle="80 / 10 / 10"
              tone="accent"
              icon={<Filter className="h-4 w-4" />}
            />
          </FlowStage>
          <Connector label="5-fold protocol" />
          <FlowStage index={3}>
            <Node
              title="Baseline Suite"
              subtitle="classical + transformers"
              icon={<Beaker className="h-4 w-4" />}
            />
          </FlowStage>
          <Connector label="macro F1 · P/R" />
          <FlowStage index={4}>
            <Node
              title="Public Leaderboard"
              subtitle="reproducible eval"
              icon={<BarChart3 className="h-4 w-4" />}
            />
          </FlowStage>
        </div>
      </div>

      {/* Two side-by-side panels */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Baselines grid */}
        <div className="rounded-2xl border border-hairline bg-surface p-5">
          <SectionLabel>Baselines</SectionLabel>
          <div className="mt-5 space-y-2">
            {[
              { name: "XLM-RoBERTa-base", kind: "Transformer", f1: "0.842", accent: true },
              { name: "mBERT-base", kind: "Transformer", f1: "0.711" },
              { name: "BanglaBERT", kind: "Transformer", f1: "0.704" },
              { name: "SVM + TF-IDF (char n-grams)", kind: "Classical", f1: "0.582" },
              { name: "Complement Naive Bayes", kind: "Classical", f1: "0.524" },
            ].map((m, i) => (
              <FlowStage key={m.name} index={i}>
                <div
                  className={cn(
                    "flex items-center justify-between gap-3 rounded-xl border p-3",
                    m.accent
                      ? "border-accent/30 bg-accent-dim"
                      : "border-hairline bg-surface-2"
                  )}
                >
                  <div className="min-w-0">
                    <div className="truncate text-sm text-white">{m.name}</div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-muted-2">
                      {m.kind}
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <div
                      className={cn(
                        "font-mono text-sm",
                        m.accent ? "text-accent-fg" : "text-white"
                      )}
                    >
                      {m.f1}
                    </div>
                    <div className="font-mono text-[9px] uppercase tracking-wider text-muted-2">
                      macro F1
                    </div>
                  </div>
                </div>
              </FlowStage>
            ))}
          </div>
        </div>

        {/* Protocol guarantees */}
        <div className="rounded-2xl border border-hairline bg-surface p-5">
          <SectionLabel>Reproducibility · protocol</SectionLabel>
          <div className="mt-5 space-y-3">
            {[
              {
                title: "Author-disjoint splits",
                body: "No author appears in more than one split — eliminates stylistic leakage.",
                Icon: Filter,
              },
              {
                title: "Fixed random seeds",
                body: "Seeds, tokenizer versions, and config are pinned per baseline.",
                Icon: Cog,
              },
              {
                title: "Calibrated evaluation",
                body: "Macro F1, weighted F1, and per-class reports saved with each run.",
                Icon: BarChart3,
              },
              {
                title: "Public artifacts",
                body: "Dataset card, label rubric, and eval script released with the paper.",
                Icon: BookOpenCheck,
              },
            ].map((p, i) => (
              <FlowStage key={p.title} index={i}>
                <div className="flex items-start gap-3 rounded-xl border border-hairline bg-surface-2 p-3">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-hairline bg-inset text-muted-1">
                    <p.Icon className="h-3.5 w-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-white">{p.title}</div>
                    <p className="mt-1 text-xs leading-relaxed text-muted-1">
                      {p.body}
                    </p>
                  </div>
                </div>
              </FlowStage>
            ))}
          </div>
        </div>
      </div>

      {/* Data shape row */}
      <div className="rounded-2xl border border-hairline bg-surface p-5">
        <SectionLabel>Sample shape</SectionLabel>
        <div className="mt-4 overflow-hidden rounded-xl border border-hairline bg-inset font-mono text-[12.5px]">
          <div className="flex items-center justify-between border-b border-hairline px-4 py-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-2">
              samples.jsonl
            </span>
            <span className="font-mono text-[10px] text-muted-2">12,403 rows</span>
          </div>
          <pre className="overflow-x-auto px-4 py-3 leading-relaxed preserve-light text-white/90">
{`{
  "id": "bh_001242",
  "text": "tui fake news korechis, amake behag koros",
  "lang_mix": ["bn-Latn", "en"],
  "label": "hate",
  "sublabel": ["targeted", "religious"],
  "annotators": 3,
  "agreement": 1.0,
  "split": "train",
  "author_id": "anon_8821"
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Full-Stack E-commerce                                                      */
/* -------------------------------------------------------------------------- */

export function EcommerceArchitecture() {
  return (
    <div className="space-y-6">
      {/* Top-level topology */}
      <div className="rounded-2xl border border-hairline bg-surface p-5 md:p-6">
        <SectionLabel>Topology · request to order</SectionLabel>
        <div className="mt-5 flex flex-col">
          <FlowStage index={0}>
            <Node
              title="Browser"
              subtitle="RSC + server actions"
              icon={<Globe className="h-4 w-4" />}
            />
          </FlowStage>
          <Connector label="HTTP · edge cache" />
          <FlowStage index={1}>
            <Node
              title="Next.js 15"
              subtitle="App Router · RSC"
              tone="accent"
              icon={<Server className="h-4 w-4" />}
            />
          </FlowStage>
          <Connector label="JSON · typed" />
          <FlowStage index={2}>
            <Node
              title="FastAPI"
              subtitle="async · validated"
              icon={<Cog className="h-4 w-4" />}
            />
          </FlowStage>
          <Connector label="read · write" />
          <FlowStage index={3}>
            <Node
              title="MongoDB"
              subtitle="products · orders"
              icon={<Database className="h-4 w-4" />}
            />
          </FlowStage>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <FlowStage index={3}>
            <Node
              title="Stripe Checkout"
              subtitle="hosted · PCI-safe"
              icon={<CreditCard className="h-4 w-4" />}
            />
          </FlowStage>
          <FlowStage index={4}>
            <Node
              title="Stripe Webhooks"
              subtitle="signed events"
              icon={<Webhook className="h-4 w-4" />}
            />
          </FlowStage>
          <FlowStage index={5}>
            <Node
              title="Order State Machine"
              subtitle="created → paid → shipped"
              icon={<Package className="h-4 w-4" />}
            />
          </FlowStage>
        </div>
      </div>

      {/* Checkout race story */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-hairline bg-surface p-5">
          <SectionLabel>Checkout · safe state transitions</SectionLabel>
          <div className="mt-5 space-y-3">
            {[
              { state: "cart", tone: "muted" as const, note: "client cookie + server cache" },
              { state: "checkout_started", tone: "muted" as const, note: "stripe session id stored" },
              { state: "payment_pending", tone: "accent" as const, note: "webhook race window" },
              { state: "paid", tone: "default" as const, note: "idempotent · order created" },
              { state: "fulfilled", tone: "default" as const, note: "shipment · receipt sent" },
            ].map((s, i) => (
              <FlowStage key={s.state} index={i}>
                <div
                  className={cn(
                    "flex items-center justify-between gap-3 rounded-xl border p-3",
                    s.tone === "accent"
                      ? "border-accent/30 bg-accent-dim"
                      : s.tone === "muted"
                      ? "border-hairline bg-surface-2"
                      : "border-hairline bg-surface"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "inline-block h-2 w-2 rounded-full",
                        s.tone === "accent" ? "bg-accent" : "bg-muted-2"
                      )}
                    />
                    <span className="font-mono text-xs text-white">{s.state}</span>
                  </div>
                  <span className="font-mono text-[10px] text-muted-2">{s.note}</span>
                </div>
              </FlowStage>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-hairline bg-surface p-5">
          <SectionLabel>Data · collections</SectionLabel>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {[
              { name: "products", Icon: Package, hint: "sku · variants · media" },
              { name: "users", Icon: KeyRound, hint: "auth · roles" },
              { name: "orders", Icon: ShoppingCart, hint: "line items · totals" },
              { name: "sessions", Icon: Cookie, hint: "guest carts" },
              { name: "webhook_events", Icon: Inbox, hint: "dedupe ledger" },
              { name: "audit_log", Icon: FileText, hint: "state transitions" },
            ].map((c, i) => (
              <FlowStage key={c.name} index={i}>
                <div className="rounded-xl border border-hairline bg-surface-2 p-3">
                  <div className="flex items-center gap-2">
                    <c.Icon className="h-3.5 w-3.5 text-muted-1" />
                    <span className="font-mono text-xs text-white">{c.name}</span>
                  </div>
                  <div className="mt-1 font-mono text-[10px] text-muted-2">{c.hint}</div>
                </div>
              </FlowStage>
            ))}
          </div>
        </div>
      </div>

      {/* Stack strip */}
      <div className="rounded-2xl border border-hairline bg-surface p-5">
        <SectionLabel>Runtime stack</SectionLabel>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {[
            "Next.js 15",
            "TypeScript",
            "FastAPI",
            "MongoDB",
            "Stripe",
            "TailwindCSS",
            "Redis",
            "Edge cache",
          ].map((t, i) => (
            <FlowStage key={t} index={i}>
              <span className="inline-flex items-center rounded-full border border-hairline bg-surface-2 px-3 py-1.5 font-mono text-[11px] text-muted-1">
                {t}
              </span>
            </FlowStage>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* My Safety App                                                              */
/* -------------------------------------------------------------------------- */

export function SafetyArchitecture() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-hairline bg-surface p-5 md:p-6">
        <SectionLabel>Pipeline · tap to trusted contact</SectionLabel>
        <div className="mt-5 flex flex-col">
          <FlowStage index={0}>
            <Node
              title="One-Tap Action"
              subtitle="home screen · no menus"
              tone="accent"
              icon={<Crosshair className="h-4 w-4" />}
            />
          </FlowStage>
          <Connector label="incident + GPS" />
          <FlowStage index={1}>
            <Node
              title="Offline Queue"
              subtitle="local store · retry"
              icon={<DatabaseBackup className="h-4 w-4" />}
            />
          </FlowStage>
          <Connector label="WebSocket" />
          <FlowStage index={2}>
            <Node
              title="Realtime Gateway"
              subtitle="auth · rate limit"
              icon={<Radio className="h-4 w-4" />}
            />
          </FlowStage>
          <Connector label="fan-out" />
          <FlowStage index={3}>
            <Node
              title="Contacts Service"
              subtitle="trusted circles"
              icon={<Users className="h-4 w-4" />}
            />
          </FlowStage>
          <Connector label="push + SMS" />
          <FlowStage index={4}>
            <Node
              title="Alerts Out"
              subtitle="location · message"
              icon={<Bell className="h-4 w-4" />}
            />
          </FlowStage>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Offline strategy */}
        <div className="rounded-2xl border border-hairline bg-surface p-5">
          <SectionLabel>Offline · queue + retry</SectionLabel>
          <div className="mt-5 space-y-3">
            {[
              { step: "1", title: "Capture", body: "Incident + GPS captured even with no signal.", Icon: MapPin },
              { step: "2", title: "Persist", body: "Encrypted local store. Survives app kill.", Icon: DatabaseBackup },
              { step: "3", title: "Reconnect", body: "On signal, drain queue with exponential backoff.", Icon: Wifi },
              { step: "4", title: "Acknowledge", body: "Server confirms, client clears delivered events.", Icon: Shield },
            ].map((s, i) => (
              <FlowStage key={s.step} index={i}>
                <div className="flex items-start gap-3 rounded-xl border border-hairline bg-surface-2 p-3">
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent-dim font-mono text-[11px] text-accent-fg">
                    {s.step}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <s.Icon className="h-3.5 w-3.5 text-muted-1" />
                      <span className="text-sm font-medium text-white">{s.title}</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-1">{s.body}</p>
                  </div>
                </div>
              </FlowStage>
            ))}
          </div>
        </div>

        {/* Threat model */}
        <div className="rounded-2xl border border-hairline bg-surface p-5">
          <SectionLabel>Threat model · what we defend</SectionLabel>
          <div className="mt-5 space-y-3">
            {[
              { title: "Flaky network", body: "No dropped incidents — queue + retry with idempotency keys.", Icon: Wifi },
              { title: "Spurious alerts", body: "Hold-to-confirm gesture prevents accidental triggers.", Icon: ShieldAlert },
              { title: "Privacy", body: "Location shared only with pre-approved circles during an incident.", Icon: Shield },
              { title: "Battery", body: "Adaptive polling + foreground service only when incident active.", Icon: AlertTriangle },
            ].map((p, i) => (
              <FlowStage key={p.title} index={i}>
                <div className="flex items-start gap-3 rounded-xl border border-hairline bg-surface-2 p-3">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-hairline bg-inset text-muted-1">
                    <p.Icon className="h-3.5 w-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-white">{p.title}</div>
                    <p className="mt-1 text-xs leading-relaxed text-muted-1">{p.body}</p>
                  </div>
                </div>
              </FlowStage>
            ))}
          </div>
        </div>
      </div>

      {/* Stack */}
      <div className="rounded-2xl border border-hairline bg-surface p-5">
        <SectionLabel>Runtime stack</SectionLabel>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {["React Native", "TypeScript", "WebSocket", "Maps SDK", "Push", "SQLite (encrypted)"].map(
            (t, i) => (
              <FlowStage key={t} index={i}>
                <span className="inline-flex items-center rounded-full border border-hairline bg-surface-2 px-3 py-1.5 font-mono text-[11px] text-muted-1">
                  {t}
                </span>
              </FlowStage>
            )
          )}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Vizball                                                                    */
/* -------------------------------------------------------------------------- */

export function VizballArchitecture() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-hairline bg-surface p-5 md:p-6">
        <SectionLabel>Pipeline · data to readable chart</SectionLabel>
        <div className="mt-5 flex flex-col">
          <FlowStage index={0}>
            <Node
              title="Source"
              subtitle="CSV · API · scraped"
              icon={<Database className="h-4 w-4" />}
            />
          </FlowStage>
          <Connector label="normalize" />
          <FlowStage index={1}>
            <Node
              title="Python Transform"
              subtitle="pandas · tidy"
              icon={<Wrench className="h-4 w-4" />}
            />
          </FlowStage>
          <Connector label="JSON specs" />
          <FlowStage index={2}>
            <Node
              title="Chart Engine"
              subtitle="D3 · static SVG"
              tone="accent"
              icon={<LineChart className="h-4 w-4" />}
            />
          </FlowStage>
          <Connector label="shareable URL" />
          <FlowStage index={3}>
            <Node
              title="Viewer"
              subtitle="no JS framework"
              icon={<BarChart3 className="h-4 w-4" />}
            />
          </FlowStage>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Chart types */}
        <div className="rounded-2xl border border-hairline bg-surface p-5">
          <SectionLabel>Chart catalog</SectionLabel>
          <div className="mt-5 grid grid-cols-2 gap-2">
            {[
              { name: "Heater timeline", Icon: Activity, sports: "NBA · EPL" },
              { name: "Possession flow", Icon: GitMerge, sports: "NBA" },
              { name: "Win prob curve", Icon: LineChart, sports: "all" },
              { name: "Shot chart", Icon: Crosshair, sports: "NBA" },
              { name: "Form table", Icon: Trophy, sports: "EPL · La Liga" },
              { name: "Streaks & slumps", Icon: Hourglass, sports: "all" },
            ].map((c, i) => (
              <FlowStage key={c.name} index={i}>
                <div className="rounded-xl border border-hairline bg-surface-2 p-3">
                  <div className="flex items-center gap-2">
                    <c.Icon className="h-3.5 w-3.5 text-muted-1" />
                    <span className="text-xs text-white">{c.name}</span>
                  </div>
                  <div className="mt-1 font-mono text-[10px] text-muted-2">{c.sports}</div>
                </div>
              </FlowStage>
            ))}
          </div>
        </div>

        {/* Design rules */}
        <div className="rounded-2xl border border-hairline bg-surface p-5">
          <SectionLabel>Design rules · for small samples</SectionLabel>
          <div className="mt-5 space-y-3">
            {[
              { title: "Static SVG first", body: "Renders before JS, indexes, prints.", Icon: Sparkles },
              { title: "Share-by-URL", body: "Every view is a URL — copy/paste, embed, link.", Icon: Globe },
              { title: "Small samples survive", body: "We pick chart types that don't lie under n < 30.", Icon: Beaker },
              { title: "Story, not table", body: "One chart answers one question. No dashboards.", Icon: BookOpenCheck },
            ].map((p, i) => (
              <FlowStage key={p.title} index={i}>
                <div className="flex items-start gap-3 rounded-xl border border-hairline bg-surface-2 p-3">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-hairline bg-inset text-muted-1">
                    <p.Icon className="h-3.5 w-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-white">{p.title}</div>
                    <p className="mt-1 text-xs leading-relaxed text-muted-1">{p.body}</p>
                  </div>
                </div>
              </FlowStage>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-hairline bg-surface p-5">
        <SectionLabel>Spec example · heater timeline</SectionLabel>
        <div className="mt-4 overflow-hidden rounded-xl border border-hairline bg-inset font-mono text-[12.5px]">
          <pre className="overflow-x-auto px-4 py-3 leading-relaxed preserve-light text-white/90">
{`{
  "chart": "heater_timeline",
  "sport": "nba",
  "subject": { "team": "BOS", "metric": "pace" },
  "window": "last_12_games",
  "view": { "theme": "auto", "height": 360 }
}`}
          </pre>
        </div>
      </div>

      <div className="rounded-2xl border border-hairline bg-surface p-5">
        <SectionLabel>Runtime stack</SectionLabel>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {["Python", "pandas", "FastAPI", "D3", "SVG", "Edge cache"].map((t, i) => (
            <FlowStage key={t} index={i}>
              <span className="inline-flex items-center rounded-full border border-hairline bg-surface-2 px-3 py-1.5 font-mono text-[11px] text-muted-1">
                {t}
              </span>
            </FlowStage>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Airline Customer Satisfaction                                              */
/* -------------------------------------------------------------------------- */

export function AirlineArchitecture() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-hairline bg-surface p-5 md:p-6">
        <SectionLabel>Pipeline · CSV to executive dashboard</SectionLabel>
        <div className="mt-5 flex flex-col">
          <FlowStage index={0}>
            <Node
              title="Raw CSV"
              subtitle="~130k passengers"
              icon={<Database className="h-4 w-4" />}
            />
          </FlowStage>
          <Connector label="impute · encode" />
          <FlowStage index={1}>
            <Node
              title="Cleaning + FE"
              subtitle="pandas · sklearn"
              icon={<Wrench className="h-4 w-4" />}
            />
          </FlowStage>
          <Connector label="stratified folds" />
          <FlowStage index={2}>
            <Node
              title="Modeling"
              subtitle="XGBoost · calibrated"
              tone="accent"
              icon={<Cpu className="h-4 w-4" />}
            />
          </FlowStage>
          <Connector label="probabilities" />
          <FlowStage index={3}>
            <Node
              title="Stakeholder Layer"
              subtitle="Power BI · weekly refresh"
              icon={<BarChartHorizontal className="h-4 w-4" />}
            />
          </FlowStage>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Feature engineering */}
        <div className="rounded-2xl border border-hairline bg-surface p-5">
          <SectionLabel>Feature engineering · what mattered</SectionLabel>
          <div className="mt-5 space-y-3">
            {[
              { name: "Inflight wifi service", weight: "0.182", top: true },
              { name: "Type of Travel · Business", weight: "0.144", top: false },
              { name: "Customer Type · Loyal", weight: "0.121", top: false },
              { name: "Online boarding", weight: "0.098", top: false },
              { name: "Seat comfort", weight: "0.071", top: false },
              { name: "Flight Distance · log", weight: "0.058", top: false },
            ].map((f, i) => (
              <FlowStage key={f.name} index={i}>
                <div
                  className={cn(
                    "flex items-center gap-3 rounded-xl border p-3",
                    f.top
                      ? "border-accent/30 bg-accent-dim"
                      : "border-hairline bg-surface-2"
                  )}
                >
                  <span className="font-mono text-[10px] text-muted-2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-sm text-white">{f.name}</span>
                  <div className="relative h-1.5 w-24 overflow-hidden rounded-full bg-inset">
                    <div
                      className={cn(
                        "absolute inset-y-0 left-0 rounded-full",
                        f.top ? "bg-accent" : "bg-accent/50"
                      )}
                      style={{ width: `${Number(f.weight) * 5}px` }}
                    />
                  </div>
                  <span
                    className={cn(
                      "w-14 text-right font-mono text-xs",
                      f.top ? "text-accent-fg" : "text-white"
                    )}
                  >
                    {f.weight}
                  </span>
                </div>
              </FlowStage>
            ))}
          </div>
        </div>

        {/* Calibration / metrics */}
        <div className="rounded-2xl border border-hairline bg-surface p-5">
          <SectionLabel>Calibrated outputs · stakeholder trust</SectionLabel>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {[
              { k: "ROC AUC", v: "0.93", accent: true },
              { k: "PR AUC", v: "0.89" },
              { k: "Brier", v: "0.078" },
              { k: "Macro F1", v: "0.81" },
            ].map((m, i) => (
              <FlowStage key={m.k} index={i}>
                <div
                  className={cn(
                    "rounded-xl border p-4",
                    m.accent
                      ? "border-accent/30 bg-accent-dim"
                      : "border-hairline bg-surface-2"
                  )}
                >
                  <div
                    className={cn(
                      "text-2xl font-semibold tracking-tight",
                      m.accent ? "text-accent-fg" : "text-white"
                    )}
                  >
                    {m.v}
                  </div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted-2">
                    {m.k}
                  </div>
                </div>
              </FlowStage>
            ))}
          </div>
          <div className="mt-5 space-y-3">
            {[
              {
                title: "Calibrated probabilities",
                body: "Isotonic regression per fold so threshold = business cost.",
                Icon: Filter,
              },
              {
                title: "Per-segment importance",
                body: "Top drivers broken down by Class, Customer Type, Travel Type.",
                Icon: BarChart3,
              },
              {
                title: "Refresh cadence",
                body: "Weekly retrain + drift checks on the score distribution.",
                Icon: Activity,
              },
            ].map((p, i) => (
              <FlowStage key={p.title} index={i}>
                <div className="flex items-start gap-3 rounded-xl border border-hairline bg-surface-2 p-3">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-hairline bg-inset text-muted-1">
                    <p.Icon className="h-3.5 w-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-white">{p.title}</div>
                    <p className="mt-1 text-xs leading-relaxed text-muted-1">{p.body}</p>
                  </div>
                </div>
              </FlowStage>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-hairline bg-surface p-5">
        <SectionLabel>Runtime stack</SectionLabel>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {["Python", "pandas", "scikit-learn", "XGBoost", "Power BI"].map((t, i) => (
            <FlowStage key={t} index={i}>
              <span className="inline-flex items-center rounded-full border border-hairline bg-surface-2 px-3 py-1.5 font-mono text-[11px] text-muted-1">
                {t}
              </span>
            </FlowStage>
          ))}
        </div>
      </div>
    </div>
  );
}