/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        pramyan: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f7c75',
          800: '#115e59',
          900: '#134e4a',
        },
        accent: '#f5a524',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(15, 124, 117, 0.08)',
        glow: '0 0 30px rgba(20, 184, 166, 0.25)',
      },
    },
  },
  plugins: [],
};
