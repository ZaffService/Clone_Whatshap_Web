import { defineConfig } from 'vite'

export default defineConfig({
  css: {
    postcss: './postcss.config.js'
  },
  build: {
    target: 'esnext',
    cssMinify: false, // Désactive temporairement la minification CSS
    minify: 'terser'  // Minifie seulement le JavaScript
  },
  server: {
    port: 5173,
    host: true
  }
})
