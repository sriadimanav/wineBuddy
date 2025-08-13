// constants/faq.ts
import { Camera, Heart, HelpCircle, Star } from 'lucide-react';

import type { FAQCategory } from '@ts/index';

export const FAQ_DATA: readonly FAQCategory[] = [
  {
    category: 'Getting Started',
    iconComponent: HelpCircle,
    iconColor: 'text-blue-600',
    questions: [
      {
        question: 'How do I scan a wine label?',
        answer:
          'To scan a wine label, tap the scan button in the bottom navigation, point your camera at the wine label or barcode, and wait for the app to recognize it. Make sure the label is well-lit and clearly visible.',
      },
      {
        question: 'What information can I get about a wine?',
        answer:
          'Wine Buddy provides comprehensive information including vintage, winery details, region, grape variety, tasting notes, aroma descriptions, alcohol content, food pairings, sommelier reviews, and user ratings.',
      },
      {
        question: 'How accurate is the wine recognition?',
        answer:
          'Our AI-powered recognition system has a 95% accuracy rate for popular wines and labels. The accuracy depends on image quality, lighting conditions, and label visibility.',
      },
    ],
  },
  {
    category: 'Features',
    iconComponent: Camera,
    iconColor: 'text-purple-600',
    questions: [
      {
        question: 'Can I scan wine barcodes?',
        answer:
          'Yes! Wine Buddy can scan both wine labels and barcodes. Barcode scanning is often more reliable and works well even in low-light conditions.',
      },
      {
        question: 'How do I save wines to my favorites?',
        answer:
          'When viewing wine details, tap the heart icon in the top right corner. You can view all your saved wines in the Favorites tab.',
      },
      {
        question: 'Can I rate and review wines?',
        answer:
          'Yes, you can rate wines on a 5-star scale and write personal tasting notes. Your reviews help improve recommendations for other users.',
      },
      {
        question: 'How do food pairings work?',
        answer:
          'Our sommelier experts provide curated food pairing suggestions for each wine based on flavor profiles, acidity, tannins, and traditional pairing principles.',
      },
    ],
  },
  {
    category: 'Technical',
    iconComponent: Star,
    iconColor: 'text-yellow-600',
    questions: [
      {
        question: "Why isn't my camera working?",
        answer:
          "Make sure you've granted camera permissions to Wine Buddy in your device settings. If the issue persists, try restarting the app or your device.",
      },
      {
        question: "What if a wine isn't recognized?",
        answer:
          "If a wine isn't recognized, you can manually search for it using the search feature or upload a photo for our team to review and add to our database.",
      },
      {
        question: 'Does the app work offline?',
        answer:
          'Basic app functionality works offline, but wine scanning and detailed information require an internet connection to access our wine database.',
      },
      {
        question: 'How do I update my wine preferences?',
        answer:
          'Go to your Profile screen and tap on "Account Settings" to update your wine preferences, price ranges, and favorite regions.',
      },
    ],
  },
  {
    category: 'Account & Privacy',
    iconComponent: Heart,
    iconColor: 'text-red-600',
    questions: [
      {
        question: 'How is my data protected?',
        answer:
          'We use industry-standard encryption to protect your data. Your personal information and wine preferences are never shared with third parties without your consent.',
      },
      {
        question: 'Can I delete my account?',
        answer:
          'Yes, you can delete your account at any time through the Profile > Account Settings > Delete Account option. This action is permanent and cannot be undone.',
      },
      {
        question: 'How do I export my wine collection?',
        answer:
          'You can export your favorites and tasting notes as a PDF or CSV file through Profile > Account Settings > Export Data.',
      },
    ],
  },
] as const;
