/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  corePlugins: {
    preflight: false,
  },
  important: "#root",
  theme: {
    extend: {
      transitionDuration: {
        2000: "2000ms",
      },
      colors: {
        primary: {
          50: "#A73FB9", // text color
          100: "#D1B5E1", // Ring DoghnutAvatar
          900: "#9C27B0", // default
        },
        blue: "#2196F3",
        orange: "#ED6C02",
        green: "#AFE2B1",
      },
    },
  },
  plugins: [],
};
