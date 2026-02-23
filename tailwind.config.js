/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkbg: '#051923',
        primary: '#BFD9FF',
        accent1: '#480CA8',
        accent2: '#5465FF',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite', // Animasi gambar naik turun
        'pulse-slow': 'pulse 4s cubic-bezier(1.4, 1, 1.6, 2) infinite', // Animasi shadow berkedip pelan
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(15deg)' }, // Pastikan rotasi tetap ada
          '50%': { transform: 'translateY(-20px) rotate(15deg)' }, // Bergerak ke atas 20px
        }
      }
    },
  },
  plugins: [],
}