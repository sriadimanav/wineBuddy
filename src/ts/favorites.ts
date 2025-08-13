// types/favorites.ts
import type { FeaturedWine, User } from '@ts/index';

export interface FavoritesScreenProps {
  user: User;
  onWineSelect: (wine: FeaturedWine) => void;
}

export interface WineCardProps {
  wine: FeaturedWine;
  isEditMode: boolean;
  isSelected: boolean;
  onWineClick: (wine: FeaturedWine) => void;
}

export interface WineGridCardProps {
  wine: FeaturedWine;
  isEditMode: boolean;
  isSelected: boolean;
  onWineClick: (wine: FeaturedWine) => void;
}

export interface FavoritesHeaderProps {
  isEditMode: boolean;
  favoriteWinesCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onToggleEditMode: () => void;
  onExitEditMode: () => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  selectedCount: number;
  totalCount: number;
  onToggleSelectAll: () => void;
}

export interface EditModeActionBarProps {
  selectedCount: number;
  onDeleteSelected: () => void;
  screenSize: string;
}

export interface EmptyStateProps {
  hasNoFavorites: boolean;
  onDiscoverWines: () => void;
}

export type ViewMode = 'grid' | 'list';
export type SortOption = 'name' | 'price' | 'rating' | 'vintage';
