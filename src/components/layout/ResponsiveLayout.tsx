import { useMediaQuery } from '@hooks/useMediaQueries';
import type { CSSProperties, ReactNode } from 'react';

type ScreenSize = 'mobile' | 'tablet' | 'desktop' | 'kiosk';

interface ResponsiveLayoutProps {
  children: ReactNode;
  className?: string;
}

export function ResponsiveLayout({ children, className = '' }: ResponsiveLayoutProps) {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isKiosk = useMediaQuery('(min-width: 1440px)');

  const getScreenSize = (): ScreenSize => {
    if (isMobile) return 'mobile';
    if (isTablet) return 'tablet';
    if (isKiosk) return 'kiosk';
    return 'desktop';
  };

  return <div className={`${`container-${getScreenSize()}`} ${className}`}>{children}</div>;
}

interface AdaptiveGridProps {
  children: ReactNode;
  cols?: Partial<Record<ScreenSize, number>>;
  gap?: string;
  className?: string;
}

export function AdaptiveGrid({
  children,
  cols = { mobile: 1, tablet: 2, desktop: 3, kiosk: 4 },
  gap = 'var(--space-4)',
  className = '',
}: AdaptiveGridProps) {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isKiosk = useMediaQuery('(min-width: 1440px)');

  const getCols = () => {
    if (isMobile) return cols.mobile ?? 1;
    if (isTablet) return cols.tablet ?? 2;
    if (isKiosk) return cols.kiosk ?? 4;
    return cols.desktop ?? 3;
  };

  const gridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${getCols()}, 1fr)`,
    gap,
  };

  return (
    <div className={className} style={gridStyle}>
      {children}
    </div>
  );
}
