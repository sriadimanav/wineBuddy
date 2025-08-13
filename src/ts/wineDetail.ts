// types/wineDetail.ts
import type { User } from './user';
import type { FeaturedWine } from './wine';

export interface WineDetailScreenProps {
  wine: FeaturedWine;
  user: User;
  onBack: () => void;
  onUpdateUser: (user: User) => void;
}

export interface WineHeroProps {
  wine: FeaturedWine;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  screenSize: string;
}

export interface WineInfoSectionProps {
  wine: FeaturedWine;
  screenSize: string;
}

export interface WineTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export interface WineTabContentProps {
  wine: FeaturedWine;
  activeTab: TabType;
}

export interface WineActionsProps {
  wine: FeaturedWine;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  screenSize: string;
}

export interface TastingNotesProps {
  wine: FeaturedWine;
}

export interface FoodPairingProps {
  wine: FeaturedWine;
}

export interface WineOverviewProps {
  wine: FeaturedWine;
}

export type TabType = 'overview' | 'tasting' | 'pairing';
