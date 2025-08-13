// components/faq/FAQEmptyState.tsx
import { Search } from 'lucide-react';

export function FAQEmptyState() {
  return (
    <div className="text-center py-12">
      <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg text-gray-600 mb-2">No results found</h3>
      <p className="text-gray-500">Try searching with different keywords</p>
    </div>
  );
}
