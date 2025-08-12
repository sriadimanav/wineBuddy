/// <reference types="vitest" />
import tailwindcss from '@tailwindcss/vite'
import viteReact from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

import { tanstackRouter } from '@tanstack/router-plugin/vite'
import path from 'node:path'
import { VitePWA } from 'vite-plugin-pwa'
// import { fileURLToPath } from 'node:url'

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({ autoCodeSplitting: true }),
    viteReact(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      strategies: 'generateSW',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff2}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'wine-images-cache',
              plugins: [
                {
                  cacheKeyWillBeUsed: async ({ request }) => {
                    const url = new URL(request.url)
                    url.searchParams.set('wine-buddy', 'v1')
                    return url.toString()
                  },
                },
              ],
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
          {
            urlPattern: /^https:\/\/api\..*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'wine-api-cache',
              networkTimeoutSeconds: 10,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24, // 1 day
              },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'wine-images-static',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
              },
            },
          },
        ],
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Wine Buddy - Wine Discovery App',
        short_name: 'Wine Buddy',
        description:
          'Discover, scan, and explore wines with comprehensive details, reviews, and personalized recommendations',
        theme_color: '#ad2831',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait-primary',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'logo192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: 'logo512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
        shortcuts: [
          {
            name: 'Scan Wine',
            short_name: 'Scan',
            description: 'Quickly scan a wine label or barcode',
            url: '/scan',
            icons: [
              {
                src: 'icons/scan-shortcut-192x192.png',
                sizes: '192x192',
              },
            ],
          },
          {
            name: 'My Favorites',
            short_name: 'Favorites',
            description: 'View your favorite wines',
            url: '/favorites',
            icons: [
              {
                src: 'icons/favorites-shortcut-192x192.png',
                sizes: '192x192',
              },
            ],
          },
        ],
        categories: ['lifestyle', 'food', 'entertainment'],
      },
      devOptions: {
        enabled: true,
        navigateFallback: 'index.html',
        suppressWarnings: true,
        type: 'module',
      },
    }),
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
      '@ts': path.resolve(__dirname, './src/ts'),
    },
    //extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
})
