import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Only set base path for production (GitHub Pages)
  base: "https://jesuslovesshiva.github.io/3D_portfolio-main/",
   })