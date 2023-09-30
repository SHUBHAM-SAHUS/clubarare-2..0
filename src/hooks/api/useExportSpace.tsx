import React, { useCallback, useEffect, useState } from 'react'
import { useEditor } from '@layerhub-io/react'

import { SpaceService } from 'api-services'
import { useToast } from 'hooks/useToast'

export const useExportSpace = (id?: string) => {
  const editor = useEditor()
  const { loadingToast, updateToast } = useToast()
  const [isSaving, setSaving] = useState<boolean>(false)

  // Note: temporarily disable auto save
  // Todo: remove this when we have a better solution
  // const triggerSave = debounce(() => saveChanges(id), EDITOR_EXPORT_TRIGGER_DELAY)

  // Note: temporarily disable auto save
  // Todo: remove this when we have a better solution
  // useEffect(() => {
  //   if (editor) {
  //     if (!editor?.all?.has('history:changed')) editor.on('history:changed', watcher)
  //   }
  //   return () => {
  //     if (editor) editor.off('history:changed', watcher)
  //   }
  // }, [editor])

  // Note: temporarily disable auto save
  // Todo: remove this when we have a better solution
  // const watcher = () => {
  //   try {
  //     triggerSave.cancel()
  //     triggerSave()
  //   } catch (error) {}
  // }

  const saveChanges = useCallback(
    async (id: string | undefined) => {
      const currentScene = editor.scene.exportToJSON()
      const image = (await editor.renderer.render(currentScene)) as string

      const updatedScenes = [
        {
          id: currentScene.id,
          layers: currentScene.layers,
          name: currentScene.name,
        },
      ]

      if (currentScene) {
        const graphicTemplate = {
          id: currentScene.id,
          type: 'GRAPHIC',
          name: currentScene.name,
          frame: currentScene.frame,
          scenes: updatedScenes,
          metadata: {},
          preview: '',
        }

        const blob = new Blob([JSON.stringify(graphicTemplate)], { type: 'application/json' })
        const blobImage = new Blob([image], { type: 'image/png' })

        const paramsData = new FormData()
        paramsData.append('file', blob)
        paramsData.append('space_image', blobImage)
        if (id) paramsData.append('id', id)

        const response = await SpaceService.exportSpace(paramsData)

        return response
      } else {
      }
    },
    [editor?.renderer, editor?.scene]
  )

  const exportSpaceAsync = async (id: string | undefined) => {
    try {
      setSaving(true)
      const toastId = loadingToast('Saving space...')
      const response = await saveChanges(id)
      if (response) {
        setSaving(false)
        updateToast(toastId, 'Successfully uploaded.', 'success')
      }
    } catch (error) {}
  }

  return {
    isSaving,
    exportSpaceAsync,
  }
}
