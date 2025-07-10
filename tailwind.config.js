/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // 👈 Required for dark mode to work
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",  // Include your app folder
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
