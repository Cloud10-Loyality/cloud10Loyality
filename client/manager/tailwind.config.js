/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'mobile-sm': { 'max': '360px' },
        'mobile': { 'max': '484px' },
        'tablet-sm': { 'max': '768px' },
        'tablet': { 'max': '1292px' },
        'laptop-sm': { 'max': '1440px' },
        'laptop-md': { 'max': '1536px' },
        'desktop': { 'min': '1920px' },
      },
      colors: {
        "sidebar": "var(--sidebar-background)",
        "sidebar-item": "var(--sidebar-item-background)",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        primary: ["var(--font-primary)", 'sans-serif'],
      }
    },
  },
  plugins: [],
}
