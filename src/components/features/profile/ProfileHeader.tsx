// components/profile/ProfileHeader.tsx
import type { ProfileHeaderProps } from '@ts/index';

export function ProfileHeader({ user, stats }: ProfileHeaderProps) {
  return (
    <div className="bg-card border-b border-border">
      <div className="px-6 py-8">
        {/* Profile Info */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-wine-accent)' }}>
                <span className="text-2xl text-white font-medium">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground mb-1">{user.name}</h1>
            <p className="text-muted-foreground mb-2">{user.email}</p>
            <span
              className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${
                user.isGuest ? 'bg-orange-100 text-orange-700' : 'bg-purple-100 text-purple-700'
              }`}>
              {user.isGuest ? 'Guest Explorer' : 'Wine Enthusiast'}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat, index) => {
            const IconComponent = stat.iconComponent;
            return (
              <div key={index} className="text-center p-4 bg-muted rounded-xl">
                <div className="flex justify-center mb-2">
                  <IconComponent size={16} className={stat.iconColor} />
                </div>
                <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
