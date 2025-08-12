/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ This must be accurate
  ],
  theme: {
    extend: {
      fontFamily: {
        "pacific" : ["Pacifico", 'sans-serif']
      }
    },
  },
  plugins: [],
};
