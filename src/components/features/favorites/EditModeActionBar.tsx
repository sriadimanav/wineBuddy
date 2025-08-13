// components/favorites/EditModeActionBar.tsx
import { Edit3, Trash2 } from 'lucide-react';

import type { EditModeActionBarProps } from '@ts/index';

export function EditModeActionBar({
  selectedCount,
  onDeleteSelected,
  screenSize,
}: EditModeActionBarProps) {
  return (
    <div
      className="fixed left-4 right-4 bg-white border border-gray-200 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg"
      style={{
        bottom: screenSize === 'kiosk' ? '96px' : screenSize === 'desktop' ? '88px' : '80px',
      }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Edit3 size={16} className="text-wine-accent" />
          <span className="text-sm font-medium text-gray-700">
            {selectedCount > 0 ? `${selectedCount} selected` : 'Select items to remove'}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          {selectedCount > 0 && (
            <button
              onClick={onDeleteSelected}
              className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center transition-colors">
              <Trash2 size={14} className="mr-1" />
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
