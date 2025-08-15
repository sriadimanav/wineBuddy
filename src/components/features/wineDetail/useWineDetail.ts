// hooks/useWineDetail.ts
import { useState } from 'react';

import { authService } from '@components/features/auth/authService';

import type { FeaturedWine, TabType, User } from '@ts/index';

export const useWineDetail = (wine: FeaturedWine | null, user: User | null) => {
  // ✅ Safe initialization - only check favorites if both wine and user exist
  const [isFavorite, setIsFavorite] = useState(() => {
    if (!wine || !user) return false;
    return user.favorites.includes(wine.id);
  });

  const [showFullDescription, setShowFullDescription] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const toggleFavorite = () => {
    // ✅ Early return if either wine or user is null
    if (!wine || !user) {
      console.warn('Cannot toggle favorite: wine or user is null');
      return user; // Return current user or null
    }

    const updatedFavorites = isFavorite
      ? user.favorites.filter(id => id !== wine.id)
      : [...user.favorites, wine.id];

    const updatedUser = { ...user, favorites: updatedFavorites };
    authService.saveUser(updatedUser);
    setIsFavorite(!isFavorite);

    return updatedUser;
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return {
    isFavorite,
    showFullDescription,
    activeTab,
    setActiveTab,
    toggleFavorite,
    toggleDescription,
  };
};
