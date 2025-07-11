import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/caroline-coaching/', // Corrige les 404 sur GitHub Pages
  plugins: [react()],
})
