"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Github, Linkedin, MapPin, Download, FileText, Phone, Globe } from "lucide-react";
import { Magnetic } from "@/components/motion/magnetic";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

const SOCIALS = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    Icon: Mail,
  },
  {
    label: "Phone",
    value: site.phone,
    href: `tel:${site.phone?.replace(/\s+/g, "")}`,
    Icon: Phone,
  },
  {
    label: "GitHub",
    value: "@Musfique-Ahmed",
    href: site.socials.github,
    Icon: Github,
  },
  {
    label: "LinkedIn",
    value: "/in/musfique-ahmed-ds",
    href: site.socials.linkedin,
    Icon: Linkedin,
  },
  {
    label: "Portfolio",
    value: "musfique-ahmed.github.io",
    href: site.socials.portfolio,
    Icon: Globe,
  },
  {
    label: "Location",
    value: site.location,
    href: "#",
    Icon: MapPin,
  },
];

export function ContactPanel() {
  return (
    <section id="contact" className="relative border-t border-hairline py-24 md:py-32">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent-fg">
              Get in touch
            </span>
            <h2 className="mt-4 text-display-2">
              Open to AI roles, research collaborations, and interesting problems.
            </h2>
            <p className="mt-5 max-w-xl text-base text-muted-1 md:text-lg">
              If you're hiring for AI/ML engineering or research, want to collaborate on
              a paper, or have a project that needs a real ML system behind it — drop a
              line. I read every message.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic strength={0.25}>
                <Button asChild size="lg" variant="accent">
                  <a href={`mailto:${site.email}`}>
                    <Mail className="h-4 w-4" />
                    {site.email}
                  </a>
                </Button>
              </Magnetic>
              <Magnetic strength={0.25}>
                <Button asChild size="lg" variant="outline">
                  <a href={site.resumeUrl} target="_blank" rel="noreferrer">
                    <Download className="h-4 w-4" /> Download résumé
                  </a>
                </Button>
              </Magnetic>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <ul className="divide-y divide-hairline overflow-hidden rounded-2xl border border-hairline bg-surface">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-surface-2"
                  >
                    <span className="flex items-center gap-4">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-surface-2 text-muted-1 transition-colors group-hover:border-accent/30 group-hover:text-accent-fg">
                        <s.Icon className="h-4 w-4" />
                      </span>
                      <span>
                        <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted-2">
                          {s.label}
                        </span>
                        <span className="block text-sm text-white">{s.value}</span>
                      </span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-muted-2 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={site.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-surface-2"
                >
                  <span className="flex items-center gap-4">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-surface-2 text-muted-1 transition-colors group-hover:border-accent/30 group-hover:text-accent-fg">
                      <FileText className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted-2">
                        Résumé
                      </span>
                      <span className="block text-sm text-white">PDF · one-page summary</span>
                    </span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-2 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        <footer className="mt-24 flex flex-col items-start justify-between gap-3 border-t border-hairline pt-6 text-xs text-muted-2 md:flex-row md:items-center">
          <span className="font-mono">
            © {new Date().getFullYear()} {site.name}. Built with Next.js, Framer Motion,
            and too much coffee.
          </span>
          <span className="font-mono">v2026.07 · last updated this week</span>
        </footer>
      </div>
    </section>
  );
}