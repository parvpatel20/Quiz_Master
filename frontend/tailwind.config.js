/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  extend: {
    animation: {
      'spin-smooth': 'spin 1s linear infinite',
    },
    keyframes: {
      spin: {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' },
      },
    },
  },
};
export const plugins = [
  plugin(function({ addUtilities, theme, e }) {
    addUtilities(
      {
        '.scrollbar-hide': {
          overflow: 'scroll', // Allow scrolling
          '-ms-overflow-style': 'none', // For Internet Explorer
          'scrollbar-width': 'none', // For Firefox
        },
        '.scrollbar-hide::-webkit-scrollbar': {
          display: 'none', // Hide the scrollbar in Webkit browsers
        },
      },
      ['responsive', 'hover'] // You can make these responsive and interactive if needed
    );
  }),
];

