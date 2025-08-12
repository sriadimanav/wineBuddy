import type { TrendingWine } from '@ts/wine';
import { Star, TrendingUp } from 'lucide-react';
import { useScreenSize } from '../../hooks/useMediaQueries';
import { ImageWithFallback } from '../../ui/ImageWithFallback';

interface TrendingWinesSectionProps {
  wines: TrendingWine[];
  onWineClick: (wineId: string) => void;
}

export function TrendingWinesSection({ wines, onWineClick }: TrendingWinesSectionProps) {
  const screenSize = useScreenSize();

  return (
    <section>
      <div className="flex items-center mb-6">
        <TrendingUp className="w-5 h-5 text-wine-accent mr-2" />
        <h2
          className={`font-bold text-foreground ${
            screenSize === 'kiosk' ? 'text-2xl' : 'text-xl'
          }`}>
          Trending Now
        </h2>
      </div>

      <div className="flex space-x-4 overflow-x-auto pb-4">
        {wines.map(wine => (
          <div
            key={wine.id}
            onClick={() => onWineClick(wine.id)}
            className={`flex-shrink-0 bg-card rounded-xl p-4 shadow-sm border border-border cursor-pointer hover:shadow-md transition-all wine-rosé-card ${
              screenSize === 'kiosk' ? 'w-48' : 'w-40'
            }`}>
            <ImageWithFallback
              src={wine.image}
              alt={wine.name}
              className={`w-full object-cover rounded-lg mb-3 ${
                screenSize === 'kiosk' ? 'h-40' : 'h-32'
              }`}
            />
            <h4 className="font-semibold text-sm text-foreground mb-1 line-clamp-2">{wine.name}</h4>
            <p className="text-xs text-muted-foreground mb-2">{wine.winery}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                <span className="text-xs text-muted-foreground">{wine.rating}</span>
              </div>
              <span className="text-sm font-bold text-foreground">${wine.price}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
