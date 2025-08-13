// hooks/useWineDetail.ts
import { useState } from 'react';

import { authService } from '@components/features/auth/authService';

import type { FeaturedWine, TabType, User } from '@ts/index';

export const useWineDetail = (wine: FeaturedWine, user: User) => {
  const [isFavorite, setIsFavorite] = useState(user.favorites.includes(wine.id));
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const toggleFavorite = () => {
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
