import { Award, Clock, Map, Star, Trophy, Users } from 'lucide-react'

export interface Badge {
  id: string
  name: string
  description: string
  icon: 'award' | 'trophy' | 'star' | 'map' | 'clock' | 'users'
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  unlockedAt?: Date
  progress?: {
    current: number
    target: number
  }
}

interface BadgeComponentProps {
  badge: Badge
  size?: 'sm' | 'md' | 'lg'
  showProgress?: boolean
}

const iconMap = {
  award: Award,
  trophy: Trophy,
  star: Star,
  map: Map,
  clock: Clock,
  users: Users,
}

const rarityStyles = {
  common: {
    background: 'linear-gradient(135deg, #7a9b7e, #6b8e7f)',
    color: 'white',
  },
  rare: {
    background: 'linear-gradient(135deg, #d4a574, #c49363)',
    color: 'white',
  },
  epic: {
    background: 'linear-gradient(135deg, #9d6b8f, #b85a7a)',
    color: 'white',
  },
  legendary: {
    background: 'linear-gradient(135deg, #ad2831, #d4a574)',
    color: 'white',
  },
}

const sizeStyles = {
  sm: {
    width: '48px',
    height: '48px',
    iconSize: 20,
  },
  md: {
    width: '64px',
    height: '64px',
    iconSize: 24,
  },
  lg: {
    width: '80px',
    height: '80px',
    iconSize: 32,
  },
}

export function BadgeComponent({
  badge,
  size = 'md',
  showProgress = false,
}: BadgeComponentProps) {
  const Icon = iconMap[badge.icon]
  const isUnlocked = !!badge.unlockedAt
  const sizeStyle = sizeStyles[size]
  const rarityStyle = rarityStyles[badge.rarity]

  const badgeStyle: React.CSSProperties = {
    width: sizeStyle.width,
    height: sizeStyle.height,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    ...(isUnlocked
      ? rarityStyle
      : {
          background: '#f5eeef',
          color: '#6b4a4f',
        }),
    ...(isUnlocked && badge.rarity === 'legendary'
      ? {
          boxShadow: '0 0 20px rgba(245, 158, 11, 0.4)',
          animation: 'pulse 2s infinite',
        }
      : {}),
  }

  const progressPercentage = badge.progress
    ? (badge.progress.current / badge.progress.target) * 100
    : 0

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
      }}
    >
      <div
        style={badgeStyle}
        onMouseEnter={(e) => {
          if (isUnlocked) {
            e.currentTarget.style.transform = 'scale(1.05)'
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)'
        }}
      >
        <Icon size={sizeStyle.iconSize} />
        {!isUnlocked && badge.progress && (
          <div
            style={{
              position: 'absolute',
              bottom: '-4px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80%',
              height: '4px',
              background: '#f5eeef',
              borderRadius: '2px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${progressPercentage}%`,
                height: '100%',
                background: '#ad2831',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        )}
      </div>
      {showProgress && badge.progress && !isUnlocked && (
        <span
          style={{
            fontSize: '0.75rem',
            color: '#6b4a4f',
            textAlign: 'center',
          }}
        >
          {badge.progress.current}/{badge.progress.target}
        </span>
      )}
    </div>
  )
}

interface BadgeGridProps {
  badges: Badge[]
  columns?: number
}

export function BadgeGrid({ badges, columns = 4 }: BadgeGridProps) {
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: '1rem',
    padding: '1rem',
  }

  return (
    <div style={gridStyle}>
      {badges.map((badge) => (
        <div
          key={badge.id}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <BadgeComponent badge={badge} showProgress />
          <div style={{ textAlign: 'center' }}>
            <h4
              style={{
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#2a1214',
                marginBottom: '0.25rem',
              }}
            >
              {badge.name}
            </h4>
            <p
              style={{
                fontSize: '0.75rem',
                color: '#6b4a4f',
                lineHeight: '1.2',
              }}
            >
              {badge.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

// Sample badges data with proper unlocked states to show wine colors
export const sampleBadges: Badge[] = [
  {
    id: 'first-scan',
    name: 'First Scan',
    description: 'Scanned your first wine',
    icon: 'star',
    rarity: 'common',
    unlockedAt: new Date(),
  },
  {
    id: 'bordeaux-explorer',
    name: 'Bordeaux Explorer',
    description: 'Tried 5 wines from Bordeaux',
    icon: 'map',
    rarity: 'rare',
    unlockedAt: new Date(Date.now() - 86400000), // 1 day ago
  },
  {
    id: 'streak-champion',
    name: 'Streak Champion',
    description: '30-day scanning streak',
    icon: 'clock',
    rarity: 'epic',
    unlockedAt: new Date(Date.now() - 172800000), // 2 days ago
  },
  {
    id: 'wine-master',
    name: 'Wine Master',
    description: 'Scanned 100 different wines',
    icon: 'trophy',
    rarity: 'legendary',
    progress: { current: 47, target: 100 },
  },
]
