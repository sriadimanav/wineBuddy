// constants/wineDetail.ts
import { Grape, Utensils, Wine } from 'lucide-react';

import type { TabType } from '@ts/index';

export const WINE_DETAIL_TABS = [
  { id: 'overview' as TabType, label: 'Overview', icon: Wine },
  { id: 'tasting' as TabType, label: 'Tasting Notes', icon: Grape },
  { id: 'pairing' as TabType, label: 'Food Pairing', icon: Utensils },
] as const;

export const SERVING_TEMPERATURES = {
  WHITE_WINE: '45-50°F (7-10°C)',
  RED_WINE: '60-65°F (15-18°C)',
  CHAMPAGNE: '40-45°F (4-7°C)',
} as const;

export const WHITE_WINE_GRAPES = ['Chardonnay', 'Sauvignon Blanc', 'Pinot Grigio', 'Riesling'];
export const RED_WINE_GRAPES = ['Cabernet Sauvignon', 'Merlot', 'Pinot Noir', 'Nebbiolo'];
export const SPARKLING_GRAPES = ['Champagne', 'Prosecco', 'Cava'];
