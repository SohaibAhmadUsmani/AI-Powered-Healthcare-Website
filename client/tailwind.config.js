/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Tailwind tailred for professional medical look
        medical: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
        },
        darkBg: '#0B0F19',
        darkPrimary: '#06B6D4',
        darkSecondary: '#8B5CF6',
        darkAccent: '#111827',
      },
      boxShadow: {
        glowPrimary: '0 0 15px rgba(6, 182, 212, 0.4)',
        glowSecondary: '0 0 15px rgba(139, 92, 246, 0.4)',
      }
    },
  },
  plugins: [],
}
