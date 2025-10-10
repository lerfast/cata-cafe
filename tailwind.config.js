/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#0F2740",
          primary: "#2a7f62",
          accent: "#ff9f1c",
        },
      },
      boxShadow: {
        card: "0 8px 30px rgba(0,0,0,.12)",
      },
    },
  },
  plugins: [],
};