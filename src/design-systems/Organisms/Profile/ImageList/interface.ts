import { StaticImageData } from 'next/image'

export interface ImageListProps {
  images?: Array<ImageObject>
  isLoading?: boolean
  onClick?: (image: ImageObject) => void
  transparency?: boolean
  cols?: number
}
