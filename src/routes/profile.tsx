import { ProfileScreen } from '@components/ProfileScreen'
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'

function ProfileComponent() {
  const navigate = useNavigate()

  // Get user from localStorage (guaranteed to exist due to beforeLoad)
  const savedUser = localStorage.getItem('wine-buddy-user')
  const user = savedUser ? JSON.parse(savedUser) : null

  const handleLogout = () => {
    localStorage.removeItem('wine-buddy-user')
    navigate({ to: '/auth' })
  }

  if (!user) {
    return null // This shouldn't happen due to beforeLoad
  }

  return <ProfileScreen user={user} onLogout={handleLogout} />
}

export const Route = createFileRoute('/profile')({
  beforeLoad: () => {
    const hasSeenOnboarding = localStorage.getItem(
      'wine-buddy-onboarding-complete',
    )
    const savedUser = localStorage.getItem('wine-buddy-user')

    if (!hasSeenOnboarding) {
      throw redirect({
        to: '/onboarding',
      })
    }

    if (!savedUser) {
      throw redirect({
        to: '/auth',
      })
    }
  },
  component: ProfileComponent,
})
