// hooks/useWineServing.ts
import { RED_WINE_GRAPES, SERVING_TEMPERATURES, WHITE_WINE_GRAPES } from '@/constants/wineDetail';
import type { FeaturedWine } from '@ts/index';

export const useWineServing = (wine: FeaturedWine) => {
  const getServingTemperature = (): string => {
    const hasWhiteGrapes = wine.grapeVariety.some(grape => WHITE_WINE_GRAPES.includes(grape));
    const hasRedGrapes = wine.grapeVariety.some(grape => RED_WINE_GRAPES.includes(grape));

    if (wine.sugarContent === 'Brut' || wine.color.toLowerCase().includes('golden')) {
      return SERVING_TEMPERATURES.CHAMPAGNE;
    }
    if (hasWhiteGrapes) {
      return SERVING_TEMPERATURES.WHITE_WINE;
    }
    if (hasRedGrapes) {
      return SERVING_TEMPERATURES.RED_WINE;
    }

    return SERVING_TEMPERATURES.RED_WINE; // Default
  };

  const getDecantingAdvice = (): string => {
    const needsDecanting = wine.grapeVariety.some(grape =>
      ['Cabernet Sauvignon', 'Merlot', 'Nebbiolo', 'Syrah', 'Shiraz'].includes(grape),
    );

    return needsDecanting
      ? 'Decant for 30-60 minutes before serving'
      : 'Best served immediately after opening';
  };

  return {
    servingTemperature: getServingTemperature(),
    decantingAdvice: getDecantingAdvice(),
  };
};
