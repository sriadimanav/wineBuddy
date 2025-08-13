// components/features/home/WineCategoriesSection.tsx
import { Award } from 'lucide-react';

import { WINE_CATEGORIES } from '@/constants/home';

import { useScreenSize } from '@components/hooks/useMediaQueries';
import { AdaptiveGrid } from '@components/layout/ResponsiveLayout';

import type { WineCategoriesSectionProps } from '@ts/index';

export function WineCategoriesSection({ onCategoryClick }: WineCategoriesSectionProps) {
  const screenSize = useScreenSize();

  return (
    <section>
      <h2
        className={`font-bold text-foreground mb-6 ${
          screenSize === 'kiosk' ? 'text-2xl' : 'text-xl'
        }`}>
        Explore by Category
      </h2>

      <AdaptiveGrid cols={{ mobile: 2, tablet: 2, desktop: 2, kiosk: 4 }} gap="1.5rem">
        {WINE_CATEGORIES.map(category => (
          <div
            key={category.id}
            onClick={() => onCategoryClick(category)}
            className={`${category.bgColor} ${category.borderColor} border rounded-lg p-3 cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all duration-200 wine-rosé-card`}>
            <div
              className={`w-6 h-6 ${category.iconBgColor} rounded-md flex items-center justify-center mb-2`}>
              <Award className="w-3 h-3 text-white" />
            </div>
            <h3 className="font-medium text-foreground mb-1 text-sm">{category.name}</h3>
            <p className="text-xs text-muted-foreground">{category.description}</p>
          </div>
        ))}
      </AdaptiveGrid>
    </section>
  );
}
