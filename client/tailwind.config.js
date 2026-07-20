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
        // Light theme specific premium medical colors
        lightBg: '#F8FAFC',
        lightBgSecondary: '#F1F5F9',
        lightPrimary: '#0891B2',
        lightSecondary: '#6366F1',
        lightAccent: '#FFFFFF',
      },
      boxShadow: {
        glowPrimary: '0 0 15px rgba(6, 182, 212, 0.4)',
        glowSecondary: '0 0 15px rgba(139, 92, 246, 0.4)',
        glowLightPrimary: '0 0 15px rgba(8, 145, 178, 0.2)',
        glowLightSecondary: '0 0 15px rgba(99, 102, 241, 0.2)',
        premiumLight: '0 8px 30px rgba(15, 23, 42, 0.04)',
        premiumLightHover: '0 20px 40px rgba(15, 23, 42, 0.07)',
      }
    },
  },
  plugins: [],
}
