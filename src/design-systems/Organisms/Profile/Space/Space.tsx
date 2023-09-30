import { useCallback, useEffect, useMemo, useState } from 'react'
import { IScene } from '@layerhub-io/types'
import { Canvas as LayerHubCanvas, useEditor, useActiveObject, useObjects } from '@layerhub-io/react'
import { _toEscapedUtf8String } from 'ethers/lib/utils.js'

import { config, fetchSceneData, loadTemplateFonts, textClassName } from './utils'
import type { IDesign, SpaceProps } from './interface'

import { Typography } from 'design-systems/Atoms/Typography'
import { Button } from 'design-systems/Atoms/Button'
import { ClubRareImage } from 'design-systems/Atoms/Image'
import { Spinner } from 'design-systems/Atoms/Spinner'
import { SpaceIcon } from 'design-systems/Atoms/Icons'
import { useOverlay, useSpace } from 'context'
import { useToast } from 'hooks/useToast'
import { OverlayIds } from 'design-systems/Organisms/Managers/OverlayManager'
import { PAGE_ROUTES } from 'utils'

export const Space: React.FC<SpaceProps> = ({
  className = '',
  isConnected = true,
  isEmptySpace = true,
  spaceImage = '',
  spaceUrl,
  userIdOrAddress,
  isGuest = false,
}) => {
  const { loadingToast, updateToast } = useToast()
  const editor = useEditor()
  const activeObject: any = useActiveObject()
  const [isEmpty, setEmpty] = useState<boolean>(isEmptySpace)
  const [isSpaceLoading, setSpaceLoading] = useState<boolean>(!isEmptySpace)
  const objects: any = useObjects()
  const { openOverlay } = useOverlay()
  const { openEditor, setOpenEditor } = useSpace()

  const classNames = useMemo(
    () => ['w-full h-186 lg:h-540 lg:w-960 bg-neutral-600 flex justify-center items-center', className].join(' '),
    [className]
  )
  useEffect(() => {
    if (editor) {
      if (
        !isGuest &&
        openEditor &&
        !(activeObject?.name === 'Initial Frame' || activeObject?.name === 'BackgroundImage')
      ) {
        editor.objects.unlock()
      } else {
        editor.objects.lock()
      }
    }
  }, [isGuest, openEditor, activeObject])

  useEffect(() => {
    if (editor) {
      if (activeObject && activeObject?.metadata?.type === 'nft' && activeObject.locked) {
        window.open(`${PAGE_ROUTES.product(activeObject?.id)}`)
        editor.objects.deselect()
      }

      if (activeObject && (activeObject?.name === 'Initial Frame' || activeObject?.name === 'BackgroundImage')) {
        editor.objects.deselect()
      }
    }
  }, [activeObject])

  useEffect(() => {
    if (editor) {
      // editor issue fix
      const canvasContainers = document.getElementsByClassName('canvas-container')
      if (canvasContainers.length > 1) {
        const copyHtml = canvasContainers[1]
        canvasContainers[0].remove()
        const tt = document.getElementById('layerhub_io_canvas_container')
        if (tt && tt.childNodes) {
          tt.appendChild(copyHtml)
        }
      }
      // resize frame
      editor.frame.resize({
        width: 1810,
        height: 1035,
      })
      if (spaceUrl) loadGraphicTemplate(spaceUrl)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, spaceUrl])

  const loadGraphicTemplate = useCallback(
    async (url: string) => {
      try {
        setSpaceLoading(true)
        const toastId = loadingToast('Loading space...')

        const activeScene: IDesign = await fetchSceneData(url)
        const { scenes: _scenes } = activeScene
        for (const scn of _scenes) {
          const scene: IScene = {
            name: scn.name,
            frame: {
              width: 1810,
              height: 1035,
            },
            id: scn.id,
            layers: scn.layers,
            metadata: {},
          }
          await editor.renderer.render(scene)
          await loadTemplateFonts(scene)
          await editor.scene.importFromJSON(scene)
        }
        setSpaceLoading(false)
        updateToast(toastId, 'Space loaded successfully', 'success')
      } catch (error) {
        console.error(error)
      }
    },
    [editor]
  )

  useEffect(() => {
    if (objects.length > 0) {
      setEmpty(false)
      if (isGuest || !openEditor) {
        objects.map((object: any) => {
          editor.objects.lock(object.id)
        })
      }
    }
  }, [objects, openEditor])

  if (!isConnected && !isGuest) {
    return (
      <div className={classNames}>
        <div className="flex w-5/6 items-center">
          <div className="flex w-full flex-col items-center p-2 text-center lg:w-1/2 lg:items-start">
            <Typography className={textClassName} variant="condensed">
              Showcase your NFTs to the world with
              <br /> your own personalized window display
            </Typography>
            <Button className="mt-3 uppercase" onClick={() => openOverlay(OverlayIds.PROFILE)}>
              Connect Wallet
            </Button>
          </div>
          <div className="hidden w-1/2 lg:block">
            <ClubRareImage alt={''} className="w-full" src={spaceImage} />
          </div>
        </div>
      </div>
    )
  }

  if (isEmpty && !isGuest && !openEditor) {
    return (
      <div className={classNames}>
        <div
          className={`${
            isGuest && isEmptySpace ? 'pointer-events-none' : ''
          } flex h-96 w-full flex-col items-center justify-center gap-2`}
          onClick={() => {
            openOverlay(OverlayIds.TOOLBOX, { userIdOrAddress })
            setOpenEditor(true)
          }}
        >
          <SpaceIcon className="h-10 w-10 cursor-pointer items-center rounded-full bg-neutral-700" />
          <Typography className="cursor-pointer font-RobotoCondensed text-neutral-400" size="small" variant="condensed">
            Click the Edit Space button to get started
          </Typography>
        </div>
      </div>
    )
  }

  return (
    <>
      <>
        <div className={`relative mt-4 flex h-186 flex-1 md:h-400 lg:h-540`}>
          {isSpaceLoading && (
            <div className="absolute z-50 flex h-full w-full items-center justify-center">
              <ClubRareImage alt="" className="brightness-50" src={spaceImage} />
              <Spinner className="absolute mx-4 h-20 w-20 stroke-neutral-700" />
            </div>
          )}
          <div className="relative flex flex-1 flex-col">
            <div className="relative flex flex-1">
              <LayerHubCanvas config={config} />
            </div>
          </div>
        </div>
      </>
    </>
  )
}
