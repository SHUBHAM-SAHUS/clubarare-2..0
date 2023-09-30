import type { PropsWithChildren } from 'react'
import { StaticImageData } from 'next/image'

export type BannerAlignment = 'left' | 'right' | 'center'

export interface BannerProps extends PropsWithChildren {
  className?: string
  bannerImage?: StaticImageData | string
  align?: BannerAlignment
  title?: string
  description?: string
}
