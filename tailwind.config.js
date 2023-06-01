/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'reverse-spin 120s linear infinite',
      },
      keyframes: {
        'reverse-spin': {
          from: {
            transform: 'rotate(360deg)'
          },
        },
      },
      colors: {
        primary: '#1f2448',
        secondary: {
          100: '#aef',
          200: '#08f',
        },
        neutral: {
          100: '#ebf0f7',
          200: '#1f244809',
        },
      },
    },
  },
  plugins: [],
};
