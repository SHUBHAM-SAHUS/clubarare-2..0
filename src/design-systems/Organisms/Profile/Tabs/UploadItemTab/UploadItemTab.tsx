import { useEditor } from '@layerhub-io/react'
import { nanoid } from 'nanoid'
import React, { useEffect, useState, ChangeEvent, useRef } from 'react'
import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import moment from 'moment'

import { spaceTabs } from '../../ToolBox/utils'
import { ImageList } from '../../ImageList'

import { UploadItemTabProps } from './interface'

import { useSpace } from 'context'
import { Typography } from 'design-systems/Atoms/Typography'
import { Button } from 'design-systems/Atoms/Button'
import { Spinner } from 'design-systems/Atoms/Spinner'
import { AddImage } from 'design-systems/Molecules/Buttons/AddImage'
import { InfoIcon } from 'design-systems/Atoms/Icons'
import { toBase64, validImageTypes } from 'utils'
import { SpaceService } from 'api-services'
import { useToast } from 'hooks/useToast'
import { AIInput } from 'design-systems/Molecules/AIInput'
import { mergeAIImageArrayObjects } from 'utils'

export const UploadItemTab: React.FC<UploadItemTabProps> = () => {
  const { selectedTab } = useSpace()
  const editor = useEditor()
  const { successToast, warningToast } = useToast()
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null)
  const [file, setFile] = useState<File>()
  const [aiKeyword, setAIkeyword] = useState<string>('')
  const [aiGenerating, setAIGenerating] = useState<boolean>(false)
  const [aiImages, setAIImages] = useState<AIImageObject>()
  const [generatedAIImages, setGeneratedAIImages] = useState<AIImageObject[]>()
  const [selectedAIImage, setSelectedAIImage] = useState<ImageObject>()
  const aiTab = localStorage.getItem('aiTab')
  const aiLabel = localStorage.getItem('aiLabel')

  const onAddToCanvas = async () => {
    if (selectedAIImage) {
      const upload = {
        id: nanoid(),
        src: selectedAIImage.imageUrl,
        type: 'StaticImage',
      }
      editor.objects.add(upload)
    } else if (file) {
      const base64 = (await toBase64(file)) as string
      const upload = {
        id: nanoid(),
        src: base64,
        type: 'StaticImage',
      }
      editor.objects.add(upload)
    }
  }
  const handleSelectTemplate = async (image: ImageObject) => {
    setSelectedAIImage(image)
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
      formData.append('tab', 'upload')
      const result = await SpaceService.generateAIImagesWithImage(formData)
      if (result.message === 'Request sent!, Please wait while we generating image') {
        successToast(result.message)
        localStorage.setItem('aiLabel', 'image')
        localStorage.setItem('aiTab', 'upload')
        setAIGenerating(true)
      } else {
        warningToast(result.message)
      }
    }
  }

  const getAIImages = async () => {
    const result = await SpaceService.getAIImages()
    if (result.message === 'failed') {
      warningToast('AI image generating failed. Please try again!')
      localStorage.setItem('aiLabel', '')
      localStorage.setItem('aiTab', '')
      setAIGenerating(false)
    } else if (result.data) {
      successToast('AI image generating success!')
      setAIImages(result.data)
      localStorage.setItem('aiLabel', '')
      localStorage.setItem('aiTab', '')
      setAIGenerating(false)
      setAIkeyword(result.data.prompt)
    }
  }
  const getGeneratedAIImages = async () => {
    const data = await SpaceService.getGeneratedAIImages('upload', 'image')

    if (data?.data) {
      const mergedData = mergeAIImageArrayObjects(data?.data?.rows)
      setGeneratedAIImages(mergedData)
    }
  }

  useEffect(() => {
    getGeneratedAIImages()
  }, [])

  useEffect(() => {
    if (intervalIdRef.current !== null) {
      clearInterval(intervalIdRef.current)
    }
    if ((aiTab === 'upload' && aiLabel === 'image') || aiGenerating) {
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
    <div className="flex h-full w-full flex-col gap-3 bg-neutral-800 p-4 dark:bg-neutral-200">
      <div className="flex grow flex-col gap-2 overflow-y-auto">
        <div className="rounded-xs bg-gradient-to-r from-brand-800 to-secondary-500 p-[2px]">
          <AIInput
            value={aiKeyword}
            placeholder="Type the desired text to generate a item"
            onChange={val => setAIkeyword(val)}
            onClick={generateAIImages}
          />
        </div>
        {(aiTab === 'upload' && aiLabel === 'image') || aiGenerating ? (
          <div className="flex w-full items-center justify-center gap-2 rounded-xs bg-neutral-400 px-4 py-2">
            <Spinner className="h-6 w-6 stroke-neutral-700" />
            <Typography size="small" className="text-center text-neutral-600">
              It might take a few minutes to generate AI image
            </Typography>
          </div>
        ) : aiImages ? (
          <div className="flex flex-col gap-2">
            <Typography variant="condensed" className="text-center">
              LAST IMAGES
            </Typography>
            <ImageList images={aiImages?.images} onClick={handleSelectTemplate} />
          </div>
        ) : (
          <div>
            <AddImage
              height={400}
              width={340}
              onChange={(file: { fileData: File; type: string }) => {
                setFile(file?.fileData)
              }}
              accept={validImageTypes}
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
        <br />
        {generatedAIImages && (
          <div className="flex flex-col gap-2">
            <Typography variant="condensed" className="text-center">
              HISTORY
            </Typography>
            {generatedAIImages.map(item => (
              <Disclosure key={item.id}>
                {({ open }) => (
                  /* Use the `open` state to conditionally change the direction of an icon. */
                  <>
                    <Disclosure.Button className="flex items-center justify-between border-b border-neutral-400 pb-1 dark:border-neutral-600">
                      <Typography size="caption" variant="condensed">
                        {moment(item.createdOn).format('MMM Do YYYY')}
                      </Typography>
                      <ChevronDownIcon className={open ? 'h-5 w-5 rotate-180 transform' : 'h-5 w-5'} />
                    </Disclosure.Button>
                    <Disclosure.Panel>
                      <ImageList cols={4} images={item?.images} onClick={handleSelectTemplate} />
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-between gap-2">
        {!(aiTab === 'upload' && aiLabel === 'image') && !aiGenerating && (
          <Button color="primary" fullWidth size="medium" variant="solid" onClick={onAddToCanvas}>
            ADD TO SPACE
          </Button>
        )}
      </div>
    </div>
  )
}
