"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Home,
  User,
  Briefcase,
  FolderGit2,
  FlaskConical,
  Users,
  BookOpen,
  Mail,
  Command as CommandIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/motion/magnetic";
import { toggleCommandMenu } from "./command-store";

const items = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/about", label: "About", Icon: User },
  { href: "/projects", label: "Projects", Icon: FolderGit2 },
  { href: "/research", label: "Research", Icon: FlaskConical },
  { href: "/leadership", label: "Leadership", Icon: Users },
  { href: "/blog", label: "Blog", Icon: BookOpen },
  { href: "/contact", label: "Contact", Icon: Mail },
];

export function FloatingDock() {
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4"
    >
      <div className="flex items-center gap-1 rounded-full border border-hairline bg-surface/80 px-1.5 py-1.5 backdrop-blur-xl shadow-card-hover">
        {items.map(({ href, label, Icon }) => {
          const active =
            href === "/"
              ? pathname === "/"
              : pathname.startsWith(href);
          return (
            <Magnetic key={href} strength={0.25}>
              <Link
                href={href}
                aria-label={label}
                className={cn(
                  "group relative inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-1 transition-colors",
                  "hover:text-white hover:bg-white/5",
                  active && "text-white bg-white/[0.06]"
                )}
              >
                <Icon className="h-[18px] w-[18px]" />
                <span className="pointer-events-none absolute -top-9 scale-95 rounded-md border border-hairline bg-surface px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-1 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
                  {label}
                </span>
              </Link>
            </Magnetic>
          );
        })}
        <div className="mx-1 h-5 w-px bg-hairline" />
        <Magnetic strength={0.25}>
          <button
            onClick={() => toggleCommandMenu()}
            aria-label="Open command menu"
            className="inline-flex h-10 items-center gap-1.5 rounded-full px-3 text-xs text-muted-1 transition-colors hover:bg-white/5 hover:text-white"
          >
            <CommandIcon className="h-3.5 w-3.5" />
            <span className="font-mono text-[11px]">⌘K</span>
          </button>
        </Magnetic>
      </div>
    </motion.div>
  );
}