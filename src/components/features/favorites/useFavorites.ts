// hooks/useFavorites.ts
import { useMemo, useState } from 'react';

import type { User } from '@/ts/user';
import type { FeaturedWine } from '@/ts/wine';
import type { ViewMode } from '@ts/index';

export const useFavorites = (user: User, allWines: readonly FeaturedWine[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  // Filter favorites based on user's favorite IDs
  const favoriteWines = useMemo(() => {
    return allWines.filter(wine => user.favorites.includes(wine.id));
  }, [allWines, user.favorites]);

  // Filter wines based on search query
  const filteredWines = useMemo(() => {
    if (!searchQuery.trim()) return favoriteWines;

    const query = searchQuery.toLowerCase();
    return favoriteWines.filter(
      wine =>
        wine.name.toLowerCase().includes(query) ||
        wine.winery.toLowerCase().includes(query) ||
        wine.region.toLowerCase().includes(query),
    );
  }, [favoriteWines, searchQuery]);

  const toggleItemSelection = (wineId: string) => {
    const newSelectedItems = new Set(selectedItems);
    if (newSelectedItems.has(wineId)) {
      newSelectedItems.delete(wineId);
    } else {
      newSelectedItems.add(wineId);
    }
    setSelectedItems(newSelectedItems);
  };

  const toggleSelectAll = () => {
    if (selectedItems.size === filteredWines.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(filteredWines.map(wine => wine.id)));
    }
  };

  const exitEditMode = () => {
    setIsEditMode(false);
    setSelectedItems(new Set());
  };

  const handleDeleteSelected = () => {
    if (selectedItems.size === 0) return;

    const itemText = selectedItems.size === 1 ? 'item' : 'items';
    if (
      confirm(
        `Are you sure you want to remove ${selectedItems.size} ${itemText} from your favorites? This action cannot be undone.`,
      )
    ) {
      // Here you would typically update the user's favorites
      console.log('Deleting selected items:', Array.from(selectedItems));
      setSelectedItems(new Set());
      setIsEditMode(false);
    }
  };

  return {
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
  };
};
