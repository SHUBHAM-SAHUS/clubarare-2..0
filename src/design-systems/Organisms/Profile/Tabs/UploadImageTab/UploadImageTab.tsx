import { useEditor } from '@layerhub-io/react'
import { nanoid } from 'nanoid'
import React, { useEffect, useState, ChangeEvent, useRef } from 'react'

import { spaceTabs } from '../../ToolBox/utils'
import { ImageList } from '../../ImageList'

import { UploadImageTabProps } from './interface'

import { useSpace } from 'context'
import { Typography } from 'design-systems/Atoms/Typography'
import { Button } from 'design-systems/Atoms/Button'
import { Spinner } from 'design-systems/Atoms/Spinner'
import { AddImage } from 'design-systems/Molecules/Buttons/AddImage'
import { InfoIcon } from 'design-systems/Atoms/Icons'
import { toBase64, validImageTypes } from 'utils'
import { SpaceService } from 'api-services'
import { useToggle } from 'hooks/useToggle'
import { useToast } from 'hooks/useToast'
import { AIInput } from 'design-systems/Molecules/AIInput'

export const UploadImageTab: React.FC<UploadImageTabProps> = () => {
  const { selectedTab } = useSpace()
  const { successToast, warningToast } = useToast()
  const [isLoading, , , showLoading, hideLoading] = useToggle(false)
  const editor = useEditor()
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null)
  const [file, setFile] = useState<File>()
  const [aiKeyword, setAIkeyword] = useState<string>('')
  const [aiGenerating, setAIGenerating] = useState<boolean>(false)
  const [aiImages, setAIImages] = useState<AIImageObject>()
  const [backgroundRemovedFile, setBackgroundRemovedFile] = useState<File>()
  const aiTab = localStorage.getItem('aiTab')
  const aiLabel = localStorage.getItem('aiLabel')

  const onAddToCanvas = async () => {
    if (backgroundRemovedFile) {
      const base64 = (await toBase64(backgroundRemovedFile)) as string
      const options = {
        id: nanoid(),
        src: base64,
        type: 'StaticImage',
      }

      if (selectedTab === spaceTabs.BACKGROUND) {
        editor.frame.setBackgroundColor('#f1f2f6')
        const object = await editor.objects.unsetBackgroundImage()
        editor.objects.deselect()
        editor.objects.remove(object?.id)
        editor.objects
          .add(options)
          .then(() => {
            editor.frame.resize({
              height: 1035,
              width: 1810,
            })
            editor.objects.setAsBackgroundImage(options.id)
            editor.objects.lock(options.id)
          })
          .catch(err => {
            console.error(err)
          })
      } else if (selectedTab === spaceTabs.DECORATION) {
        editor.objects.add(options)
      }
    } else if (file) {
      const base64 = (await toBase64(file)) as string
      const upload = {
        id: nanoid(),
        src: base64,
        type: 'StaticImage',
      }
      if (selectedTab === spaceTabs.BACKGROUND) {
        editor.frame.setBackgroundColor('#f1f2f6')
        const object = await editor.objects.unsetBackgroundImage()
        editor.objects.deselect()
        editor.objects.remove(object?.id)
        editor.objects
          .add(upload)
          .then(() => {
            editor.frame.resize({
              width: 1810,
              height: 1035,
            })
            editor.objects.setAsBackgroundImage(upload.id)
            editor.objects.lock(upload.id)
          })
          .catch(err => {
            console.error(err)
          })
      } else if (selectedTab === spaceTabs.DECORATION) {
        editor.objects.add(upload)
      }
    }
  }
  const handleSelectTemplate = async (image: ImageObject) => {
    if (editor) {
      editor.frame.setBackgroundColor('#f1f2f6')
      const object = await editor.objects.unsetBackgroundImage()
      editor.objects.deselect()
      editor.objects.remove(object?.id)
      const options = {
        type: 'BackgroundImage',
        name: 'BackgroundImage',
        src: image.imageUrl,
        id: image.id,
      }
      editor.objects
        .add(options)
        .then(() => {
          editor.frame.resize({
            width: 1810,
            height: 1035,
          })
          editor.objects.setAsBackgroundImage(options.id)
          editor.objects.lock(options.id)
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
  async function getFileFromUrl(url: string, name: string, defaultType = 'image/jpeg') {
    const response = await fetch(url)
    const data = await response.blob()
    return new File([data], name, {
      type: data.type || defaultType,
    })
  }

  const handleRemoveBackground = async () => {
    if (file) {
      showLoading()
      const formData = new FormData()
      formData.append('file', file)
      SpaceService.removeBgWithUpload(formData)
        .then(res => res.data)
        .then(async (res: UploadImageObject) => {
          if (res.status && res.url) {
            const splitFileName = res.url.split('/')
            const fileName = splitFileName[splitFileName.length - 1]
            const fileObject = await getFileFromUrl(res.url, fileName)
            setBackgroundRemovedFile(fileObject)
          }
          hideLoading()
        })
    }
  }

  const generateAIImages = async () => {
    if (aiTab && aiLabel) {
      warningToast(
        `You are currently generating AI images with ${aiLabel === 'text' ? 'text' : 'text and image'} on ${aiTab} tab`
      )
    } else if (aiKeyword && file) {
      const formData = new FormData()
      formData.append('image', file)
      formData.append('prompt', aiKeyword)
      formData.append('label', 'image')
      formData.append('tab', 'background')
      const result = await SpaceService.generateAIImagesWithImage(formData)
      if (result.message === 'Request sent!, Please wait while we generating image') {
        successToast(result.message)
        localStorage.setItem('aiLabel', 'image')
        localStorage.setItem('aiTab', 'background')
        setAIGenerating(true)
      } else {
        warningToast(result.message)
      }
    }
  }

  const getAIImages = async () => {
    const result = await SpaceService.getAIImages()
    if (result.message === 'failed') {
      localStorage.setItem('aiLabel', '')
      localStorage.setItem('aiTab', '')
      setAIGenerating(false)
    } else if (result.data) {
      setAIImages(result.data)
      localStorage.setItem('aiLabel', '')
      localStorage.setItem('aiTab', '')
      setAIGenerating(false)
      setAIkeyword(result.data.prompt)
    }
  }
  useEffect(() => {
    if (intervalIdRef.current !== null) {
      clearInterval(intervalIdRef.current)
    }
    if ((aiTab === 'background' && aiLabel === 'image') || aiGenerating) {
      intervalIdRef.current = setInterval(getAIImages, 4000)
    }

    return () => {
      // Clear the interval when the component unmounts
      if (intervalIdRef.current !== null) {
        clearInterval(intervalIdRef.current)
        intervalIdRef.current = null // Reset the interval ID to null
      }
    }
  }, [aiGenerating, aiTab, aiLabel])

  return (
    <div className="flex h-full flex-col gap-3 bg-neutral-800 p-4 dark:bg-neutral-200">
      <div className="flex grow flex-col gap-2">
        <Typography size="small" variant="condensed">
          Upload your image. Once uploaded you can remove the background from the image before adding to the canvas
          space.
        </Typography>
        {selectedTab === spaceTabs.BACKGROUND && (
          <div className="rounded-xs bg-gradient-to-r from-brand-800 to-secondary-500 p-[2px]">
            <AIInput
              value={aiKeyword}
              placeholder="Type the desired text to generate a background image"
              onChange={val => setAIkeyword(val)}
              onClick={generateAIImages}
            />
          </div>
        )}
        {(aiTab === 'background' && aiLabel === 'image') || aiGenerating ? (
          <div className="flex w-full items-center justify-center gap-2 rounded-xs bg-neutral-400 px-4 py-2">
            <Spinner className="h-6 w-6 stroke-neutral-700" />
            <Typography size="small" className="text-center text-neutral-600">
              It might take a few minutes to generate AI image
            </Typography>
          </div>
        ) : aiImages ? (
          <ImageList images={aiImages?.images} onClick={handleSelectTemplate} />
        ) : (
          <div>
            <AddImage
              height={400}
              width={340}
              onChange={(file: { fileData: File; type: string }) => {
                setFile(file?.fileData)
                setBackgroundRemovedFile(undefined)
              }}
              accept={validImageTypes}
              displayImage={backgroundRemovedFile}
            />
            <div className="flex gap-1">
              <InfoIcon stroke="stroke-neutral-400" className="stroke-neutral-400" />
              <Typography size="small" variant="condensed">
                We recommend using images at least{' '}
                {selectedTab === spaceTabs.BACKGROUND ? '960 x 540px' : '300 x 300px'} size. (jpg & png format)
              </Typography>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-between gap-2">
        {!aiImages && !(aiTab === 'background' && aiLabel === 'image') && !aiGenerating && (
          <Button color="primary" size="medium" variant="solid" onClick={onAddToCanvas}>
            ADD TO SPACE
          </Button>
        )}
        {selectedTab !== spaceTabs.BACKGROUND ? (
          <Button
            color="primary"
            disabled={isLoading || Boolean(backgroundRemovedFile)}
            size="medium"
            variant="outlined"
            onClick={handleRemoveBackground}
          >
            {isLoading ? 'Removing...' : 'Remove Background'}
          </Button>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}
