/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  corePlugins: {
    preflight: true,
  },
  important: "#root",
  theme: {
    extend: {
      primaryC: "#9C27B0",
    },
  },
  plugins: [],
};
