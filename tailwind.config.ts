import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        // Theme-aware tokens — driven by CSS variables in :root / .light
        ink: "var(--bg)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        inset: "var(--inset)",
        foreground: "var(--text)",
        hairline: "var(--hairline)",
        "muted-1": "var(--muted-1)",
        "muted-2": "var(--muted-2)",
        "muted-3": "var(--muted-3)",
        accent: {
          DEFAULT: "var(--accent)",
          fg: "var(--accent-fg)",
          dim: "var(--accent-dim)",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-1": ["clamp(3rem, 8vw, 7.5rem)", { lineHeight: "0.95", letterSpacing: "-0.04em", fontWeight: "600" }],
        "display-2": ["clamp(2.25rem, 5vw, 4rem)", { lineHeight: "1.02", letterSpacing: "-0.035em", fontWeight: "600" }],
        "display-3": ["clamp(1.5rem, 3vw, 2.25rem)", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "600" }],
      },
      borderRadius: {
        lg: "12px",
        xl: "16px",
        "2xl": "20px",
      },
      backgroundImage: {
        "radial-fade":
          "radial-gradient(ellipse at top, var(--hairline-strong), transparent 60%)",
        "grid-light":
          "linear-gradient(to right, var(--hairline) 1px, transparent 1px), linear-gradient(to bottom, var(--hairline) 1px, transparent 1px)",
        "accent-grad":
          "linear-gradient(135deg, var(--accent) 0%, var(--accent-fg) 100%)",
      },
      boxShadow: {
        "glow-accent": "0 0 0 1px var(--accent-ring), 0 8px 30px -8px var(--accent-shadow)",
        "card-hover": "0 20px 50px -20px var(--shadow-card)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "blink": {
          "0%, 50%": { opacity: "1" },
          "50.01%, 100%": { opacity: "0" },
        },
        "marquee": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "meteor": {
          "0%": { transform: "translate(0,0) rotate(215deg)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translate(-1200px, 1200px) rotate(215deg)", opacity: "0" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
        "blink": "blink 1.1s steps(1) infinite",
        "marquee": "marquee 40s linear infinite",
        "shimmer": "shimmer 6s linear infinite",
        "meteor": "meteor 8s linear infinite",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [animate],
};

export default config;
