const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette")

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      animation: {
        "pulse-slow": "pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        glow: "glow 4s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "fade-in-up": "fadeInUp 0.4s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        "grid-pan": "pan 120s linear infinite",
        typing: "typing 2s steps(40) forwards",
        "pan-left": "panLeft 20s linear infinite",
        "bounce-slow": "bounce 3s infinite",
        "fade-in-down": "fadeInDown 0.5s ease-out",
        bounce: "bounce 1.5s infinite",
        "bounce-delay": "bounce 1.5s infinite 100ms",
        aurora: "aurora 60s linear infinite",
      },
      keyframes: {
        glow: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.5" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        pan: {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "100% 100%" },
        },
        panLeft: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        fadeInDown: {
          "0%": {
            opacity: "0",
            transform: "translateY(-20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        typing: {
          from: { width: "0" },
          to: { width: "100%" },
        },
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
      },

      transitionDelay: {
        100: "100ms",
        200: "200ms",
        300: "300ms",
        400: "400ms",
        500: "500ms",
      },

      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Montserrat", "sans-serif"],
      },
      colors: {
        primary: "#6B7280", // Button background, highlights
        secondary: "#F9FAFB", // Backgrounds, accents
        text: "#111827", // Text color
        lightText: "#FFFFFF", // Button text or on dark backgrounds
        border: "#D1D5DB", // Borders or sidelines
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwind-scrollbar-hide"),
    addVariablesForColors,
  ],
}

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"))
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  )

  addBase({
    ":root": newVars,
  })
}
