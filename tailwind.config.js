/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        green: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#4CAF50',  // Primary green
          600: '#388E3C',  // Darker green
          700: '#2e7d32',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        orange: {
          500: '#FF9800', // Accent orange
        },
        cream: '#FFF8E1',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};