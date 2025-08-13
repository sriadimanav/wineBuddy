import { useCallback, useEffect, useState } from 'react';

import type { Badge, FeaturedWine, TrendingWine } from '@ts/index';

import { wineDataService } from './wineDataService';

interface WineDataState {
  featuredWines: FeaturedWine[];
  trendingWines: TrendingWine[];
  badges: Badge[];
  loading: boolean;
  error: string | null;
}

interface UseWineDataReturn extends WineDataState {
  // Actions
  refreshData: () => Promise<void>;
  searchWines: (query: string) => (FeaturedWine | TrendingWine)[];
  getWinesByCategory: (category: string) => (FeaturedWine | TrendingWine)[];
  getWineById: (id: string) => FeaturedWine | TrendingWine | undefined;
  unlockBadge: (badgeId: string) => void;
  updateBadgeProgress: (badgeId: string, progress: number) => void;
}

export function useWineData(): UseWineDataReturn {
  const [data, setData] = useState<WineDataState>({
    featuredWines: [],
    trendingWines: [],
    badges: [],
    loading: true,
    error: null,
  });

  const loadWineData = async () => {
    try {
      setData(prev => ({ ...prev, loading: true, error: null }));

      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Load data from service
      const featuredWines = wineDataService.getFeaturedWines();
      const trendingWines = wineDataService.getTrendingWines();
      const badges = wineDataService.getBadges();

      setData({
        featuredWines,
        trendingWines,
        badges,
        loading: false,
        error: null,
      });
    } catch (error) {
      setData(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to load wine data',
      }));
    }
  };

  useEffect(() => {
    loadWineData();
  }, []);

  // Action methods
  const refreshData = useCallback(async () => {
    await loadWineData();
  }, []);

  const searchWines = useCallback((query: string) => {
    return wineDataService.searchWines(query);
  }, []);

  const getWinesByCategory = useCallback((category: string) => {
    return wineDataService.getWinesByCategory(category);
  }, []);

  const getWineById = useCallback((id: string) => {
    return wineDataService.getWineById(id);
  }, []);

  const unlockBadge = useCallback((badgeId: string) => {
    setData(prev => ({
      ...prev,
      badges: prev.badges.map(badge =>
        badge.id === badgeId ? { ...badge, unlocked: true } : badge,
      ),
    }));
  }, []);

  const updateBadgeProgress = useCallback((badgeId: string, progress: number) => {
    setData(prev => ({
      ...prev,
      badges: prev.badges.map(badge =>
        badge.id === badgeId
          ? {
              ...badge,
              progress: Math.min(progress, badge.maxProgress || progress),
              unlocked: progress >= (badge.maxProgress || progress),
            }
          : badge,
      ),
    }));
  }, []);

  return {
    ...data,
    refreshData,
    searchWines,
    getWinesByCategory,
    getWineById,
    unlockBadge,
    updateBadgeProgress,
  };
}
