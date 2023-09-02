/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/@dracor/react/**/*.js',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'reverse-spin 120s linear infinite',
      },
      keyframes: {
        'reverse-spin': {
          from: {
            transform: 'rotate(360deg)',
          },
        },
      },
    },
  },
  plugins: [require('@dracor/react/tailwind')],
};
