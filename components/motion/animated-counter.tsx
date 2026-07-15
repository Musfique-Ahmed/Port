"use client";

import * as React from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

export function AnimatedCounter({
  to,
  from = 0,
  duration = 1.6,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: {
  to: number;
  from?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const value = useMotionValue(from);
  const spring = useSpring(value, { duration: duration * 1000, bounce: 0 });
  const display = useTransform(spring, (v) => {
    const n = decimals === 0 ? Math.round(v) : Number(v.toFixed(decimals));
    return `${prefix}${n.toLocaleString()}${suffix}`;
  });

  React.useEffect(() => {
    if (inView) value.set(to);
  }, [inView, to, value]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
}