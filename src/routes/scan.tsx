import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { ScanScreen } from '../components/ScanScreen'
import type { Wine } from './__root'

function ScanComponent() {
  const navigate = useNavigate()

  const handleWineFound = (wine: Wine) => {
    // Update user stats
    const savedUser = localStorage.getItem('wine-buddy-user')
    if (savedUser) {
      const user = JSON.parse(savedUser)
      user.totalScans = (user.totalScans || 0) + 1
      user.streakCount = (user.streakCount || 0) + 1
      localStorage.setItem('wine-buddy-user', JSON.stringify(user))
    }

    // Navigate to wine details
    navigate({ to: '/wine/$id', params: { id: wine.id } })
  }

  const handleBack = () => {
    navigate({ to: '/' })
  }

  return <ScanScreen onWineFound={handleWineFound} onBack={handleBack} />
}

export const Route = createFileRoute('/scan')({
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
  component: ScanComponent,
})
