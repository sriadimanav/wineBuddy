import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import {
  Award,
  Calendar,
  Grape,
  Heart,
  MapPin,
  Plus,
  Share,
  Star,
  Utensils,
  Wine,
} from 'lucide-react'
import { useState } from 'react'
import { useScreenSize } from '../../components/hooks/useMediaQueries.ts'
import { ImageWithFallback } from '../../components/ui/ImageWithFallback.tsx'
import type { User, Wine as WineType } from '../__root.tsx'

// Mock wine database
const wineDatabase: Record<string, WineType> = {
  '1': {
    id: '1',
    name: 'Château Margaux 2015',
    winery: 'Château Margaux',
    vintage: 2015,
    region: 'Bordeaux, France',
    description:
      "A legendary Bordeaux blend showcasing elegance and power in perfect harmony. This exceptional vintage demonstrates the estate's mastery of terroir expression.",
    grapeVariety: [
      'Cabernet Sauvignon',
      'Merlot',
      'Petit Verdot',
      'Cabernet Franc',
    ],
    color: 'Deep Ruby',
    alcoholContent: 13.5,
    sugarContent: 'Dry',
    taste: ['Black Cherry', 'Cassis', 'Cedar', 'Tobacco', 'Graphite'],
    aroma: ['Violets', 'Graphite', 'Dark Berries', 'Leather', 'Vanilla'],
    foodPairing: ['Lamb', 'Beef Wellington', 'Aged Cheese', 'Duck Confit'],
    rating: 4.8,
    reviews: 127,
    sommelierNotes:
      'Exceptional vintage with remarkable aging potential. The 2015 Château Margaux is a masterpiece that balances power and elegance in extraordinary harmony.',
    image:
      'https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=400&h=600&fit=crop',
    price: 450,
  },
  'scan-1': {
    id: 'scan-1',
    name: 'Caymus Cabernet Sauvignon 2020',
    winery: 'Caymus Vineyards',
    vintage: 2020,
    region: 'Napa Valley, California',
    description:
      "Rich and concentrated Cabernet Sauvignon with dark fruit flavors and smooth tannins. A signature Napa Valley expression from one of California's most respected producers.",
    grapeVariety: ['Cabernet Sauvignon'],
    color: 'Deep Purple',
    alcoholContent: 14.5,
    sugarContent: 'Dry',
    taste: ['Blackberry', 'Cassis', 'Vanilla', 'Oak', 'Dark Chocolate'],
    aroma: ['Dark Fruits', 'Cedar', 'Spice', 'Coffee', 'Tobacco'],
    foodPairing: [
      'Grilled Steak',
      'Lamb Chops',
      'Dark Chocolate',
      'Aged Cheddar',
    ],
    rating: 4.4,
    reviews: 156,
    sommelierNotes:
      'Excellent everyday Cabernet with consistent quality year after year. Perfect introduction to Napa Valley Cabernet Sauvignon.',
    image:
      'https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?w=400&h=600&fit=crop',
    price: 65,
  },
  'scan-2': {
    id: 'scan-2',
    name: "Kendall-Jackson Vintner's Reserve Chardonnay",
    winery: 'Kendall-Jackson',
    vintage: 2021,
    region: 'California, USA',
    description:
      "Balanced Chardonnay with tropical fruit flavors and a hint of oak. Masterfully crafted to showcase the best of California's diverse vineyard sites.",
    grapeVariety: ['Chardonnay'],
    color: 'Golden Yellow',
    alcoholContent: 13.5,
    sugarContent: 'Dry',
    taste: ['Pineapple', 'Pear', 'Vanilla', 'Butter', 'Green Apple'],
    aroma: ['Tropical Fruits', 'Citrus', 'Oak', 'Honey', 'Minerals'],
    foodPairing: ['Roasted Chicken', 'Seafood', 'Creamy Pasta', 'Lobster'],
    rating: 4.2,
    reviews: 203,
    sommelierNotes:
      'A reliable crowd-pleaser with perfect balance of fruit and oak. Exemplifies the California Chardonnay style.',
    image:
      'https://images.unsplash.com/photo-1558008258-3256797b43f3?w=400&h=600&fit=crop',
    price: 18,
  },
  '2': {
    id: '2',
    name: 'Cloudy Bay Sauvignon Blanc',
    winery: 'Cloudy Bay',
    vintage: 2022,
    region: 'Marlborough, New Zealand',
    description:
      'Crisp and refreshing with distinctive tropical and citrus flavors.',
    grapeVariety: ['Sauvignon Blanc'],
    color: 'Pale Yellow',
    alcoholContent: 13.0,
    sugarContent: 'Dry',
    taste: ['Passionfruit', 'Lime', 'Gooseberry'],
    aroma: ['Tropical Fruits', 'Fresh Herbs'],
    foodPairing: ['Seafood', 'Goat Cheese', 'Asian Cuisine'],
    rating: 4.3,
    reviews: 89,
    sommelierNotes: 'Perfect expression of Marlborough terroir.',
    image:
      'https://images.unsplash.com/photo-1558008258-3256797b43f3?w=400&h=600&fit=crop',
    price: 28,
  },
  '3': {
    id: '3',
    name: 'Barolo Brunate 2018',
    winery: 'Giuseppe Rinaldi',
    vintage: 2018,
    region: 'Piedmont, Italy',
    description:
      'Traditional Barolo with complex tannins and exceptional longevity.',
    grapeVariety: ['Nebbiolo'],
    color: 'Garnet Red',
    alcoholContent: 14.5,
    sugarContent: 'Dry',
    taste: ['Cherry', 'Rose', 'Tar', 'Truffle'],
    aroma: ['Red Fruits', 'Roses', 'Leather'],
    foodPairing: ['Truffle Dishes', 'Braised Beef', 'Aged Parmesan'],
    rating: 4.6,
    reviews: 67,
    sommelierNotes: "A masterpiece from one of Barolo's finest producers.",
    image:
      'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&h=600&fit=crop',
    price: 85,
  },
  '4': {
    id: '4',
    name: 'Champagne Dom Pérignon 2012',
    winery: 'Dom Pérignon',
    vintage: 2012,
    region: 'Champagne, France',
    description:
      'Prestigious champagne with exceptional complexity and finesse.',
    grapeVariety: ['Chardonnay', 'Pinot Noir'],
    color: 'Golden Yellow',
    alcoholContent: 12.5,
    sugarContent: 'Brut',
    taste: ['Citrus', 'Brioche', 'Honey', 'Almonds'],
    aroma: ['White Flowers', 'Yeast', 'Minerals'],
    foodPairing: ['Oysters', 'Caviar', 'Fine Seafood'],
    rating: 4.9,
    reviews: 203,
    sommelierNotes: 'Perfect expression of Dom Pérignon house style.',
    image:
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=600&fit=crop',
    price: 180,
  },
  '5': {
    id: '5',
    name: 'Opus One 2019',
    winery: 'Opus One',
    vintage: 2019,
    region: 'Napa Valley, USA',
    description:
      'Bordeaux-style blend representing the pinnacle of Napa Valley winemaking.',
    grapeVariety: ['Cabernet Sauvignon', 'Merlot', 'Petit Verdot'],
    color: 'Deep Purple',
    alcoholContent: 14.5,
    sugarContent: 'Dry',
    taste: ['Blackcurrant', 'Chocolate', 'Espresso', 'Spice'],
    aroma: ['Dark Berries', 'Cedar', 'Vanilla'],
    foodPairing: ['Prime Rib', 'Duck Confit', 'Dark Chocolate'],
    rating: 4.7,
    reviews: 134,
    sommelierNotes:
      'Collaboration between Mondavi and Rothschild reaches new heights.',
    image:
      'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=400&h=600&fit=crop',
    price: 320,
  },
  '6': {
    id: '6',
    name: 'Caymus Cabernet Sauvignon 2020',
    winery: 'Caymus Vineyards',
    vintage: 2020,
    region: 'Napa Valley, USA',
    description:
      "Rich and concentrated Cabernet Sauvignon with dark fruit flavors and smooth tannins. A signature Napa Valley expression from one of California's most respected producers.",
    grapeVariety: ['Cabernet Sauvignon'],
    color: 'Deep Purple',
    alcoholContent: 14.5,
    sugarContent: 'Dry',
    taste: ['Blackberry', 'Cassis', 'Vanilla', 'Oak', 'Dark Chocolate'],
    aroma: ['Dark Fruits', 'Cedar', 'Spice', 'Coffee', 'Tobacco'],
    foodPairing: [
      'Grilled Steak',
      'Lamb Chops',
      'Dark Chocolate',
      'Aged Cheddar',
    ],
    rating: 4.5,
    reviews: 156,
    sommelierNotes:
      'Excellent everyday Cabernet with consistent quality year after year. Perfect introduction to Napa Valley Cabernet Sauvignon.',
    image:
      'https://images.unsplash.com/photo-1566995349570-e27b96a0b3f1?w=400&h=600&fit=crop',
    price: 85,
  },
  '7': {
    id: '7',
    name: 'Veuve Clicquot Brut',
    winery: 'Veuve Clicquot',
    vintage: 2018,
    region: 'Champagne, France',
    description:
      'The iconic yellow-labeled champagne with exceptional finesse and elegance. A perfect balance of strength and silkiness, with a distinctive blend of three grape varieties.',
    grapeVariety: ['Pinot Noir', 'Chardonnay', 'Pinot Meunier'],
    color: 'Golden Yellow',
    alcoholContent: 12.0,
    sugarContent: 'Brut',
    taste: ['Citrus', 'Green Apple', 'Brioche', 'Honey', 'Almonds'],
    aroma: ['White Flowers', 'Fresh Bread', 'Minerals', 'Citrus Zest'],
    foodPairing: ['Oysters', 'Sushi', 'Fresh Seafood', 'Soft Cheeses'],
    rating: 4.4,
    reviews: 203,
    sommelierNotes:
      'The signature champagne that embodies the Veuve Clicquot style - bold, elegant, and consistently exceptional.',
    image:
      'https://images.unsplash.com/photo-1504281623087-1a78e7fb75ad?w=400&h=600&fit=crop',
    price: 65,
  },
}

function WineDetailComponent() {
  const { id } = Route.useParams()
  const navigate = useNavigate()
  const screenSize = useScreenSize()

  const [activeTab, setActiveTab] = useState<
    'overview' | 'tasting' | 'pairing'
  >('overview')

  // Get user from localStorage
  const savedUser = localStorage.getItem('wine-buddy-user')
  const user: User = savedUser ? JSON.parse(savedUser) : null

  if (!user) {
    return null
  }

  const wine = wineDatabase[id]

  if (!wine) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Wine className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Wine Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The wine you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate({ to: '/' })}
            className="bg-wine-accent text-white px-6 py-3 rounded-lg hover:bg-wine-light transition-colors"
          >
            Go Back Home
          </button>
        </div>
      </div>
    )
  }

  const isFavorite = user.favorites.includes(wine.id)

  const toggleFavorite = () => {
    const updatedFavorites = isFavorite
      ? user.favorites.filter((fav) => fav !== wine.id)
      : [...user.favorites, wine.id]

    const updatedUser = { ...user, favorites: updatedFavorites }
    localStorage.setItem('wine-buddy-user', JSON.stringify(updatedUser))

    // Trigger a re-render by updating state (you might want to use a state management solution)
    window.location.reload()
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ))
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Wine },
    { id: 'tasting', label: 'Tasting Notes', icon: Grape },
    { id: 'pairing', label: 'Food Pairing', icon: Utensils },
  ] as const

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="px-6 pt-6 pb-8">
          <div
            className={`flex gap-6 ${screenSize === 'mobile' ? 'flex-col' : 'flex-row'}`}
          >
            {/* Wine Image */}
            <div
              className={`flex-shrink-0 ${screenSize === 'mobile' ? 'mx-auto' : ''}`}
            >
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
                    }`}
                  >
                    {wine.name}
                  </h1>
                  <p
                    className={`text-wine-accent font-semibold mb-2 ${
                      screenSize === 'kiosk' ? 'text-xl' : 'text-lg'
                    }`}
                  >
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
                    onClick={toggleFavorite}
                    className={`p-3 rounded-full transition-all ${
                      isFavorite
                        ? 'bg-red-100 text-red-500'
                        : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`}
                    />
                  </button>

                  <button className="p-3 rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 transition-colors">
                    <Share className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-3">
                  {renderStars(wine.rating)}
                </div>
                <span className="text-lg font-semibold text-gray-900 mr-2">
                  {wine.rating}
                </span>
                <span className="text-gray-600">({wine.reviews} reviews)</span>
              </div>

              {/* Price */}
              {wine.price && (
                <div className="mb-4">
                  <span
                    className={`font-bold text-gray-900 ${
                      screenSize === 'kiosk' ? 'text-2xl' : 'text-xl'
                    }`}
                  >
                    ${wine.price}
                  </span>
                </div>
              )}

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-sm text-gray-600 mb-1">Type</div>
                  <div className="font-semibold text-gray-900">
                    {wine.color}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-sm text-gray-600 mb-1">Alcohol</div>
                  <div className="font-semibold text-gray-900">
                    {wine.alcoholContent}%
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 leading-relaxed">
                {wine.description}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div className="bg-white sticky top-16 z-20 shadow-sm">
        <div className="px-6">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-wine-accent text-wine-accent'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
      {/* Tab Content */}
      <div className="px-6 py-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Grape Varieties */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Grape className="w-5 h-5 mr-2 text-wine-accent" />
                Grape Varieties
              </h3>
              <div className="flex flex-wrap gap-2">
                {wine.grapeVariety.map((grape) => (
                  <span
                    key={grape}
                    className="px-3 py-2 bg-red-50 text-wine-accent border border-red-200 rounded-full text-sm font-medium"
                  >
                    {grape}
                  </span>
                ))}
              </div>
            </div>

            {/* Sommelier Notes */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-wine-accent" />
                Sommelier Notes
              </h3>
              <p className="text-gray-700 leading-relaxed italic">
                "{wine.sommelierNotes}"
              </p>
            </div>

            {/* Wine Stats */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Wine Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Vintage</div>
                  <div className="font-semibold text-gray-900">
                    {wine.vintage}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">
                    Alcohol Content
                  </div>
                  <div className="font-semibold text-gray-900">
                    {wine.alcoholContent}%
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">
                    Sugar Content
                  </div>
                  <div className="font-semibold text-gray-900">
                    {wine.sugarContent}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Color</div>
                  <div className="font-semibold text-gray-900">
                    {wine.color}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tasting' && (
          <div className="space-y-6">
            {/* Taste Profile */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Taste Profile
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {wine.taste.map((taste) => (
                  <div
                    key={taste}
                    className="flex items-center p-3 bg-purple-50 rounded-lg border border-purple-200"
                  >
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    <span className="text-gray-900 font-medium">{taste}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Aroma Profile */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Aroma Profile
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {wine.aroma.map((aroma) => (
                  <div
                    key={aroma}
                    className="flex items-center p-3 bg-orange-50 rounded-lg border border-orange-200"
                  >
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    <span className="text-gray-900 font-medium">{aroma}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pairing' && (
          <div className="space-y-6">
            {/* Food Pairings */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Perfect Pairings
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {wine.foodPairing.map((food) => (
                  <div
                    key={food}
                    className="flex items-center p-4 bg-green-50 rounded-lg border border-green-200"
                  >
                    <Utensils className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-gray-900 font-medium">{food}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Serving Suggestions */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Serving Suggestions
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-blue-600 text-sm">🌡️</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Serving Temperature
                    </h4>
                    <p className="text-gray-600">
                      {wine.grapeVariety.includes('Chardonnay') ||
                      wine.grapeVariety.includes('Sauvignon Blanc')
                        ? '45-50°F (7-10°C)'
                        : '60-65°F (15-18°C)'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-purple-600 text-sm">🍷</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Decanting</h4>
                    <p className="text-gray-600">
                      {wine.grapeVariety.some((grape) =>
                        ['Cabernet Sauvignon', 'Merlot', 'Nebbiolo'].includes(
                          grape,
                        ),
                      )
                        ? 'Decant for 30-60 minutes before serving'
                        : 'Best served immediately after opening'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Bottom Action */}
      <div className="fixed bottom-16 left-0 right-0 bg-white p-4 z-30">
        <div className="flex space-x-3">
          <button
            onClick={toggleFavorite}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
              isFavorite
                ? 'bg-red-100 text-red-600 border border-red-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Heart
              className={`w-5 h-5 mr-2 inline ${isFavorite ? 'fill-current' : ''}`}
            />
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>

          <button className="bg-wine-accent hover:bg-wine-light text-white py-3 px-6 rounded-xl font-semibold transition-all flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Add Note
          </button>
        </div>
      </div>
      <div className="h-32"></div> {/* Spacer for fixed bottom bars */}
    </div>
  )
}

export const Route = createFileRoute('/wine/$id')({
  beforeLoad: () => {
    const hasSeenOnboarding = localStorage.getItem(
      'wine-buddy-onboarding-complete',
    )
    const savedUser = localStorage.getItem('wine-buddy-user')

    if (!hasSeenOnboarding) {
      throw redirect({
        to: '/onboarding',
      })
    }

    if (!savedUser) {
      throw redirect({
        to: '/auth',
      })
    }
  },
  component: WineDetailComponent,
})
