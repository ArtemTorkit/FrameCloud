/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg': '#F5E9CD',
        'blue': '#1992E4',
        'hover-blue': '#206C9F',
        'dark-blue': '#4370B4',
      }
    },
  },
  plugins: [],
}