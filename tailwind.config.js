/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#F6F7FA",
        surface: "#FFFFFF",
        ink: {
          DEFAULT: "#101828",
          soft: "#475467",
          faint: "#98A2B3",
        },
        border: "#E4E7EC",
        brand: {
          DEFAULT: "#1D4E89",
          dark: "#123458",
          light: "#EAF1FA",
        },
        status: {
          compliant: "#12805C",
          compliantBg: "#E7F6EF",
          risk: "#B54708",
          riskBg: "#FFF4E5",
          expired: "#B42318",
          expiredBg: "#FEECEB",
          pending: "#5925DC",
          pendingBg: "#F1EBFF",
        },
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(16, 24, 40, 0.04), 0 1px 3px rgba(16, 24, 40, 0.06)",
      },
      borderRadius: {
        card: "10px",
      },
    },
  },
  plugins: [],
};
