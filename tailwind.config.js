/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#14b8a6',
        body: '#efefef',
        dark: '#0f172a',
        borderDark: '#495057',
      },
    },
  },
  plugins: [],
};
