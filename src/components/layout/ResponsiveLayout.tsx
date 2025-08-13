// components/layout/ResponsiveLayout.tsx
import type { CSSProperties, ReactNode } from 'react';

import { useMediaQuery } from '../hooks/useMediaQueries';

type ScreenSize = 'mobile' | 'tablet' | 'desktop' | 'kiosk';

interface ResponsiveLayoutProps {
  children: ReactNode;
  className?: string;
}

interface AdaptiveGridProps {
  children: ReactNode;
  cols?: Partial<Record<ScreenSize, number>>;
  gap?: string;
  className?: string;
}

const getScreenSize = (isMobile: boolean, isTablet: boolean, isKiosk: boolean): ScreenSize => {
  if (isMobile) return 'mobile';
  if (isTablet) return 'tablet';
  if (isKiosk) return 'kiosk';
  return 'desktop';
};

const getGridCols = (cols: Partial<Record<ScreenSize, number>>, screenSize: ScreenSize): number => {
  const defaultCols = { mobile: 1, tablet: 2, desktop: 3, kiosk: 4 };
  return cols[screenSize] ?? defaultCols[screenSize];
};

export function ResponsiveLayout({ children, className = '' }: ResponsiveLayoutProps) {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isKiosk = useMediaQuery('(min-width: 1440px)');

  const screenSize = getScreenSize(isMobile, isTablet, isKiosk);

  return <div className={`container-${screenSize} ${className}`}>{children}</div>;
}

export function AdaptiveGrid({
  children,
  cols = {},
  gap = 'var(--space-4)',
  className = '',
}: AdaptiveGridProps) {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isKiosk = useMediaQuery('(min-width: 1440px)');

  const screenSize = getScreenSize(isMobile, isTablet, isKiosk);
  const currentCols = getGridCols(cols, screenSize);

  const gridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${currentCols}, 1fr)`,
    gap,
  };

  return (
    <div className={className} style={gridStyle}>
      {children}
    </div>
  );
}
