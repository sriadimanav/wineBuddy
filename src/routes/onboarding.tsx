import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { OnboardingScreen } from '@components/OnboardingScreen'

function OnboardingComponent() {
  const navigate = useNavigate()

  const handleComplete = () => {
    // Mark onboarding as complete
    localStorage.setItem('wine-buddy-onboarding-complete', 'true')

    // Navigate to auth screen for user to choose sign up or continue as guest
    navigate({ to: '/auth' })
  }

  return <OnboardingScreen onComplete={handleComplete} />
}

export const Route = createFileRoute('/onboarding')({
  component: OnboardingComponent,
})
