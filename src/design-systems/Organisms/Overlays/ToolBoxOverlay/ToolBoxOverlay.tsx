import React from 'react'

import { Overlay } from '../Overlay'

import { ToolBoxOverlayProps } from './interface'

import { ArrowLeftIcon } from 'design-systems/Atoms/Icons'
import { ToolBox } from 'design-systems/Organisms/Profile/ToolBox'
import { RemoveBackgroundTab, UploadImageTab, UploadItemTab } from 'design-systems/Organisms/Profile/Tabs'
import { useSpace } from 'context'

export const ToolBoxOverlay: React.FC<ToolBoxOverlayProps> = () => {
  const { component, setComponent } = useSpace()
  return (
    <Overlay
      headerProps={
        component != 0 ? (
          <div onClick={() => setComponent(0)}>
            <ArrowLeftIcon className="ml-2 cursor-pointer stroke-neutral-100 dark:stroke-neutral-500" />
          </div>
        ) : (
          <></>
        )
      }
      showBackDrop={false}
    >
      {component === 0 && <ToolBox />}
      {component === 1 && <RemoveBackgroundTab />}
      {component === 2 && <UploadImageTab />}
      {component === 3 && <UploadItemTab />}
    </Overlay>
  )
}
