import { createFileRoute, redirect } from '@tanstack/react-router'
import { HomeScreen } from '../components/features/home/HomeScreen'
//import type { User } from './__root'

function HomeComponent() {
  // Get user from localStorage and ensure they have favorites data
  const savedUser = localStorage.getItem('wine-buddy-user')
  let user = savedUser ? JSON.parse(savedUser) : null

  // Migration: Add sample favorites for existing users who don't have any
  if (user && (!user.favorites || user.favorites.length === 0)) {
    user.favorites = user.isGuest
      ? ['1', '2', '3', '5']
      : ['1', '3', '4', 'scan-1']
    user.streakCount = user.streakCount || (user.isGuest ? 3 : 2)
    user.totalScans = user.totalScans || (user.isGuest ? 12 : 8)
    user.badges = user.badges || ['first-scan', 'wine-explorer']

    // Save updated user data
    localStorage.setItem('wine-buddy-user', JSON.stringify(user))
  }

  // This should never happen since beforeLoad handles the routing logic
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-wine-accent text-center">
          <div className="w-8 h-8 mb-2 mx-auto">🍷</div>
          <p className="text-sm text-muted-foreground">
            Setting up your wine journey...
          </p>
        </div>
      </div>
    )
  }

  return <HomeScreen user={user} />
}

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    // Check routing logic in beforeLoad
    const hasSeenOnboarding = localStorage.getItem(
      'wine-buddy-onboarding-complete',
    )
    const savedUser = localStorage.getItem('wine-buddy-user')

    // First time user - needs onboarding
    if (!hasSeenOnboarding) {
      throw redirect({
        to: '/onboarding',
      })
    }

    // Onboarding complete but no user - needs auth
    if (hasSeenOnboarding && !savedUser) {
      throw redirect({
        to: '/auth',
      })
    }

    // Valid user exists, continue to home
    return
  },
  component: HomeComponent,
})
