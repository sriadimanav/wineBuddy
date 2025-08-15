// components/FAQScreen.tsx
import { FAQ_DATA } from '@/constants/faq';

import { useFAQSearch } from '@components/features/faq/useFAQSearch';

//import type { FAQScreenProps } from '@ts/index';

import { FAQCategory } from './FAQCategory';
import { FAQEmptyState } from './FAQEmptyState';
import { FAQSearch } from './FAQSearch';
import { FAQSupport } from './FAQSupport';

export function FAQScreen() {
  const { searchQuery, setSearchQuery, filteredFAQ, expandedItems, toggleExpanded } =
    useFAQSearch(FAQ_DATA);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-6">
        <div className="mb-6">
          <h1 className="text-2xl mb-2">Frequently Asked Questions</h1>
          <p className="text-gray-600">Find answers to common questions about Wine Buddy</p>
        </div>

        {/* Search */}
        <FAQSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      </div>

      {/* FAQ Content */}
      <div className="px-6 py-6">
        {filteredFAQ.length === 0 ? (
          <FAQEmptyState />
        ) : (
          <div className="space-y-6">
            {filteredFAQ.map((category, categoryIndex) => (
              <FAQCategory
                key={categoryIndex}
                category={category}
                categoryIndex={categoryIndex}
                expandedItems={expandedItems}
                onToggleExpanded={toggleExpanded}
              />
            ))}
          </div>
        )}
      </div>

      {/* Contact Support */}
      <FAQSupport />
    </div>
  );
}
