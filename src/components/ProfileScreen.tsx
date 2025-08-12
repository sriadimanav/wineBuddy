import {
  Bell,
  Camera,
  ChevronRight,
  Heart,
  HelpCircle,
  LogOut,
  Settings,
  Shield,
  Star,
} from 'lucide-react'
import type { User } from '../routes/__root'
//import { useScreenSize } from './hooks/useMediaQueries'

interface ProfileScreenProps {
  user: User
  onLogout: () => void
}

export function ProfileScreen({ user, onLogout }: ProfileScreenProps) {
  //const screenSize = useScreenSize()

  const resetApp = () => {
    if (
      confirm(
        'This will reset all app data and show onboarding again. Are you sure?',
      )
    ) {
      localStorage.removeItem('wine-buddy-user')
      localStorage.removeItem('wine-buddy-onboarding-complete')
      window.location.href = '/'
    }
  }

  const handleCreateAccount = () => {
    // Remove current guest user and redirect to auth
    localStorage.removeItem('wine-buddy-user')
    window.location.href = '/auth'
  }

  const menuItems = [
    {
      icon: <Settings size={20} className="text-muted-foreground" />,
      title: 'Account Settings',
      subtitle: 'Update your personal information',
      action: () => console.log('Account Settings'),
    },
    {
      icon: <Bell size={20} className="text-muted-foreground" />,
      title: 'Notifications',
      subtitle: 'Manage your notification preferences',
      action: () => console.log('Notifications'),
    },
    {
      icon: <Shield size={20} className="text-muted-foreground" />,
      title: 'Privacy & Security',
      subtitle: 'Control your privacy settings',
      action: () => console.log('Privacy'),
    },
    {
      icon: <HelpCircle size={20} className="text-muted-foreground" />,
      title: 'Help & Support',
      subtitle: 'Get help or contact support',
      action: () => console.log('Help'),
    },
  ]

  const stats = [
    {
      label: 'Wines Scanned',
      value: user.totalScans?.toString() || '47',
      icon: <Camera size={16} className="text-purple-600" />,
    },
    {
      label: 'Favorites',
      value: user.favorites.length.toString(),
      icon: <Heart size={16} className="text-red-500" />,
    },
    {
      label: 'Reviews',
      value: '12',
      icon: <Star size={16} className="text-yellow-500" />,
    },
  ]

  return (
    <div className="bg-background pb-20">
      {/* Header */}
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
                  style={{ backgroundColor: 'var(--color-wine-accent)' }}
                >
                  <span className="text-2xl text-white font-medium">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
            </div>

            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground mb-1">
                {user.name}
              </h1>
              <p className="text-muted-foreground mb-2">{user.email}</p>
              <span
                className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${user.isGuest ? 'bg-orange-100 text-orange-700' : 'bg-purple-100 text-purple-700'}`}
              >
                {user.isGuest ? 'Guest Explorer' : 'Wine Enthusiast'}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-4 bg-muted rounded-xl">
                <div className="flex justify-center mb-2">{stat.icon}</div>
                <p className="text-2xl font-bold text-foreground mb-1">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Guest User Upgrade Prompt */}
      {user.isGuest && (
        <div className="px-6 py-6">
          <div
            className="rounded-xl p-6 text-white shadow-lg"
            style={{
              background: 'linear-gradient(to right, #ad2831, #800e13)',
            }}
          >
            <h3 className="text-lg font-semibold mb-2 text-white">
              Unlock Your Full Wine Journey
            </h3>
            <p className="text-white opacity-90 text-sm mb-4">
              Create an account to save your favorites, track your wine
              discoveries, and earn badges!
            </p>
            <button
              onClick={handleCreateAccount}
              className="bg-white font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
              style={{ color: '#ad2831' }}
            >
              Create Your Account
            </button>
          </div>
        </div>
      )}

      {/* Menu Items */}
      <div className={`px-6 space-y-4 ${user.isGuest ? 'pb-6' : 'py-6'}`}>
        <div className="bg-card rounded-xl overflow-hidden border border-border">
          {menuItems.map((item, index) => (
            <div key={index}>
              <button
                onClick={item.action}
                className="w-full flex items-center p-4 hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <div className="flex items-center space-x-3 flex-1">
                  {item.icon}
                  <div className="text-left">
                    <p className="font-medium text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-muted-foreground" />
              </button>
              {index < menuItems.length - 1 && (
                <div className="h-px bg-border mx-4"></div>
              )}
            </div>
          ))}
        </div>

        {/* Preferences */}
        <div className="bg-card rounded-xl p-4 border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Wine Preferences
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-foreground">Preferred Wine Type</span>
              <span className="wine-badge--secondary">Red Wines</span>
            </div>
            <div className="h-px bg-border"></div>
            <div className="flex items-center justify-between">
              <span className="text-foreground">Price Range</span>
              <span className="wine-badge--secondary">$25 - $100</span>
            </div>
            <div className="h-px bg-border"></div>
            <div className="flex items-center justify-between">
              <span className="text-foreground">Favorite Region</span>
              <span className="wine-badge--secondary">Bordeaux</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-card rounded-xl p-4 border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Recent Activity
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Camera size={16} className="text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  Scanned Caymus Cabernet
                </p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <Heart size={16} className="text-red-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  Added Château Margaux to favorites
                </p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <Star size={16} className="text-yellow-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  Rated Cloudy Bay Sauvignon Blanc
                </p>
                <p className="text-xs text-muted-foreground">3 days ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* App Info */}
        <div className="bg-card rounded-xl p-4 border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">About</h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>App Version</span>
              <span>1.2.0</span>
            </div>
            <div className="h-px bg-border"></div>
            <button className="flex justify-between w-full text-left hover:text-foreground transition-colors">
              <span>Terms of Service</span>
              <ChevronRight size={16} />
            </button>
            <div className="h-px bg-border"></div>
            <button className="flex justify-between w-full text-left hover:text-foreground transition-colors">
              <span>Privacy Policy</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center px-4 py-3 text-red-600 border border-red-200 rounded-md hover:bg-red-50 transition-colors"
        >
          <LogOut size={16} className="mr-2" />
          Sign Out
        </button>

        {/* Development Reset Button */}
        <button
          onClick={resetApp}
          className="w-full flex items-center justify-center px-4 py-3 text-gray-600 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors mt-2"
        >
          <Settings size={16} className="mr-2" />
          Reset App (Dev)
        </button>
      </div>
    </div>
  )
}
