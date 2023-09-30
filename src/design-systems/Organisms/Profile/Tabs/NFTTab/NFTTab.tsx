import React, { useState } from 'react'
import { useEditor } from '@layerhub-io/react'

import { ImageList } from '../../ImageList'

import { NFTTabProps } from './interface'
import { buttons, Tabs } from './utils'

import { useNFTCreation, useSpace } from 'context'
import { Typography } from 'design-systems/Atoms/Typography'
import { Button } from 'design-systems/Atoms/Button'
import { ButtonGroup } from 'design-systems/Molecules/ButtonGroups/ButtonGroup'
import { useSpaceAssets } from 'hooks/api/useSpaceAssets'

export const NFTTab: React.FC<NFTTabProps> = () => {
  const { phygitalNfts, digitalNfts, isLoadingPhygitalNfts, isLoadingDigitalNfts } = useSpaceAssets()
  const { openNFTCreation } = useNFTCreation()
  const { selectedObject, setComponent, setNftType } = useSpace()
  const [tab, setTab] = useState<Tabs>(Tabs.PHYGITAL)

  const editor = useEditor()
  return (
    <div className="flex h-full flex-col gap-3 bg-neutral-800 dark:bg-neutral-200">
      <div className="flex flex-col gap-3">
        <ButtonGroup
          buttons={buttons}
          clickHandler={(id: Tabs) => {
            setTab(id)
            setNftType(id as string)
          }}
        />
        <Typography size="small" variant="condensed">
          Select your NFT and choose either Add to Space or Remove background.
        </Typography>
      </div>
      <>
        <div className="grow overflow-y-auto">
          {tab === Tabs.PHYGITAL ? (
            phygitalNfts && phygitalNfts?.length > 0 ? (
              <ImageList images={phygitalNfts} isLoading={isLoadingPhygitalNfts} />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-2 rounded-sm border-2 border-dashed border-neutral-600 dark:border-neutral-400">
                <Typography className="text-neutral-400 dark:text-neutral-600" size="sm">
                  No NFTs are available in this wallet.
                </Typography>
                <Button color="primary" variant="outlined" onClick={openNFTCreation}>
                  CREATE NFT
                </Button>
              </div>
            )
          ) : (
            <ImageList images={digitalNfts} isLoading={isLoadingDigitalNfts} />
          )}
        </div>
        {phygitalNfts && phygitalNfts?.length === 0 && tab === Tabs.PHYGITAL ? (
          <div></div>
        ) : (
          <div className="flex flex-col gap-3">
            <Button
              color="primary"
              variant="outlined"
              onClick={() => {
                const options = {
                  type: 'StaticImage',
                  src: selectedObject?.imageUrl,
                  id: `${selectedObject?.id}`,
                  metadata: {},
                }
                if (tab === Tabs.PHYGITAL) {
                  options.metadata = { type: 'nft' }
                }
                if (tab === Tabs.DIGITAL) {
                  options.metadata = {
                    type: 'digital',
                    tokenAddress: selectedObject?.tokenAddress,
                    tokenId: selectedObject?.tokenId,
                  }
                }
                editor && editor.objects.add(options)
              }}
            >
              ADD TO SPACE
            </Button>
            <Button color="primary" variant="outlined" onClick={() => setComponent(1)}>
              REMOVE BACKGROUND
            </Button>
          </div>
        )}
      </>
    </div>
  )
}
