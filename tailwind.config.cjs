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
      violet: "#9B86F3",
      lightViolet: "#E2DDE9",
      pink: "#FCC8D3",
      blue: "#1C2E69",
      silver: "#F5f5f5",
      bg: "#FBF8F3",
      orange: "#FFB565",
      inactive: "#D8D0D0",
      active: "#FCFBF4",
      yellow: "#F9F481",
    },
    extend: {
      display: ["group-hover"],
      screens: {
        air: { raw: "(min-height : 850px)" },
      },
      fontFamily: {
        main: ["Archivo, sans-serif"],
        heading: ["Krona One, sans-serif"],
      },
    },
  },
  plugins: [],
};
