/**
 * Environment utilities for Wine Buddy
 * Provides robust environment detection with multiple fallbacks
 */

// Development environment detection with multiple fallbacks
export const isDevelopment = (): boolean => {
  try {
    // Vite environment variable (primary)
    if (
      typeof import.meta !== 'undefined' &&
      import.meta.env &&
      typeof import.meta.env.DEV === 'boolean'
    ) {
      return import.meta.env.DEV
    }

    // Node.js environment variable (fallback)
    if (
      typeof process !== 'undefined' &&
      process.env &&
      process.env.NODE_ENV === 'development'
    ) {
      return true
    }

    // Browser-based detection (fallback)
    if (typeof window !== 'undefined' && window.location) {
      const hostname = window.location.hostname || ''
      const port = window.location.port || ''

      return (
        hostname === 'localhost' ||
        hostname === '127.0.0.1' ||
        hostname === '0.0.0.0' ||
        hostname.endsWith('.local') ||
        port === '3000' ||
        port === '5173' ||
        port === '8080' ||
        port === '4173'
      )
    }

    // Final fallback - assume production if we can't determine
    return false
  } catch (error) {
    // Silent fallback to production mode if detection fails
    return false
  }
}

// Production environment detection
export const isProduction = (): boolean => {
  try {
    // Vite environment variable (primary)
    if (
      typeof import.meta !== 'undefined' &&
      import.meta.env &&
      typeof import.meta.env.PROD === 'boolean'
    ) {
      return import.meta.env.PROD
    }

    // Node.js environment variable (fallback)
    if (
      typeof process !== 'undefined' &&
      process.env &&
      process.env.NODE_ENV === 'production'
    ) {
      return true
    }

    // Inverse of development detection
    return !isDevelopment()
  } catch (error) {
    console.warn('Error detecting production environment:', error)
    return !isDevelopment()
  }
}

// Get environment mode as string
export const getEnvironmentMode = ():
  | 'development'
  | 'production'
  | 'unknown' => {
  if (isDevelopment()) return 'development'
  if (isProduction()) return 'production'
  return 'unknown'
}

// PWA detection utilities
export const isPWAInstalled = (): boolean => {
  try {
    if (typeof window === 'undefined') return false

    // Check if running in standalone mode
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches

    // Check iOS standalone mode
    const isIOSInstalled = (window.navigator as any)?.standalone === true

    return isStandalone || isIOSInstalled
  } catch (error) {
    console.warn('Error detecting PWA installation:', error)
    return false
  }
}

// Browser online status
export const isOnline = (): boolean => {
  try {
    return typeof navigator !== 'undefined' ? navigator.onLine : true
  } catch (error) {
    console.warn('Error detecting online status:', error)
    return true
  }
}

// Device type detection
export const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' | 'kiosk' => {
  try {
    if (typeof window === 'undefined') return 'desktop'

    const width = window.innerWidth

    if (width < 768) return 'mobile'
    if (width < 1024) return 'tablet'
    if (width < 1440) return 'desktop'
    return 'kiosk'
  } catch (error) {
    console.warn('Error detecting device type:', error)
    return 'desktop'
  }
}

// Safe environment variable access
export const getEnvVar = (
  key: string,
  defaultValue?: string,
): string | undefined => {
  try {
    // Vite environment variables
    if (
      typeof import.meta !== 'undefined' &&
      import.meta.env &&
      key in import.meta.env
    ) {
      return import.meta.env[key]
    }

    // Node.js environment variables
    if (typeof process !== 'undefined' && process.env && key in process.env) {
      return process.env[key]
    }

    return defaultValue
  } catch (error) {
    console.warn(`Error accessing environment variable ${key}:`, error)
    return defaultValue
  }
}

// Debug logging (only in development)
export const debugLog = (...args: any[]): void => {
  if (isDevelopment()) {
    console.log('[Wine Buddy Debug]:', ...args)
  }
}

// Environment info for debugging
export const getEnvironmentInfo = () => {
  return {
    mode: getEnvironmentMode(),
    isDevelopment: isDevelopment(),
    isProduction: isProduction(),
    isPWAInstalled: isPWAInstalled(),
    isOnline: isOnline(),
    deviceType: getDeviceType(),
    userAgent:
      typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
    url: typeof window !== 'undefined' ? window.location.href : 'unknown',
  }
}
