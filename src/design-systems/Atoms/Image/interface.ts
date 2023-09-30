import { StaticImageData } from 'next/image'
import type { CSSProperties, PropsWithChildren } from 'react'

// export interface ImageProps {}

// export interface ImageProps
export type ImageElementProps = Modify<
  React.HTMLProps<HTMLButtonElement>,
  {
    width?: number
    height?: number
    className?: string
    isLoading?: boolean
    alt: string
    src: StaticImageData | string
    onClick?: () => void
    style?: CSSProperties
  }
>

export interface ImageProps extends ImageElementProps, PropsWithChildren {}
