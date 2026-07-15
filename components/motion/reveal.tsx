"use client";

import * as React from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export function FadeUp({
  children,
  delay = 0,
  className,
  y = 24,
  ...rest
}: HTMLMotionProps<"div"> & { delay?: number; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease, delay }}
      className={cn(className)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
  delayChildren = 0.05,
  staggerChildren = 0.07,
  margin = "-80px",
}: React.PropsWithChildren<{
  className?: string;
  delayChildren?: number;
  staggerChildren?: number;
  margin?: string;
}>) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.05, margin }}
      variants={{
        hidden: {},
        show: {
          transition: reduce
            ? {}
            : { delayChildren, staggerChildren },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export const itemFadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export function Item({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={itemFadeUp} className={cn(className)}>
      {children}
    </motion.div>
  );
}