// components/wineDetail/WineActions.tsx
import { Heart, Plus } from 'lucide-react';

import type { WineActionsProps } from '@ts/index';

export function WineActions({ isFavorite, onToggleFavorite }: WineActionsProps) {
  return (
    <div className="fixed bottom-16 left-0 right-0 bg-white p-4 z-30 border-t border-gray-200">
      <div className="flex space-x-3 max-w-screen-xl mx-auto">
        <button
          onClick={onToggleFavorite}
          className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all flex items-center justify-center ${
            isFavorite
              ? 'bg-red-100 text-red-600 border border-red-200'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}>
          <Heart className={`w-5 h-5 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>

        <button className="bg-wine-accent hover:bg-wine-light text-white py-3 px-6 rounded-xl font-semibold transition-all flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Add Note
        </button>
      </div>
    </div>
  );
}
