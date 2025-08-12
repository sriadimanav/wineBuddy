import type { User, Wine } from '@routes/__root'
import { useNavigate } from '@tanstack/react-router'
import {
  Check,
  Edit3,
  Filter,
  Grid,
  Heart,
  List,
  Search,
  SortAsc,
  Star,
  Trash2,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { ImageWithFallback } from './figma/ImageWithFallback.tsx'
import { useScreenSize } from './hooks/useMediaQueries.ts'

interface FavoritesScreenProps {
  user: User
  onWineSelect: (wine: Wine) => void
}

// Mock favorite wines data
const favoritesData: Wine[] = [
  {
    id: '1',
    name: 'Château Margaux 2015',
    winery: 'Château Margaux',
    vintage: 2015,
    region: 'Bordeaux, France',
    description:
      'A legendary Bordeaux blend showcasing elegance and power in perfect harmony.',
    grapeVariety: ['Cabernet Sauvignon', 'Merlot'],
    color: 'Deep Ruby',
    alcoholContent: 13.5,
    sugarContent: 'Dry',
    taste: ['Black Cherry', 'Cassis', 'Cedar'],
    aroma: ['Violets', 'Graphite'],
    foodPairing: ['Lamb', 'Beef Wellington'],
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
    taste: ['Passionfruit', 'Lime'],
    aroma: ['Tropical Fruits'],
    foodPairing: ['Seafood', 'Goat Cheese'],
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
  {
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
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=300&h=400&fit=crop',
    price: 180,
  },
  {
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
      'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=300&h=400&fit=crop',
    price: 320,
  },
  {
    id: 'scan-1',
    name: 'Caymus Cabernet Sauvignon 2020',
    winery: 'Caymus Vineyards',
    vintage: 2020,
    region: 'Napa Valley, California',
    description:
      'Rich and concentrated Cabernet Sauvignon with dark fruit flavors and smooth tannins.',
    grapeVariety: ['Cabernet Sauvignon'],
    color: 'Deep Purple',
    alcoholContent: 14.5,
    sugarContent: 'Dry',
    taste: ['Blackberry', 'Cassis', 'Vanilla'],
    aroma: ['Dark Fruits', 'Cedar'],
    foodPairing: ['Grilled Steak', 'Lamb Chops'],
    rating: 4.4,
    reviews: 156,
    sommelierNotes:
      'Excellent everyday Cabernet with consistent quality year after year.',
    image:
      'https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?w=300&h=400&fit=crop',
    price: 65,
  },
]

export function FavoritesScreen({ user }: FavoritesScreenProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  //const [sortBy, setSortBy] = useState('name')
  const [isEditMode, setIsEditMode] = useState(false)
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())
  const navigate = useNavigate()
  const screenSize = useScreenSize()

  // Filter favorites based on user's favorite IDs
  const favoriteWines = favoritesData.filter((wine) =>
    user.favorites.includes(wine.id),
  )

  // Filter wines based on search query
  const filteredWines = favoriteWines.filter(
    (wine) =>
      wine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wine.winery.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wine.region.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleWineClick = (wine: Wine) => {
    if (isEditMode) {
      toggleItemSelection(wine.id)
    } else {
      navigate({ to: '/wine/$id', params: { id: wine.id } })
    }
  }

  const toggleItemSelection = (wineId: string) => {
    const newSelectedItems = new Set(selectedItems)
    if (newSelectedItems.has(wineId)) {
      newSelectedItems.delete(wineId)
    } else {
      newSelectedItems.add(wineId)
    }
    setSelectedItems(newSelectedItems)
  }

  const toggleSelectAll = () => {
    if (selectedItems.size === filteredWines.length) {
      setSelectedItems(new Set())
    } else {
      setSelectedItems(new Set(filteredWines.map((wine) => wine.id)))
    }
  }

  const handleDeleteSelected = () => {
    if (selectedItems.size === 0) return

    const itemText = selectedItems.size === 1 ? 'item' : 'items'
    if (
      confirm(
        `Are you sure you want to remove ${selectedItems.size} ${itemText} from your favorites? This action cannot be undone.`,
      )
    ) {
      // Here you would typically update the user's favorites
      console.log('Deleting selected items:', Array.from(selectedItems))
      setSelectedItems(new Set())
      setIsEditMode(false)
    }
  }

  const exitEditMode = () => {
    setIsEditMode(false)
    setSelectedItems(new Set())
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={12}
        className={
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }
      />
    ))
  }

  const WineCard = ({ wine }: { wine: Wine }) => (
    <div
      onClick={() => handleWineClick(wine)}
      className={`bg-card rounded-xl p-4 shadow-sm border border-border cursor-pointer hover:shadow-md transition-all ${
        isEditMode && selectedItems.has(wine.id)
          ? 'ring-2 ring-wine-accent bg-wine-accent/5'
          : ''
      }`}
    >
      <div className="flex space-x-4">
        {isEditMode && (
          <div className="flex items-center justify-center flex-shrink-0">
            <div
              className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                selectedItems.has(wine.id)
                  ? 'bg-wine-accent border-wine-accent'
                  : 'border-gray-300 hover:border-wine-accent'
              }`}
            >
              {selectedItems.has(wine.id) && (
                <Check size={12} className="text-white" />
              )}
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
              <h3 className="font-medium text-foreground truncate">
                {wine.name}
              </h3>
              <p className="text-sm text-muted-foreground truncate">
                {wine.winery}
              </p>
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
              <span className="text-xs text-muted-foreground ml-1">
                {wine.rating}
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              {wine.grapeVariety.slice(0, 1).map((grape) => (
                <span key={grape} className="wine-badge--secondary text-xs">
                  {grape}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const WineGridCard = ({ wine }: { wine: Wine }) => (
    <div
      onClick={() => handleWineClick(wine)}
      className={`bg-card rounded-xl p-4 shadow-sm border border-border cursor-pointer hover:shadow-md transition-all relative ${
        isEditMode && selectedItems.has(wine.id)
          ? 'ring-2 ring-wine-accent bg-wine-accent/5'
          : ''
      }`}
    >
      {isEditMode && (
        <div className="absolute top-2 left-2 z-10">
          <div
            className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
              selectedItems.has(wine.id)
                ? 'bg-wine-accent border-wine-accent'
                : 'border-white bg-white/90 hover:border-wine-accent'
            }`}
          >
            {selectedItems.has(wine.id) && (
              <Check size={12} className="text-white" />
            )}
          </div>
        </div>
      )}
      <ImageWithFallback
        src={wine.image}
        alt={wine.name}
        className="w-full h-32 object-cover rounded-lg mb-3"
      />
      <h4 className="font-medium text-sm text-foreground mb-1 line-clamp-2">
        {wine.name}
      </h4>
      <p className="text-xs text-muted-foreground mb-2">{wine.winery}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <Star size={12} className="text-yellow-400 fill-current" />
          <span className="text-xs text-muted-foreground">{wine.rating}</span>
        </div>
        {wine.price && (
          <span className="text-sm font-semibold text-foreground">
            ${wine.price}
          </span>
        )}
      </div>
    </div>
  )

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="bg-card shadow-sm px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {isEditMode ? 'Edit Favorites' : 'My Favorites'}
            </h1>
            <p className="text-muted-foreground">
              {isEditMode
                ? `Select items to remove from your collection`
                : `${favoriteWines.length} wines saved`}
            </p>
          </div>
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isEditMode ? 'bg-wine-accent/10' : 'bg-red-100'
            }`}
          >
            {isEditMode ? (
              <Edit3 size={20} className="text-wine-accent" />
            ) : (
              <Heart size={20} className="text-red-500 fill-current" />
            )}
          </div>
        </div>

        {/* Search and filters */}
        <div className="space-y-3">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              placeholder="Search your favorites..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {!isEditMode ? (
                <>
                  <button className="wine-button wine-button--secondary text-sm px-3 py-1.5 rounded-md flex items-center">
                    <Filter size={16} className="mr-1" />
                    Filter
                  </button>
                  <button className="wine-button wine-button--secondary text-sm px-3 py-1.5 rounded-md flex items-center">
                    <SortAsc size={16} className="mr-1" />
                    Sort
                  </button>
                  {favoriteWines.length > 0 && (
                    <button
                      onClick={() => setIsEditMode(true)}
                      className="wine-button wine-button--secondary text-sm px-3 py-1.5 rounded-md flex items-center"
                    >
                      <Edit3 size={16} className="mr-1" />
                      Edit
                    </button>
                  )}
                </>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={toggleSelectAll}
                    className="wine-button wine-button--secondary text-sm px-3 py-1.5 rounded-md whitespace-nowrap"
                  >
                    {selectedItems.size === filteredWines.length
                      ? 'Deselect'
                      : 'Select All'}
                  </button>
                  <button
                    onClick={exitEditMode}
                    className="wine-button wine-button--secondary text-sm px-3 py-1.5 rounded-md flex items-center"
                  >
                    <X size={16} className="mr-1" />
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`h-8 w-8 p-0 rounded ${viewMode === 'list' ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50'} flex items-center justify-center`}
              >
                <List size={16} />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`h-8 w-8 p-0 rounded ${viewMode === 'grid' ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50'} flex items-center justify-center`}
              >
                <Grid size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        className="px-6 py-6"
        style={{
          minHeight:
            screenSize === 'kiosk'
              ? 'calc(100vh - 280px)'
              : 'calc(100vh - 240px)',
          maxHeight:
            screenSize === 'kiosk'
              ? 'calc(100vh - 280px)'
              : 'calc(100vh - 240px)',
          overflowY: 'auto',
        }}
      >
        {filteredWines.length === 0 ? (
          <div className="text-center py-12 flex flex-col items-center justify-center h-full">
            {favoriteWines.length === 0 ? (
              <div>
                <Heart
                  size={64}
                  className="text-muted-foreground mx-auto mb-4"
                />
                <h3 className="text-lg text-muted-foreground mb-2">
                  No favorites yet
                </h3>
                <p className="text-muted-foreground mb-6">
                  Start exploring wines and save your favorites here
                </p>
                <button
                  onClick={() => navigate({ to: '/' })}
                  className="bg-wine-accent hover:bg-wine-light text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200 shadow-lg"
                >
                  Discover Wines
                </button>
              </div>
            ) : (
              <div>
                <Search
                  size={64}
                  className="text-muted-foreground mx-auto mb-4"
                />
                <h3 className="text-lg text-muted-foreground mb-2">
                  No results found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms
                </p>
              </div>
            )}
          </div>
        ) : (
          <div
            className={
              viewMode === 'grid' ? 'grid grid-cols-2 gap-4' : 'space-y-4'
            }
          >
            {filteredWines.map((wine) =>
              viewMode === 'grid' ? (
                <WineGridCard key={wine.id} wine={wine} />
              ) : (
                <WineCard key={wine.id} wine={wine} />
              ),
            )}
          </div>
        )}
      </div>

      {/* Edit Mode Action Bar */}
      {isEditMode && (
        <div
          className="fixed left-4 right-4 bg-white border border-gray-200 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg"
          style={{
            bottom:
              screenSize === 'kiosk'
                ? '96px'
                : screenSize === 'desktop'
                  ? '88px'
                  : '80px',
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Edit3 size={16} className="text-wine-accent" />
              <span className="text-sm font-medium text-gray-700">
                {selectedItems.size > 0
                  ? `${selectedItems.size} selected`
                  : 'Select items to remove'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              {selectedItems.size > 0 && (
                <button
                  onClick={handleDeleteSelected}
                  className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center transition-colors"
                >
                  <Trash2 size={14} className="mr-1" />
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
