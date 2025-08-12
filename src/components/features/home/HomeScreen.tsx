import { useState } from 'react';

import type { User } from '@ts/user.ts';

import { FeaturedWinesSection } from './FeaturedWinesSection';
import { GamificationSection } from './GamificationSection.tsx';
import { GuestReminder } from './GuestReminder.tsx';
import { HomeHeader } from './HomeHeader.tsx';
import { QuickScanCTA } from './QuickScanCTA.tsx';
import { TrendingWinesSection } from './TrendingWinesSection';
import { WineCategoriesSection } from './WineCategoriesSection';
import { useUserActions } from './useUserActions';
import { useWineData } from './useWineData';

interface HomeScreenProps {
  user: User;
}

export function HomeScreen({ user }: HomeScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const { featuredWines, trendingWines, badges } = useWineData();
  const {
    handleWineClick,
    handleScanNow,
    handleProfileClick,
    handleAuthClick,
    handleCategoryClick,
  } = useUserActions();

  return (
    <div className="min-h-screen bg-background">
      <HomeHeader
        user={user}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
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
