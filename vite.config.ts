import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Nếu deploy trên Vercel hoặc chạy local thì base là '/', còn lại (GitHub Pages) là '/turinggame/'
  base: process.env.VERCEL ? '/' : '/turinggame/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
