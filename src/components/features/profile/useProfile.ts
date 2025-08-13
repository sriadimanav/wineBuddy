// hooks/useProfile.ts
import { Camera, Heart, Star } from 'lucide-react';
import { useMemo } from 'react';

import type { ProfileStat, User } from '@ts/index';

export const useProfile = (user: User) => {
  const stats: ProfileStat[] = useMemo(
    () => [
      {
        label: 'Wines Scanned',
        value: user.totalScans?.toString() || '47',
        iconComponent: Camera,
        iconColor: 'text-purple-600',
      },
      {
        label: 'Favorites',
        value: user.favorites.length.toString(),
        iconComponent: Heart,
        iconColor: 'text-red-500',
      },
      {
        label: 'Reviews',
        value: '12',
        iconComponent: Star,
        iconColor: 'text-yellow-500',
      },
    ],
    [user.totalScans, user.favorites.length],
  );

  return {
    stats,
  };
};
