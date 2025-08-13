// constants/scan.ts
import type { FeaturedWine } from '@ts/index';

export const SCAN_TEXTS = {
  initial: 'Point your camera at a wine label or barcode',
  scanning: 'Scanning...',
  detected: 'Wine detected! Analyzing...',
  analyzing: 'Getting wine details...',
  found: 'Wine Found!',
} as const;

export const MOCK_SCAN_RESULTS: readonly FeaturedWine[] = [
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
    taste: ['Blackberry', 'Cassis', 'Vanilla', 'Oak'],
    aroma: ['Dark Fruits', 'Cedar', 'Spice'],
    foodPairing: ['Grilled Steak', 'Lamb Chops', 'Dark Chocolate'],
    rating: 4.4,
    reviews: 156,
    sommelierNotes: 'Excellent everyday Cabernet with consistent quality year after year.',
    image: 'https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?w=300&h=400&fit=crop',
    price: 65,
  },
  {
    id: 'scan-2',
    name: "Kendall-Jackson Vintner's Reserve Chardonnay",
    winery: 'Kendall-Jackson',
    vintage: 2021,
    region: 'California, USA',
    description: 'Balanced Chardonnay with tropical fruit flavors and a hint of oak.',
    grapeVariety: ['Chardonnay'],
    color: 'Golden Yellow',
    alcoholContent: 13.5,
    sugarContent: 'Dry',
    taste: ['Pineapple', 'Pear', 'Vanilla', 'Butter'],
    aroma: ['Tropical Fruits', 'Citrus', 'Oak'],
    foodPairing: ['Roasted Chicken', 'Seafood', 'Creamy Pasta'],
    rating: 4.2,
    reviews: 203,
    sommelierNotes: 'A reliable crowd-pleaser with perfect balance of fruit and oak.',
    image: 'https://images.unsplash.com/photo-1558008258-3256797b43f3?w=300&h=400&fit=crop',
    price: 18,
  },
  {
    id: 'scan-3',
    name: 'Opus One 2019',
    winery: 'Opus One',
    vintage: 2019,
    region: 'Napa Valley, USA',
    description: 'Bordeaux-style blend representing the pinnacle of Napa Valley winemaking.',
    grapeVariety: ['Cabernet Sauvignon', 'Merlot', 'Petit Verdot'],
    color: 'Deep Purple',
    alcoholContent: 14.5,
    sugarContent: 'Dry',
    taste: ['Blackcurrant', 'Chocolate', 'Espresso', 'Spice'],
    aroma: ['Dark Berries', 'Cedar', 'Vanilla'],
    foodPairing: ['Prime Rib', 'Duck Confit', 'Dark Chocolate'],
    rating: 4.7,
    reviews: 134,
    sommelierNotes: 'Collaboration between Mondavi and Rothschild reaches new heights.',
    image: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=300&h=400&fit=crop',
    price: 320,
  },
  {
    id: 'scan-4',
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
] as const;

export const SCAN_CONFIG = {
  PROGRESS_INTERVAL: 150, // ms between progress updates
  PROGRESS_INCREMENT: 10, // percentage to increment each time
  SCAN_STAGES: {
    DETECTION_DELAY: 1500, // ms
    ANALYSIS_DELAY: 1500, // ms
    COMPLETION_DELAY: 1500, // ms
  },
  SUCCESS_DISPLAY_TIME: 1500, // ms to show success before redirect
} as const;

export type ScanTextKey = keyof typeof SCAN_TEXTS;
