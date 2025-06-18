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
        // Consciousness Color Palette
        consciousness: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },

        // Cosmic Blues - Primary Brand
        cosmic: {
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

        // Sacred Purples - Spiritual
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

        // Warm Presence - Inviting
        presence: {
          50: "#fef7ed",
          100: "#fdedd4",
          200: "#fcd9a9",
          300: "#fabe73",
          400: "#f7973b",
          500: "#f57c00",
          600: "#e65100",
          700: "#bf360c",
          800: "#a12d13",
          900: "#872912",
          950: "#4a1306",
        },

        // Success & Live Status
        emerald: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
          950: "#022c22",
        },
      },

      fontFamily: {
        // Premium Typography Stack
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },

      fontSize: {
        // Spacious Typography Scale
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
        // Breathing Space System
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        30: "7.5rem",
        34: "8.5rem",
        38: "9.5rem",
        42: "10.5rem",
        46: "11.5rem",
        50: "12.5rem",
        54: "13.5rem",
        58: "14.5rem",
        62: "15.5rem",
        66: "16.5rem",
        70: "17.5rem",
        74: "18.5rem",
        78: "19.5rem",
        82: "20.5rem",
        86: "21.5rem",
        90: "22.5rem",
        94: "23.5rem",
        98: "24.5rem",
        102: "25.5rem",
        106: "26.5rem",
        110: "27.5rem",
        128: "32rem",
        144: "36rem",
        160: "40rem",
        176: "44rem",
        192: "48rem",
        208: "52rem",
        224: "56rem",
        240: "60rem",
        256: "64rem",
      },

      animation: {
        // Breathing Animations
        breathe: "breathe 4s ease-in-out infinite",
        "breathe-slow": "breathe 6s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        shimmer: "shimmer 2.5s ease-in-out infinite",
        "slide-up": "slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-down": "slideDown 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        "fade-in": "fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1)",
        "scale-in": "scaleIn 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        reveal: "reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
      },

      keyframes: {
        breathe: {
          "0%, 100%": {
            transform: "scale(1) translateY(0px)",
            opacity: "0.8",
          },
          "50%": {
            transform: "scale(1.02) translateY(-4px)",
            opacity: "1",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0px) rotate(0deg)",
          },
          "50%": {
            transform: "translateY(-12px) rotate(1deg)",
          },
        },
        glow: {
          from: {
            boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
          },
          to: {
            boxShadow: "0 0 40px rgba(59, 130, 246, 0.6)",
          },
        },
        shimmer: {
          "0%": {
            backgroundPosition: "-200% 0",
          },
          "100%": {
            backgroundPosition: "200% 0",
          },
        },
        slideUp: {
          from: {
            opacity: "0",
            transform: "translateY(40px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        slideDown: {
          from: {
            opacity: "0",
            transform: "translateY(-40px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        fadeIn: {
          from: {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },
        },
        scaleIn: {
          from: {
            opacity: "0",
            transform: "scale(0.9)",
          },
          to: {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        reveal: {
          from: {
            opacity: "0",
            transform: "translateY(60px) scale(0.95)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0) scale(1)",
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
        "6xl": "3rem",
      },

      boxShadow: {
        // Premium Shadow System
        soft: "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
        medium:
          "0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 20px 40px -5px rgba(0, 0, 0, 0.06)",
        large:
          "0 8px 40px -12px rgba(0, 0, 0, 0.15), 0 32px 80px -8px rgba(0, 0, 0, 0.1)",
        cosmic:
          "0 8px 40px -10px rgba(59, 130, 246, 0.3), 0 32px 80px -8px rgba(59, 130, 246, 0.1)",
        sacred:
          "0 8px 40px -10px rgba(168, 85, 247, 0.3), 0 32px 80px -8px rgba(168, 85, 247, 0.1)",
        presence:
          "0 8px 40px -10px rgba(245, 124, 0, 0.3), 0 32px 80px -8px rgba(245, 124, 0, 0.1)",
      },

      backgroundImage: {
        "cosmic-gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "sacred-gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        "presence-gradient":
          "linear-gradient(135deg, #ffd89b 0%, #19547b 100%)",
        "consciousness-mesh":
          "radial-gradient(circle at 25% 25%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 75% 75%, #a855f7 0%, transparent 50%)",
      },
    },
  },
  plugins: [],
};
