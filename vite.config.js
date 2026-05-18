import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

/**
 * Vite构建配置
 * 包含Vue插件配置和构建优化选项
 */
export default defineConfig({
  plugins: [vue()],
  build: {
    target: 'es2015',
    cssTarget: 'chrome80',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue']
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    },
    sourcemap: false,
    chunkSizeWarningLimit: 1000
  },
  css: {
    devSourcemap: true
  },
  server: {
    port: 3000,
    open: false,
    cors: true
  }
})
