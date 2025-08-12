import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'

import { AuthScreen } from '@components/AuthScreen'
import type { User } from './__root'

function AuthComponent() {
  const navigate = useNavigate()

  const handleLogin = async (user: User) => {
    // Add sample data for new users
    const userWithSamples: User = {
      ...user,
      favorites:
        user.favorites.length > 0 ? user.favorites : ['1', '3', '4', 'scan-1'], // Sample favorites
      streakCount: user.streakCount > 0 ? user.streakCount : 2,
      totalScans: user.totalScans > 0 ? user.totalScans : 8,
      badges:
        user.badges.length > 0 ? user.badges : ['first-scan', 'wine-explorer'],
    }

    // Save to localStorage
    localStorage.setItem('wine-buddy-user', JSON.stringify(userWithSamples))

    // Navigate to home
    navigate({ to: '/' })
  }

  return <AuthScreen onLogin={handleLogin} />
}

export const Route = createFileRoute('/auth')({
  beforeLoad: () => {
    const hasSeenOnboarding = localStorage.getItem(
      'wine-buddy-onboarding-complete',
    )
    const savedUser = localStorage.getItem('wine-buddy-user')

    // If user hasn't seen onboarding, redirect there first
    if (!hasSeenOnboarding) {
      throw redirect({
        to: '/onboarding',
      })
    }

    // If already authenticated, redirect to home
    if (savedUser) {
      throw redirect({
        to: '/',
      })
    }
  },
  component: AuthComponent,
})
