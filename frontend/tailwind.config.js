/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        "brand-blue": "#1D4ED8",
        "brand-light": "#3B82F6",
        "brand-dark": "#1E3A8A",
        "gray-text": "#62748E",
        "border-light": "#E2E8F0",
      },
      fontSize: {
        tiny: "0.65rem",
        xs2: "0.7rem",
        "2-5xl": "1.7rem",
        "4-5xl": "2.6rem",
      },
      spacing: {
        "4-5": "1.125rem",
        "18-35": "18.35rem",
      },
      borderRadius: {
        xl2: "1.1rem",
      },
      boxShadow: {
        card: "0 2px 10px rgba(0,0,0,0.08)",
        subtle: "0 1px 4px rgba(0,0,0,0.06)",
      },
      fontFamily: {
        primary: ["Inter", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
