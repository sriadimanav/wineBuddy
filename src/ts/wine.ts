export interface Wine {
  id: string
  name: string
  winery: string
  vintage: number
  region: string
  rating: number
  image: string
  price: number
}

export interface FeaturedWine extends Wine {
  description: string
  grapeVariety: string[]
  color: string
  alcoholContent: number
  sugarContent: string
  taste: string[]
  aroma: string[]
  foodPairing: string[]
  reviews: number
  sommelierNotes: string
}

export type TrendingWine = Wine
