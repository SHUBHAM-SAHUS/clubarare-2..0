import { useCallback, useMemo } from 'react'
import { useRouter } from 'next/router'

import { CollectionCardProps } from './interfaces'

import { Card } from 'design-systems/Atoms/Card'
import { Typography } from 'design-systems/Atoms/Typography'
import { Avatar } from 'design-systems/Molecules/Avatar'
import { File } from 'design-systems/Molecules/File'
import { PAGE_ROUTES } from 'utils'

export const CollectionCard: React.FC<CollectionCardProps> = ({
  id,
  size = 'medium',
  user,
  product,
  editable = false,
}) => {
  const router = useRouter()
  const imageClassName = useMemo(
    () =>
      [
        'w-full rounded-xs mb-1 object-cover h-[144px] overflow-hidden',
        'hover:brightness-75 hover:dark:brightness-50 hover:scale-110 duration-500 transition-all',
        size === 'medium' ? 'max-h-[200px]' : 'md:h-[350px]',
      ].join(' '),
    [size]
  )
  const handleClick = useCallback(() => {
    router.push(PAGE_ROUTES.collection(id))
  }, [id, router])

  return (
    <Card
      bordered={size !== 'small'}
      className="flex flex-col justify-between !bg-transparent !p-[6px]"
      onClick={handleClick}
    >
      {size !== 'small' && (
        <File
          alt={product.file.alt ?? 'clubrare-asset-file'}
          className={imageClassName}
          height={350}
          src={product?.file?.src || '/collectionBackgroundBanner.svg'}
          type={product.file.type || 'Image/svg'}
          width={350}
        />
      )}

      <Card className={`min-h-[105px] flex-none !p-[6px]`}>
        <div className="relative mb-1 flex items-center md:mb-3">
          <Avatar
            className="hidden min-w-[40px] truncate whitespace-nowrap md:mr-2 md:flex"
            size="small"
            src={user.avatar}
          />
          <div className="flex w-4/5 flex-col-reverse md:flex-col">
            <Typography
              className="hidden truncate text-neutral-400 dark:text-neutral-600 md:flex md:text-caption"
              variant="condensed"
            >
              {user.username}
            </Typography>
          </div>
          {/* {editable && (
            <IconButton variant="gray" className="group absolute right-0 top-0">
              <DotsThreeVerticalIcon className="h-8 w-8 fill-neutral-500 group-active:fill-neutral-100" />
            </IconButton>
          )} */}
        </div>
      </Card>
    </Card>
  )
}
