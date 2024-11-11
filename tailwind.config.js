
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        'gradient-noticeable': 'gradient-bg 3s ease-in-out infinite',
      },
      keyframes: {
        'gradient-bg': {
          '0%': { backgroundPosition: '0% 50%' },
          '25%': { backgroundPosition: '50% 0%' },
          '50%': { backgroundPosition: '100% 50%' },
          '75%': { backgroundPosition: '50% 100%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      backgroundSize: {
        '300%': '300% 300%', // More area to animate
      },
      colors: {
        cyan: {
          400: '#22d3ee',
        },
        purple: {
          500: '#8b5cf6',
        },
      },
    },
  },
  plugins: [],
};

