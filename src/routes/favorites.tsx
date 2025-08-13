// routes/favorites.tsx
import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { requireAuth, requireOnboarding } from '@components/features/auth/authGuards';
import { authService } from '@components/features/auth/authService';
import { FavoritesScreen } from '@components/features/favorites/FavoritesScreen';

import type { Wine } from '@ts/index';

function FavoritesComponent() {
  const navigate = useNavigate();

  // Get user from auth service instead of direct localStorage
  const user = authService.getUser();

  const handleWineSelect = (wine: Wine) => {
    navigate({ to: '/wine/$id', params: { id: wine.id } });
  };

  if (!user) {
    return null; // This will be handled by beforeLoad redirect
  }

  return <FavoritesScreen user={user} onWineSelect={handleWineSelect} />;
}

export const Route = createFileRoute('/favorites')({
  beforeLoad: () => {
    requireOnboarding();
    requireAuth();
  },
  component: FavoritesComponent,
});
