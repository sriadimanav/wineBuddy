// components/faq/FAQCategory.tsx
import type { FAQCategoryProps } from '@ts/index';

import { FAQItem } from './FAQItem';

export function FAQCategory({
  category,
  categoryIndex,
  expandedItems,
  onToggleExpanded,
}: FAQCategoryProps) {
  const IconComponent = category.iconComponent;

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm">
      {/* Category Header */}
      <div className="flex items-center p-4 bg-gray-50 border-b">
        <IconComponent className={`h-5 w-5 ${category.iconColor}`} />
        <h2 className="ml-3 text-lg font-medium text-gray-900">{category.category}</h2>
      </div>

      {/* Questions */}
      <div className="divide-y divide-gray-100">
        {category.questions.map((faq, questionIndex) => {
          const questionId = `${categoryIndex}-${questionIndex}`;
          const isExpanded = expandedItems.includes(questionId);

          return (
            <FAQItem
              key={questionIndex}
              faq={faq}
              isExpanded={isExpanded}
              onToggle={() => onToggleExpanded(questionId)}
            />
          );
        })}
      </div>
    </div>
  );
}
