/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Dark theme colors
        dark: {
          900: '#0a0a0b',      // Darkest background
          800: '#111113',      // Sidebar background
          700: '#1a1a1d',      // Card backgrounds
          600: '#252529',      // Hover states
          500: '#3a3a40',      // Borders
        },
        accent: {
          yellow: '#d4e931',   // Primary accent (yellow-green)
          blue: '#4a9eff',     // Secondary accent
        },
        text: {
          primary: '#ffffff',
          secondary: '#a1a1aa',
          muted: '#71717a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
