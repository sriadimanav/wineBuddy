// components/FavoritesScreen.tsx
import { useNavigate } from '@tanstack/react-router';

import { MOCK_FAVORITES_DATA } from '@/constants/favorites';

import { useScreenSize } from '@components/hooks/useMediaQueries';

import type { FavoritesScreenProps, FeaturedWine } from '@ts/index';

import { EditModeActionBar } from './EditModeActionBar';
import { EmptyState } from './EmptyState';
import { FavoritesHeader } from './FavoritesHeader';
import { useFavorites } from './useFavorites';
import { WineCard } from './WineCard';
import { WineGridCard } from './WineGridCard';

export function FavoritesScreen({ user, onWineSelect }: FavoritesScreenProps) {
  const navigate = useNavigate();
  const screenSize = useScreenSize();

  const {
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
    isEditMode,
    setIsEditMode,
    selectedItems,
    favoriteWines,
    filteredWines,
    toggleItemSelection,
    toggleSelectAll,
    exitEditMode,
    handleDeleteSelected,
  } = useFavorites(user, MOCK_FAVORITES_DATA);

  const handleWineClick = (wine: FeaturedWine) => {
    if (isEditMode) {
      toggleItemSelection(wine.id);
    } else {
      onWineSelect(wine);
    }
  };

  const handleDiscoverWines = () => {
    navigate({ to: '/' });
  };

  const hasNoFavorites = favoriteWines.length === 0;
  const hasNoSearchResults = !hasNoFavorites && filteredWines.length === 0;

  return (
    <div className="bg-background">
      {/* Header */}
      <FavoritesHeader
        isEditMode={isEditMode}
        favoriteWinesCount={favoriteWines.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onToggleEditMode={() => setIsEditMode(true)}
        onExitEditMode={exitEditMode}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        selectedCount={selectedItems.size}
        totalCount={filteredWines.length}
        onToggleSelectAll={toggleSelectAll}
      />

      {/* Content */}
      <div
        className="px-6 py-6"
        style={{
          minHeight: screenSize === 'kiosk' ? 'calc(100vh - 280px)' : 'calc(100vh - 240px)',
          maxHeight: screenSize === 'kiosk' ? 'calc(100vh - 280px)' : 'calc(100vh - 240px)',
          overflowY: 'auto',
        }}>
        {hasNoFavorites || hasNoSearchResults ? (
          <EmptyState hasNoFavorites={hasNoFavorites} onDiscoverWines={handleDiscoverWines} />
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-2 gap-4' : 'space-y-4'}>
            {filteredWines.map(wine =>
              viewMode === 'grid' ? (
                <WineGridCard
                  key={wine.id}
                  wine={wine}
                  isEditMode={isEditMode}
                  isSelected={selectedItems.has(wine.id)}
                  onWineClick={handleWineClick}
                />
              ) : (
                <WineCard
                  key={wine.id}
                  wine={wine}
                  isEditMode={isEditMode}
                  isSelected={selectedItems.has(wine.id)}
                  onWineClick={handleWineClick}
                />
              ),
            )}
          </div>
        )}
      </div>

      {/* Edit Mode Action Bar */}
      {isEditMode && (
        <EditModeActionBar
          selectedCount={selectedItems.size}
          onDeleteSelected={handleDeleteSelected}
          screenSize={screenSize}
        />
      )}
    </div>
  );
}
