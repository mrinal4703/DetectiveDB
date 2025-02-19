/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif"], // Register "nunito" as a Tailwind utility
      },
      screens :{
        // 'max-md' : {'max': '1024px'},
        'xls': '360px'
      },
      fontSize :{
        'xxs': ['11px', '14px'],
      },
      colors :{
        'hexablue' : '#4e80b5',
        'hexapink' : '#e01b92',
      },
      animation: {
        bounce: 'bounce 1s infinite', // Adjust timing as needed
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(-10%)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
          '50%': { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' },
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}