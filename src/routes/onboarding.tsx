// routes/onboarding.tsx
import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { authService } from '@components/features/auth/authService';
import { OnboardingScreen } from '@components/features/onboarding/OnboardingScreen';

function OnboardingComponent() {
  const navigate = useNavigate();

  const handleComplete = () => {
    // Mark onboarding as complete using auth service
    authService.setOnboardingComplete();

    // Navigate to auth screen for user to choose sign up or continue as guest
    navigate({ to: '/auth' });
  };

  return <OnboardingScreen onComplete={handleComplete} />;
}

export const Route = createFileRoute('/onboarding')({
  component: OnboardingComponent,
});
