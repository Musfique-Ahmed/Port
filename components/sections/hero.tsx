"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Download, Github, Linkedin, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { RotatingHeadline } from "@/components/hero/rotating-headline";
import { TerminalVisual } from "@/components/hero/terminal-visual";
import { site } from "@/lib/site";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden pt-24 md:pt-32 lg:pt-40"
    >
      <div className="absolute inset-0 grid-bg" aria-hidden />
      <div className="container relative">
        {/* Top metadata strip — paper-header treatment */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-hairline pb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-2 md:mb-14"
        >
          <span className="flex items-center gap-2 text-accent-fg">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            Available · Summer 2026
          </span>
          <span>AI / ML engineering</span>
          <span>Research collaborations</span>
          <span className="ml-auto hidden items-center gap-2 md:flex">
            <span>Dhaka · UTC+6</span>
            <span className="inline-block h-3 w-px bg-hairline" />
            <span>v2026.07</span>
          </span>
        </motion.div>

        <motion.div style={{ y, opacity }} className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left: copy */}
          <div className="lg:col-span-7">
            <h1 className="flex flex-col gap-0 leading-[0.92] tracking-[-0.04em]">
              <motion.span
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="block font-display text-[clamp(3.25rem,9vw,8rem)] font-semibold text-foreground"
              >
                Musfique
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="block font-mono text-[clamp(2rem,5.5vw,4.5rem)] font-normal text-muted-1"
              >
                Ahmed<span className="text-accent-fg">.</span>
              </motion.span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18 }}
              className="mt-7 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-xl font-medium text-foreground md:text-2xl"
            >
              <RotatingHeadline words={["AI Engineer", "Data Scientist", "Researcher", "Founder"]} />
              <span className="font-mono text-sm text-muted-2">
                · building systems that ship
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28 }}
              className="mt-6 max-w-xl text-[16px] leading-relaxed text-muted-1 md:text-[17px]"
            >
              I design, train, and deploy machine learning systems — from real-time
              computer vision on Bangladeshi roads to peer-reviewed NLP benchmarks.
              I also founded the UIU Data Science Club to help the next cohort ship
              real work, not slides.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.38 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Magnetic strength={0.25}>
                <Button asChild size="lg" variant="primary">
                  <a href="/projects">
                    View Projects <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </Magnetic>
              <Magnetic strength={0.25}>
                <Button asChild size="lg" variant="outline">
                  <a href={site.resumeUrl} target="_blank" rel="noreferrer">
                    <Download className="h-4 w-4" /> Résumé
                  </a>
                </Button>
              </Magnetic>
              <div className="ml-1 flex items-center gap-2">
                <Magnetic strength={0.4}>
                  <a
                    href={site.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-surface text-muted-1 transition-colors hover:text-foreground"
                  >
                    <Github className="h-[18px] w-[18px]" />
                  </a>
                </Magnetic>
                <Magnetic strength={0.4}>
                  <a
                    href={site.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-surface text-muted-1 transition-colors hover:text-foreground"
                  >
                    <Linkedin className="h-[18px] w-[18px]" />
                  </a>
                </Magnetic>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-12 flex items-center gap-3 text-xs text-muted-2"
            >
              <span className="inline-block h-px w-8 bg-hairline" />
              <span className="font-mono uppercase tracking-[0.2em]">
                Scroll for proof
              </span>
              <ArrowDown className="h-3.5 w-3.5 animate-bounce text-muted-2" />
            </motion.div>
          </div>

          {/* Right: terminal */}
          <div className="lg:col-span-5">
            <TerminalVisual className="shadow-card-hover" />
            <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-muted-2">
              <span>live · streaming output</span>
              <span>updated continuously</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}