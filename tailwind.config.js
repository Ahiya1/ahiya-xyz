/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "cosmic-deep": "#0f0f23",
        "cosmic-slate": "#1a1a2e",
        "cosmic-midnight": "#16213e",
        "ahiya-blue": "#7dd3fc",
        "ahiya-teal": "#6ee7b7",
        "ahiya-lavender": "#a78bfa",
      },
      animation: {
        float: "float 20s ease-in-out infinite",
        "gentle-pulse": "gentlePulse 4s ease-in-out infinite",
        heartbeat: "heartbeat 2s ease-in-out infinite",
        "slide-in-up": "slideInUp 0.8s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(180deg)" },
        },
        gentlePulse: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        heartbeat: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        slideInUp: {
          from: {
            opacity: "0",
            transform: "translateY(30px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        display: ["Crimson Text", "serif"],
        mono: ["JetBrains Mono", "ui-monospace"],
      },
    },
  },
  plugins: [],
};
