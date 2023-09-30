import React from 'react'
import { useRouter } from 'next/router'

import { HeaderProps } from './interface'
import { headers } from './utils'

import { SaveIcon, UploadItemIcon } from 'design-systems/Atoms/Icons'
import { Spinner } from 'design-systems/Atoms/Spinner'
import { Typography } from 'design-systems/Atoms/Typography'
import { classNames } from 'utils'
import { useExportSpace } from 'hooks/api/useExportSpace'
import { useGetSpaceAssets } from 'hooks/api/useGetSpaceAssets'
import { useSpace } from 'context'

export const Header: React.FC<HeaderProps> = ({ selectedTab, setTab }) => {
  const router = useRouter()
  const userIdOrAddress = router.query?.userIdOrAddress as string
  const { spaceData } = useGetSpaceAssets(userIdOrAddress)
  const { isSaving, exportSpaceAsync } = useExportSpace(spaceData?.id)
  const { setComponent } = useSpace()

  return (
    <div className="flex h-full flex-col gap-4 p-1 dark:bg-neutral-200">
      {headers?.map(header => (
        <div
          className={classNames(
            'flex cursor-pointer flex-col items-center rounded border p-2 hover:bg-neutral-700 hover:dark:bg-neutral-400',
            selectedTab === header.title
              ? 'border-neutral-100 text-neutral-100 dark:border-neutral-700 dark:text-neutral-700'
              : 'border-neutral-700 text-neutral-500 dark:border-neutral-400'
          )}
          key={header.title}
          onClick={() => setTab(header.title)}
        >
          {header.icon(selectedTab === header.title)}
          <Typography className="text-[10px] " size="sm" variant="condensed">
            {header.title}
          </Typography>
        </div>
      ))}
      <div className="flex cursor-pointer flex-col items-center gap-1" onClick={() => setComponent(3)}>
        <UploadItemIcon className="mx-4 fill-[#F6F6F6]" />
        <Typography className="text-center text-[10px]" size="sm" variant="condensed">
          UPLOAD ITEM
        </Typography>
      </div>
      <div
        className="flex cursor-pointer flex-col items-center gap-1"
        onClick={() => !isSaving && exportSpaceAsync(spaceData?.id)}
      >
        {isSaving ? (
          <Spinner className="mx-4 h-10 w-10 stroke-neutral-100 dark:stroke-neutral-700" />
        ) : (
          <SaveIcon className="mx-4 fill-brand-800 hover:fill-brand-500" />
        )}
        <Typography className="text-center text-[10px]" size="sm" variant="condensed">
          SAVE & PUBLISH
        </Typography>
      </div>
    </div>
  )
}
