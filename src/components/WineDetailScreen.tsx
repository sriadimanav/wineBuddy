import {
  Calendar,
  Droplets,
  Heart,
  Info,
  MapPin,
  Share,
  ShoppingCart,
  Star,
  Thermometer,
} from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@ui/Badge';
import { Button } from '@ui/Button';
import { SeparatorComp as Separator } from '@ui/Separator';

import type { User, Wine } from '@routes/__root';

import { ImageWithFallback } from './ui/ImageWithFallback';

interface WineDetailScreenProps {
  wine: Wine;
  user: User;
  onBack: () => void;
  onUpdateUser: (user: User) => void;
}

export function WineDetailScreen({
  wine,
  user,
  //onBack,
  onUpdateUser,
}: WineDetailScreenProps) {
  const [isFavorite, setIsFavorite] = useState(user.favorites.includes(wine.id));
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleFavorite = () => {
    const updatedFavorites = isFavorite
      ? user.favorites.filter(id => id !== wine.id)
      : [...user.favorites, wine.id];

    const updatedUser = { ...user, favorites: updatedFavorites };
    onUpdateUser(updatedUser);
    localStorage.setItem('wine-buddy-user', JSON.stringify(updatedUser));
    setIsFavorite(!isFavorite);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="relative">
          <ImageWithFallback
            src={wine.image}
            alt={wine.name}
            className="w-full h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

          {/* Action buttons overlay */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFavorite}
              className="bg-white bg-opacity-90 hover:bg-opacity-100">
              <Heart
                className={`h-4 w-4 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-600'}`}
              />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="bg-white bg-opacity-90 hover:bg-opacity-100">
              <Share className="h-4 w-4 text-gray-600" />
            </Button>
          </div>
        </div>

        {/* Wine Info */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-2xl mb-2">{wine.name}</h1>
              <p className="text-gray-600 mb-2">{wine.winery}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {wine.vintage}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {wine.region}
                </div>
              </div>
            </div>
            {wine.price && (
              <div className="text-right">
                <p className="text-2xl text-gray-900">${wine.price}</p>
                <p className="text-sm text-gray-500">per bottle</p>
              </div>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex items-center space-x-1">{renderStars(wine.rating)}</div>
            <span className="text-lg">{wine.rating}</span>
            <span className="text-gray-500">({wine.reviews} reviews)</span>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 mb-6">
            <Button className="flex-1" style={{ backgroundColor: '#ad2831' }}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
            <Button variant="outline" className="flex-1">
              Find Stores
            </Button>
          </div>
        </div>
      </div>

      {/* Details Sections */}
      <div className="space-y-4 p-6">
        {/* Description */}
        <div className="bg-white rounded-xl p-6">
          <h3 className="text-lg mb-3">About This Wine</h3>
          <p className="text-gray-700 leading-relaxed">
            {showFullDescription ? wine.description : `${wine.description.slice(0, 150)}...`}
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="mt-2 p-0 h-auto"
            style={{ color: '#ad2831' }}>
            {showFullDescription ? 'Show Less' : 'Read More'}
          </Button>
        </div>

        {/* Grape Variety & Basic Info */}
        <div className="bg-white rounded-xl p-6">
          <h3 className="text-lg mb-4">Wine Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Grape Variety</p>
              <div className="flex flex-wrap gap-1">
                {wine.grapeVariety.map(grape => (
                  <Badge key={grape} variant="secondary">
                    {grape}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Color</p>
              <p className="">{wine.color}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Alcohol Content</p>
              <div className="flex items-center">
                <Droplets className="h-4 w-4 text-blue-500 mr-1" />
                <span>{wine.alcoholContent}% ABV</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Sugar Content</p>
              <p className="">{wine.sugarContent}</p>
            </div>
          </div>
        </div>

        {/* Tasting Notes */}
        <div className="bg-white rounded-xl p-6">
          <h3 className="text-lg mb-4">Tasting Notes</h3>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-2">Taste Profile</p>
              <div className="flex flex-wrap gap-2">
                {wine.taste.map(taste => (
                  <Badge
                    key={taste}
                    variant="outline"
                    className="border-red-200"
                    style={{ color: '#640d14' }}>
                    {taste}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-2">Aroma</p>
              <div className="flex flex-wrap gap-2">
                {wine.aroma.map(aroma => (
                  <Badge key={aroma} variant="outline" className="border-green-200 text-green-700">
                    {aroma}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sommelier Notes */}
        <div className="bg-white rounded-xl p-6">
          <div className="flex items-center mb-3">
            <Info className="h-5 w-5 mr-2" style={{ color: '#ad2831' }} />
            <h3 className="text-lg">Sommelier Notes</h3>
          </div>
          <p className="text-gray-700 italic">"{wine.sommelierNotes}"</p>
        </div>

        {/* Food Pairing */}
        <div className="bg-white rounded-xl p-6">
          <h3 className="text-lg mb-4">Perfect Pairings</h3>
          <div className="space-y-3">
            {wine.foodPairing.map(food => (
              <div key={food} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                  <Thermometer className="h-4 w-4 text-orange-600" />
                </div>
                <span className="">{food}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Serving Suggestions */}
        <div className="bg-white rounded-xl p-6">
          <h3 className="text-lg mb-4">Serving Suggestions</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Thermometer className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">Serving Temp</p>
              <p className="font-medium">
                {wine.color.toLowerCase().includes('red') ? '60-65°F' : '45-50°F'}
              </p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <Calendar className="h-6 w-6 mx-auto mb-2" style={{ color: '#ad2831' }} />
              <p className="text-sm text-gray-600 mb-1">Decant Time</p>
              <p className="font-medium">
                {wine.color.toLowerCase().includes('red') ? '30-60 min' : 'Not needed'}
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Summary */}
        <div className="bg-white rounded-xl p-6">
          <h3 className="text-lg mb-4">Reviews Summary</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>Overall Rating</span>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">{renderStars(wine.rating)}</div>
                <span className="font-medium">{wine.rating}/5</span>
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span>Total Reviews</span>
              <span className="font-medium">{wine.reviews} reviews</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
