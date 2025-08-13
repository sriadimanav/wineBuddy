// components/auth/AuthHeader.tsx
import { Wine } from 'lucide-react';

interface AuthHeaderProps {
  screenSize: string;
}

export function AuthHeader({ screenSize }: AuthHeaderProps) {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-2xl mb-4">
        <Wine className="w-10 h-10 text-wine-accent" />
      </div>
      <h1
        className={`font-bold text-white mb-2 ${screenSize === 'kiosk' ? 'text-4xl' : 'text-3xl'}`}>
        Wine Buddy
      </h1>
      <p className={`text-white/80 ${screenSize === 'kiosk' ? 'text-lg' : 'text-base'}`}>
        Your wine discovery companion
      </p>
    </div>
  );
}
