// hooks/useMediaQueries.ts
import { useEffect, useState } from 'react';

export type ScreenSize = 'mobile' | 'tablet' | 'desktop' | 'kiosk';

export function useMediaQuery(query: string): boolean {
  const getInitialValue = (): boolean => {
    if (typeof window === 'undefined') return false;
    try {
      return window.matchMedia(query).matches;
    } catch {
      return false;
    }
  };

  const [matches, setMatches] = useState(getInitialValue);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let mediaQuery: MediaQueryList;

    try {
      mediaQuery = window.matchMedia(query);
      setMatches(mediaQuery.matches);

      const handler = (event: MediaQueryListEvent) => {
        setMatches(event.matches);
      };

      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
      }
    } catch (error) {
      console.warn('Error setting up media query listener:', error);
    }
  }, [query]);

  return matches;
}

// Predefined breakpoint hooks
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 767px)');
}

export function useIsTablet(): boolean {
  return useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
}

export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1024px) and (max-width: 1439px)');
}

export function useIsKiosk(): boolean {
  return useMediaQuery('(min-width: 1440px)');
}

export function useScreenSize(): ScreenSize {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isDesktop = useIsDesktop();
  const isKiosk = useIsKiosk();

  if (isMobile) return 'mobile';
  if (isTablet) return 'tablet';
  if (isDesktop) return 'desktop';
  if (isKiosk) return 'kiosk';
  return 'desktop';
}
