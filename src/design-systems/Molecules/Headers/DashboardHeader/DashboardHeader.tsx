import { useEffect } from 'react'

import { DisplayNftCountsDeatils } from './DisplayNftCountsDeatils'
import { strings } from './utils'
import { DashboardHeaderProps } from './interface'

import { Avatar } from 'design-systems/Molecules/Avatar'
import { Typography } from 'design-systems/Atoms/Typography'
import { BadgeIcon } from 'design-systems/Atoms/Icons'
import { useToggle } from 'hooks/useToggle'
import { WalletAddress } from 'design-systems/Molecules/Wallet/WalletAddress'

export const followerClassName = [
  'text-paragraph font-normal truncate break-all text-neutral-100 dark:text-neutral-700 ',
].join(' ')
export const followerLabelClassName = ['text-small capitalize font-normal text-neutral-400 dark:text-neutral-600'].join(
  ' '
)

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ className = '', userDetails }) => {
  const [state, , , turnOn, turnOff] = useToggle(false)
  useEffect(() => {
    if (state) {
      setTimeout(() => {
        turnOff()
      }, 1000)
    }
  }, [state])

  return (
    <div
      className={`mb-6 rounded-[12px] bg-neutral-700 p-4 shadow-[0_12px_12px_0_rgba(225,225,225,0.4)] dark:bg-neutral-300 ${className}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className=" flex-col md:flex md:space-y-1">
          <div className="mb-2 flex items-center space-x-2">
            <Avatar className="" size="medium" src={userDetails?.src} />
            <Typography className="text-body font-normal text-neutral-100 dark:text-neutral-700">
              {userDetails.profileName && userDetails.profileName}
            </Typography>
          </div>
          <Typography
            className="font-normal uppercase leading-[25.2px] text-neutral-100 dark:text-neutral-700 md:text-paragraph"
            variant="condensed"
          >
            {userDetails.profileDetails && userDetails.profileDetails}
          </Typography>
          {userDetails.verification === 'verified' && (
            <div className="!mt-5 hidden items-center space-x-1 md:flex">
              <BadgeIcon className="h-6 w-6" />
              <Typography className="text-sm font-normal" variant="condensed">
                {strings.VERIFIED_SELLER}
              </Typography>
            </div>
          )}
        </div>
        <div className="space-y-2 md:flex md:flex-col md:items-end md:justify-center">
          <div className=" w-full pt-2 lg:w-350">
            <DisplayNftCountsDeatils dollarSign label={strings.TOTAL_SALES} value={userDetails.nftDetails.totalSales} />
          </div>
          <div className="flex w-full items-center justify-between space-x-1 md:space-x-2 lg:w-350 lg:space-x-2">
            <DisplayNftCountsDeatils label={strings.NFTs_LISTED} value={userDetails.nftDetails.nftsListed} />
            <DisplayNftCountsDeatils label={strings.NFTs_SOLD} value={userDetails.nftDetails.nftsSold} />
            <DisplayNftCountsDeatils label={strings.TOTAL_VIEWS} value={userDetails.nftDetails.totalViews} />
            <DisplayNftCountsDeatils label={strings.COLLECTIONS} value={userDetails.nftDetails.collections} />
          </div>
        </div>
      </div>
      <div className="mt-4 flex md:justify-between">
        <div className="hidden md:flex">
          <div className="mr-12 flex items-center space-x-2">
            <Typography className={followerClassName} variant="condensed">
              {userDetails.followingCount && userDetails.followingCount}
            </Typography>
            <Typography className={followerLabelClassName} variant="condensed">
              {strings.FOLLOWING}
            </Typography>
          </div>
          <div className="flex items-center space-x-2">
            <Typography className={followerClassName} variant="condensed">
              {userDetails.followersCount && userDetails.followersCount}
            </Typography>
            <Typography className={followerLabelClassName} variant="condensed">
              {strings.FOLLOWERS}
            </Typography>
          </div>
        </div>
        <WalletAddress className="gap-x-2.5" walletAddress={userDetails.walletAddress} />
      </div>
    </div>
  )
}
