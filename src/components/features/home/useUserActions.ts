import { useNavigate } from '@tanstack/react-router';

export const useUserActions = () => {
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

  type WineCategory = 'Red Wines' | 'White Wines' | 'Sparkling Wines' | 'Rosé Wines';

  const handleCategoryClick = (category: WineCategory) => {
    // Future: Navigate to category page
    alert(`Exploring ${category} - Feature coming soon!`);
  };

  return {
    handleWineClick,
    handleScanNow,
    handleProfileClick,
    handleAuthClick,
    handleCategoryClick,
  };
};
