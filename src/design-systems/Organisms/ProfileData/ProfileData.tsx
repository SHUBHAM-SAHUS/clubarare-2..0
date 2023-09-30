import React from 'react'

import { ProfileDataProps } from './interface'

import { Card } from 'design-systems/Atoms/Card'
import { Typography } from 'design-systems/Atoms/Typography'

export const ProfileData: React.FC<ProfileDataProps> = ({
  totalSales = 0,
  soldNfts = 0,
  listedNfts = 0,
  totalViews = 0,
  collections = 0,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Card className="flex flex-col items-center justify-center gap-2 p-4" overflow={false} shadow={true}>
        <Typography size="subtitle" variant="condensed">
          ${new Intl.NumberFormat().format(totalSales)}
        </Typography>
        <Typography className="text-neutral-400 dark:text-neutral-500" size="small" variant="condensed">
          Total Sales(USD)
        </Typography>
      </Card>
      <div className="flex flex-row justify-between gap-2">
        <Card className="flex flex-col items-center justify-center gap-2 p-4" overflow={false} shadow={true}>
          <Typography size="subtitle" variant="condensed">
            {new Intl.NumberFormat().format(listedNfts)}
          </Typography>
          <Typography className="text-neutral-400 dark:text-neutral-500" size="small" variant="condensed">
            NFTs Listed
          </Typography>
        </Card>
        <Card className="flex flex-col items-center justify-center gap-2 p-4" overflow={false} shadow={true}>
          <Typography size="subtitle" variant="condensed">
            {new Intl.NumberFormat().format(soldNfts)}
          </Typography>
          <Typography className="text-neutral-400 dark:text-neutral-500" size="small" variant="condensed">
            NFTs sold
          </Typography>
        </Card>
        <Card className="flex flex-col items-center justify-center gap-2 p-4" overflow={false} shadow={true}>
          <Typography size="subtitle" variant="condensed">
            {new Intl.NumberFormat().format(totalViews)}
          </Typography>
          <Typography className="text-neutral-400 dark:text-neutral-500" size="small" variant="condensed">
            Total views
          </Typography>
        </Card>
        <Card className="flex flex-col items-center justify-center gap-2 p-4" overflow={false} shadow={true}>
          <Typography size="subtitle" variant="condensed">
            {new Intl.NumberFormat().format(collections)}
          </Typography>
          <Typography className="text-neutral-400 dark:text-neutral-500" size="small" variant="condensed">
            Collections
          </Typography>
        </Card>
      </div>
    </div>
  )
}
