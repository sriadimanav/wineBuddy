import { Link, useLocation } from '@tanstack/react-router'
import { Home, ScanLine, Heart, User } from 'lucide-react'

import { useScreenSize } from '@hooks/useMediaQuery'

interface NavItem {
  path: string
  icon: React.ComponentType<{ className?: string }>
  label: string
}

const navItems: NavItem[] = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/scan', icon: ScanLine, label: 'Scan' },
  { path: '/favorites', icon: Heart, label: 'Favorites' },
  { path: '/profile', icon: User, label: 'Profile' },
]

export function BottomNav() {
  const location = useLocation()
  const screenSize = useScreenSize()

  // Hide bottom nav on auth and onboarding screens
  if (location.pathname === '/auth' || location.pathname === '/onboarding') {
    return null
  }

  const getIconSize = () => {
    switch (screenSize) {
      case 'kiosk':
        return 28
      case 'desktop':
        return 24
      case 'tablet':
        return 22
      default:
        return 20
    }
  }

  const iconSize = getIconSize()

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
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive =
              location.pathname === item.path ||
              (item.path !== '/' && location.pathname.startsWith(item.path))

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center space-y-1 transition-colors duration-200 ${
                  screenSize === 'kiosk' ? 'py-3 px-4' : 'py-2 px-3'
                } rounded-lg hover:bg-secondary`}
              >
                <Icon
                  size={iconSize}
                  className={`transition-colors duration-200 ${
                    isActive ? 'text-wine-accent' : 'text-muted-foreground'
                  }`}
                />
                <span
                  className={`text-xs transition-colors duration-200 ${
                    isActive
                      ? 'text-wine-accent font-medium'
                      : 'text-muted-foreground'
                  } ${screenSize === 'kiosk' ? 'text-sm' : 'text-xs'}`}
                >
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
