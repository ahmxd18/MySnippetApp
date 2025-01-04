/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
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
  plugins: [],
}
