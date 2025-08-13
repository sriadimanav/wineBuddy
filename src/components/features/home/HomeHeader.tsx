// components/features/home/HomeHeader.tsx
import { Filter, Search } from 'lucide-react';

import { HOME_MESSAGES } from '@/constants/home';
import { useScreenSize } from '@components/hooks/useMediaQueries';
import type { HomeHeaderProps } from '@ts/home';

export function HomeHeader({ user, searchQuery, onSearchChange, onProfileClick }: HomeHeaderProps) {
  const screenSize = useScreenSize();

  return (
    <div className="bg-card shadow-sm">
      <div className="px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1">
            <h1
              className={`font-bold text-foreground mb-1 ${
                screenSize === 'kiosk' ? 'text-3xl' : 'text-2xl'
              }`}>
              {HOME_MESSAGES.WELCOME_PREFIX} {user.name}
            </h1>
            <p
              className={`text-muted-foreground ${
                screenSize === 'kiosk' ? 'text-lg' : 'text-base'
              }`}>
              {HOME_MESSAGES.DISCOVER_SUBTITLE}
            </p>
          </div>
          <div
            onClick={onProfileClick}
            className={`rounded-full bg-wine-accent flex items-center justify-center text-white font-semibold cursor-pointer hover:bg-wine-light transition-colors ${
              screenSize === 'kiosk' ? 'w-16 h-16 text-xl' : 'w-12 h-12'
            }`}>
            {user.name.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <input
            type="text"
            placeholder="Search wines, wineries, regions..."
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-12 py-3 border border-border rounded-xl bg-background text-foreground focus:ring-2 focus:ring-wine-accent focus:border-transparent"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 hover:bg-secondary rounded-lg transition-colors">
            <Filter className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}
