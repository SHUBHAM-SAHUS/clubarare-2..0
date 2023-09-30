import { useMemo } from 'react'
import NextLink from 'next/link'

import { SpaceCardProps } from './interface'

import { Card } from 'design-systems/Atoms/Card'
import { Typography } from 'design-systems/Atoms/Typography'
import { Avatar } from 'design-systems/Molecules/Avatar'
import { File } from 'design-systems/Molecules/File'
import { PAGE_ROUTES, classNames } from 'utils'

export const SpaceCard: React.FC<SpaceCardProps> = ({ address, avatar, name, spaceImage }) => {
  const imageClassName = useMemo(
    () =>
      classNames(
        'min-w-[288px] min-h-[162px]',
        'w-full rounded-xs mb-1 object-cover z-10',
        'hover:scale-110 duration-500 transition-all hover:brightness-75 hover:dark:brightness-50'
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <NextLink className="m-0 w-full p-0" href={PAGE_ROUTES.profile(address)}>
      <Card className="mb-2 flex flex-col justify-between !p-0">
        <File
          alt="clubrare-space-image"
          className={imageClassName}
          height={162}
          src={spaceImage}
          type="image/jpeg"
          width={288}
        />

        <Card className={`z-20 min-h-[56px] !p-[6px]`} rounded={false}>
          <div className="relative flex items-center">
            <Avatar
              className="mr-2 min-w-[40px] truncate whitespace-nowrap md:flex"
              size="small"
              src={avatar ? avatar + '?auto=format&w=40&h=40' : ''}
            />
            <div className="flex w-4/5 flex-col-reverse md:flex-col">
              <Typography
                className="truncate text-neutral-400 dark:text-neutral-600 md:flex md:text-caption"
                variant="condensed"
              >
                {name}
              </Typography>
            </div>
          </div>
        </Card>
      </Card>
    </NextLink>
  )
}
