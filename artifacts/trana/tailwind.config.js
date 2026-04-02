/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1A3C5E",
        "teal-dark": "#0D7377",
        "teal-light": "#D6F0EF",
        gold: "#C9962B",
        "gold-light": "#FDF3DC",
        "blue-light": "#D6E8F5",
      },
    },
  },
  plugins: [],
};
