import { Tooltip } from 'react-tooltip'
import Link from 'next/link'

import { InfoIcon, WalletIcon } from 'design-systems/Atoms/Icons'
import { Input } from 'design-systems/Atoms/Input'
import { Typography } from 'design-systems/Atoms/Typography'
import { PAGE_ROUTES, shortWalletAddress } from 'utils'

export interface RankCardProps {
  className?: string
  walletAddress: string
  rank: number
  boost: string
  boostTooltip: string
  score: number
}

export const RankCard: React.FC<RankCardProps> = ({ boost, boostTooltip, className, rank, score, walletAddress }) => {
  const classNames = [
    'w-full border-spacing-4 rounded-xs border border-neutral-700 p-4 dark:border-neutral-100',
    className,
  ].join(' ')

  return (
    <div className={classNames}>
      <div className="flex w-full">
        <div className="flex ">
          <WalletIcon
            className="stroke-neutral-100 dark:stroke-neutral-700"
            stroke="stroke-neutral-100 dark:stroke-neutral-700"
          />
        </div>
        <Typography className="flex items-center pl-2 font-RobotoCondensed text-caption font-normal leading-subtitle hover:underline">
          <Link href={PAGE_ROUTES.profile(walletAddress)} target="_blank">
            {shortWalletAddress(walletAddress)}
          </Link>
        </Typography>
      </div>
      <div className="flex w-full  flex-row pt-5  ">
        <div className="flex w-1/2 ">
          <div className="w-full">
            <Input
              disabled={true}
              inputClassName="h-14 pl-8 border-spacing-4 rounded-xs border !border-neutral-700 !bg-neutral-700 p-2 dark:!border-neutral-100 dark:!bg-neutral-100"
              label="RANK"
              value={rank}
              variant="secondary"
            ></Input>
          </div>
        </div>
        <div className="flex w-1/2 pl-3 pt-0">
          <div className="w-full flex-col">
            <div className="flex w-full">
              <Tooltip anchorSelect="#boostInfoTooltip" content={boostTooltip} />
              <InfoIcon className="stroke-neutral-500" id="boostInfoTooltip" stroke="fill-error-100" />
              <Typography
                className="mb-1 ml-1 flex font-semibold text-neutral-100 dark:text-neutral-600"
                size="caption"
                variant="condensed"
              >
                BOOST
              </Typography>
            </div>
            <Input
              className="flex "
              disabled={true}
              inputClassName="h-14 pl-8 border-spacing-4 rounded-xs border !border-neutral-700 !bg-neutral-700 p-2 dark:!border-neutral-100 dark:!bg-neutral-100"
              label=""
              value={boost}
              variant="secondary"
            ></Input>
          </div>
        </div>
        <div className="flex w-1/2 pl-3 pt-0">
          <div className="w-full">
            <Input
              disabled={true}
              inputClassName="h-14 pl-8 border-spacing-4 rounded-xs border !border-neutral-700 !bg-neutral-700 p-2 dark:!border-neutral-100 dark:!bg-neutral-100"
              label="SCORE"
              value={score}
              variant="secondary"
            ></Input>
          </div>
        </div>
      </div>
    </div>
  )
}
