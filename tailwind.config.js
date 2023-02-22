/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: ["nth-child(even)", "nth-child(odd)"],
    },
  },
  daisyui: {
    themes: ["cmyk"],
  },
  plugins: [require("daisyui")],
};
