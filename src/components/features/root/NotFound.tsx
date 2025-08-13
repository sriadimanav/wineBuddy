// components/common/NotFound.tsx
import { Link } from '@tanstack/react-router';
import { Wine } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col bg-background">
      <div className="text-center">
        <div className="mb-6">
          <Wine className="w-16 h-16 text-wine-accent mx-auto mb-4" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-4">404 - Page Not Found</h1>
        <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
          The wine you're looking for seems to have been uncorked! Let's get you back to discovering
          amazing wines.
        </p>
        <Link
          to="/"
          className="inline-flex items-center bg-wine-accent hover:bg-wine-light text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-lg hover:shadow-xl">
          <Wine className="w-4 h-4 mr-2" />
          Back to Wine Discovery
        </Link>
      </div>
    </div>
  );
}
