// routes/scan.tsx
import { requireAuth, requireOnboarding } from '@components/features/auth/authGuards';
import { authService } from '@components/features/auth/authService';
import { ScanScreen } from '@components/features/scan/ScanScreen';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import type { Wine } from '@ts/index';

function ScanComponent() {
  const navigate = useNavigate();

  // Get user from auth service
  const user = authService.getUser();

  const handleWineFound = (wine: Wine) => {
    // Update user stats
    if (user) {
      const updatedUser = {
        ...user,
        totalScans: (user.totalScans || 0) + 1,
        streakCount: (user.streakCount || 0) + 1,
      };
      authService.saveUser(updatedUser);
    }

    // Navigate to wine details
    navigate({ to: '/wine/$id', params: { id: wine.id } });
  };

  const handleBack = () => {
    navigate({ to: '/' });
  };

  if (!user) {
    return null; // This shouldn't happen due to beforeLoad
  }

  return <ScanScreen onWineFound={handleWineFound} onBack={handleBack} />;
}

export const Route = createFileRoute('/scan')({
  beforeLoad: () => {
    requireOnboarding();
    requireAuth();
  },
  component: ScanComponent,
});
