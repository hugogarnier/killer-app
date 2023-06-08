/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/navigation/**/*.{js,jsx,ts,tsx}',
    './src/screens/**/*.{js,jsx,ts,tsx}',
    './src/ui/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#F9F9F9',
        backgroundPure: '#E4F0FF',
        gray800: '#333333',
        gray400: '#949AA3',
        darkBlue: '#003480',
        pure: '#0168FF',
        green: '#4CB9A3',
        red: '#E44646',
        orange: '#DB9E43',
      },
    },
  },
  plugins: [],
};
