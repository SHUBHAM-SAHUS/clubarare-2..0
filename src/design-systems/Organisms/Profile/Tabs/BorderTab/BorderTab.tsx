import React, { useEffect, useState } from 'react'
import { useEditor, useObjects } from '@layerhub-io/react'
import { ILayerOptions } from '@layerhub-io/types'
import { nanoid } from 'nanoid'

import { ImageList } from '../../ImageList'

import { BorderTabProps } from './interface'

import { Typography } from 'design-systems/Atoms/Typography'
import { Button } from 'design-systems/Atoms/Button'
import { useSpaceAssets } from 'hooks/api/useSpaceAssets'
import { useSpace } from 'context'
export const BorderTab: React.FC<BorderTabProps> = () => {
  const { borders, isLoadingBorders } = useSpaceAssets()
  const elements: ILayerOptions[] = useObjects()
  const [borderId, setBorderId] = useState<string | undefined>()
  const editor = useEditor()
  const { setComponent } = useSpace()

  useEffect(() => {
    if (elements) {
      const element = elements?.find((value: ILayerOptions) => value['id']?.includes('border')) as
        | ILayerOptions
        | undefined
      setBorderId(element?.id)
    }
  }, [elements])

  return (
    <div className="flex h-full flex-col gap-3 bg-neutral-800 dark:bg-neutral-200">
      <Typography size="small" variant="condensed">
        Select a window display border or upload your own image display border
      </Typography>
      <div className="grow overflow-y-auto">
        <ImageList
          images={borders}
          isLoading={isLoadingBorders}
          onClick={async (image: ImageObject) => {
            const options = {
              type: 'StaticImage',
              src: image.imageUrl,
              id: `${nanoid()}border`,
              scaleX: 1.87,
              scaleY: 1.9,
            }
            if (borderId) editor.objects.remove(borderId)
            await editor.objects.add(options)
            editor.objects.alignLeft(options.id)
            editor.objects.alignTop(options.id)
            editor.objects.sendToBack(options.id)
            editor.objects.lock(options.id)
            setBorderId(options.id)
          }}
        />
      </div>
      <Button color="primary" variant="outlined" onClick={() => setComponent(4)}>
        UPLOAD IMAGE
      </Button>
    </div>
  )
}
