import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import {
  Search,
  Filter,
  Star,
  TrendingUp,
  Award,
  MapPin,
  Camera,
  Zap,
  //Target,
  Trophy,
  //Wine,
} from 'lucide-react'
import type { User, Wine as WineType } from '../routes/__root'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { AdaptiveGrid } from './layout/ResponsiveLayout'
import { useScreenSize } from './hooks/useMediaQuery'

interface HomeScreenProps {
  user: User
}

// Mock wine data
const featuredWines: WineType[] = [
  {
    id: '1',
    name: 'Château Margaux 2015',
    winery: 'Château Margaux',
    vintage: 2015,
    region: 'Bordeaux, France',
    description:
      'A legendary Bordeaux blend showcasing elegance and power in perfect harmony.',
    grapeVariety: [
      'Cabernet Sauvignon',
      'Merlot',
      'Petit Verdot',
      'Cabernet Franc',
    ],
    color: 'Deep Ruby',
    alcoholContent: 13.5,
    sugarContent: 'Dry',
    taste: ['Black Cherry', 'Cassis', 'Cedar', 'Tobacco'],
    aroma: ['Violets', 'Graphite', 'Dark Berries'],
    foodPairing: ['Lamb', 'Beef Wellington', 'Aged Cheese'],
    rating: 4.8,
    reviews: 127,
    sommelierNotes: 'Exceptional vintage with remarkable aging potential.',
    image:
      'https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=300&h=400&fit=crop',
    price: 450,
  },
  {
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
      'https://images.unsplash.com/photo-1558008258-3256797b43f3?w=300&h=400&fit=crop',
    price: 28,
  },
  {
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
      'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=300&h=400&fit=crop',
    price: 85,
  },
]

const trendingWines = [
  {
    id: '4',
    name: 'Champagne Dom Pérignon 2012',
    winery: 'Dom Pérignon',
    vintage: 2012,
    region: 'Champagne, France',
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=200&h=300&fit=crop',
    price: 180,
  },
  {
    id: '5',
    name: 'Opus One 2019',
    winery: 'Opus One',
    vintage: 2019,
    region: 'Napa Valley, USA',
    rating: 4.7,
    image:
      'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=200&h=300&fit=crop',
    price: 320,
  },
  {
    id: '6',
    name: 'Caymus Cabernet Sauvignon',
    winery: 'Caymus Vineyards',
    vintage: 2021,
    region: 'Napa Valley, USA',
    rating: 4.5,
    image:
      'https://images.unsplash.com/photo-1586370434639-0fe43b2d32d6?w=200&h=300&fit=crop',
    price: 85,
  },
]

const badges = [
  { id: 'first-scan', name: 'First Scan', icon: '🔍', unlocked: true },
  { id: 'wine-explorer', name: 'Wine Explorer', icon: '🍷', unlocked: true },
  { id: 'streak-master', name: 'Streak Master', icon: '🔥', unlocked: false },
]

export function HomeScreen({ user }: HomeScreenProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const screenSize = useScreenSize()

  const handleWineClick = (wine: WineType) => {
    navigate({ to: '/wine/$id', params: { id: wine.id } })
  }

  const handleScanNow = () => {
    navigate({ to: '/scan' })
  }

  const handleProfileClick = () => {
    navigate({ to: '/profile' })
  }

  const handleCategoryClick = (category: string) => {
    alert(`Exploring ${category} - Feature coming soon!`)
  }

  const getGreeting = () => {
    return 'Welcome'
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card shadow-sm">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1">
              <h1
                className={`font-bold text-foreground mb-1 ${
                  screenSize === 'kiosk' ? 'text-3xl' : 'text-2xl'
                }`}
              >
                {getGreeting()}, {user.name}
              </h1>
              <p
                className={`text-muted-foreground ${
                  screenSize === 'kiosk' ? 'text-lg' : 'text-base'
                }`}
              >
                Discover your next favorite wine
              </p>
            </div>
            <div
              onClick={handleProfileClick}
              className={`rounded-full bg-wine-accent flex items-center justify-center text-white font-semibold cursor-pointer hover:bg-wine-light transition-colors ${
                screenSize === 'kiosk' ? 'w-16 h-16 text-xl' : 'w-12 h-12'
              }`}
            >
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search wines, wineries, regions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-3 border border-border rounded-xl bg-background text-foreground focus:ring-2 focus:ring-wine-accent focus:border-transparent"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 hover:bg-secondary rounded-lg transition-colors">
              <Filter className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-8">
        {/* Guest User Reminder */}
        {user.isGuest && (
          <div className="bg-wine-blush border border-border rounded-xl p-4 wine-rosé-card">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-wine-accent mb-1">
                  You're exploring as a guest
                </h3>
                <p className="text-sm text-muted-foreground">
                  Create an account to save your favorites and track your wine
                  journey!
                </p>
              </div>
              <button
                onClick={() => navigate({ to: '/auth' })}
                className="bg-wine-accent text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-wine-light transition-colors ml-4"
              >
                Sign Up
              </button>
            </div>
          </div>
        )}

        {/* Gamification Section - FIRST as per your original design */}
        <div className="bg-card rounded-2xl p-6 shadow-sm wine-rosé-card">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Your Wine Journey
          </h2>

          <AdaptiveGrid
            cols={{ mobile: 1, tablet: 2, desktop: 2, kiosk: 3 }}
            gap="1rem"
          >
            {/* Streak Counter - Only right side bordered icon */}
            <div className="gamification-streak rounded-xl p-4 wine-hover-lift">
              <div className="flex items-center justify-between">
                <div>
                  <div className="mb-2">
                    <span className="font-semibold">Daily Streak</span>
                  </div>
                  <div className="text-2xl font-bold">
                    {user.streakCount || 0} days
                  </div>
                </div>
                <div className="text-3xl">
                  <Zap className="w-8 h-8 text-white/80" />
                </div>
              </div>
            </div>

            {/* Total Scans - Only right side bordered icon */}
            <div className="gamification-scans rounded-xl p-4 wine-hover-lift">
              <div className="flex items-center justify-between">
                <div>
                  <div className="mb-2">
                    <span className="font-semibold">Wines Scanned</span>
                  </div>
                  <div className="text-2xl font-bold">
                    {user.totalScans || 0}
                  </div>
                </div>
                <div className="text-3xl">
                  <Camera className="w-8 h-8 text-white/80" />
                </div>
              </div>
            </div>

            {/* Badges - Only right side bordered icon */}
            <div className="gamification-badges rounded-xl p-4 wine-hover-lift">
              <div className="flex items-center justify-between">
                <div>
                  <div className="mb-2">
                    <span className="font-semibold">Badges Earned</span>
                  </div>
                  <div className="text-2xl font-bold">
                    {badges.filter((b) => b.unlocked).length}
                  </div>
                </div>
                <div className="text-3xl">
                  <Trophy className="w-8 h-8 text-white/80" />
                </div>
              </div>
            </div>
          </AdaptiveGrid>

          {/* Badges Row - Simplified with only wine-accent and muted colors */}
          <div className="mt-4 flex space-x-3 overflow-x-auto pb-2">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`flex-shrink-0 w-20 h-20 rounded-xl flex flex-col items-center justify-center transition-all ${
                  badge.unlocked
                    ? 'bg-wine-accent text-white shadow-lg'
                    : 'bg-secondary text-muted-foreground'
                }`}
              >
                <div className="text-lg mb-1">{badge.icon}</div>
                <div className="text-xs text-center px-1">{badge.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Scan CTA */}
        <div
          style={{
            background: 'linear-gradient(135deg, #38040e, #ad2831)',
            borderRadius: '1rem',
            padding: '1.5rem',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Wine-themed decorative elements */}
          <div
            className="absolute top-0 right-0 w-32 h-32 rounded-full transform translate-x-16 -translate-y-16"
            style={{
              background:
                'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 70%, transparent 100%)',
            }}
          ></div>
          <div
            className="absolute bottom-0 left-0 w-20 h-20 rounded-full transform -translate-x-10 translate-y-10"
            style={{
              background:
                'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
            }}
          ></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3
                  className={`font-bold mb-2 ${
                    screenSize === 'kiosk' ? 'text-xl' : 'text-lg'
                  }`}
                >
                  Scan a Wine Label
                </h3>
                <p
                  className={`opacity-90 mb-4 ${
                    screenSize === 'kiosk' ? 'text-base' : 'text-sm'
                  }`}
                >
                  Get instant details about any wine
                </p>
                <button
                  onClick={handleScanNow}
                  className={`bg-card text-wine-dark font-semibold rounded-xl hover:bg-secondary transition-all flex items-center shadow-lg ${
                    screenSize === 'kiosk' ? 'px-6 py-3 text-lg' : 'px-4 py-2'
                  }`}
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Scan Now
                </button>
              </div>
              <div className="ml-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center relative overflow-hidden"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.1))',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                  }}
                >
                  <Camera className="w-8 h-8 text-white drop-shadow-lg" />
                  {/* Wine bottle silhouette */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="w-full h-full flex items-center justify-center">
                      🍷
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Wines */}
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
            {featuredWines.map((wine) => (
              <div
                key={wine.id}
                onClick={() => handleWineClick(wine)}
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
                        <p className="font-bold text-foreground">
                          ${wine.price}
                        </p>
                        <div className="flex items-center mt-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                          <span className="text-xs text-muted-foreground">
                            {wine.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {wine.grapeVariety.slice(0, 2).map((grape) => (
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

        {/* Trending Now */}
        <section>
          <div className="flex items-center mb-6">
            <TrendingUp className="w-5 h-5 text-wine-accent mr-2" />
            <h2
              className={`font-bold text-foreground ${
                screenSize === 'kiosk' ? 'text-2xl' : 'text-xl'
              }`}
            >
              Trending Now
            </h2>
          </div>

          <div className="flex space-x-4 overflow-x-auto pb-4">
            {trendingWines.map((wine) => (
              <div
                key={wine.id}
                onClick={() => handleWineClick(wine)}
                className={`flex-shrink-0 bg-card rounded-xl p-4 shadow-sm border border-border cursor-pointer hover:shadow-md transition-all wine-rosé-card ${
                  screenSize === 'kiosk' ? 'w-48' : 'w-40'
                }`}
              >
                <ImageWithFallback
                  src={wine.image}
                  alt={wine.name}
                  className={`w-full object-cover rounded-lg mb-3 ${
                    screenSize === 'kiosk' ? 'h-40' : 'h-32'
                  }`}
                />
                <h4 className="font-semibold text-sm text-foreground mb-1 line-clamp-2">
                  {wine.name}
                </h4>
                <p className="text-xs text-muted-foreground mb-2">
                  {wine.winery}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                    <span className="text-xs text-muted-foreground">
                      {wine.rating}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-foreground">
                    ${wine.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Wine Categories - Explore Section */}
        <section>
          <h2
            className={`font-bold text-foreground mb-6 ${
              screenSize === 'kiosk' ? 'text-2xl' : 'text-xl'
            }`}
          >
            Explore by Category
          </h2>

          <AdaptiveGrid
            cols={{ mobile: 2, tablet: 2, desktop: 2, kiosk: 4 }}
            gap="1.5rem"
          >
            <div
              onClick={() => handleCategoryClick('Red Wines')}
              className="bg-wine-blush border border-border rounded-lg p-3 cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all duration-200 wine-rosé-card"
            >
              <div className="w-6 h-6 bg-wine-accent rounded-md flex items-center justify-center mb-2">
                <Award className="w-3 h-3 text-white" />
              </div>
              <h3 className="font-medium text-foreground mb-1 text-sm">
                Red Wines
              </h3>
              <p className="text-xs text-muted-foreground">Bold & Complex</p>
            </div>

            <div
              onClick={() => handleCategoryClick('White Wines')}
              className="bg-wine-whisper border border-border rounded-lg p-3 cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all duration-200 wine-rosé-card"
            >
              <div className="w-6 h-6 bg-wine-light rounded-md flex items-center justify-center mb-2">
                <Award className="w-3 h-3 text-white" />
              </div>
              <h3 className="font-medium text-foreground mb-1 text-sm">
                White Wines
              </h3>
              <p className="text-xs text-muted-foreground">Fresh & Crisp</p>
            </div>

            <div
              onClick={() => handleCategoryClick('Rosé Wines')}
              className="bg-wine-pearl border border-border rounded-lg p-3 cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all duration-200 wine-rosé-card"
            >
              <div className="w-6 h-6 bg-wine-accent rounded-md flex items-center justify-center mb-2">
                <Award className="w-3 h-3 text-white" />
              </div>
              <h3 className="font-medium text-foreground mb-1 text-sm">
                Rosé Wines
              </h3>
              <p className="text-xs text-muted-foreground">
                Light & Refreshing
              </p>
            </div>

            <div
              onClick={() => handleCategoryClick('Sparkling Wines')}
              className="bg-wine-soft border border-border rounded-lg p-3 cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all duration-200 wine-rosé-card"
            >
              <div className="w-6 h-6 bg-wine-medium rounded-md flex items-center justify-center mb-2">
                <Award className="w-3 h-3 text-white" />
              </div>
              <h3 className="font-medium text-foreground mb-1 text-sm">
                Sparkling
              </h3>
              <p className="text-xs text-muted-foreground">Bubbly & Festive</p>
            </div>
          </AdaptiveGrid>
        </section>
      </div>
    </div>
  )
}
