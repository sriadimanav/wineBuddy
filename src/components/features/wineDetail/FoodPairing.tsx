// components/wineDetail/FoodPairing.tsx
import { Utensils } from 'lucide-react';

import type { FoodPairingProps } from '@ts/index';

import { useWineServing } from './useWineServing';

export function FoodPairing({ wine }: FoodPairingProps) {
  const { servingTemperature, decantingAdvice } = useWineServing(wine);

  return (
    <div className="space-y-6">
      {/* Food Pairings */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Perfect Pairings</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {wine.foodPairing.map(food => (
            <div
              key={food}
              className="flex items-center p-4 bg-green-50 rounded-lg border border-green-200">
              <Utensils className="w-5 h-5 text-green-600 mr-3" />
              <span className="text-gray-900 font-medium">{food}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Serving Suggestions */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Serving Suggestions</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
              <span className="text-blue-600 text-sm">🌡️</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Serving Temperature</h4>
              <p className="text-gray-600">{servingTemperature}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-0.5">
              <span className="text-purple-600 text-sm">🍷</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Decanting</h4>
              <p className="text-gray-600">{decantingAdvice}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
