import { BannerProps } from './interface'
import { getAlignmentStyles } from './utils'

import { Button } from 'design-systems/Atoms/Button'
import { Image } from 'design-systems/Atoms/Image'
import { Typography } from 'design-systems/Atoms/Typography'

export const Banner: React.FC<BannerProps> = ({
  className = '',
  align = 'center',
  bannerImage = '',
  title,
  description,
  children,
}) => {
  const wrapperClassName = [
    className,
    'overflow-hidden rounded-lg',
    'px-3xl md:py-64',
    align === 'right' ? 'pt-0 pb-3xl' : 'py-3xl',
    'flex gap-4',
    getAlignmentStyles(align),
    'bg-neutral-100 dark:bg-neutral-600',
    'text-neutral-800 dark:text-neutral-100',
  ].join(' ')

  const contentSectionClassName = ['w-full'].join(' ')

  const textSectionClassName = ['mb-4'].join(' ')

  const buttonSectionClassName = [
    'flex items-center md:flex-row flex-col md:gap-4 gap-2',
    align === 'center' && 'items-center md:justify-center',
  ].join(' ')

  const imageSectionClassName = ['w-full max-w-full max-h-full min-h-[115px] relative'].join(' ')

  const imageClassName = ['absolute w-full', align === 'right' ? 'md:top-0' : 'bottom-1/2'].join(' ')

  const textClassName = align === 'center' ? 'text-center' : 'md:text-left text-center'

  return (
    <div className={wrapperClassName}>
      <div className={contentSectionClassName}>
        <div className={textSectionClassName}>
          {title && (
            <Typography className={textClassName} size="h4" variant="regular">
              {title}
            </Typography>
          )}
          {description && (
            <Typography className={textClassName} size="body" variant="regular">
              {description}
            </Typography>
          )}
        </div>
        <div className={buttonSectionClassName}>{children}</div>
      </div>
      {bannerImage && (
        <div className={imageSectionClassName}>
          <Image alt="banner-image" className={imageClassName} src={bannerImage} />
        </div>
      )}
    </div>
  )
}
