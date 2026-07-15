"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export function Cursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = React.useState(false);

  React.useEffect(() => {
    if (reduce) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setEnabled(fine);
    if (fine) document.documentElement.classList.add("has-custom-cursor");
    return () => document.documentElement.classList.remove("has-custom-cursor");
  }, [reduce]);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 35, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 600, damping: 35, mass: 0.4 });

  React.useEffect(() => {
    if (!enabled) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Soft glow halo — uses theme-aware accent ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[79] h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          x: sx,
          y: sy,
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent) 35%, transparent) 0%, transparent 70%)",
          filter: "blur(6px)",
        }}
      />
      {/* Outer ring — outlined so it reads on any background */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[80] h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border"
        style={{
          x: sx,
          y: sy,
          borderColor: "var(--accent)",
          backgroundColor:
            "color-mix(in srgb, var(--accent) 8%, transparent)",
        }}
      />
      {/* Solid dot — always-on inner marker */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[81] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          x: sx,
          y: sy,
          backgroundColor: "var(--accent)",
        }}
      />
    </>
  );
}