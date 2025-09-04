/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // or 'media'
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // adjust paths to your project
  ],
  theme: {
    extend: {
      colors: {
        background: {
          light: '#ffffff',
          dark: '#1a1a1a',
        },
        text: {
          light: '#000000',
          dark: '#f0f0f0',
        },
      },
    },
  },
  plugins: [],
};
