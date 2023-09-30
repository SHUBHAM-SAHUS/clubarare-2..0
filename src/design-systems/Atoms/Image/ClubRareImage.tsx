import React, { CSSProperties } from 'react'
import NextImage, { StaticImageData } from 'next/image'

import { useToggle } from 'hooks/useToggle'
import { classNames } from 'utils'

export interface ClubRareImageProps {
  alt: string
  src: StaticImageData | string
  className?: string

  /**
   * this prop needs to be set for applying correct styles.
   * highly recommend to use {{ objectFit: 'cover' }}.
   */
  styles?: CSSProperties
  disabled?: boolean
  onClick?: () => void
}

export const ClubRareImage: React.FC<ClubRareImageProps> = ({
  alt,
  src,
  className = '',
  styles,
  disabled = false,
  onClick,
}) => {
  const [isLoading, , , , completeLoading] = useToggle(true)

  return (
    <button className={classNames('relative h-full w-full', className)} disabled={disabled} onClick={onClick}>
      {isLoading && (
        <>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-neutral-500 dark:border-neutral-500"></div>
          </div>

          <div className="absolute left-0 top-0 h-full w-full animate-pulse bg-neutral-600 dark:bg-neutral-300"></div>
        </>
      )}
      <NextImage alt={alt} fill src={src} style={styles} onLoadingComplete={completeLoading} />
    </button>
  )
}
