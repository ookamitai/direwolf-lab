/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './index.html',
      './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['Afacad Flux', 'sans-serif'],
          display: ['Afacad Flux', 'sans-serif'],
        },
        colors: {
          'primary': '#060a12',
          'secondary': '#161e2b',
          'accent': '#237ea6',
          'neutral': '#e4e8ed',
        },
        animation: {
          'float': 'float 6s ease-in-out infinite',
          'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          'spin-slow': 'spin 15s linear infinite',
        },
        keyframes: {
          float: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-20px)' },
          }
        },
        backdropBlur: {
          xs: '2px',
        }
      },
    },
    plugins: [],
}
