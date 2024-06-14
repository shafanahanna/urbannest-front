/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'home-back': "url('/src/components/assets/homeback.png')",
      },
    },
  },
  plugins: [],
};
