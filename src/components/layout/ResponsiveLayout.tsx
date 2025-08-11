import { useMediaQuery } from '@hooks/useMediaQuery'

interface ResponsiveLayoutProps {
  children: React.ReactNode
  className?: string
}

export function ResponsiveLayout({
  children,
  className = '',
}: ResponsiveLayoutProps) {
  const isMobile = useMediaQuery('(max-width: 767px)')
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)')
  const isKiosk = useMediaQuery('(min-width: 1440px)')

  const getContainerClass = () => {
    if (isMobile) return 'container-mobile'
    if (isTablet) return 'container-tablet'
    if (isKiosk) return 'container-kiosk'
    return 'container-desktop'
  }

  return <div className={`${getContainerClass()} ${className}`}>{children}</div>
}

interface AdaptiveGridProps {
  children: React.ReactNode
  cols?: {
    mobile?: number
    tablet?: number
    desktop?: number
    kiosk?: number
  }
  gap?: string
  className?: string
}

export function AdaptiveGrid({
  children,
  cols = { mobile: 1, tablet: 2, desktop: 3, kiosk: 4 },
  gap = 'var(--space-4)',
  className = '',
}: AdaptiveGridProps) {
  const isMobile = useMediaQuery('(max-width: 767px)')
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)')
  const isKiosk = useMediaQuery('(min-width: 1440px)')

  const getGridCols = () => {
    if (isMobile) return cols.mobile || 1
    if (isTablet) return cols.tablet || 2
    if (isKiosk) return cols.kiosk || 4
    return cols.desktop || 3
  }

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${getGridCols()}, 1fr)`,
    gap: gap,
  }

  return (
    <div className={className} style={gridStyle}>
      {children}
    </div>
  )
}
