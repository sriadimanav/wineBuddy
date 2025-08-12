// config/environment.ts
/**
 * Environment configuration for Wine Buddy
 * Centralized configuration for environment detection and features
 */

export const ENVIRONMENT_CONFIG = {
  // Development detection indicators
  development: {
    hostnames: ['localhost', '127.0.0.1', '0.0.0.0'] as const,
    hostnamePatterns: [/\.local$/, /\.test$/, /\.dev$/] as const,
    ports: ['3000', '5173', '8080', '4173', '8000'] as const,
    nodeEnvValues: ['development', 'dev'] as const,
  },

  // Device breakpoints (in pixels)
  devices: {
    mobile: { max: 768 },
    tablet: { min: 768, max: 1024 },
    desktop: { min: 1024, max: 1440 },
    kiosk: { min: 1440 },
  },

  // PWA configuration
  pwa: {
    enableInstallPrompt: true,
    enableServiceWorker: true, // Will be filtered by environment
    installBannerDismissKey: 'wine-buddy-install-dismissed',
    offlineToastDuration: 3000,
  },

  // Feature flags by environment
  features: {
    development: {
      showDebugInfo: true,
      verboseLogging: true,
      enableHotReload: true,
      enableDevTools: true,
      enableAnalytics: false,
      enableServiceWorker: false,
    },
    production: {
      showDebugInfo: false,
      verboseLogging: false,
      enableHotReload: false,
      enableDevTools: false,
      enableAnalytics: true,
      enableServiceWorker: true,
    },
    test: {
      showDebugInfo: false,
      verboseLogging: true,
      enableHotReload: false,
      enableDevTools: false,
      enableAnalytics: false,
      enableServiceWorker: false,
    },
  },

  // Logging configuration
  logging: {
    prefix: '[Wine Buddy]',
    levels: {
      development: ['debug', 'info', 'warn', 'error'] as const,
      production: ['warn', 'error'] as const,
      test: ['error'] as const,
    },
  },
} as const;

// Type exports for better TypeScript support
export type EnvironmentMode = keyof typeof ENVIRONMENT_CONFIG.features;
export type DeviceType = keyof typeof ENVIRONMENT_CONFIG.devices;
export type LogLevel = (typeof ENVIRONMENT_CONFIG.logging.levels.development)[number];
