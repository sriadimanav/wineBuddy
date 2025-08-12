// theme/wine-theme.ts
/**
 * Wine Buddy Theme System
 * Centralized theme configuration with TypeScript support
 */

// Base wine color palette
export const wineColors = {
  wine: {
    darkest: '#250902',
    dark: '#38040e',
    medium: '#640d14',
    light: '#800e13',
    accent: '#ad2831',
  },
  rosé: {
    background: '#fdf8f8',
    foreground: '#2a1214',
    card: '#ffffff',
    secondary: '#faf2f3',
    muted: '#f5eeef',
    border: '#f0e1e3',
    soft: '#fef9f9',
    pearl: '#fbf4f5',
    whisper: '#f5eeef',
    blush: '#faf2f3',
  },
  semantic: {
    destructive: '#ef4444',
    success: '#10b981',
    warning: '#f59e0b',
    info: '#3b82f6',
  },
  gamification: {
    streak: {
      from: '#d4a574',
      to: '#c49363',
    },
    scans: {
      from: '#9d6b8f',
      to: '#b85a7a',
    },
    badges: {
      from: '#7a9b7e',
      to: '#6b8e7f',
    },
  },
} as const

// Typography scale
export const typography = {
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.625,
  },
} as const

// Spacing system
export const spacing = {
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
} as const

// Border radius system
export const borderRadius = {
  sm: '0.375rem',
  default: '0.5rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  '2xl': '1.5rem',
  '3xl': '2rem',
  full: '9999px',
} as const

// Shadows with wine tinting
export const shadows = {
  sm: '0 1px 2px 0 rgba(42, 18, 20, 0.05)',
  default: '0 4px 6px -1px rgba(42, 18, 20, 0.1), 0 2px 4px -2px rgba(42, 18, 20, 0.05)',
  md: '0 4px 6px -1px rgba(42, 18, 20, 0.1), 0 2px 4px -2px rgba(42, 18, 20, 0.05)',
  lg: '0 10px 15px -3px rgba(42, 18, 20, 0.1), 0 4px 6px -4px rgba(42, 18, 20, 0.05)',
  xl: '0 20px 25px -5px rgba(42, 18, 20, 0.1), 0 8px 10px -6px rgba(42, 18, 20, 0.05)',
  '2xl': '0 25px 50px -12px rgba(42, 18, 20, 0.15)',
  wine: {
    soft: '0 4px 12px rgba(42, 18, 20, 0.05), 0 2px 4px rgba(173, 40, 49, 0.03)',
    hover: '0 12px 24px -4px rgba(42, 18, 20, 0.12), 0 4px 8px -2px rgba(173, 40, 49, 0.08)',
    glass: '0 8px 32px rgba(42, 18, 20, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
  },
} as const

// Breakpoints for responsive design
export const breakpoints = {
  mobile: { max: 768 },
  tablet: { min: 768, max: 1024 },
  desktop: { min: 1024, max: 1440 },
  kiosk: { min: 1440 },
} as const

// Animation definitions
export const animations = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  easing: {
    ease: 'ease',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const

// Complete theme object
export const wineTheme = {
  colors: wineColors,
  typography,
  spacing,
  borderRadius,
  shadows,
  breakpoints,
  animations,
} as const

// Theme helper functions
export const createWineGradient = (from: string, to: string, direction = 'to right') => 
  `linear-gradient(${direction}, ${from}, ${to})`

export const createWineShadow = (color: string, opacity = 0.1) =>
  `0 4px 6px -1px rgba(${color}, ${opacity}), 0 2px 4px -2px rgba(${color}, ${opacity * 0.5})`

// CSS custom properties generator
export const generateCSSVariables = (theme = wineTheme) => {
  const cssVars: Record<string, string> = {}
  
  // Colors
  Object.entries(theme.colors.wine).forEach(([key, value]) => {
    cssVars[`--color-wine-${key}`] = value
  })
  
  Object.entries(theme.colors.rosé).forEach(([key, value]) => {
    cssVars[`--color-rosé-${key}`] = value
  })
  
  Object.entries(theme.colors.semantic).forEach(([key, value]) => {
    cssVars[`--color-${key}`] = value
  })
  
  // Typography
  Object.entries(theme.typography.fontSize).forEach(([key, value]) => {
    cssVars[`--font-size-${key}`] = value
  })
  
  Object.entries(theme.typography.fontWeight).forEach(([key, value]) => {
    cssVars[`--font-weight-${key}`] = value.toString()
  })
  
  // Spacing
  Object.entries(theme.spacing).forEach(([key, value]) => {
    cssVars[`--spacing-${key}`] = value
  })
  
  // Border radius
  Object.entries(theme.borderRadius).forEach(([key, value]) => {
    cssVars[`--radius-${key}`] = value
  })
  
  return cssVars
}

// Type exports for TypeScript support
export type WineTheme = typeof wineTheme
export type WineColors = typeof wineColors
export type Typography = typeof typography
export type Spacing = typeof spacing
export type BorderRadius = typeof borderRadius
export type Shadows = typeof shadows
export type Breakpoints = typeof breakpoints
export type Animations = typeof animations

// Default export
export default wineTheme