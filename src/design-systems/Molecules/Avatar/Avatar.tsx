import Image from 'next/image'
import { useMemo } from 'react'

import { AvatarProps } from './interface'
import { getAvatarSize, getBadgeSize } from './utils'

import { BadgeIcon, DefaultProfileIcon } from 'design-systems/Atoms/Icons'
import { classNames } from 'utils'

export const Avatar: React.FC<AvatarProps> = ({
  size = 'medium',
  className = '',
  src = '',
  alt = '',
  verified = false,
}) => {
  const avatarClassNames = useMemo(
    () =>
      classNames(
        className,
        getAvatarSize(size),
        'relative flex justify-center items-end border-2 rounded-full dark:border-neutral-600 border-neutral-100'
      ),
    [className, size]
  )

  const badgeClassNames = useMemo(() => classNames(getBadgeSize(size), 'absolute right-0 bottom-0'), [size])

  return (
    <div className={avatarClassNames}>
      {src ? (
        <Image alt={alt} className="rounded-full dark:text-neutral-600" fill={true} src={src} />
      ) : (
        <DefaultProfileIcon className="h-4/5 w-full rounded-full dark:text-neutral-600" />
      )}
      {verified && <BadgeIcon className={badgeClassNames} />}
    </div>
  )
}
