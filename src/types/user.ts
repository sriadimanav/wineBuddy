export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  favorites: string[]
  streakCount: number
  totalScans: number
  badges: string[]
  isGuest?: boolean
}