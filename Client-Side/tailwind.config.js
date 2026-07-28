/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          bg: "#0B1220",
          surface: "#101B2D",
          surfaceAlt: "#16233A",
          border: "#22314A",
        },
        foam: "#EAF2F1",
        mist: "#7C8CA6",
        wave: {
          teal: "#2DD4BF",
          sky: "#38BDF8",
        },
        coral: "#FB7B5B",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        sans: ["Inter", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      backgroundImage: {
        "wave-gradient": "linear-gradient(135deg, #2DD4BF 0%, #38BDF8 100%)",
      },
    },
  },
  plugins: [],
}