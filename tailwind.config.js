/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#070710",
        bg2: "#0d0d1a",
        bg3: "#111128",
        teal: "#00e5cc",
        teal2: "#00b8a9",
        amber: "#ff6b35",
        amber2: "#ff9500",
        purple: "#7b5ea7",
        ink: "#e8e8f0",
        ink2: "#8888aa",
        ink3: "#555570",
      },
      fontFamily: {
        display: ["Syne", "sans-serif"],
        mono: ["DM Mono", "monospace"],
        body: ["Outfit", "sans-serif"],
      },
    },
  },
  plugins: [],
};
