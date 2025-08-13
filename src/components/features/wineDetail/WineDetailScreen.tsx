// components/WineDetailScreen.tsx
import { Wine } from 'lucide-react';

import { WINE_DATABASE } from '@/constants/wineDatabase';
import { authService } from '@components/features/auth/authService';
import { useScreenSize } from '@components/hooks/useMediaQueries';
import { useNavigate } from '@tanstack/react-router';

import { FoodPairing } from './FoodPairing';
import { TastingNotes } from './TastingNotes';
import { WineActions } from './WineActions';
import { WineHero } from './WineHero';
import { WineOverview } from './WineOverview';
import { WineTabs } from './WineTabs';
import { useWineDetail } from './useWineDetail';

interface WineDetailScreenProps {
  id: string;
}

function WineNotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <Wine className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Wine Not Found</h2>
        <p className="text-gray-600 mb-4">The wine you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate({ to: '/' })}
          className="bg-wine-accent text-white px-6 py-3 rounded-lg hover:bg-wine-light transition-colors">
          Go Back Home
        </button>
      </div>
    </div>
  );
}

export function WineDetailScreen({ id }: WineDetailScreenProps) {
  const screenSize = useScreenSize();

  // Get user from auth service
  const user = authService.getUser();

  if (!user) {
    return null; // Will be handled by route guard
  }

  const wine = WINE_DATABASE[id];

  if (!wine) {
    return <WineNotFound />;
  }

  const { isFavorite, activeTab, setActiveTab, toggleFavorite } = useWineDetail(wine, user);

  const handleToggleFavorite = () => {
    toggleFavorite();
    // Force re-render by updating localStorage and reloading
    // In a real app, you'd use proper state management
    window.location.reload();
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <WineOverview wine={wine} />;
      case 'tasting':
        return <TastingNotes wine={wine} />;
      case 'pairing':
        return <FoodPairing wine={wine} />;
      default:
        return <WineOverview wine={wine} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <WineHero
        wine={wine}
        isFavorite={isFavorite}
        onToggleFavorite={handleToggleFavorite}
        screenSize={screenSize}
      />

      {/* Tabs */}
      <WineTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Content */}
      <div className="px-6 py-6">{renderTabContent()}</div>

      {/* Bottom Actions */}
      <WineActions
        wine={wine}
        isFavorite={isFavorite}
        onToggleFavorite={handleToggleFavorite}
        screenSize={screenSize}
      />

      {/* Spacer for fixed bottom bars */}
      <div className="h-32"></div>
    </div>
  );
}
