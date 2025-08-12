import {
  createRootRoute,
  Link,
  Outlet,
  useLocation,
  useNavigate,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ArrowLeft, Wine } from 'lucide-react'
import * as React from 'react'
import { useScreenSize } from '../components/hooks/useMediaQueries'
import { BottomNav } from '../components/layout/BottomNav'
import { ResponsiveLayout } from '../components/layout/ResponsiveLayout'

export interface Wine {
  id: string
  name: string
  winery: string
  vintage: number
  region: string
  description: string
  grapeVariety: string[]
  color: string
  alcoholContent: number
  sugarContent: string
  taste: string[]
  aroma: string[]
  foodPairing: string[]
  rating: number
  reviews: number
  sommelierNotes: string
  image: string
  price?: number
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  favorites: string[]
  streakCount: number
  totalScans: number
  badges: string[]
  isGuest?: boolean
}

function RootComponent() {
  const location = useLocation()
  const navigate = useNavigate()
  const screenSize = useScreenSize()
  const [isLoading, setIsLoading] = React.useState(true)

  // Get user from localStorage
  const [user, setUser] = React.useState<User | null>(null)

  React.useEffect(() => {
    const savedUser = localStorage.getItem('wine-buddy-user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  // Determine if we should show navigation elements
  const hideNavRoutes = ['/onboarding', '/auth']
  const hideHeaderRoutes = ['/onboarding', '/auth', '/']
  const showHeader =
    user &&
    !hideHeaderRoutes.includes(location.pathname) &&
    (location.pathname.startsWith('/wine/') || location.pathname === '/faq')
  // ALWAYS show bottom nav except on onboarding and auth pages
  const showBottomNav = !isLoading && !hideNavRoutes.includes(location.pathname)

  const goBack = () => {
    navigate({ to: '/' })
  }

  const getHeaderTitle = () => {
    if (location.pathname === '/faq') return 'FAQ'
    if (location.pathname.startsWith('/wine/')) {
      return 'Wine Details'
    }
    return ''
  }

  // Remove inline styles, use Tailwind classes instead

  // Show loading while checking user state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-wine-accent">
          <Wine className="w-8 h-8 mb-2 mx-auto" />
          <p className="text-sm text-muted-foreground">Loading Wine Buddy...</p>
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-background)',
        paddingBottom: showBottomNav
          ? screenSize === 'kiosk'
            ? '80px'
            : '64px'
          : '0',
      }}
    >
      {/* Header */}
      {showHeader && (
        <div className="bg-card border-b border-border px-4 py-4 flex items-center sticky top-0 z-40 shadow-sm">
          <button
            onClick={goBack}
            className="p-2 rounded-lg hover:bg-secondary transition-colors flex items-center justify-center text-foreground mr-2"
          >
            <ArrowLeft size={screenSize === 'kiosk' ? 24 : 20} />
          </button>
          <h1
            className={`font-semibold text-foreground ${
              screenSize === 'kiosk' ? 'text-xl' : 'text-lg'
            }`}
          >
            {getHeaderTitle()}
          </h1>
        </div>
      )}

      {/* Main Content */}
      <ResponsiveLayout>
        <Outlet />
      </ResponsiveLayout>

      {/* Bottom Navigation - Only show when user is logged in and not on specific routes */}
      {showBottomNav && <BottomNav />}

      <TanStackRouterDevtools />
    </div>
  )
}

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col bg-background">
        <div className="text-center">
          <div className="mb-6">
            <Wine className="w-16 h-16 text-wine-accent mx-auto mb-4" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-4">
            404 - Page Not Found
          </h1>
          <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
            The wine you're looking for seems to have been uncorked! Let's get
            you back to discovering amazing wines.
          </p>
          <Link
            to="/"
            className="inline-flex items-center bg-wine-accent hover:bg-wine-light text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-lg hover:shadow-xl"
          >
            <Wine className="w-4 h-4 mr-2" />
            Back to Wine Discovery
          </Link>
        </div>
      </div>
    )
  },
})
