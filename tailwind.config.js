/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Contemplative color palette
        gentle: {
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7c3aed",
          800: "#6b21a8",
          900: "#581c87",
          950: "#3b0764",
        },
      },

      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-crimson)", "serif"],
      },

      animation: {
        "soft-float": "soft-float 8s ease-in-out infinite",
        "gentle-drift": "gentle-drift 40s linear infinite",
        "fade-in": "fade-in-up 0.8s ease-out forwards",
        "fade-in-delay": "fade-in-up 0.8s ease-out 0.2s forwards",
      },

      keyframes: {
        "soft-float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "gentle-drift": {
          "0%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(-5px, -3px)" },
          "100%": { transform: "translate(0, 0)" },
        },
        "fade-in-up": {
          from: {
            opacity: "0",
            transform: "translateY(20px)",
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

      boxShadow: {
        gentle: "0 4px 20px rgba(0, 0, 0, 0.15)",
        contemplative: "0 8px 32px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
