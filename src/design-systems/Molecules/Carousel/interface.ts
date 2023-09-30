import type { PropsWithChildren } from 'react'

export type SlideCount = 1 | 2 | 3 | 4

export interface CarouselProps extends PropsWithChildren {
  className?: string
  cols: SlideCount
  elements: React.ReactElement[]
  withArrows?: boolean
  withIndicators?: boolean
  removeArrowOnDeviceType?: string[]
  itemClass?: string
  activeSlide?: Function
  mobileCols?: number
}
