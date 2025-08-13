// hooks/useFAQSearch.ts
import { useMemo, useState } from 'react';

import type { FAQCategory } from '@ts/index';

export const useFAQSearch = (faqData: readonly FAQCategory[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const filteredFAQ = useMemo(() => {
    if (!searchQuery.trim()) return faqData;

    return faqData
      .map(category => ({
        ...category,
        questions: category.questions.filter(
          q =>
            q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      }))
      .filter(category => category.questions.length > 0);
  }, [faqData, searchQuery]);

  const toggleExpanded = (questionId: string) => {
    setExpandedItems(prev =>
      prev.includes(questionId) ? prev.filter(id => id !== questionId) : [...prev, questionId],
    );
  };

  return {
    searchQuery,
    setSearchQuery,
    filteredFAQ,
    expandedItems,
    toggleExpanded,
  };
};
