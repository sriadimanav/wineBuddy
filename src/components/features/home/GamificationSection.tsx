import { Camera, Trophy, Zap } from 'lucide-react';

import type { Badge } from '@ts/badge';
import type { User } from '@ts/user';

import { AdaptiveGrid } from '../../layout/ResponsiveLayout';

interface GamificationSectionProps {
  user: User;
  badges: Badge[];
}

export function GamificationSection({ user, badges }: GamificationSectionProps) {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-sm wine-rosé-card">
      <h2 className="text-lg font-semibold text-foreground mb-4">Your Wine Journey</h2>

      <AdaptiveGrid cols={{ mobile: 1, tablet: 2, desktop: 2, kiosk: 3 }} gap="1rem">
        {/* Streak Counter */}
        <div className="gamification-streak rounded-xl p-4 wine-hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <div className="mb-2">
                <span className="font-semibold">Daily Streak</span>
              </div>
              <div className="text-2xl font-bold">{user.streakCount || 0} days</div>
            </div>
            <div className="text-3xl">
              <Zap className="w-8 h-8 text-white/80" />
            </div>
          </div>
        </div>

        {/* Total Scans */}
        <div className="gamification-scans rounded-xl p-4 wine-hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <div className="mb-2">
                <span className="font-semibold">Wines Scanned</span>
              </div>
              <div className="text-2xl font-bold">{user.totalScans || 0}</div>
            </div>
            <div className="text-3xl">
              <Camera className="w-8 h-8 text-white/80" />
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="gamification-badges rounded-xl p-4 wine-hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <div className="mb-2">
                <span className="font-semibold">Badges Earned</span>
              </div>
              <div className="text-2xl font-bold">{badges.filter(b => b.unlocked).length}</div>
            </div>
            <div className="text-3xl">
              <Trophy className="w-8 h-8 text-white/80" />
            </div>
          </div>
        </div>
      </AdaptiveGrid>

      {/* Badges Row */}
      <div className="mt-4 flex space-x-3 overflow-x-auto pb-2">
        {badges.map(badge => (
          <div
            key={badge.id}
            className={`flex-shrink-0 w-20 h-20 rounded-xl flex flex-col items-center justify-center transition-all ${
              badge.unlocked ? 'text-white shadow-lg' : 'bg-secondary text-muted-foreground'
            }`}
            style={badge.unlocked ? { backgroundColor: '#b83441' } : undefined}>
            <div className="text-lg mb-1">{badge.icon}</div>
            <div className="text-xs text-center px-1">{badge.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
