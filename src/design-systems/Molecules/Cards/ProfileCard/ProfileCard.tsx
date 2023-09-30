import { useToggle } from 'hooks/useToggle'
import { Avatar } from 'design-systems/Molecules/Avatar'
import { ViewCounter } from 'design-systems/Molecules/Counters/ViewCounter'
import { Typography } from 'design-systems/Atoms/Typography'
import { TwitterIcon, YoutubeIcon, InstagramIcon, PencilIcon, ChartLineUpIcon } from 'design-systems/Atoms/Icons'

export interface ProfileCardProps {
  avatar?: string
  username: string
  bio: string
  verified?: boolean
  editable?: boolean
  instagram?: string
  twitter?: string
  youtube?: string
  views?: number
  initialShowBio?: boolean
  className?: string
  onEdit?: () => void
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  avatar,
  username,
  bio,
  verified = false,
  editable = false,
  instagram,
  twitter,
  youtube,
  views = 0,
  initialShowBio = false,
  className = '',
}) => {
  const [showBio, toggle] = useToggle(initialShowBio)
  const classNames = [
    className,
    'bg-neutral-800 dark:bg-neutral-300',
    'rounded-t-sm',
    'border-b border-b-neutral-100 dark:border-b-neutral-800',
    'px-6 py-4',
    'cursor-pointer relative',
  ].join(' ')

  return (
    <div className={classNames} onClick={toggle}>
      <div className="relative right-0 top-0 flex items-center justify-end gap-2 lg:absolute lg:right-6 lg:top-4">
        <ViewCounter count={views} />
        <ChartLineUpIcon className="h-5 w-5 stroke-neutral-400 dark:stroke-neutral-800" />
        {editable && <PencilIcon className="h-5 w-5 stroke-neutral-400 dark:stroke-neutral-800" />}
      </div>
      <div className="mb-6 flex w-full items-center gap-1 lg:w-8/12">
        <Avatar alt={`avatar-${username}`} src={avatar} verified={verified} />
        <Typography size="paragraph" variant="condensed">
          {username}
        </Typography>
      </div>

      {showBio && (
        <>
          <Typography className="w-full lg:w-8/12" size="body" variant="condensed">
            {bio}
          </Typography>
          <div className="mt-1 flex items-center justify-end gap-2">
            {instagram && <InstagramIcon />}
            {twitter && <TwitterIcon />}
            {youtube && <YoutubeIcon />}
          </div>
        </>
      )}
    </div>
  )
}
