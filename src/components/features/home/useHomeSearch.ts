// components/features/home/useHomeSearch.ts
import { useCallback, useState } from 'react';

import { HOME_CONFIG } from '@/constants/home';

import type { FeaturedWine, HomeSearchState, TrendingWine } from '@ts/index';

import { wineDataService } from './wineDataService';

export const useHomeSearch = () => {
  const [searchState, setSearchState] = useState<HomeSearchState>({
    query: '',
    isSearching: false,
    results: [],
  });

  const performSearch = useCallback((query: string): (FeaturedWine | TrendingWine)[] => {
    if (!query.trim()) {
      return [];
    }
    return wineDataService.searchWines(query);
  }, []);

  const handleSearchChange = useCallback(
    (query: string) => {
      setSearchState(prev => ({ ...prev, query, isSearching: true }));

      // Debounce search
      const timeoutId = setTimeout(() => {
        const results = performSearch(query);
        setSearchState(prev => ({
          ...prev,
          results,
          isSearching: false,
        }));
      }, HOME_CONFIG.SEARCH_DEBOUNCE_DELAY);

      return () => clearTimeout(timeoutId);
    },
    [performSearch],
  );

  const clearSearch = useCallback(() => {
    setSearchState({
      query: '',
      isSearching: false,
      results: [],
    });
  }, []);

  return {
    searchState,
    handleSearchChange,
    clearSearch,
  };
};
