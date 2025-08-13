// routes/profile.tsx
import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { requireAuth, requireOnboarding } from '@components/features/auth/authGuards';
import { authService } from '@components/features/auth/authService';
import { ProfileScreen } from '@components/features/profile/ProfileScreen';

function ProfileComponent() {
  const navigate = useNavigate();

  // Get user from auth service
  const user = authService.getUser();

  const handleLogout = () => {
    authService.clearUser();
    navigate({ to: '/auth' });
  };

  if (!user) {
    return null; // This shouldn't happen due to beforeLoad
  }

  return <ProfileScreen user={user} onLogout={handleLogout} />;
}

export const Route = createFileRoute('/profile')({
  beforeLoad: () => {
    requireOnboarding();
    requireAuth();
  },
  component: ProfileComponent,
});
