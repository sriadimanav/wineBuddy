// components/wineDetail/WineHero.tsx
import { Calendar, Heart, MapPin, Share } from 'lucide-react';

import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { useStarRating } from '@components/features/favorites/useStarRating';
import type { WineHeroProps } from '@ts/index';

export function WineHero({ wine, isFavorite, onToggleFavorite, screenSize }: WineHeroProps) {
  const { renderStars } = useStarRating();

  return (
    <div className="bg-white">
      <div className="px-6 pt-6 pb-8">
        <div className={`flex gap-6 ${screenSize === 'mobile' ? 'flex-col' : 'flex-row'}`}>
          {/* Wine Image */}
          <div className={`flex-shrink-0 ${screenSize === 'mobile' ? 'mx-auto' : ''}`}>
            <ImageWithFallback
              src={wine.image}
              alt={wine.name}
              className={`object-cover rounded-2xl shadow-xl ${
                screenSize === 'kiosk'
                  ? 'w-64 h-80'
                  : screenSize === 'mobile'
                    ? 'w-48 h-64'
                    : 'w-52 h-72'
              }`}
            />
          </div>

          {/* Wine Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 min-w-0">
                <h1
                  className={`font-bold text-gray-900 mb-2 ${
                    screenSize === 'kiosk' ? 'text-3xl' : 'text-2xl'
                  }`}>
                  {wine.name}
                </h1>
                <p
                  className={`text-wine-accent font-semibold mb-2 ${
                    screenSize === 'kiosk' ? 'text-xl' : 'text-lg'
                  }`}>
                  {wine.winery}
                </p>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="mr-4">{wine.region}</span>
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{wine.vintage}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 ml-4">
                <button
                  onClick={onToggleFavorite}
                  className={`p-3 rounded-full transition-all ${
                    isFavorite
                      ? 'bg-red-100 text-red-500'
                      : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                  }`}>
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                </button>

                <button className="p-3 rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 transition-colors">
                  <Share className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-3">{renderStars(wine.rating)}</div>
              <span className="text-lg font-semibold text-gray-900 mr-2">{wine.rating}</span>
              <span className="text-gray-600">({wine.reviews} reviews)</span>
            </div>

            {/* Price */}
            {wine.price && (
              <div className="mb-4">
                <span
                  className={`font-bold text-gray-900 ${
                    screenSize === 'kiosk' ? 'text-2xl' : 'text-xl'
                  }`}>
                  ${wine.price}
                </span>
              </div>
            )}

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-sm text-gray-600 mb-1">Type</div>
                <div className="font-semibold text-gray-900">{wine.color}</div>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-sm text-gray-600 mb-1">Alcohol</div>
                <div className="font-semibold text-gray-900">{wine.alcoholContent}%</div>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed">{wine.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
