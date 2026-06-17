import { defineConfig } from "tailwindcss";

/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pitch: { DEFAULT: "#0a1628", light: "#0f2040", dark: "#060e1a" },
        gold: { DEFAULT: "#f5c518", dark: "#d4a017", light: "#fde68a" },
        accent: { DEFAULT: "#00d4ff", dark: "#0099bb" },
      },
      fontFamily: {
        sans: ["Inter", "Segoe UI", "sans-serif"],
        display: ["Bebas Neue", "Impact", "sans-serif"],
      },
      animation: {
        "pulse-gold": "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite",
        "slide-up": "slideUp 0.4s ease-out",
        "fade-in": "fadeIn 0.3s ease-out",
        "count-up": "countUp 0.6s ease-out",
      },
      keyframes: {
        slideUp: { "0%": { transform: "translateY(20px)", opacity: 0 }, "100%": { transform: "translateY(0)", opacity: 1 } },
        fadeIn: { "0%": { opacity: 0 }, "100%": { opacity: 1 } },
        countUp: { "0%": { transform: "translateY(10px)", opacity: 0 }, "100%": { transform: "translateY(0)", opacity: 1 } },
      },
      backdropBlur: { xs: "2px" },
    },
  },
  plugins: [],
};
