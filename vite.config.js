import { defineConfig } from 'vite'

export default defineConfig({
  css: {
    postcss: './postcss.config.js'
  },
  build: {
    target: 'esnext',
    cssMinify: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: undefined
      },
      external: [],
      onwarn(warning, warn) {
        // Ignorer certains warnings Rollup
        if (warning.code === 'UNRESOLVED_IMPORT') return
        if (warning.code === 'THIS_IS_UNDEFINED') return
        warn(warning)
      }
    }
  },
  define: {
    global: 'globalThis'
  },
  server: {
    port: 5173,
    host: true
  }
})
