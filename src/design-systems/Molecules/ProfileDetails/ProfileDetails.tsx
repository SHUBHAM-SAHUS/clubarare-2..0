import Link from 'next/link'

import { Avatar } from '../Avatar'

import { strings } from './utils'
import { ProfileDetailsProps } from './interface'

import { Typography } from 'design-systems/Atoms/Typography'
import { Button } from 'design-systems/Atoms/Button'
import { TwitterIcon, InstagramIcon, YoutubeIcon, CopyIcon, ShareIcon, BadgeIcon } from 'design-systems/Atoms/Icons'
import { shortWalletAddress } from 'utils'

export const ProfileDetailsOverlay: React.FC<ProfileDetailsProps> = ({ mode, view, userDetails }) => {
  const followerClassName = ['text-subtitle font-normal truncate break-all'].join(' ')
  return (
    <div className="flex h-screen w-[300px] flex-col  justify-between bg-neutral-700 dark:bg-neutral-200">
      <div className="flex w-full items-center justify-end space-x-1">
        {mode === 'Filled' && (
          <>
            <Link href={userDetails.socialMediaLink.instagram} rel="noreferrer" target="_blank">
              <InstagramIcon className="h-8 w-8" />
            </Link>
            <Link href={userDetails.socialMediaLink.twitter} rel="noreferrer" target="_blank">
              <TwitterIcon className="h-8 w-8" />
            </Link>
            <Link href={userDetails.socialMediaLink.youtube} rel="noreferrer" target="_blank">
              <YoutubeIcon className="h-8 w-8" />
            </Link>
          </>
        )}
      </div>
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Avatar className="" size="medium" />
          {mode === 'Filled' && (
            <Typography className="text-body font-bold text-neutral-100 dark:text-neutral-700">
              {userDetails.profileName && userDetails.profileName}
            </Typography>
          )}
        </div>
        <div className="flex  items-center space-x-2">
          <div className="w-fit rounded-lg border border-neutral-600 px-2 dark:border-neutral-500">
            <div className="flex items-center space-x-2">
              <Typography
                className="truncate text-body font-normal text-neutral-400 dark:text-neutral-500"
                variant="condensed"
              >
                {userDetails.walletAddress && shortWalletAddress(userDetails.walletAddress)}
              </Typography>
              <CopyIcon className="h-6 w-6 stroke-neutral-500" />
            </div>
          </div>
          {view === 'Visitor' && (
            <Button color="primary" size="small" variant="outlined">
              {strings.FOLLOW}
            </Button>
          )}
          <ShareIcon className="h-8 w-8 stroke-neutral-600 dark:stroke-neutral-400" fill="currentColor" />
        </div>
        {mode === 'Filled' && (
          <div className="flex flex-col space-y-6">
            <Typography
              className="text-paragraph font-normal text-neutral-100 dark:text-neutral-700"
              variant="condensed"
            >
              {userDetails.profileDetails && userDetails.profileDetails}
            </Typography>
            {userDetails.verification === 'verified' && (
              <div className="ml-1 flex items-center space-x-1">
                <BadgeIcon className="h-6 w-6" />
                <Typography className="text-sm font-normal" variant="condensed">
                  {strings.VERIFIED_SELLER}
                </Typography>
              </div>
            )}
          </div>
        )}
        <div className="grid grid-cols-2">
          <div className="flex items-center space-x-2">
            <Typography className={followerClassName} variant="condensed">
              {userDetails.followingCount && userDetails.followingCount}
            </Typography>
            <Typography className="text-small font-normal" variant="condensed">
              {strings.Following}
            </Typography>
          </div>
          <div className="flex items-center space-x-2">
            <Typography className={followerClassName} variant="condensed">
              {userDetails.followersCount && userDetails.followersCount}
            </Typography>
            <Typography className="text-small font-normal" variant="condensed">
              {strings.Followers}
            </Typography>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end">
        {view === 'Owner' && (
          <Button color="primary" size="medium" variant="outlined">
            {strings.EDIT_PROFILE}
          </Button>
        )}
      </div>
    </div>
  )
}
