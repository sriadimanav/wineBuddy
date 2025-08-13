// components/wineDetail/WineOverview.tsx
import { Award, Grape } from 'lucide-react';

import type { WineOverviewProps } from '@ts/index';

export function WineOverview({ wine }: WineOverviewProps) {
  return (
    <div className="space-y-6">
      {/* Grape Varieties */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Grape className="w-5 h-5 mr-2 text-wine-accent" />
          Grape Varieties
        </h3>
        <div className="flex flex-wrap gap-2">
          {wine.grapeVariety.map(grape => (
            <span
              key={grape}
              className="px-3 py-2 bg-red-50 text-wine-accent border border-red-200 rounded-full text-sm font-medium">
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
        <p className="text-gray-700 leading-relaxed italic">"{wine.sommelierNotes}"</p>
      </div>

      {/* Wine Stats */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Wine Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-600 mb-1">Vintage</div>
            <div className="font-semibold text-gray-900">{wine.vintage}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-1">Alcohol Content</div>
            <div className="font-semibold text-gray-900">{wine.alcoholContent}%</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-1">Sugar Content</div>
            <div className="font-semibold text-gray-900">{wine.sugarContent}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-1">Color</div>
            <div className="font-semibold text-gray-900">{wine.color}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
