/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";

const withVar = (v) => `rgb(var(${v}) / <alpha-value>)`;

export default {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: withVar("--bg"),
        surface: withVar("--surface"),
        surface2: withVar("--surface-2"),
        line: withVar("--line"),
        fg: withVar("--fg"),
        muted: withVar("--muted"),
        subtle: withVar("--subtle"),
        primary: {
          DEFAULT: withVar("--primary"),
          fg: withVar("--primary-fg"),
          soft: withVar("--primary-soft"),
        },
        // Back-compat alias so existing `brand` classes resolve to primary.
        brand: withVar("--primary"),
        success: withVar("--success"),
        warning: withVar("--warning"),
        error: withVar("--error"),
        info: withVar("--info"),
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        display: ["Inter", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      borderRadius: {
        lg: "0.625rem",
        xl: "0.875rem",
        "2xl": "1.125rem",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(15 23 42 / 0.04)",
        sm: "0 1px 3px 0 rgb(15 23 42 / 0.06), 0 1px 2px -1px rgb(15 23 42 / 0.06)",
        md: "0 4px 12px -2px rgb(15 23 42 / 0.08), 0 2px 6px -2px rgb(15 23 42 / 0.05)",
        lg: "0 12px 28px -8px rgb(15 23 42 / 0.12)",
        card: "0 1px 3px 0 rgb(15 23 42 / 0.06), 0 1px 2px -1px rgb(15 23 42 / 0.06)",
      },
      maxWidth: {
        content: "75rem",
      },
      keyframes: {
        spin: { "0%": { transform: "rotate(0deg)" }, "100%": { transform: "rotate(360deg)" } },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
      },
      animation: {
        "spin-smooth": "spin 0.8s linear infinite",
        "fade-up": "fade-up 0.4s ease-out both",
        "fade-in": "fade-in 0.25s ease-out both",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hide": { "-ms-overflow-style": "none", "scrollbar-width": "none" },
        ".scrollbar-hide::-webkit-scrollbar": { display: "none" },
      });
    }),
  ],
};
