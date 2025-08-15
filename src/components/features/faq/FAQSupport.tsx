// components/faq/FAQSupport.tsx
import { Button } from '@components/ui/Button';

export function FAQSupport() {
  return (
    <div className="px-6 pb-6">
      <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
        <h3 className="text-lg mb-2 text-purple-900">Still need help?</h3>
        <p className="text-purple-700 mb-4">
          {`Can't find what you're looking for? Our support team is here to help.`}
        </p>
        <div className="flex space-x-3">
          <Button className="bg-purple-600 hover:bg-purple-700">Contact Support</Button>
          <Button
            variant="outline"
            className="border-purple-200 text-purple-700 hover:bg-purple-50">
            Send Feedback
          </Button>
        </div>
      </div>
    </div>
  );
}
