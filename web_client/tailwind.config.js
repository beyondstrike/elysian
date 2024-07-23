/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3949AB",
        secondary: "#27368F",
        background: "#5769D4",
        muted: "#F0F0F0",
      },
    },
  },
  plugins: [],
};
