import { StaticImageData } from 'next/image'
import { PropsWithChildren } from 'react'

export interface FileRule {
  url?: string
  type?: string
}

export interface NftCarouselProps extends PropsWithChildren {
  className?: string
  imageArray: ImageRuleObject[]
  defaultFile: FileRule
}
