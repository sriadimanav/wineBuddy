// components/favorites/WineCard.tsx
import { Check } from 'lucide-react';

import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

import type { WineCardProps } from '@ts/index';

import { useStarRating } from './useStarRating';

export function WineCard({ wine, isEditMode, isSelected, onWineClick }: WineCardProps) {
  const { renderStars } = useStarRating();

  return (
    <div
      onClick={() => onWineClick(wine)}
      className={`bg-card rounded-xl p-4 shadow-sm border border-border cursor-pointer hover:shadow-md transition-all ${
        isEditMode && isSelected ? 'ring-2 ring-wine-accent bg-wine-accent/5' : ''
      }`}>
      <div className="flex space-x-4">
        {isEditMode && (
          <div className="flex items-center justify-center flex-shrink-0">
            <div
              className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                isSelected
                  ? 'bg-wine-accent border-wine-accent'
                  : 'border-gray-300 hover:border-wine-accent'
              }`}>
              {isSelected && <Check size={12} className="text-white" />}
            </div>
          </div>
        )}
        <ImageWithFallback
          src={wine.image}
          alt={wine.name}
          className="w-16 h-20 object-cover rounded-lg flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground truncate">{wine.name}</h3>
              <p className="text-sm text-muted-foreground truncate">{wine.winery}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {wine.region} • {wine.vintage}
              </p>
            </div>
            {wine.price && (
              <div className="text-right ml-2">
                <p className="font-semibold text-foreground">${wine.price}</p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center space-x-1">
              {renderStars(wine.rating)}
              <span className="text-xs text-muted-foreground ml-1">{wine.rating}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {wine.grapeVariety.slice(0, 1).map(grape => (
                <span key={grape} className="wine-badge--secondary text-xs">
                  {grape}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
