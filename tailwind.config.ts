import type { Config } from "tailwindcss";

const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "rgb(var(--cs-navy) / <alpha-value>)",
          accent: "rgb(var(--cs-accent) / <alpha-value>)",
          "accent-hover": "rgb(var(--cs-accent-hover) / <alpha-value>)",
          "accent-ink": "rgb(var(--cs-accent-ink) / <alpha-value>)",
          sky: "rgb(var(--cs-sky) / <alpha-value>)",
          mint: "rgb(var(--cs-mint) / <alpha-value>)",
          coral: "rgb(var(--cs-coral) / <alpha-value>)",
          background: "rgb(var(--cs-background) / <alpha-value>)",
          "background-wash": "rgb(var(--cs-background-wash) / <alpha-value>)",
          dark: "rgb(var(--cs-dark) / <alpha-value>)",
          "dark-soft": "rgb(var(--cs-dark-soft) / <alpha-value>)",
          slate: "rgb(var(--cs-slate) / <alpha-value>)",
          "slate-light": "rgb(var(--cs-slate-light) / <alpha-value>)",
          border: "rgb(var(--cs-border) / <alpha-value>)",
          peach: "rgb(var(--cs-peach) / <alpha-value>)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      fontSize: {
        "display-sm": ["clamp(2.75rem, 5vw, 4.5rem)", { lineHeight: "0.98", letterSpacing: "-0.045em" }],
        "display-md": ["clamp(3.25rem, 6vw, 5.75rem)", { lineHeight: "0.96", letterSpacing: "-0.05em" }],
        "display-lg": ["clamp(3.75rem, 7.2vw, 7rem)", { lineHeight: "0.94", letterSpacing: "-0.055em" }],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        30: "7.5rem",
      },
      borderRadius: {
        "2xl": "1.25rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
        pill: "9999px",
      },
      boxShadow: {
        card: "0 18px 50px rgb(var(--cs-navy) / 0.08)",
        "card-hover": "0 26px 64px rgb(var(--cs-accent) / 0.16)",
        "focus-brand": "0 0 0 4px rgb(var(--cs-accent) / 0.2)",
      },
      transitionTimingFunction: {
        "brand-out": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
