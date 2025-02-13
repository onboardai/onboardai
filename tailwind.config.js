/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Montserrat: ["Montserrat", "sans-serif"],
        Roboto: ["Roboto", "sans-serif"],
        Rubik: ["Rubik", "sans-serif"]
      },
      colors: {
        primary: "#2563eb",
      },
    },
  },
  plugins: [],
};
