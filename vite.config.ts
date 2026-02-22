import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/super-t/',
  plugins: [react()],
  server: {
    allowedHosts: true,
    host: true,
    hmr: false,
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name]-[hash]-${new Date().getTime()}.js`,
        chunkFileNames: `assets/[name]-[hash]-${new Date().getTime()}.js`,
        assetFileNames: `assets/[name]-[hash]-${new Date().getTime()}[extname]`,
      }
    }
  }
})
