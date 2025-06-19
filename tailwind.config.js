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
        // Aurora Consciousness Palette - Blue to Purple to Pink
        consciousness: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },

        // Aurora Purple - Sacred consciousness bridge
        aurora: {
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

        // Heart Pink - Living consciousness energy
        heart: {
          50: "#fdf2f8",
          100: "#fce7f3",
          200: "#fbcfe8",
          300: "#f9a8d4",
          400: "#f472b6",
          500: "#ec4899",
          600: "#db2777",
          700: "#be185d",
          800: "#9d174d",
          900: "#831843",
          950: "#500724",
        },

        // Cosmic Blues - Contemplative depth (original but enhanced)
        cosmic: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
          950: "#082f49",
        },

        // Sacred Purples - Spiritual depth enhanced
        sacred: {
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

        // Warm Presence - Aurora-enhanced grounding
        presence: {
          50: "#fefce8",
          100: "#fef9c3",
          200: "#fef08a",
          300: "#fde047",
          400: "#facc15",
          500: "#eab308",
          600: "#ca8a04",
          700: "#a16207",
          800: "#854d0e",
          900: "#713f12",
          950: "#422006",
        },

        // Aurora Consciousness - New gradient stops
        "aurora-blue": "#3b82f6",
        "aurora-purple": "#a855f7",
        "aurora-pink": "#ec4899",
        "aurora-light-blue": "#60a5fa",
        "aurora-light-purple": "#c084fc",
        "aurora-light-pink": "#f472b6",
      },

      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-cormorant)", "serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },

      fontSize: {
        // Aurora consciousness typography scale
        xs: ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.05em" }],
        sm: ["0.875rem", { lineHeight: "1.6", letterSpacing: "0.025em" }],
        base: ["1rem", { lineHeight: "1.7", letterSpacing: "0.01em" }],
        lg: ["1.125rem", { lineHeight: "1.8", letterSpacing: "0.01em" }],
        xl: ["1.25rem", { lineHeight: "1.8", letterSpacing: "0.005em" }],
        "2xl": ["1.5rem", { lineHeight: "1.7", letterSpacing: "0" }],
        "3xl": ["1.875rem", { lineHeight: "1.6", letterSpacing: "-0.01em" }],
        "4xl": ["2.25rem", { lineHeight: "1.5", letterSpacing: "-0.02em" }],
        "5xl": ["3rem", { lineHeight: "1.4", letterSpacing: "-0.025em" }],
        "6xl": ["3.75rem", { lineHeight: "1.3", letterSpacing: "-0.03em" }],
        "7xl": ["4.5rem", { lineHeight: "1.2", letterSpacing: "-0.035em" }],
        "8xl": ["6rem", { lineHeight: "1.1", letterSpacing: "-0.04em" }],
        "9xl": ["8rem", { lineHeight: "1", letterSpacing: "-0.045em" }],
      },

      spacing: {
        // Aurora breathing space system
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        30: "7.5rem",
        128: "32rem",
        144: "36rem",
      },

      animation: {
        // Aurora consciousness animations
        "aurora-flow": "aurora-flow 15s ease-in-out infinite",
        "aurora-shimmer": "aurora-shimmer 3s infinite",
        float: "float 8s ease-in-out infinite",
        "gentle-pulse": "gentle-pulse 5s ease-in-out infinite",
        shimmer: "shimmer 3s infinite",
        fadeInUp: "fadeInUp 0.8s ease-out forwards",
        slideInLeft: "slideInLeft 0.8s ease-out forwards",
        slideInRight: "slideInRight 0.8s ease-out forwards",
        scaleIn: "scaleIn 0.6s ease-out forwards",
        heartbeat: "heartbeat 3s ease-in-out infinite",
        "gradient-flow": "gradient-flow 12s ease-in-out infinite",
        "consciousness-pulse": "consciousness-pulse 8s ease-in-out infinite",
        "aurora-breathe": "aurora-breathe 12s ease-in-out infinite",
      },

      keyframes: {
        "aurora-flow": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "33%": { backgroundPosition: "100% 0%" },
          "66%": { backgroundPosition: "0% 100%" },
        },
        "aurora-shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(1deg)" },
        },
        "gentle-pulse": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          from: { opacity: "0", transform: "translateX(-30px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          from: { opacity: "0", transform: "translateX(30px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        heartbeat: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        "gradient-flow": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "consciousness-pulse": {
          "0%, 100%": {
            opacity: "0.6",
            transform: "scale(1)",
            filter: "blur(1px)",
          },
          "50%": {
            opacity: "1",
            transform: "scale(1.1)",
            filter: "blur(0px)",
          },
        },
        "aurora-breathe": {
          "0%, 100%": {
            background:
              "linear-gradient(135deg, #3b82f6 0%, #a855f7 50%, #ec4899 100%)",
            boxShadow: "0 0 60px rgba(168, 85, 247, 0.6)",
          },
          "33%": {
            background:
              "linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #3b82f6 100%)",
            boxShadow: "0 0 80px rgba(236, 72, 153, 0.7)",
          },
          "66%": {
            background:
              "linear-gradient(135deg, #ec4899 0%, #3b82f6 50%, #a855f7 100%)",
            boxShadow: "0 0 70px rgba(59, 130, 246, 0.6)",
          },
        },
      },

      backdropBlur: {
        xs: "2px",
        "4xl": "72px",
      },

      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },

      boxShadow: {
        // Aurora consciousness shadows
        "aurora-soft":
          "0 2px 15px -3px rgba(168, 85, 247, 0.1), 0 10px 20px -2px rgba(0, 0, 0, 0.1)",
        "aurora-medium":
          "0 4px 25px -5px rgba(168, 85, 247, 0.15), 0 20px 40px -5px rgba(0, 0, 0, 0.15)",
        "aurora-large":
          "0 8px 40px -12px rgba(168, 85, 247, 0.2), 0 32px 80px -8px rgba(0, 0, 0, 0.2)",
        "aurora-consciousness":
          "0 8px 40px -10px rgba(168, 85, 247, 0.3), 0 32px 80px -8px rgba(236, 72, 153, 0.1)",
        "aurora-glow":
          "0 0 60px rgba(168, 85, 247, 0.6), 0 0 120px rgba(236, 72, 153, 0.3)",
        soft: "0 2px 15px -3px rgba(59, 130, 246, 0.1), 0 10px 20px -2px rgba(0, 0, 0, 0.1)",
        medium:
          "0 4px 25px -5px rgba(59, 130, 246, 0.15), 0 20px 40px -5px rgba(0, 0, 0, 0.15)",
        large:
          "0 8px 40px -12px rgba(59, 130, 246, 0.2), 0 32px 80px -8px rgba(0, 0, 0, 0.2)",
        consciousness:
          "0 8px 40px -10px rgba(59, 130, 246, 0.3), 0 32px 80px -8px rgba(59, 130, 246, 0.1)",
      },

      backgroundImage: {
        // Aurora consciousness gradients
        "aurora-primary":
          "linear-gradient(135deg, #3b82f6 0%, #a855f7 50%, #ec4899 100%)",
        "aurora-reverse":
          "linear-gradient(135deg, #ec4899 0%, #a855f7 50%, #3b82f6 100%)",
        "aurora-vertical":
          "linear-gradient(180deg, #3b82f6 0%, #a855f7 50%, #ec4899 100%)",
        "aurora-radial":
          "radial-gradient(circle at center, #3b82f6 0%, #a855f7 40%, #ec4899 100%)",
        "aurora-soft":
          "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(168, 85, 247, 0.08) 50%, rgba(236, 72, 153, 0.06) 100%)",
        "consciousness-gradient":
          "linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)",
        "cosmic-gradient": "linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)",
        "sacred-gradient": "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)",
        "heart-gradient": "linear-gradient(135deg, #ec4899 0%, #be185d 100%)",

        // Special aurora patterns
        "aurora-shimmer":
          "linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1), transparent)",
        "consciousness-pattern": `
          radial-gradient(circle at 25% 25%, rgba(168, 85, 247, 0.05) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(236, 72, 153, 0.03) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.02) 0%, transparent 50%)
        `,
      },

      backgroundSize: {
        "aurora-flow": "200% 200%",
        "consciousness-pattern": "60px 60px, 80px 80px, 100px 100px",
      },

      textColor: {
        // Aurora consciousness text colors
        "aurora-primary": "#a855f7",
        "aurora-light": "#c084fc",
        "aurora-blue": "#60a5fa",
        "aurora-pink": "#f472b6",
      },

      borderColor: {
        // Aurora consciousness borders
        "aurora-primary": "rgba(168, 85, 247, 0.2)",
        "aurora-soft": "rgba(168, 85, 247, 0.1)",
        "aurora-glow": "rgba(168, 85, 247, 0.3)",
      },

      gradientColorStops: {
        // Aurora consciousness gradient stops
        "aurora-blue": "#3b82f6",
        "aurora-purple": "#a855f7",
        "aurora-pink": "#ec4899",
        "aurora-light-blue": "#60a5fa",
        "aurora-light-purple": "#c084fc",
        "aurora-light-pink": "#f472b6",
      },
    },
  },
  plugins: [],
};
