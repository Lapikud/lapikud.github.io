/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{svelte,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          DEFAULT: '#f0941d',
          light: '#ffa940',
          dark: '#d67d0a',
          500: '#f0941d',
        },
        gray: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          800: '#262626',
          900: '#171717',
        },
      },
      spacing: {
        '0': '0px',
        '1': '4px',
        '2': '8px',
        '3': '16px',
        '4': '24px',
        '5': '32px',
        '6': '48px',
      },
      maxWidth: {
        '2xl': '700px',
        '3xl': '800px',
        '4xl': '900px',
      },
    },
  },
  plugins: [],
}
