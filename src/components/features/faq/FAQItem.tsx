// components/faq/FAQItem.tsx
import { ChevronDown, ChevronUp } from 'lucide-react';

import type { FAQItemProps } from '@ts/index';

export function FAQItem({ faq, isExpanded, onToggle }: FAQItemProps) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors">
        <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-gray-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
        )}
      </button>

      {isExpanded && (
        <div className="px-4 pb-4">
          <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
        </div>
      )}
    </div>
  );
}
