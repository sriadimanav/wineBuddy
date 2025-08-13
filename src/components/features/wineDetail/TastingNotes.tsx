// components/wineDetail/TastingNotes.tsx
import type { TastingNotesProps } from '@ts/index';

export function TastingNotes({ wine }: TastingNotesProps) {
  return (
    <div className="space-y-6">
      {/* Taste Profile */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Taste Profile</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {wine.taste.map(taste => (
            <div
              key={taste}
              className="flex items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
              <span className="text-gray-900 font-medium">{taste}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Aroma Profile */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Aroma Profile</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {wine.aroma.map(aroma => (
            <div
              key={aroma}
              className="flex items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
              <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
              <span className="text-gray-900 font-medium">{aroma}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
