/**
 * Environment utilities for Wine Buddy
 * Provides robust environment detection with single source of truth
 */

// Development environment indicators - Single source of truth
const DEVELOPMENT_INDICATORS = {
  hostnames: ['localhost', '127.0.0.1', '0.0.0.0'] as string[],
  hostnamePatterns: [/\.local$/],
  ports: ['3000', '5173', '8080', '4173'] as string[],
  nodeEnvValues: ['development', 'dev'] as string[],
}

// Device breakpoints for responsive detection
const DEVICE_BREAKPOINTS = {
  mobile: { max: 768 },
  tablet: { min: 768, max: 1024 },
  desktop: { min: 1024, max: 1440 },
  kiosk: { min: 1440 },
} as const

// Environment detection strategy interface
interface EnvironmentStrategy {
  name: string
  detect: () => boolean
  priority: number // Higher priority = checked first
}

/**
 * Core environment detection with multiple fallback strategies
 */
class EnvironmentDetector {
  private static strategies: EnvironmentStrategy[] = [
    {
      name: 'Vite Environment',
      priority: 1,
      detect: () => {
        return (
          typeof import.meta !== 'undefined' &&
          import.meta.env &&
          typeof import.meta.env.DEV === 'boolean' &&
          import.meta.env.DEV
        )
      },
    },
    {
      name: 'Node Environment',
      priority: 2,
      detect: () => {
        return (
          typeof process !== 'undefined' &&
          process.env &&
          DEVELOPMENT_INDICATORS.nodeEnvValues.includes(
            process.env.NODE_ENV?.toLowerCase() || '',
          )
        )
      },
    },
    {
      name: 'Browser Location',
      priority: 3,
      detect: () => {
        if (typeof window === 'undefined' || !window.location) {
          return false
        }

        const { hostname, port } = window.location

        // Check hostname patterns
        const isDevHostname =
          DEVELOPMENT_INDICATORS.hostnames.includes(hostname) ||
          DEVELOPMENT_INDICATORS.hostnamePatterns.some((pattern) =>
            pattern.test(hostname),
          )

        // Check development ports
        const isDevPort = DEVELOPMENT_INDICATORS.ports.includes(port)

        return isDevHostname || isDevPort
      },
    },
  ]

  /**
   * Detect development environment using prioritized strategies
   */
  static isDevelopment(): boolean {
    try {
      // Sort strategies by priority (highest first)
      const sortedStrategies = this.strategies.sort(
        (a, b) => a.priority - b.priority,
      )

      for (const strategy of sortedStrategies) {
        try {
          if (strategy.detect()) {
            return true
          }
        } catch (error) {
          console.warn(
            `Environment detection strategy "${strategy.name}" failed:`,
            error,
          )
          continue
        }
      }

      // Final fallback - assume production if we can't determine
      return false
    } catch (error) {
      console.warn('All environment detection strategies failed:', error)
      return false
    }
  }

  /**
   * Get detailed environment info for debugging
   */
  static getDetectionDetails(): {
    isDevelopment: boolean
    detectedBy: string | null
    strategies: Array<{ name: string; success: boolean; error?: string }>
  } {
    const strategies: Array<{
      name: string
      success: boolean
      error?: string
    }> = []
    let detectedBy: string | null = null
    let isDevelopment = false

    for (const strategy of this.strategies.sort(
      (a, b) => a.priority - b.priority,
    )) {
      try {
        const success = strategy.detect()
        strategies.push({ name: strategy.name, success })

        if (success && !isDevelopment) {
          isDevelopment = true
          detectedBy = strategy.name
        }
      } catch (error) {
        strategies.push({
          name: strategy.name,
          success: false,
          error: error instanceof Error ? error.message : String(error),
        })
      }
    }

    return { isDevelopment, detectedBy, strategies }
  }
}

// Public API - Simple functions that use the detector
export const isDevelopment = (): boolean => EnvironmentDetector.isDevelopment()

export const isProduction = (): boolean => !isDevelopment()

export const getEnvironmentMode = (): 'development' | 'production' => {
  return isDevelopment() ? 'development' : 'production'
}

/**
 * Device type detection with configurable breakpoints
 */
export const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' | 'kiosk' => {
  try {
    if (typeof window === 'undefined') return 'desktop'

    const width = window.innerWidth

    if (width < DEVICE_BREAKPOINTS.mobile.max) return 'mobile'
    if (width < DEVICE_BREAKPOINTS.tablet.max) return 'tablet'
    if (width < DEVICE_BREAKPOINTS.desktop.max) return 'desktop'
    return 'kiosk'
  } catch (error) {
    console.warn('Error detecting device type:', error)
    return 'desktop'
  }
}

/**
 * PWA installation detection with multiple methods
 */
export const isPWAInstalled = (): boolean => {
  try {
    if (typeof window === 'undefined') return false

    // Method 1: Check standalone display mode
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches

    // Method 2: Check iOS standalone mode
    const isIOSInstalled = (window.navigator as any)?.standalone === true

    // Method 3: Check if launched from home screen (Android)
    const isAndroidInstalled = window.matchMedia(
      '(display-mode: minimal-ui)',
    ).matches

    return isStandalone || isIOSInstalled || isAndroidInstalled
  } catch (error) {
    console.warn('Error detecting PWA installation:', error)
    return false
  }
}

/**
 * Network status detection with offline/online events
 */
export const isOnline = (): boolean => {
  try {
    return typeof navigator !== 'undefined' ? navigator.onLine : true
  } catch (error) {
    console.warn('Error detecting online status:', error)
    return true // Assume online if we can't detect
  }
}

/**
 * Enhanced environment variable access with type safety
 */
export const getEnvVar = (
  key: string,
  defaultValue?: string,
): string | undefined => {
  try {
    // Strategy 1: Vite environment variables
    if (
      typeof import.meta !== 'undefined' &&
      import.meta.env &&
      key in import.meta.env
    ) {
      const value = import.meta.env[key]
      return typeof value === 'string' ? value : defaultValue
    }

    // Strategy 2: Node.js environment variables
    if (typeof process !== 'undefined' && process.env && key in process.env) {
      return process.env[key] || defaultValue
    }

    return defaultValue
  } catch (error) {
    console.warn(`Error accessing environment variable ${key}:`, error)
    return defaultValue
  }
}

/**
 * Smart debug logging that respects environment and log levels
 */
export const debugLog = (...args: any[]): void => {
  if (isDevelopment()) {
    console.log('[Wine Buddy Debug]:', ...args)
  }
}

/**
 * Environment info for comprehensive debugging
 */
export const getEnvironmentInfo = () => {
  const detectionDetails = EnvironmentDetector.getDetectionDetails()

  return {
    // Basic environment info
    mode: getEnvironmentMode(),
    isDevelopment: isDevelopment(),
    isProduction: isProduction(),

    // PWA and device info
    isPWAInstalled: isPWAInstalled(),
    isOnline: isOnline(),
    deviceType: getDeviceType(),

    // Browser info
    userAgent:
      typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
    url: typeof window !== 'undefined' ? window.location.href : 'unknown',
    viewport:
      typeof window !== 'undefined'
        ? { width: window.innerWidth, height: window.innerHeight }
        : { width: 0, height: 0 },

    // Detection details for debugging
    detection: detectionDetails,

    // Configuration used
    config: {
      developmentIndicators: DEVELOPMENT_INDICATORS,
      deviceBreakpoints: DEVICE_BREAKPOINTS,
    },
  }
}

/**
 * Utility to check if we're running in a specific environment
 */
export const isEnvironment = (
  env: 'development' | 'production' | 'test',
): boolean => {
  switch (env) {
    case 'development':
      return isDevelopment()
    case 'production':
      return isProduction()
    case 'test':
      // Check for common test environment indicators
      return (
        typeof process !== 'undefined' &&
        (process.env.NODE_ENV === 'test' ||
          process.env.JEST_WORKER_ID !== undefined ||
          process.env.VITEST !== undefined)
      )
    default:
      return false
  }
}

/**
 * Feature flag system based on environment
 */
export const getFeatureFlags = () => {
  const env = getEnvironmentMode()

  return {
    // Debug features
    showDebugInfo: env === 'development',
    verboseLogging: env === 'development',

    // PWA features
    enablePWAInstallPrompt: true,
    enableServiceWorker: env === 'production',

    // Performance features
    enableAnalytics: env === 'production',
    enablePerformanceMonitoring: true,

    // Development features
    enableHotReload: env === 'development',
    enableDevTools: env === 'development',
  }
}
