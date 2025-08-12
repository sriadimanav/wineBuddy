import type { FeaturedWine } from '@ts/wine'
import { MapPin, Star } from 'lucide-react'
import { useScreenSize } from '../../hooks/useMediaQueries'
import { ImageWithFallback } from '../../ui/ImageWithFallback'

interface FeaturedWinesSectionProps {
  wines: FeaturedWine[]
  onWineClick: (wineId: string) => void
}

export function FeaturedWinesSection({
  wines,
  onWineClick,
}: FeaturedWinesSectionProps) {
  const screenSize = useScreenSize()

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2
          className={`font-bold text-foreground ${
            screenSize === 'kiosk' ? 'text-2xl' : 'text-xl'
          }`}
        >
          Featured Wines
        </h2>
        <button className="text-wine-accent font-medium hover:text-wine-light transition-colors">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {wines.map((wine) => (
          <div
            key={wine.id}
            onClick={() => onWineClick(wine.id)}
            className="bg-card rounded-xl p-4 shadow-sm border border-border cursor-pointer hover:shadow-md transition-all wine-rosé-card"
          >
            <div className="flex space-x-4">
              <ImageWithFallback
                src={wine.image}
                alt={wine.name}
                className={`object-cover rounded-lg flex-shrink-0 ${
                  screenSize === 'kiosk' ? 'w-20 h-24' : 'w-16 h-20'
                }`}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">
                      {wine.name}
                    </h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {wine.winery}
                    </p>
                    <div className="flex items-center mt-1">
                      <MapPin className="w-3 h-3 text-muted-foreground mr-1" />
                      <span className="text-xs text-muted-foreground">
                        {wine.region}
                      </span>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-bold text-foreground">${wine.price}</p>
                    <div className="flex items-center mt-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                      <span className="text-xs text-muted-foreground">
                        {wine.rating}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {wine.grapeVariety?.slice(0, 2).map((grape) => (
                    <span
                      key={grape}
                      className="wine-badge wine-badge--secondary text-xs"
                    >
                      {grape}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
