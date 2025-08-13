// hooks/useStarRating.tsx
import type { ReactNode } from 'react';

import { Star } from 'lucide-react';

export const useStarRating = () => {
  const renderStars = (rating: number): ReactNode[] => {
    const stars: ReactNode[] = [];
    const flooredRating = Math.floor(rating);

    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          size={12}
          className={i < flooredRating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
        />,
      );
    }
    return stars;
  };

  return { renderStars };
};
