import type { Badge } from '@ts/badge';
import type { FeaturedWine, TrendingWine } from '@ts/wine';

export const wineDataService = {
  getFeaturedWines: (): FeaturedWine[] => [
    {
      id: '1',
      name: 'Château Margaux 2015',
      winery: 'Château Margaux',
      vintage: 2015,
      region: 'Bordeaux, France',
      description: 'A legendary Bordeaux blend showcasing elegance and power in perfect harmony.',
      grapeVariety: ['Cabernet Sauvignon', 'Merlot', 'Petit Verdot', 'Cabernet Franc'],
      color: 'Deep Ruby',
      alcoholContent: 13.5,
      sugarContent: 'Dry',
      taste: ['Black Cherry', 'Cassis', 'Cedar', 'Tobacco'],
      aroma: ['Violets', 'Graphite', 'Dark Berries'],
      foodPairing: ['Lamb', 'Beef Wellington', 'Aged Cheese'],
      rating: 4.8,
      reviews: 127,
      sommelierNotes: 'Exceptional vintage with remarkable aging potential.',
      image: 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=300&h=400&fit=crop',
      price: 450,
    },
    {
      id: '2',
      name: 'Cloudy Bay Sauvignon Blanc',
      winery: 'Cloudy Bay',
      vintage: 2022,
      region: 'Marlborough, New Zealand',
      description: 'Crisp and refreshing with distinctive tropical and citrus flavors.',
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
      image: 'https://images.unsplash.com/photo-1558008258-3256797b43f3?w=300&h=400&fit=crop',
      price: 28,
    },
    {
      id: '3',
      name: 'Barolo Brunate 2018',
      winery: 'Giuseppe Rinaldi',
      vintage: 2018,
      region: 'Piedmont, Italy',
      description: 'Traditional Barolo with complex tannins and exceptional longevity.',
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
      image: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=300&h=400&fit=crop',
      price: 85,
    },
    {
      id: '4',
      name: 'Screaming Eagle Cabernet 2019',
      winery: 'Screaming Eagle Winery',
      vintage: 2019,
      region: 'Napa Valley, USA',
      description:
        'One of the most coveted cult Cabernets with extraordinary depth and complexity.',
      grapeVariety: ['Cabernet Sauvignon'],
      color: 'Deep Purple',
      alcoholContent: 15.2,
      sugarContent: 'Dry',
      taste: ['Blackcurrant', 'Dark Chocolate', 'Espresso', 'Vanilla'],
      aroma: ['Black Fruits', 'Mocha', 'Cedar', 'Spice'],
      foodPairing: ['Prime Rib', 'Grilled Portobello', 'Dark Chocolate'],
      rating: 4.9,
      reviews: 43,
      sommelierNotes:
        'A wine of extraordinary power and finesse that defines Napa Valley excellence.',
      image: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=300&h=400&fit=crop',
      price: 3200,
    },
    {
      id: '5',
      name: 'Krug Grande Cuvée',
      winery: 'Krug',
      vintage: 2015,
      region: 'Champagne, France',
      description: 'The ultimate expression of Champagne craftsmanship and artistry.',
      grapeVariety: ['Chardonnay', 'Pinot Noir', 'Pinot Meunier'],
      color: 'Golden Yellow',
      alcoholContent: 12.0,
      sugarContent: 'Brut',
      taste: ['Brioche', 'Honey', 'Citrus', 'Almonds'],
      aroma: ['Fresh Bread', 'White Flowers', 'Mineral'],
      foodPairing: ['Oysters', 'Caviar', 'Lobster'],
      rating: 4.8,
      reviews: 156,
      sommelierNotes: 'A champagne of unparalleled complexity and elegance.',
      image: 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=300&h=400&fit=crop',
      price: 185,
    },
  ],

  getTrendingWines: (): TrendingWine[] => [
    {
      id: '6',
      name: 'Champagne Dom Pérignon 2012',
      winery: 'Dom Pérignon',
      vintage: 2012,
      region: 'Champagne, France',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=200&h=300&fit=crop',
      price: 180,
    },
    {
      id: '7',
      name: 'Opus One 2019',
      winery: 'Opus One',
      vintage: 2019,
      region: 'Napa Valley, USA',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=200&h=300&fit=crop',
      price: 320,
    },
    {
      id: '8',
      name: 'Caymus Cabernet Sauvignon',
      winery: 'Caymus Vineyards',
      vintage: 2021,
      region: 'Napa Valley, USA',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1586370434639-0fe43b2d32d6?w=200&h=300&fit=crop',
      price: 85,
    },
    {
      id: '9',
      name: 'Whispering Angel Rosé',
      winery: "Château d'Esclans",
      vintage: 2022,
      region: 'Provence, France',
      rating: 4.3,
      image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=200&h=300&fit=crop',
      price: 22,
    },
    {
      id: '10',
      name: 'Silver Oak Alexander Valley',
      winery: 'Silver Oak Cellars',
      vintage: 2019,
      region: 'Alexander Valley, USA',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=200&h=300&fit=crop',
      price: 89,
    },
    {
      id: '11',
      name: 'La Crema Pinot Noir',
      winery: 'La Crema',
      vintage: 2020,
      region: 'Sonoma County, USA',
      rating: 4.2,
      image: 'https://images.unsplash.com/photo-1586370434639-0fe43b2d32d6?w=200&h=300&fit=crop',
      price: 28,
    },
  ],

  getBadges: (): Badge[] => [
    {
      id: 'first-scan',
      name: 'First Scan',
      icon: '🔍',
      unlocked: true,
      description: 'Scanned your first wine bottle',
    },
    {
      id: 'wine-explorer',
      name: 'Wine Explorer',
      icon: '🍷',
      unlocked: true,
      description: 'Tried wines from 3 different regions',
    },
    {
      id: 'streak-master',
      name: 'Streak Master',
      icon: '🔥',
      unlocked: false,
      description: 'Scan wines for 7 consecutive days',
      progress: 3,
      maxProgress: 7,
    },
    {
      id: 'connoisseur',
      name: 'Wine Connoisseur',
      icon: '🎯',
      unlocked: false,
      description: 'Rate 25 different wines',
      progress: 12,
      maxProgress: 25,
    },
    {
      id: 'sommelier-apprentice',
      name: 'Sommelier Apprentice',
      icon: '🍾',
      unlocked: false,
      description: 'Complete detailed tasting notes for 10 wines',
      progress: 4,
      maxProgress: 10,
    },
    {
      id: 'globe-trotter',
      name: 'Globe Trotter',
      icon: '🌍',
      unlocked: false,
      description: 'Try wines from 10 different countries',
      progress: 6,
      maxProgress: 10,
    },
  ],

  // Utility methods
  searchWines: (query: string): (FeaturedWine | TrendingWine)[] => {
    const allWines = [...wineDataService.getFeaturedWines(), ...wineDataService.getTrendingWines()];
    const lowercaseQuery = query.toLowerCase();

    return allWines.filter(
      wine =>
        wine.name.toLowerCase().includes(lowercaseQuery) ||
        wine.winery.toLowerCase().includes(lowercaseQuery) ||
        wine.region.toLowerCase().includes(lowercaseQuery),
    );
  },

  getWinesByCategory: (category: string): (FeaturedWine | TrendingWine)[] => {
    const featuredWines = wineDataService.getFeaturedWines();
    const trendingWines = wineDataService.getTrendingWines();

    // For featured wines, we can check grape variety
    const featuredByCategory = featuredWines.filter(wine => {
      switch (category.toLowerCase()) {
        case 'red':
          return wine.grapeVariety.some(grape =>
            ['Cabernet Sauvignon', 'Merlot', 'Nebbiolo', 'Pinot Noir'].includes(grape),
          );
        case 'white':
          return wine.grapeVariety.some(grape =>
            ['Sauvignon Blanc', 'Chardonnay', 'Riesling'].includes(grape),
          );
        case 'sparkling':
          return (
            wine.grapeVariety.some(grape =>
              ['Chardonnay', 'Pinot Noir', 'Pinot Meunier'].includes(grape),
            ) &&
            (wine.name.includes('Champagne') || wine.name.includes('Krug'))
          );
        default:
          return true;
      }
    });

    // For trending wines, use name-based filtering
    const trendingByCategory = trendingWines.filter(wine => {
      switch (category.toLowerCase()) {
        case 'red':
          return (
            wine.name.includes('Cabernet') ||
            wine.name.includes('Pinot Noir') ||
            wine.name.includes('Opus')
          );
        case 'white':
          return false; // No white wines in trending currently
        case 'sparkling':
          return wine.name.includes('Champagne') || wine.name.includes('Dom Pérignon');
        case 'rose':
          return wine.name.includes('Rosé');
        default:
          return true;
      }
    });

    return [...featuredByCategory, ...trendingByCategory];
  },

  getWineById: (id: string): FeaturedWine | TrendingWine | undefined => {
    const allWines = [...wineDataService.getFeaturedWines(), ...wineDataService.getTrendingWines()];
    return allWines.find(wine => wine.id === id);
  },
};
