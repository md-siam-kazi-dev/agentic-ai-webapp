import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        accent: "var(--color-accent)",
        dark: "var(--color-dark)",
        neutral: "var(--color-text)",
        border: "var(--border)",
        ring: "var(--color-accent)",
        "outline-ring": "var(--color-accent)",
        background: "var(--color-bg)",
        foreground: "var(--color-text)",
        primary: {
          DEFAULT: "var(--color-accent)",
          foreground: "var(--color-bg)",
        },
        card: {
          DEFAULT: "var(--color-surface)",
          foreground: "var(--color-text)",
        },
        muted: {
          DEFAULT: "var(--color-surface)",
          foreground: "var(--color-text)",
        },
        destructive: {
          DEFAULT: "var(--color-accent)",
          foreground: "var(--color-bg)",
        },
        input: "var(--border)",
        popover: {
          DEFAULT: "var(--color-surface)",
          foreground: "var(--color-text)",
        },
        secondary: {
          DEFAULT: "var(--color-surface)",
          foreground: "var(--color-text)",
        },
        accent2: {
          DEFAULT: "var(--color-accent)",
          foreground: "var(--color-bg)",
        },
      },
      borderRadius: {
        xl: "12px",
        lg: "10px",
        md: "8px",
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "typing-dot": {
          "0%, 60%, 100%": { opacity: "0.3", transform: "translateY(0)" },
          "30%": { opacity: "1", transform: "translateY(-3px)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "typing-dot": "typing-dot 1.2s infinite",
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
