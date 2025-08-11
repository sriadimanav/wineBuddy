import { useState } from 'react'
import {
  ChevronDown,
  ChevronUp,
  Search,
  Camera,
  Heart,
  Star,
  HelpCircle,
} from 'lucide-react'
import { Input } from '@ui/Input'
import { Button } from '@ui/Button'

interface FAQScreenProps {
  onBack: () => void
}

const faqData = [
  {
    category: 'Getting Started',
    icon: <HelpCircle className="h-5 w-5 text-blue-600" />,
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
    icon: <Camera className="h-5 w-5 text-purple-600" />,
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
    icon: <Star className="h-5 w-5 text-yellow-600" />,
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
    icon: <Heart className="h-5 w-5 text-red-600" />,
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
]

export function FAQScreen({ onBack }: FAQScreenProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (questionId: string) => {
    setExpandedItems((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId],
    )
  }

  const filteredFAQ = faqData
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-6">
        <div className="mb-6">
          <h1 className="text-2xl mb-2">Frequently Asked Questions</h1>
          <p className="text-gray-600">
            Find answers to common questions about Wine Buddy
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search FAQ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* FAQ Content */}
      <div className="px-6 py-6">
        {filteredFAQ.length === 0 ? (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg text-gray-600 mb-2">No results found</h3>
            <p className="text-gray-500">
              Try searching with different keywords
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredFAQ.map((category, categoryIndex) => (
              <div
                key={categoryIndex}
                className="bg-white rounded-xl overflow-hidden shadow-sm"
              >
                {/* Category Header */}
                <div className="flex items-center p-4 bg-gray-50 border-b">
                  {category.icon}
                  <h2 className="ml-3 text-lg font-medium text-gray-900">
                    {category.category}
                  </h2>
                </div>

                {/* Questions */}
                <div className="divide-y divide-gray-100">
                  {category.questions.map((faq, questionIndex) => {
                    const questionId = `${categoryIndex}-${questionIndex}`
                    const isExpanded = expandedItems.includes(questionId)

                    return (
                      <div key={questionIndex}>
                        <button
                          onClick={() => toggleExpanded(questionId)}
                          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-medium text-gray-900 pr-4">
                            {faq.question}
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="h-5 w-5 text-gray-400 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                          )}
                        </button>

                        {isExpanded && (
                          <div className="px-4 pb-4">
                            <p className="text-gray-700 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Contact Support */}
      <div className="px-6 pb-6">
        <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
          <h3 className="text-lg mb-2 text-purple-900">Still need help?</h3>
          <p className="text-purple-700 mb-4">
            Can't find what you're looking for? Our support team is here to
            help.
          </p>
          <div className="flex space-x-3">
            <Button className="bg-purple-600 hover:bg-purple-700">
              Contact Support
            </Button>
            <Button
              variant="outline"
              className="border-purple-200 text-purple-700 hover:bg-purple-50"
            >
              Send Feedback
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
