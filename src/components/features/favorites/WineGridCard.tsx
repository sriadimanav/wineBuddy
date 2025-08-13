// components/favorites/WineGridCard.tsx
import { Check, Star } from 'lucide-react';

import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

import type { WineGridCardProps } from '@ts/index';

export function WineGridCard({ wine, isEditMode, isSelected, onWineClick }: WineGridCardProps) {
  return (
    <div
      onClick={() => onWineClick(wine)}
      className={`bg-card rounded-xl p-4 shadow-sm border border-border cursor-pointer hover:shadow-md transition-all relative ${
        isEditMode && isSelected ? 'ring-2 ring-wine-accent bg-wine-accent/5' : ''
      }`}>
      {isEditMode && (
        <div className="absolute top-2 left-2 z-10">
          <div
            className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
              isSelected
                ? 'bg-wine-accent border-wine-accent'
                : 'border-white bg-white/90 hover:border-wine-accent'
            }`}>
            {isSelected && <Check size={12} className="text-white" />}
          </div>
        </div>
      )}
      <ImageWithFallback
        src={wine.image}
        alt={wine.name}
        className="w-full h-32 object-cover rounded-lg mb-3"
      />
      <h4 className="font-medium text-sm text-foreground mb-1 line-clamp-2">{wine.name}</h4>
      <p className="text-xs text-muted-foreground mb-2">{wine.winery}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <Star size={12} className="text-yellow-400 fill-current" />
          <span className="text-xs text-muted-foreground">{wine.rating}</span>
        </div>
        {wine.price && <span className="text-sm font-semibold text-foreground">${wine.price}</span>}
      </div>
    </div>
  );
}
