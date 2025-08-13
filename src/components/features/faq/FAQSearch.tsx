// components/faq/FAQSearch.tsx
import { Search } from 'lucide-react';

import { Input } from '@components/ui/Input';
import type { FAQSearchProps } from '@ts/index';

export function FAQSearch({ searchQuery, onSearchChange }: FAQSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        placeholder="Search FAQ..."
        value={searchQuery}
        onChange={e => onSearchChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
}
