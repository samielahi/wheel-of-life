/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      black: "#4f4c4c",
      gray: "#7c7979",
      smoke: "#f3f3f1",
      white: "#ffffff",
      red: "#ff3d00",
      violet: "#9c8cdf",
    },
    fontFamily: {
      main: ["Atkinson Hyperlegible", "sans-serif"],
      heading: ["Krona One", "sans-serif"],
    },
    extend: {
      display: ["group-hover"],
    },
  },
  plugins: [],
};
