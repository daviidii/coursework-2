export interface ProductItemProps {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    count: number
    rate: number
  }
}
