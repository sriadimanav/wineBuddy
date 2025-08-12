import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';

import { FAQScreen } from '../components/FAQScreen';

function FAQComponent() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate({ to: '/' });
  };

  return <FAQScreen onBack={handleBack} />;
}

export const Route = createFileRoute('/faq')({
  beforeLoad: () => {
    const hasSeenOnboarding = localStorage.getItem('wine-buddy-onboarding-complete');
    const savedUser = localStorage.getItem('wine-buddy-user');

    if (!hasSeenOnboarding) {
      throw redirect({
        to: '/onboarding',
      });
    }

    if (!savedUser) {
      throw redirect({
        to: '/auth',
      });
    }
  },
  component: FAQComponent,
});
