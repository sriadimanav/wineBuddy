export interface Badge {
  id: string
  name: string
  icon: string
  unlocked: boolean
  description?: string    // Optional
  progress?: number       // Optional for progress tracking
  maxProgress?: number    // Optional for progress tracking
}