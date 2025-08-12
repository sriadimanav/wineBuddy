import { Award } from 'lucide-react';
import { useScreenSize } from '../../hooks/useMediaQueries';
import { AdaptiveGrid } from '../../layout/ResponsiveLayout';

interface Category {
  id: string;
  name: string;
  description: string;
  bgColor: string;
  borderColor: string;
  iconBgColor: string;
  onClickValue: WineCategory;
}
type WineCategory = 'Red Wines' | 'White Wines' | 'Sparkling Wines' | 'Rosé Wines';

interface WineCategoriesSectionProps {
  onCategoryClick: (category: WineCategory) => void;
}

const categories: Category[] = [
  {
    id: 'red',
    name: 'Red Wines',
    description: 'Bold & Complex',
    bgColor: 'bg-wine-blush',
    borderColor: 'border-border',
    iconBgColor: 'bg-wine-accent',
    onClickValue: 'Red Wines',
  },
  {
    id: 'white',
    name: 'White Wines',
    description: 'Fresh & Crisp',
    bgColor: 'bg-wine-whisper',
    borderColor: 'border-border',
    iconBgColor: 'bg-wine-light',
    onClickValue: 'White Wines',
  },
  {
    id: 'rose',
    name: 'Rosé Wines',
    description: 'Light & Refreshing',
    bgColor: 'bg-wine-pearl',
    borderColor: 'border-border',
    iconBgColor: 'bg-wine-accent',
    onClickValue: 'Rosé Wines',
  },
  {
    id: 'sparkling',
    name: 'Sparkling',
    description: 'Bubbly & Festive',
    bgColor: 'bg-wine-soft',
    borderColor: 'border-border',
    iconBgColor: 'bg-wine-medium',
    onClickValue: 'Sparkling Wines',
  },
];

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
        {categories.map(category => (
          <div
            key={category.id}
            onClick={() => onCategoryClick(category.onClickValue)}
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
