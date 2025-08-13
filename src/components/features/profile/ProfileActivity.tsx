// components/profile/ProfileActivity.tsx
import type { ProfileActivityProps } from '@ts/index';

export function ProfileActivity({ activities }: ProfileActivityProps) {
  return (
    <div className="bg-card rounded-xl p-4 border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
      <div className="space-y-3">
        {activities.map((activity, index) => {
          const IconComponent = activity.iconComponent;
          return (
            <div key={index} className="flex items-center space-x-3">
              <div
                className={`w-8 h-8 ${activity.iconBgColor} rounded-full flex items-center justify-center`}>
                <IconComponent size={16} className={activity.iconColor} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{activity.title}</p>
                <p className="text-xs text-muted-foreground">{activity.timeAgo}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
