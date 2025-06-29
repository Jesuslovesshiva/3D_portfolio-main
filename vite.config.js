import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    assetsInclude: ['**/*.glb'],
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
    },
  }

  if (command !== 'serve') {
    config.base = '/3D_portfolio-main/'
  }

  return config
})
