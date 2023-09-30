import { useEditor } from '@layerhub-io/react'
import { nanoid } from 'nanoid'
import React, { useState } from 'react'

import { ImageList } from '../../ImageList'

import { ElementTabProps } from './interface'
import { buttons, Tabs } from './utils'

import { Typography } from 'design-systems/Atoms/Typography'
import { ButtonGroup } from 'design-systems/Molecules/ButtonGroups/ButtonGroup'
import { Button } from 'design-systems/Atoms/Button'
import { useSpaceAssets } from 'hooks/api/useSpaceAssets'
import { useSpace } from 'context'

export const ElementTab: React.FC<ElementTabProps> = () => {
  const [tab, setTab] = useState<Tabs>(Tabs.OBJECTS)
  const { selectedObject } = useSpace()
  const { elementObjects, elementLightings, isLoadingElementObjects, isLoadingElementLightings } = useSpaceAssets()
  const editor = useEditor()
  const { setComponent } = useSpace()

  return (
    <div className="flex h-full flex-col gap-6 bg-neutral-800 dark:bg-neutral-200">
      <div className="flex flex-col gap-3">
        <ButtonGroup
          buttons={buttons}
          clickHandler={(id: Tabs) => {
            setTab(id)
          }}
        />
        <Typography size="small" variant="condensed">
          Add objects and lighting effects to your canvas, or upload your own images
        </Typography>
      </div>
      <div className="grow overflow-y-auto">
        {tab === Tabs.OBJECTS ? (
          <ImageList images={elementObjects} isLoading={isLoadingElementObjects} />
        ) : (
          <ImageList images={elementLightings} isLoading={isLoadingElementLightings} transparency={false} />
        )}
      </div>
      <div className="flex flex-col gap-3">
        <Button
          color="primary"
          variant="outlined"
          onClick={() => {
            const options = {
              type: selectedObject?.fileType === 'image/svg+xml' ? 'StaticVector' : 'StaticImage',
              src: selectedObject?.imageUrl,
              id: nanoid(),
            }
            editor && editor.objects.add(options)
            editor && editor.objects.bringToFront(options.id)
          }}
        >
          ADD TO SPACE
        </Button>
        <Button color="primary" variant="outlined" onClick={() => setComponent(2)}>
          UPLOAD IMAGE
        </Button>
      </div>
    </div>
  )
}
