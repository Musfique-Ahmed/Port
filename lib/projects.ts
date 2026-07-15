export type ProjectStatus = "shipped" | "research" | "ongoing";
export type ProjectCategory =
  | "Computer Vision"
  | "NLP"
  | "Full-Stack"
  | "Mobile"
  | "Data"
  | "Visualization";

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  status: ProjectStatus;
  year: string;
  shortDescription: string;
  problem: string;
  solution: string;
  architecture: string; // ASCII
  tech: string[];
  features: string[];
  challenges: string[];
  outcomes: { label: string; value: string }[];
  github?: string;
  live?: string;
  blog?: string;
  thumbnail: string;
  gallery?: string[];
  highlights?: string[];
  futureWork?: string[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "ai-traffic-violation-detection",
    title: "AI Traffic Violation Detection",
    category: "Computer Vision",
    status: "shipped",
    year: "2025",
    shortDescription:
      "Real-time detection of helmet, signal, and lane violations on Bangladeshi roads.",
    problem:
      "Manual traffic enforcement in dense South-Asian road environments cannot scale. Existing detectors fail on motorbikes, mixed lighting, and partially occluded riders.",
    solution:
      "A modular YOLO-based detection stack tuned on locally-captured footage, with per-violation confidence thresholds and a lightweight event pipeline.",
    architecture:
      "┌──────────┐   ┌────────────┐   ┌────────────┐   ┌────────────┐\n│  Camera  │──▶│  YOLOv9    │──▶│  Tracker   │──▶│  Event Log │\n└──────────┘   │  (custom   │   │  (IoU +    │   │  (NDJSON)  │\n                │   head)    │   │   Re-ID)   │   └────────────┘\n                └────────────┘   └────────────┘",
    tech: ["Python", "PyTorch", "YOLOv9", "OpenCV", "FastAPI", "CUDA"],
    features: [
      "Per-class thresholds for helmet, signal, and lane violations.",
      "Frame-level tracker preserves identity across occlusion.",
      "Edge-deployable via ONNX runtime on modest GPUs.",
    ],
    challenges: [
      "Class imbalance between riders and violations in training data.",
      "Domain gap between public benchmarks and Bangladeshi street footage.",
      "Real-time budget on consumer GPUs during inference.",
    ],
    outcomes: [
      { label: "mAP@0.5", value: "0.74" },
      { label: "Inference", value: "24 FPS" },
      { label: "Classes", value: "3 violations" },
    ],
    github: "https://github.com/Musfique-Ahmed/ai-traffic-violation",
    thumbnail: "/projects/traffic.svg",
    highlights: [
      "Tuned detector head for small riders and partial occlusion.",
      "Built a small annotated dataset of Bangladeshi traffic scenes.",
    ],
    futureWork: [
      "Add multi-camera association across junctions.",
      "Replace heuristics with an end-to-end event model.",
    ],
    featured: true,
  },
  {
    slug: "banglish-hate-speech-benchmark",
    title: "Banglish Hate Speech Benchmark",
    category: "NLP",
    status: "research",
    year: "2025",
    shortDescription:
      "A reproducible benchmark for hate speech detection in code-mixed Bangla-English text.",
    problem:
      "Code-mixed Bangla-English content online is under-served by NLP research. Off-the-shelf models either overfit to monolingual Bangla or fail on transliterated scripts.",
    solution:
      "Curated a labeled corpus, fixed a reproducible split, and evaluated a panel of classical and transformer baselines — then published the protocol.",
    architecture:
      "┌────────────┐   ┌────────────┐   ┌────────────┐   ┌────────────┐\n│  Corpus   │──▶│  Splits    │──▶│  Baselines │──▶│  Reports   │\n│  (12k)     │   │  (strat.)  │   │  (SVM,BNB, │   │  (F1, P/R) │\n└────────────┘   └────────────┘   │   mBERT,   │   └────────────┘\n                                   │   XLM-R)   │\n                                   └────────────┘",
    tech: ["Python", "scikit-learn", "PyTorch", "transformers", "pandas"],
    features: [
      "Stratified train/dev/test split with author-disjoint protocol.",
      "Includes classical and transformer baselines out of the box.",
      "Public leaderboard with reproducible evaluation script.",
    ],
    challenges: [
      "Annotation consistency for ambiguous code-mixed samples.",
      "Avoiding test leakage via near-duplicate text near splits.",
      "Choosing metrics that reflect class imbalance fairly.",
    ],
    outcomes: [
      { label: "Macro F1", value: "0.84" },
      { label: "Samples", value: "12,403" },
      { label: "Baselines", value: "5" },
    ],
    github: "https://github.com/Musfique-Ahmed/banglish-hate-bench",
    blog: "/blog/building-banglish-benchmark",
    thumbnail: "/projects/banglish.svg",
    highlights: [
      "Designed a labeling rubric for ambiguous transliterated hate speech.",
      "Wrote the camera-ready IEEE revision end-to-end.",
    ],
    futureWork: [
      "Add a robust evaluation set targeting adversarial paraphrases.",
      "Ship a hosted inference demo for community testing.",
    ],
    featured: true,
  },
  {
    slug: "fullstack-ecommerce",
    title: "Full-Stack E-commerce",
    category: "Full-Stack",
    status: "shipped",
    year: "2024",
    shortDescription:
      "A modern e-commerce platform with a TypeScript front end and a Python API.",
    problem:
      "Most teaching e-commerce projects stop at CRUD. I wanted the boring, production-shaped surface area: auth, payments, search, and order state.",
    solution:
      "Next.js 15 App Router for the front end, FastAPI for the API, MongoDB for products/orders, and Stripe for payments — all wired with real-world error paths.",
    architecture:
      "┌────────────┐   ┌────────────┐   ┌────────────┐\n│  Next.js   │──▶│  FastAPI   │──▶│  MongoDB   │\n│  (RSC)     │   │  (async)   │   │            │\n└────────────┘   └─────┬──────┘   └────────────┘\n       │                │\n       │         ┌──────▼──────┐\n       └────────▶│   Stripe    │\n                 └─────────────┘",
    tech: ["Next.js 15", "TypeScript", "FastAPI", "MongoDB", "Stripe", "TailwindCSS"],
    features: [
      "Server-rendered product pages with cache-friendly data loaders.",
      "Cart and checkout that survive refresh via server actions.",
      "Order timeline with status transitions and audit log.",
    ],
    challenges: [
      "Keeping RSC and client state coherent during the checkout flow.",
      "Mapping Stripe webhooks to order state without races.",
      "Searching products fast as the catalog grew.",
    ],
    outcomes: [
      { label: "Pages", value: "32 routes" },
      { label: "TTFB", value: "120 ms" },
      { label: "Lighthouse", value: "98" },
    ],
    github: "https://github.com/Musfique-Ahmed/fullstack-ecommerce",
    live: "https://github.com/Musfique-Ahmed/fullstack-ecommerce",
    thumbnail: "/projects/ecommerce.svg",
  },
  {
    slug: "my-safety-app",
    title: "My Safety App",
    category: "Mobile",
    status: "shipped",
    year: "2024",
    shortDescription:
      "A lightweight safety companion with one-tap incident reporting and trusted contacts.",
    problem:
      "Existing safety apps bury their core action under menus and onboarding. In a real incident, you don't have time for that.",
    solution:
      "A single-screen home with the primary action large enough to hit without looking. Trusted contacts, location sharing, and an offline-first incident log.",
    architecture:
      "┌────────────┐   ┌────────────┐   ┌────────────┐\n│  Mobile    │──▶│  Realtime  │──▶│  Contacts  │\n│  Client    │   │  (WebSocket│   │  Service   │\n└────────────┘   └────────────┘   └────────────┘",
    tech: ["React Native", "TypeScript", "WebSocket", "Maps SDK"],
    features: [
      "One-tap incident reporting with offline queueing.",
      "Trusted contact circles with safe-check cadence.",
      "Map timeline of incidents with privacy controls.",
    ],
    challenges: [
      "Surviving flaky mobile networks without dropping incident reports.",
      "Battery cost of continuous background location.",
      "Designing for high-stress, low-attention moments.",
    ],
    outcomes: [
      { label: "TTI", value: "< 1.2 s" },
      { label: "Offline", value: "queue + retry" },
      { label: "Beta testers", value: "120" },
    ],
    github: "https://github.com/Musfique-Ahmed/my-safety-app",
    thumbnail: "/projects/safety.svg",
  },
  {
    slug: "vizball",
    title: "Vizball",
    category: "Visualization",
    status: "ongoing",
    year: "2024",
    shortDescription:
      "A small visualization playground for sports data — readable, fast, no JavaScript framework required.",
    problem:
      "Most sports data tools assume a desktop spreadsheet. I wanted something that felt closer to a story than a table.",
    solution:
      "A focused, opinionated set of charts for the kinds of questions fans actually ask: who is on a heater, when do teams collapse, where do possessions die.",
    architecture:
      "┌────────────┐   ┌────────────┐   ┌────────────┐\n│  Source    │──▶│  Transform │──▶│  Charts    │\n│  (CSV/API) │   │  (Python)  │   │  (D3/SVG)  │\n└────────────┘   └────────────┘   └────────────┘",
    tech: ["Python", "D3", "SVG", "FastAPI"],
    features: [
      "Static-first charts that load instantly on any device.",
      "Saved views as shareable URLs.",
      "Dark mode that respects system theme.",
    ],
    challenges: [
      "Picking chart types that survive small sample sizes.",
      "Keeping the tool readable for non-engineers.",
    ],
    outcomes: [
      { label: "Views", value: "saved · shareable" },
      { label: "Datasets", value: "6 sports" },
      { label: "Render", value: "client SVG" },
    ],
    github: "https://github.com/Musfique-Ahmed/vizball",
    live: "https://github.com/Musfique-Ahmed/vizball",
    thumbnail: "/projects/vizball.svg",
  },
  {
    slug: "airline-customer-satisfaction",
    title: "Airline Customer Satisfaction",
    category: "Data",
    status: "shipped",
    year: "2024",
    shortDescription:
      "A full ML workflow on airline satisfaction: feature engineering, modeling, and an executive dashboard.",
    problem:
      "Stakeholders wanted to know what actually moves satisfaction scores. The dataset had multicollinearity, missing values, and class imbalance.",
    solution:
      "A clean EDA, principled feature engineering, a stacked ensemble baseline, and a Power BI dashboard that an ops team can actually read.",
    architecture:
      "┌────────────┐   ┌────────────┐   ┌────────────┐   ┌────────────┐\n│  Raw CSV   │──▶│  Cleaning  │──▶│  Modeling  │──▶│  Power BI  │\n└────────────┘   └────────────┘   └────────────┘   └────────────┘",
    tech: ["Python", "scikit-learn", "XGBoost", "Power BI", "pandas"],
    features: [
      "Calibrated probability outputs for stakeholder trust.",
      "Feature importance broken down by passenger segment.",
      "Executive dashboard with weekly refresh.",
    ],
    challenges: [
      "Encoding high-cardinality categorical features without leakage.",
      "Communicating model uncertainty to non-technical users.",
      "Tuning thresholds against business cost of false negatives.",
    ],
    outcomes: [
      { label: "ROC AUC", value: "0.93" },
      { label: "Top driver", value: "inflight wifi" },
      { label: "Stakeholders", value: "ops · marketing" },
    ],
    github: "https://github.com/Musfique-Ahmed/airline-satisfaction",
    thumbnail: "/projects/airline.svg",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}