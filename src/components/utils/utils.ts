import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Wine-themed component utilities
export const wineTheme = {
  colors: {
    primary: 'var(--color-wine-accent)',
    secondary: 'var(--color-secondary)',
    background: 'var(--color-background)',
    foreground: 'var(--color-foreground)',
    muted: 'var(--color-muted-foreground)',
    border: 'var(--color-border)',
  },
  spacing: {
    xs: 'var(--spacing-1)',
    sm: 'var(--spacing-2)',
    md: 'var(--spacing-4)',
    lg: 'var(--spacing-6)',
    xl: 'var(--spacing-8)',
  },
  radius: {
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
    xl: 'var(--radius-xl)',
    full: 'var(--radius-full)',
  },
};

// Wine-specific utility functions
export const wineUtils = {
  // Combine wine theme classes
  wineClass: (...classes: ClassValue[]) => cn(classes),

  // Wine color variants
  wineVariant: (variant: 'primary' | 'secondary' | 'accent' | 'muted' = 'primary') => {
    const variants = {
      primary: 'bg-wine-accent text-wine-primary-foreground',
      secondary: 'bg-secondary text-secondary-foreground',
      accent: 'bg-accent text-accent-foreground',
      muted: 'bg-muted text-muted-foreground',
    };
    return variants[variant];
  },

  // Wine button styles
  wineButton: (variant: 'primary' | 'secondary' | 'ghost' | 'destructive' = 'primary') => {
    return cn('wine-button', {
      'wine-button--primary': variant === 'primary',
      'wine-button--secondary': variant === 'secondary',
      'wine-button--ghost': variant === 'ghost',
      'wine-button--destructive': variant === 'destructive',
    });
  },

  // Wine card styles
  wineCard: (hover: boolean = true) => {
    return cn('wine-rosé-card', hover && 'wine-hover-lift');
  },
};
