// types/faq.ts
import type { LucideIcon } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  category: string;
  iconComponent: LucideIcon;
  iconColor: string;
  questions: FAQItem[];
}

export interface FAQScreenProps {
  onBack: () => void;
}

export interface FAQSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export interface FAQCategoryProps {
  category: FAQCategory;
  categoryIndex: number;
  expandedItems: string[];
  onToggleExpanded: (questionId: string) => void;
}

export interface FAQItemProps {
  faq: FAQItem;
  isExpanded: boolean;
  onToggle: () => void;
}
