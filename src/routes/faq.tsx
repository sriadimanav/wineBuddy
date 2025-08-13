// routes/faq.tsx
import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { requireAuth, requireOnboarding } from '@components/features/auth/authGuards';
import { FAQScreen } from '@components/features/faq/FAQScreen';

function FAQComponent() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate({ to: '/' });
  };

  return <FAQScreen onBack={handleBack} />;
}

export const Route = createFileRoute('/faq')({
  beforeLoad: () => {
    requireOnboarding();
    requireAuth();
  },
  component: FAQComponent,
});
