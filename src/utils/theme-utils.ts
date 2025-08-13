// utils/theme-utils.ts
/**
 * Theme Integration Utilities
 * Helper functions for working with the Wine Theme System
 */
import { generateCSSVariables, type WineTheme, wineTheme } from '../theme/wine-theme';

/**
 * Apply theme variables to document root
 */
export const applyThemeVariables = (theme: WineTheme = wineTheme) => {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  const cssVars = generateCSSVariables(theme);

  Object.entries(cssVars).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
};

/**
 * Get CSS custom property value
 */
export const getCSSVariable = (property: string): string => {
  if (typeof window === 'undefined') return '';

  return getComputedStyle(document.documentElement).getPropertyValue(property).trim();
};

/**
 * Create wine-themed class names
 */
export const wineClasses = {
  // Buttons
  button: {
    primary: 'wine-button wine-button--primary',
    secondary: 'wine-button wine-button--secondary',
    ghost: 'wine-button wine-button--ghost',
    destructive: 'wine-button wine-button--destructive',
    small: 'wine-button wine-button--small',
    large: 'wine-button wine-button--large',
  },

  // Cards
  card: {
    default: 'wine-card',
    rosé: 'wine-rosé-card',
    glass: 'wine-glass-card',
    hover: 'wine-hover-lift',
  },

  // Badges
  badge: {
    default: 'wine-badge',
    primary: 'wine-badge wine-badge--primary',
    secondary: 'wine-badge wine-badge--secondary',
    success: 'wine-badge wine-badge--success',
    warning: 'wine-badge wine-badge--warning',
    destructive: 'wine-badge wine-badge--destructive',
    outline: 'wine-badge wine-badge--outline',
    shimmer: 'wine-badge badge-shimmer',
  },

  // Forms
  form: {
    input: 'wine-input',
    label: 'wine-label',
    textarea: 'wine-input wine-textarea',
    select: 'wine-input wine-select',
    checkbox: 'wine-checkbox',
    radio: 'wine-radio',
  },

  // Layout
  layout: {
    container: 'wine-container',
    section: 'wine-section',
    grid: 'wine-grid',
    stack: 'wine-stack',
  },

  // Effects
  effects: {
    glass: 'wine-glass-effect',
    texture: 'wine-texture-overlay',
    divider: 'wine-divider',
    hoverLift: 'wine-hover-lift',
    hoverGlow: 'wine-hover-glow',
    hoverScale: 'wine-hover-scale',
  },

  // Gamification
  gamification: {
    streak: 'streak-counter',
    achievement: 'achievement-badge',
    level: 'level-indicator',
    xp: 'xp-gain',
    challenge: 'challenge-card',
    leaderboard: 'leaderboard-item',
  },
};

/**
 * Responsive class generator
 */
export const responsive = {
  show: {
    mobile: 'mobile-only',
    tablet: 'tablet-only',
    desktop: 'desktop-only',
  },
  grid: {
    mobile: 'mobile-grid-1',
    tablet: 'tablet-grid-2',
    desktop: 'desktop-grid-3',
    kiosk: 'kiosk-grid-4',
  },
};

/**
 * Color utility functions
 */
export const wineColors = {
  /**
   * Get wine color by shade
   */
  wine: (shade: 'darkest' | 'dark' | 'medium' | 'light' | 'accent') => wineTheme.colors.wine[shade],

  /**
   * Get rosé color by variant
   */
  rosé: (variant: keyof typeof wineTheme.colors.rosé) => wineTheme.colors.rosé[variant],

  /**
   * Get semantic color
   */
  semantic: (type: keyof typeof wineTheme.colors.semantic) => wineTheme.colors.semantic[type],

  /**
   * Get gamification gradient colors
   */
  gamification: (type: keyof typeof wineTheme.colors.gamification) =>
    wineTheme.colors.gamification[type],
};

/**
 * Animation utility functions
 */
export const animations = {
  /**
   * Create custom animation with wine theme timings
   */
  create: (
    name: string,
    duration: keyof typeof wineTheme.animations.duration = 'normal',
    easing: keyof typeof wineTheme.animations.easing = 'easeOut',
  ) => ({
    animation: `${name} ${wineTheme.animations.duration[duration]} ${wineTheme.animations.easing[easing]}`,
  }),

  /**
   * Create transition with wine theme timings
   */
  transition: (
    property: string = 'all',
    duration: keyof typeof wineTheme.animations.duration = 'normal',
    easing: keyof typeof wineTheme.animations.easing = 'easeOut',
  ) => ({
    transition: `${property} ${wineTheme.animations.duration[duration]} ${wineTheme.animations.easing[easing]}`,
  }),
};

/**
 * Shadow utility functions
 */
export const shadows = {
  /**
   * Get theme shadow by size
   */
  get: (size: keyof typeof wineTheme.shadows) =>
    typeof wineTheme.shadows[size] === 'string'
      ? wineTheme.shadows[size]
      : wineTheme.shadows.default,

  /**
   * Get wine-specific shadow
   */
  wine: (type: keyof typeof wineTheme.shadows.wine) => wineTheme.shadows.wine[type],
};

/**
 * Spacing utility functions
 */
export const spacing = {
  /**
   * Get spacing value
   */
  get: (size: keyof typeof wineTheme.spacing) => wineTheme.spacing[size],

  /**
   * Create padding/margin utilities
   */
  padding: (size: keyof typeof wineTheme.spacing) => ({
    padding: wineTheme.spacing[size],
  }),

  margin: (size: keyof typeof wineTheme.spacing) => ({
    margin: wineTheme.spacing[size],
  }),

  gap: (size: keyof typeof wineTheme.spacing) => ({
    gap: wineTheme.spacing[size],
  }),
};

/**
 * Typography utility functions
 */
export const typography = {
  /**
   * Get font size
   */
  size: (size: keyof typeof wineTheme.typography.fontSize) => wineTheme.typography.fontSize[size],

  /**
   * Get font weight
   */
  weight: (weight: keyof typeof wineTheme.typography.fontWeight) =>
    wineTheme.typography.fontWeight[weight],

  /**
   * Create text style object
   */
  style: (
    size: keyof typeof wineTheme.typography.fontSize,
    weight: keyof typeof wineTheme.typography.fontWeight = 'normal',
    lineHeight: keyof typeof wineTheme.typography.lineHeight = 'normal',
  ) => ({
    fontSize: wineTheme.typography.fontSize[size],
    fontWeight: wineTheme.typography.fontWeight[weight],
    lineHeight: wineTheme.typography.lineHeight[lineHeight],
  }),
};

/**
 * Breakpoint utility functions
 */
export const breakpoints = {
  /**
   * Check if current viewport matches breakpoint
   */
  matches: (breakpoint: keyof typeof wineTheme.breakpoints): boolean => {
    if (typeof window === 'undefined') return false;

    const bp = wineTheme.breakpoints[breakpoint];
    const width = window.innerWidth;

    if ('min' in bp && 'max' in bp) {
      return width >= bp.min && width <= bp.max;
    } else if ('min' in bp) {
      return width >= bp.min;
    } else if ('max' in bp) {
      return width <= bp.max;
    }

    return false;
  },

  /**
   * Create media query string
   */
  mediaQuery: (breakpoint: keyof typeof wineTheme.breakpoints): string => {
    const bp = wineTheme.breakpoints[breakpoint];

    if ('min' in bp && 'max' in bp) {
      return `(min-width: ${bp.min}px) and (max-width: ${bp.max}px)`;
    } else if ('min' in bp) {
      return `(min-width: ${bp.min}px)`;
    } else if ('max' in bp) {
      return `(max-width: ${bp.max}px)`;
    }

    return '';
  },
};

/**
 * Component style generators
 */
export const createWineComponent = {
  /**
   * Create button styles
   */
  button: (variant: 'primary' | 'secondary' | 'ghost' | 'destructive' = 'primary') => ({
    className: wineClasses.button[variant],
    style: {
      ...animations.transition('all'),
    },
  }),

  /**
   * Create card styles
   */
  card: (variant: 'default' | 'rosé' | 'glass' = 'default', withHover = true) => ({
    className: `${wineClasses.card[variant]} ${withHover ? wineClasses.card.hover : ''}`.trim(),
    style: {
      ...animations.transition('all'),
    },
  }),

  /**
   * Create badge styles
   */
  badge: (variant: keyof typeof wineClasses.badge = 'default') => ({
    className: wineClasses.badge[variant],
  }),
};

/**
 * Theme validation utilities
 */
export const validateTheme = {
  /**
   * Check if theme is properly loaded
   */
  isLoaded: (): boolean => {
    if (typeof document === 'undefined') return false;

    const testProperty = '--color-wine-accent';
    const value = getCSSVariable(testProperty);
    return value !== '';
  },

  /**
   * Get theme loading status
   */
  getStatus: () => ({
    isLoaded: validateTheme.isLoaded(),
    variables: typeof document !== 'undefined' ? Object.keys(generateCSSVariables()).length : 0,
    timestamp: Date.now(),
  }),
};

/**
 * Development utilities
 */
export const devUtils = {
  /**
   * Log theme information to console
   */
  logTheme: () => {
    if (process.env.NODE_ENV !== 'development') return;

    console.group('🍷 Wine Theme System');
    console.log('Theme Object:', wineTheme);
    console.log('Validation:', validateTheme.getStatus());
    console.log('CSS Variables:', generateCSSVariables());
    console.groupEnd();
  },

  /**
   * Add theme information to window for debugging
   */
  exposeToWindow: () => {
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') return;
    (window as any).wineTheme = {
      theme: wineTheme,
      utils: {
        colors: wineColors,
        animations,
        shadows,
        spacing,
        typography,
        breakpoints,
      },
      validation: validateTheme,
    };
  },
};

// Auto-expose in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  devUtils.exposeToWindow();
}

export default {
  wineClasses,
  wineColors,
  animations,
  shadows,
  spacing,
  typography,
  breakpoints,
  createWineComponent,
  validateTheme,
  devUtils,
  applyThemeVariables,
  getCSSVariable,
  responsive,
};
