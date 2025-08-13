// components/favorites/FavoritesHeader.tsx
import { Edit3, Filter, Grid, Heart, List, Search, SortAsc, X } from 'lucide-react';

import type { FavoritesHeaderProps } from '@ts/index';

export function FavoritesHeader({
  isEditMode,
  favoriteWinesCount,
  searchQuery,
  onSearchChange,
  onToggleEditMode,
  onExitEditMode,
  viewMode,
  onViewModeChange,
  selectedCount,
  totalCount,
  onToggleSelectAll,
}: FavoritesHeaderProps) {
  return (
    <div className="bg-card shadow-sm px-6 py-4 border-b border-border">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {isEditMode ? 'Edit Favorites' : 'My Favorites'}
          </h1>
          <p className="text-muted-foreground">
            {isEditMode
              ? `Select items to remove from your collection`
              : `${favoriteWinesCount} wines saved`}
          </p>
        </div>
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isEditMode ? 'bg-wine-accent/10' : 'bg-red-100'
          }`}>
          {isEditMode ? (
            <Edit3 size={20} className="text-wine-accent" />
          ) : (
            <Heart size={20} className="text-red-500 fill-current" />
          )}
        </div>
      </div>

      {/* Search and filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Search your favorites..."
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {!isEditMode ? (
              <>
                <button className="wine-button wine-button--secondary text-sm px-3 py-1.5 rounded-md flex items-center">
                  <Filter size={16} className="mr-1" />
                  Filter
                </button>
                <button className="wine-button wine-button--secondary text-sm px-3 py-1.5 rounded-md flex items-center">
                  <SortAsc size={16} className="mr-1" />
                  Sort
                </button>
                {favoriteWinesCount > 0 && (
                  <button
                    onClick={onToggleEditMode}
                    className="wine-button wine-button--secondary text-sm px-3 py-1.5 rounded-md flex items-center">
                    <Edit3 size={16} className="mr-1" />
                    Edit
                  </button>
                )}
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={onToggleSelectAll}
                  className="wine-button wine-button--secondary text-sm px-3 py-1.5 rounded-md whitespace-nowrap">
                  {selectedCount === totalCount ? 'Deselect' : 'Select All'}
                </button>
                <button
                  onClick={onExitEditMode}
                  className="wine-button wine-button--secondary text-sm px-3 py-1.5 rounded-md flex items-center">
                  <X size={16} className="mr-1" />
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
            <button
              onClick={() => onViewModeChange('list')}
              className={`h-8 w-8 p-0 rounded ${viewMode === 'list' ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50'} flex items-center justify-center`}>
              <List size={16} />
            </button>
            <button
              onClick={() => onViewModeChange('grid')}
              className={`h-8 w-8 p-0 rounded ${viewMode === 'grid' ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50'} flex items-center justify-center`}>
              <Grid size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
