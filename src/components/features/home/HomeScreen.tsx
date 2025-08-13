// components/features/home/HomeScreen.tsx
import type { HomeScreenProps } from '@ts/index';

import { FeaturedWinesSection } from './FeaturedWinesSection';
import { GamificationSection } from './GamificationSection';
import { GuestReminder } from './GuestReminder';
import { HomeHeader } from './HomeHeader';
import { QuickScanCTA } from './QuickScanCTA';
import { TrendingWinesSection } from './TrendingWinesSection';
import { WineCategoriesSection } from './WineCategoriesSection';
import { useHomeActions } from './useHomeActions';
import { useHomeSearch } from './useHomeSearch';
import { useWineData } from './useWineData';

export function HomeScreen({ user }: HomeScreenProps) {
  const { searchState, handleSearchChange } = useHomeSearch();
  const { featuredWines, trendingWines, badges } = useWineData();
  const {
    handleWineClick,
    handleScanNow,
    handleProfileClick,
    handleAuthClick,
    handleCategoryClick,
  } = useHomeActions();

  return (
    <div className="min-h-screen bg-background">
      <HomeHeader
        user={user}
        searchQuery={searchState.query}
        onSearchChange={handleSearchChange}
        onProfileClick={handleProfileClick}
      />

      <div className="px-6 py-6 space-y-8">
        {user.isGuest && <GuestReminder onSignUpClick={handleAuthClick} />}

        <GamificationSection user={user} badges={badges} />

        <QuickScanCTA onScanClick={handleScanNow} />

        <FeaturedWinesSection wines={featuredWines} onWineClick={handleWineClick} />

        <TrendingWinesSection wines={trendingWines} onWineClick={handleWineClick} />

        <WineCategoriesSection onCategoryClick={handleCategoryClick} />
      </div>
    </div>
  );
}
