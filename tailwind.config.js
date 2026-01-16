export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          300: '#fdba74', // orange-300
          400: '#fb923c', // orange-400
          500: '#f97316', // orange-500
          600: '#ea580c', // orange-600
          DEFAULT: '#fb923c', // orange-400 as default
        },
        muted: {
          300: '#d1d5db', // gray-300
          400: '#9ca3af', // gray-400
          500: '#6b7280', // gray-500
          600: '#4b5563', // gray-600
          700: '#374151', // gray-700
          800: '#1f2937', // gray-800
          DEFAULT: '#9ca3af', // gray-400 as default
        },
        border: {
          DEFAULT: '#374151', // gray-700 as default
          light: '#4b5563', // gray-600
          dark: '#1f2937', // gray-800
        },
        accent: {
          DEFAULT: '#fb923c', // orange-400 as default
          light: '#fdba74', // orange-300
          dark: '#f97316', // orange-500
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
