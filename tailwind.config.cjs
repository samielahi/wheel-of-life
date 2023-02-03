/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      black: "#4f4c4c",
      gray: "#7c7979",
      smoke: "#f3f3f1",
      white: "#FFFFFF",
      red: "#ff3d00",
      violet: "#9c8cdf",
      pink: "#FCC8D3",
      blue: "#1C2E69",
      silver: "#E4E4E4",
      inactive: "#D8D0D0",
      active: "#FCFBF4",
    },
    fontFamily: {
      main: ["Atkinson Hyperlegible", "sans-serif"],
      heading: ["Krona One", "sans-serif"],
    },
    extend: {
      display: ["group-hover"],
      screens: {
        air: { raw: "(min-height : 850px)" },
      },
    },
  },
  plugins: [],
};
