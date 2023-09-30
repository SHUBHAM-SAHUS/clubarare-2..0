import type { PropsWithChildren } from 'react'

export type BadgeVariant = 'sale-type' | 'phygital' | 'digital' | 'authenticated' | 'failed'

export type BadgeSize = 'small' | 'medium' | 'large'

export type BadgeElementProps = Modify<
  React.HTMLProps<HTMLButtonElement>,
  {
    className?: string
    showBadgeIcon?: boolean
    variant?: BadgeVariant
    size?: BadgeSize
  }
>

export interface BadgeProps extends BadgeElementProps, PropsWithChildren {}
