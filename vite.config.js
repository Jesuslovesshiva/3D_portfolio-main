import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Only set base path for production (GitHub Pages)
  base: process.env.NODE_ENV === 'production' ? '/3d_portfolio-main/' : '/', 
})