// components/profile/ProfileMenu.tsx
import { ChevronRight } from 'lucide-react';

import type { ProfileMenuProps } from '@ts/index';

export function ProfileMenu({ menuItems }: ProfileMenuProps) {
  return (
    <div className="bg-card rounded-xl overflow-hidden border border-border">
      {menuItems.map((item, index) => {
        const IconComponent = item.iconComponent;
        return (
          <div key={index}>
            <button
              onClick={item.action}
              className="w-full flex items-center p-4 hover:bg-accent hover:text-accent-foreground transition-colors">
              <div className="flex items-center space-x-3 flex-1">
                <IconComponent size={20} className="text-muted-foreground" />
                <div className="text-left">
                  <p className="font-medium text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-muted-foreground" />
            </button>
            {index < menuItems.length - 1 && <div className="h-px bg-border mx-4"></div>}
          </div>
        );
      })}
    </div>
  );
}
