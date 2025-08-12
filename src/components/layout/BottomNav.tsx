import { useScreenSize } from '@hooks/useMediaQueries'
import { Link, useLocation } from '@tanstack/react-router'
import { Heart, Home, ScanLine, User, type LucideIcon } from 'lucide-react'

type ScreenSize = 'mobile' | 'tablet' | 'desktop' | 'kiosk'

type NavPath = '/' | '/scan' | '/favorites' | '/profile'

interface NavItem {
  path: NavPath
  icon: LucideIcon
  label: string
}

const navItems: readonly NavItem[] = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/scan', icon: ScanLine, label: 'Scan' },
  { path: '/favorites', icon: Heart, label: 'Favorites' },
  { path: '/profile', icon: User, label: 'Profile' },
] as const

export function BottomNav() {
  const location = useLocation()
  const screenSize = useScreenSize() as ScreenSize

  if (location.pathname === '/auth' || location.pathname === '/onboarding') {
    return null
  }

  const iconSize =
    screenSize === 'kiosk'
      ? 28
      : screenSize === 'desktop'
        ? 24
        : screenSize === 'tablet'
          ? 22
          : 20

  const isActive = (path: NavPath) =>
    location.pathname === path ||
    (path !== '/' && location.pathname.startsWith(path))

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 ${
        screenSize === 'kiosk'
          ? 'h-20'
          : screenSize === 'desktop'
            ? 'h-18'
            : 'h-16'
      }`}
      style={{
        height:
          screenSize === 'kiosk'
            ? '80px'
            : screenSize === 'desktop'
              ? '72px'
              : '64px',
      }}
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="flex items-center justify-around h-full px-4">
          {navItems.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center justify-center space-y-1 transition-colors duration-200 ${
                screenSize === 'kiosk' ? 'py-3 px-4' : 'py-2 px-3'
              } rounded-lg hover:bg-secondary`}
            >
              <Icon
                size={iconSize}
                className={`transition-colors duration-200 ${
                  isActive(path) ? 'text-wine-accent' : 'text-muted-foreground'
                }`}
              />
              <span
                className={`text-xs transition-colors duration-200 ${
                  isActive(path)
                    ? 'text-wine-accent font-medium'
                    : 'text-muted-foreground'
                } ${screenSize === 'kiosk' ? 'text-sm' : 'text-xs'}`}
              >
                {label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
