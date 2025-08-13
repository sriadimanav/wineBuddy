// components/wineDetail/WineTabs.tsx
import { WINE_DETAIL_TABS } from '@/constants/wineDetail';

import type { WineTabsProps } from '@ts/index';

export function WineTabs({ activeTab, onTabChange }: WineTabsProps) {
  return (
    <div className="bg-white sticky top-16 z-20 shadow-sm">
      <div className="px-6">
        <div className="flex space-x-8 overflow-x-auto">
          {WINE_DETAIL_TABS.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-wine-accent text-wine-accent'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}>
                <Icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
