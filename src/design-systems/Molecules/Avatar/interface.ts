import { StaticImageData } from 'next/image'

export type AvatarSize = 'extra small' | 'small' | 'medium' | 'large'

export interface AvatarProps {
  size?: AvatarSize
  className?: string
  src?: string | StaticImageData
  alt?: string
  verified?: boolean
}
