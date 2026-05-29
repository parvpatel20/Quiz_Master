/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Deep navy surfaces (refined dark base)
        ink: {
          950: "#080D1A",
          900: "#0B1326",
          850: "#0F1A33",
          800: "#152340",
          700: "#1E2F52",
          600: "#2A3F6B",
        },
        // Single amber accent
        brand: {
          DEFAULT: "#FF9100",
          300: "#FFC074",
          400: "#FFA53D",
          500: "#FF9100",
          600: "#E07B00",
          700: "#B86400",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Sora", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 8px 30px -12px rgba(0,0,0,0.6)",
        glow: "0 8px 30px -8px rgba(255,145,0,0.35)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      maxWidth: {
        content: "72rem",
      },
      keyframes: {
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "spin-smooth": "spin 0.9s linear infinite",
        "fade-up": "fade-up 0.5s ease-out both",
        "fade-in": "fade-in 0.4s ease-out both",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-thin": {
          "scrollbar-width": "thin",
          "scrollbar-color": "rgba(255,145,0,0.4) transparent",
        },
        ".scrollbar-thin::-webkit-scrollbar": { width: "8px", height: "8px" },
        ".scrollbar-thin::-webkit-scrollbar-track": { background: "transparent" },
        ".scrollbar-thin::-webkit-scrollbar-thumb": {
          background: "rgba(255,145,0,0.35)",
          "border-radius": "9999px",
        },
        ".scrollbar-hide": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
        ".scrollbar-hide::-webkit-scrollbar": { display: "none" },
      });
    }),
  ],
};
