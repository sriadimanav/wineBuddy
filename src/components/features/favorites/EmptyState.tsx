// components/favorites/EmptyState.tsx
import { Heart, Search } from 'lucide-react';

import type { EmptyStateProps } from '@ts/index';

export function EmptyState({ hasNoFavorites, onDiscoverWines }: EmptyStateProps) {
  if (hasNoFavorites) {
    return (
      <div className="text-center py-12 flex flex-col items-center justify-center h-full">
        <Heart size={64} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg text-muted-foreground mb-2">No favorites yet</h3>
        <p className="text-muted-foreground mb-6">
          Start exploring wines and save your favorites here
        </p>
        <button
          onClick={onDiscoverWines}
          className="bg-wine-accent hover:bg-wine-light text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200 shadow-lg">
          Discover Wines
        </button>
      </div>
    );
  }

  return (
    <div className="text-center py-12 flex flex-col items-center justify-center h-full">
      <Search size={64} className="text-muted-foreground mx-auto mb-4" />
      <h3 className="text-lg text-muted-foreground mb-2">No results found</h3>
      <p className="text-muted-foreground">Try adjusting your search terms</p>
    </div>
  );
}
