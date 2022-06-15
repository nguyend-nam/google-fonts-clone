/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      rotate: {
        22.5: '22.5deg',
      },
      colors: {
        blue: {
          600: '#1a73e8',
        },
      },
    },
  },
  plugins: [],
}
