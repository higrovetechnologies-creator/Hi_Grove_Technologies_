/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#EAF4FF',
          100: '#D8EBFF',
          200: '#B8D8FF',
          300: '#8FC0FF',
          400: '#5AA2FF',
          500: '#248BFF',
          600: '#0f2f5b',
          700: '#0F5FCC',
          800: '#0D4EA6',
          900: '#0A3C80',
          950: '#06244D',
        },
        dark: {
          bg: '#03070D',
          card: '#0A1626',
          elevated: '#0D1D31',
          border: '#12304D',
          muted: '#66758A',
        },
        cyan: {
          400: '#36D9FF',
          500: '#00C8FF',
          600: '#00A8D6',
        },
        grove: {
          500: '#10B981',
          700: '#087F5B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'brand-shine': 'brandShine 3.2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        brandShine: {
          '0%, 100%': { filter: 'brightness(1)' },
          '50%': { filter: 'brightness(1.16)' },
        },
      },
    },
  },
  plugins: [],
}
