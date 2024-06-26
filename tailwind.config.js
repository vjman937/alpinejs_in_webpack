const { default: daisyui } = require("daisyui");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./pages/**/*.{html,js}",
    "./components/**/*.{html,js}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), "prettier-plugin-tailwindcss"],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
};
