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
          900: "#9C27B0", // default
        },
        "bg-primary": "#FAF4FB",
      },
    },
  },
  plugins: [],
};
