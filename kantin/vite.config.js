import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  theme: {
    extend: {
      fontFamily: {
        serifCustom: ['"Liberation Serif"', 'serif'],
        manrope: ['"Manrope"', 'sans-serif'],
        newsreader: ['"Newsreader"', 'serif'],
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
        vietnam: ['"Be Vietnam Pro"', 'sans-serif'],
      },
    },
  },
})
