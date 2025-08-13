// components/features/home/useHomeActions.ts
import { useNavigate } from '@tanstack/react-router';
import type { HomeActions, WineCategory } from '@ts/home';

export const useHomeActions = (): HomeActions => {
  const navigate = useNavigate();

  const handleWineClick = (wineId: string) => {
    navigate({ to: '/wine/$id', params: { id: wineId } });
  };

  const handleScanNow = () => {
    navigate({ to: '/scan' });
  };

  const handleProfileClick = () => {
    navigate({ to: '/profile' });
  };

  const handleAuthClick = () => {
    navigate({ to: '/auth' });
  };

  const handleCategoryClick = (category: WineCategory) => {
    // Future: Navigate to category page
    alert(`Exploring ${category.name} - Feature coming soon!`);
  };

  return {
    handleWineClick,
    handleScanNow,
    handleProfileClick,
    handleAuthClick,
    handleCategoryClick,
  };
};
