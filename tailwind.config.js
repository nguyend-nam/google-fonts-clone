/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          600: '#1a73e8',
        },
      },
      spacing: {
        17: '4.25rem',
      },
    },
  },
  plugins: [],
}
