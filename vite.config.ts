/// <reference types="vitest" />
import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { tanstackRouter } from '@tanstack/router-plugin/vite'
import path from 'node:path'
// import { fileURLToPath } from 'node:url'

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({ autoCodeSplitting: true }),
    viteReact(),
    tailwindcss(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    alias: {
        // Root alias
        '@': path.resolve(__dirname, './src'),
        
        // Component aliases - using absolute paths
        '@components': path.resolve(__dirname, './src/components'),
        '@ui': path.resolve(__dirname, './src/components/ui'),
        
        // Route aliases
        '@routes': path.resolve(__dirname, './src/routes'),
        
        // Asset aliases
        '@styles': path.resolve(__dirname, './src/styles'),
        '@public': path.resolve(__dirname, './public'),
        
        // Utility aliases - specific paths
        '@utils': path.resolve(__dirname, './src/components/utils'),
        '@hooks': path.resolve(__dirname, './src/components/hooks'),
        '@layout': path.resolve(__dirname, './src/components/layout'),
        '@gamification': path.resolve(__dirname, './src/components/gamification'),
        '@figma': path.resolve(__dirname, './src/components/figma'),
      }
  },
})
