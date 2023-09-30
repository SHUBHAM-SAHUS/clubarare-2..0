import { useEditor } from '@layerhub-io/react'
import React, { useState, useEffect } from 'react'

import { RemoveBackgroundTabProps } from './interface'

import { toBase64 } from 'utils'
import { useSpace } from 'context'
import { Typography } from 'design-systems/Atoms/Typography'
import { Button } from 'design-systems/Atoms/Button'
import { ClubRareImage } from 'design-systems/Atoms/Image'
import { Skeleton } from 'design-systems/Atoms/Skeleton'
import { SpaceService } from 'api-services'

export const RemoveBackgroundTab: React.FC<RemoveBackgroundTabProps> = () => {
  const editor = useEditor()
  const { selectedObject, setComponent, nftType } = useSpace()
  const [removedBGImage, setRemovedBGImage] = useState<File>()
  let apiCalled = false

  async function getFileFromUrl(url: string, name: string, defaultType = 'image/jpeg') {
    try {
      const response = await fetch(url)
      const data = await response.blob()
      return new File([data], name, {
        type: data.type || defaultType,
      })
    } catch (error) {
      return undefined
    }
  }

  const handleRemoveBackground = async () => {
    if (!apiCalled && selectedObject) {
      apiCalled = true
      SpaceService.removeBgImage(selectedObject)
        .then(res => res.data)
        .then(async res => {
          if (res.url) {
            const splitFileName = res.url.split('/')
            const fileName = splitFileName[splitFileName.length - 1]
            const fileObject = await getFileFromUrl(res.url, fileName)
            setRemovedBGImage(fileObject)
          }
        })
    }
  }

  const onAddToCanvas = async () => {
    if (removedBGImage) {
      const base64 = (await toBase64(removedBGImage)) as string
      const options = {
        id: selectedObject?.id,
        metadata: { type: nftType === 'PHYGITAL' ? 'nft' : '' },
        src: base64,
        type: 'StaticImage',
      }
      editor && editor.objects.add(options)
    }
  }

  useEffect(() => {
    handleRemoveBackground()
  }, [])

  return (
    <div className="flex h-full flex-col gap-3 bg-neutral-800 p-4 dark:bg-neutral-200">
      <div className="flex flex-col gap-2">
        <Typography size="small" variant="condensed">
          Removing Background. Select Add to Space to add your NFT to the space
        </Typography>
      </div>
      <div className="grow">
        {removedBGImage ? (
          <ClubRareImage
            alt=""
            className="!h-1/2 w-full"
            src={URL.createObjectURL(removedBGImage)}
            styles={{ height: '100%', objectFit: 'cover', width: '100%' }}
          />
        ) : (
          <div className="h-1/2 w-full">
            <Skeleton />
          </div>
        )}
      </div>
      <div className="flex justify-between gap-2">
        <Button color="primary" size="small" variant="outlined" onClick={() => setComponent(0)}>
          CANCEL
        </Button>
        <Button
          color="primary"
          disabled={!removedBGImage}
          fullWidth
          size="small"
          variant="solid"
          onClick={onAddToCanvas}
        >
          ADD TO SPACE
        </Button>
      </div>
    </div>
  )
}
