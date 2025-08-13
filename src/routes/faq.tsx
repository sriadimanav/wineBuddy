// routes/faq.tsx
import { requireAuth, requireOnboarding } from '@components/features/auth/authGuards';
import { FAQScreen } from '@components/features/faq/FAQScreen';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

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
