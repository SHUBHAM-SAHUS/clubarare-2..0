import { useMemo } from 'react'

import { CollectionHeaderProps } from './interface'

import { Avatar } from 'design-systems/Molecules/Avatar'
import { Card } from 'design-systems/Atoms/Card'
import { Typography } from 'design-systems/Atoms/Typography'
import { CaretDoubleDownIcon, CaretDoubleUpIcon, ShareIcon, PencilIcon, EyeIcon } from 'design-systems/Atoms/Icons'
import { ViewCounter } from 'design-systems/Molecules/Counters/ViewCounter/ViewCounter'
import { classNames } from 'utils'
import { useToggle } from 'hooks/useToggle'

export const CollectionHeader: React.FC<CollectionHeaderProps> = ({
  user,
  collectionName,
  viewCount,
  description = '',
  editable = false,
  className = '',
  onEdit,
}) => {
  const [showMore, toggle] = useToggle(false)

  const userDescription = useMemo(() => {
    return (showMore ? description : `${description?.slice(0, 300)}...`) ?? ''
  }, [description, showMore])

  return (
    <Card className={className} variant="x-large">
      <div className="flex justify-between">
        <div className="mb-6 flex w-full items-end gap-4 lg:w-8/12">
          <Avatar
            alt={`avatar-${user?.creatorName}`}
            size="large"
            src={user?.avatar ? user?.avatar + '?auto=format&w=40&h=40' : ''}
            verified={user?.verified}
          />
          <div className="flex flex-col gap-1">
            <Typography className="text-neutral-400 dark:text-neutral-500" size="body" variant="condensed">
              {user.creatorName ?? 'Unnamed'}
            </Typography>
            <Typography size="paragraph" variant="condensed">
              {collectionName}
            </Typography>
          </div>
        </div>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <ViewCounter
              className="h-8 w-8"
              count={viewCount}
              icon={<EyeIcon className="stroke-neutral-400 dark:stroke-neutral-800" />}
            />
            <ShareIcon className="h-5 w-5 stroke-neutral-400 dark:stroke-neutral-800" />
            {editable && (
              <button type="button" onClick={onEdit}>
                <PencilIcon className="h-8 w-5 cursor-pointer stroke-neutral-400 dark:stroke-neutral-800" />
              </button>
            )}
          </div>
        </div>
      </div>
      <Typography
        className="content-center text-md font-normal text-neutral-400 dark:text-neutral-800"
        variant="condensed"
      >
        {userDescription}
      </Typography>
      <button
        className={classNames('mt-2 flex items-center gap-4', description?.length < 300 && 'hidden')}
        type="button"
        onClick={toggle}
      >
        <Typography className="text-neutral-400 dark:text-neutral-500" size="body" variant="condensed">
          Show {!showMore ? 'More' : 'Less'}
        </Typography>
        {!showMore ? (
          <CaretDoubleDownIcon className="stroke-neutral-400 dark:stroke-neutral-500" />
        ) : (
          <CaretDoubleUpIcon className="stroke-neutral-400 dark:stroke-neutral-500" />
        )}
      </button>
    </Card>
  )
}
