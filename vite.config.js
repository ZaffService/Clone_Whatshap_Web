import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  css: {
    postcss: './postcss.config.js',
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        charset: false
      }
    }
  },
  build: {
    target: 'esnext',
    cssCodeSplit: true,
    cssMinify: 'lightningcss',
    minify: 'terser',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      },
      output: {
        manualChunks: undefined,
        format: 'es',
        entryFileNames: '[name].[hash].js',
        chunkFileNames: '[name].[hash].js',
        assetFileNames: '[name].[hash][extname]'
      }
    },
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true
  }
})