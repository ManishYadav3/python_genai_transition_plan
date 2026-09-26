/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        bg: {
          darkest: '#080c14',
          dark: '#0d131f',
          card: '#121a29',
          cardHover: '#182235',
          border: '#1e2d42',
        },
        accent: {
          emerald: '#10b981',
          cyan: '#06b6d4',
          amber: '#f59e0b',
          violet: '#8b5cf6',
          rose: '#f43f5e',
        }
      }
    },
  },
  plugins: [],
}
