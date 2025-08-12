import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';

import { FavoritesScreen } from '../components/FavoritesScreen';
import type { Wine } from './__root';

function FavoritesComponent() {
  const navigate = useNavigate();

  // Get user from localStorage
  const savedUser = localStorage.getItem('wine-buddy-user');
  const user = savedUser ? JSON.parse(savedUser) : null;

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
  component: FavoritesComponent,
});
