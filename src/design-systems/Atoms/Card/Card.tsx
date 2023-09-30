import { PropsWithChildren, useMemo } from 'react'

import { getVariantStyle } from './utils'

export type CardVariant = 'small' | 'medium' | 'large' | 'x-large' | '2x-large'

export interface CardProps extends PropsWithChildren {
  variant?: CardVariant
  rounded?: boolean
  bordered?: boolean
  shadow?: boolean
  overflow?: boolean
  className?: string
  onClick?: () => void
}

/**
 * @description Card component
 *
 * small: 6px
 * medium: 8px
 * large: 12px
 * x-large: 16px
 * 2x-large: 24px
 */
export const Card: React.FC<CardProps> = ({
  variant = 'medium',
  rounded = true,
  bordered = false,
  shadow = false,
  overflow = true,
  className = '',
  children,
  onClick,
}) => {
  const classNames = useMemo(
    () =>
      [
        className,
        'bg-neutral-800 dark:bg-neutral-300 group',
        getVariantStyle(variant),
        rounded && 'rounded-xs',
        bordered &&
          'border border-neutral-800 hover:border-neutral-600 dark:hover:border-neutral-500 dark:border-neutral-400',
        'w-full',
        overflow && 'overflow-hidden',
        onClick && 'cursor-pointer',
      ].join(' '),
    [bordered, className, rounded, variant, overflow, onClick]
  )

  return (
    <div className={classNames} onClick={onClick}>
      {children}
    </div>
  )
}
