import { Flame, Star } from 'lucide-react'

interface StreakCounterProps {
  currentStreak: number
  longestStreak: number
  lastScanDate?: Date
  size?: 'sm' | 'md' | 'lg'
}

export function StreakCounter({
  currentStreak,
  longestStreak,
  lastScanDate,
  size = 'md',
}: StreakCounterProps) {
  const isActiveStreak =
    lastScanDate &&
    new Date().getTime() - lastScanDate.getTime() < 24 * 60 * 60 * 1000 // Within 24 hours

  const sizeStyles = {
    sm: {
      padding: '0.75rem',
      flame: 16,
      textSize: '0.875rem',
      numberSize: '1.25rem',
    },
    md: {
      padding: '1rem',
      flame: 20,
      textSize: '1rem',
      numberSize: '1.5rem',
    },
    lg: {
      padding: '1.5rem',
      flame: 24,
      textSize: '1.125rem',
      numberSize: '2rem',
    },
  }

  const style = sizeStyles[size]

  const containerStyle: React.CSSProperties = {
    background: isActiveStreak
      ? 'linear-gradient(135deg, #d4a574, #c49363)'
      : '#ffffff',
    color: isActiveStreak ? 'white' : '#2a1214',
    borderRadius: '0.75rem',
    border: '1px solid #f0e1e3',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: style.padding,
    boxShadow: isActiveStreak
      ? '0 4px 12px rgba(212, 165, 116, 0.3)'
      : '0 1px 2px 0 rgb(42 18 20 / 0.05)',
    animation:
      isActiveStreak && currentStreak > 0 ? 'pulse 2s infinite' : 'none',
  }

  return (
    <div style={containerStyle}>
      <Flame
        size={style.flame}
        color={isActiveStreak ? 'white' : '#ad2831'}
        fill={isActiveStreak ? 'white' : '#ad2831'}
      />
      <div>
        <div
          style={{
            fontSize: style.numberSize,
            fontWeight: '700',
            lineHeight: 1,
            color: isActiveStreak ? 'white' : '#2a1214',
          }}
        >
          {currentStreak}
        </div>
        <div
          style={{
            fontSize: style.textSize,
            opacity: 0.8,
            color: isActiveStreak ? 'white' : '#6b4a4f',
          }}
        >
          day streak
        </div>
      </div>
      {longestStreak > currentStreak && (
        <div
          style={{
            marginLeft: 'auto',
            textAlign: 'right',
            opacity: 0.7,
          }}
        >
          <div
            style={{
              fontSize: '0.75rem',
              color: isActiveStreak ? 'white' : '#6b4a4f',
            }}
          >
            Best
          </div>
          <div
            style={{
              fontSize: style.textSize,
              fontWeight: '500',
              color: isActiveStreak ? 'white' : '#2a1214',
            }}
          >
            {longestStreak}
          </div>
        </div>
      )}
    </div>
  )
}

interface ProgressRingProps {
  progress: number // 0-100
  size?: number
  strokeWidth?: number
  color?: string
  children?: React.ReactNode
}

export function ProgressRing({
  progress,
  size = 120,
  strokeWidth = 8,
  color = '#ad2831',
  children,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#f5f5f5"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>
      {children && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          {children}
        </div>
      )}
    </div>
  )
}

interface WeeklyProgressProps {
  weekData: { day: string; completed: boolean }[]
}

export function WeeklyProgress({ weekData }: WeeklyProgressProps) {
  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '0.75rem',
        padding: '1rem',
        border: '1px solid #f0e1e3',
        boxShadow: '0 1px 2px 0 rgb(42 18 20 / 0.05)',
      }}
    >
      <h3
        style={{
          marginBottom: '1rem',
          fontSize: '1rem',
          fontWeight: '600',
          color: '#2a1214',
        }}
      >
        This Week's Progress
      </h3>
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          justifyContent: 'space-between',
        }}
      >
        {weekData.map((day, index) => (
          <div key={index} style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: day.completed ? '#ad2831' : '#f5eeef',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.25rem',
              }}
            >
              {day.completed && <Star size={16} color="white" fill="white" />}
            </div>
            <span
              style={{
                fontSize: '0.75rem',
                color: '#6b4a4f',
              }}
            >
              {day.day}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
