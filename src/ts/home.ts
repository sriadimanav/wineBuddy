// types/home.ts
import type { Badge, FeaturedWine, TrendingWine, User } from '@ts/index';

export interface HomeScreenProps {
  user: User;
}

export interface HomeHeaderProps {
  user: User;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onProfileClick: () => void;
}

export interface FeaturedWinesSectionProps {
  wines: FeaturedWine[];
  onWineClick: (wineId: string) => void;
}

export interface TrendingWinesSectionProps {
  wines: TrendingWine[];
  onWineClick: (wineId: string) => void;
}

export interface GamificationSectionProps {
  user: User;
  badges: Badge[];
}

export interface QuickScanCTAProps {
  onScanClick: () => void;
}

export interface GuestReminderProps {
  onSignUpClick: () => void;
}

export interface WineCategoriesSectionProps {
  onCategoryClick: (category: WineCategory) => void;
}

export interface HomeActions {
  handleWineClick: (wineId: string) => void;
  handleScanNow: () => void;
  handleProfileClick: () => void;
  handleAuthClick: () => void;
  handleCategoryClick: (category: WineCategory) => void;
}

export interface WineDataState {
  featuredWines: FeaturedWine[];
  trendingWines: TrendingWine[];
  badges: Badge[];
  loading: boolean;
  error: string | null;
}

export interface UseWineDataReturn extends WineDataState {
  refreshData: () => Promise<void>;
  searchWines: (query: string) => (FeaturedWine | TrendingWine)[];
  getWinesByCategory: (category: string) => (FeaturedWine | TrendingWine)[];
  getWineById: (id: string) => FeaturedWine | TrendingWine | undefined;
  unlockBadge: (badgeId: string) => void;
  updateBadgeProgress: (badgeId: string, progress: number) => void;
}

export interface WineCategory {
  id: string;
  name: string;
  description: string;
  bgColor: string;
  borderColor: string;
  iconBgColor: string;
  onClickValue: WineCategoryType;
}

export type WineCategoryType = 'Red Wines' | 'White Wines' | 'Sparkling Wines' | 'Rosé Wines';

export interface HomeSearchState {
  query: string;
  isSearching: boolean;
  results: (FeaturedWine | TrendingWine)[];
}
