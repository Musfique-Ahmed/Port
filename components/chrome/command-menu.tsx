"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import {
  Home,
  User,
  FolderGit2,
  FlaskConical,
  Users,
  BookOpen,
  FileText,
  Mail,
  Github,
  Linkedin,
  Search,
  ArrowRight,
  Phone,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Item = {
  label: string;
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
  group: "Navigate" | "Projects" | "Blog" | "Connect";
  keywords?: string[];
};

const NAV: Item[] = [
  { label: "Home", href: "/", Icon: Home, group: "Navigate" },
  { label: "About", href: "/about", Icon: User, group: "Navigate" },
  { label: "Experience", href: "/experience", Icon: FileText, group: "Navigate" },
  { label: "Projects", href: "/projects", Icon: FolderGit2, group: "Navigate" },
  { label: "Research", href: "/research", Icon: FlaskConical, group: "Navigate" },
  { label: "Leadership", href: "/leadership", Icon: Users, group: "Navigate" },
  { label: "Blog", href: "/blog", Icon: BookOpen, group: "Navigate" },
  { label: "Resume", href: "/resume", Icon: FileText, group: "Navigate" },
  { label: "Contact", href: "/contact", Icon: Mail, group: "Navigate" },
];

const PROJECTS: Item[] = [
  {
    label: "AI Traffic Violation Detection",
    href: "/projects/ai-traffic-violation-detection",
    Icon: FolderGit2,
    group: "Projects",
    keywords: ["cv", "yolo", "computer vision"],
  },
  {
    label: "Banglish Hate Speech Benchmark",
    href: "/projects/banglish-hate-speech-benchmark",
    Icon: FolderGit2,
    group: "Projects",
    keywords: ["nlp", "benchmark"],
  },
  {
    label: "Boutiqo Bangladesh",
    href: "/projects/boutiqo-bangladesh",
    Icon: FolderGit2,
    group: "Projects",
  },
  {
    label: "My Safety App",
    href: "/projects/my-safety-app",
    Icon: FolderGit2,
    group: "Projects",
  },
  {
    label: "Vizball",
    href: "/projects/vizball",
    Icon: FolderGit2,
    group: "Projects",
  },
  {
    label: "Airline Customer Satisfaction",
    href: "/projects/airline-customer-satisfaction",
    Icon: FolderGit2,
    group: "Projects",
  },
];

const BLOG: Item[] = [
  { label: "Building the Banglish Hate Speech Benchmark", href: "/blog/building-banglish-benchmark", Icon: BookOpen, group: "Blog" },
  { label: "Designing AI Systems for Real Roads", href: "/blog/designing-ai-for-real-roads", Icon: BookOpen, group: "Blog" },
  { label: "Shipping Production ML", href: "/blog/shipping-production-ml", Icon: BookOpen, group: "Blog" },
  { label: "Founder Notes: Year One", href: "/blog/founder-notes-year-one", Icon: BookOpen, group: "Blog" },
];

const SOCIALS: Item[] = [
  { label: "GitHub", href: "https://github.com/Musfique-Ahmed", Icon: Github, group: "Connect" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/musfique-ahmed-ds/", Icon: Linkedin, group: "Connect" },
  { label: "Email", href: "mailto:anikmushfik@gmail.com", Icon: Mail, group: "Connect" },
  { label: "Phone", href: "tel:+8801961905838", Icon: Phone, group: "Connect" },
  { label: "Portfolio", href: "https://musfique-ahmed.github.io/portfolio/", Icon: Globe, group: "Connect" },
];

const ALL: Item[] = [...NAV, ...PROJECTS, ...BLOG, ...SOCIALS];

export function CommandMenu({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [q, setQ] = React.useState("");
  const [active, setActive] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();

  React.useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  const filtered = React.useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return ALL;
    return ALL.filter((i) =>
      [i.label, i.group, i.keywords?.join(" ") ?? ""].join(" ").toLowerCase().includes(term)
    );
  }, [q]);

  React.useEffect(() => setActive(0), [q]);

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(filtered.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === "Enter") {
      const item = filtered[active];
      if (item) {
        if (item.href.startsWith("http") || item.href.startsWith("mailto:")) {
          window.open(item.href, "_blank", "noopener,noreferrer");
        } else {
          router.push(item.href);
        }
        onOpenChange(false);
      }
    }
  }

  // Group render
  const groups = React.useMemo(() => {
    const map = new Map<string, Item[]>();
    filtered.forEach((i) => {
      const arr = map.get(i.group) ?? [];
      arr.push(i);
      map.set(i.group, arr);
    });
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-[15%] max-w-2xl gap-0 p-0 overflow-hidden">
        <div className="flex items-center gap-3 border-b border-hairline px-4 py-3">
          <Search className="h-4 w-4 text-muted-2" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKey}
            placeholder="Search projects, sections, posts…"
            className="w-full bg-transparent text-sm text-white placeholder:text-muted-2 focus:outline-none"
          />
          <kbd className="hidden rounded border border-hairline bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] text-muted-2 sm:inline">
            ESC
          </kbd>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {groups.length === 0 && (
            <div className="px-3 py-10 text-center text-sm text-muted-2">
              Nothing here. Try a different term.
            </div>
          )}
          {groups.map(([group, items]) => (
            <div key={group} className="mb-1">
              <div className="px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-2">
                {group}
              </div>
              <ul>
                {items.map((it) => {
                  const globalIdx = filtered.indexOf(it);
                  const isActive = globalIdx === active;
                  return (
                    <li key={it.href}>
                      <Link
                        href={it.href}
                        onMouseEnter={() => setActive(globalIdx)}
                        onClick={() => onOpenChange(false)}
                        className={cn(
                          "flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                          isActive ? "bg-white/[0.06] text-white" : "text-muted-1"
                        )}
                      >
                        <span className="flex items-center gap-3">
                          <it.Icon className="h-4 w-4 text-muted-1" />
                          {it.label}
                        </span>
                        {isActive && <ArrowRight className="h-3.5 w-3.5 text-muted-1" />}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-hairline bg-surface-2 px-4 py-2 font-mono text-[10px] text-muted-2">
          <span>
            <kbd className="rounded border border-hairline bg-surface px-1.5 py-0.5">↑↓</kbd>{" "}
            navigate
            <span className="mx-2">·</span>
            <kbd className="rounded border border-hairline bg-surface px-1.5 py-0.5">↵</kbd> open
          </span>
          <span>Built with ⌘K</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}