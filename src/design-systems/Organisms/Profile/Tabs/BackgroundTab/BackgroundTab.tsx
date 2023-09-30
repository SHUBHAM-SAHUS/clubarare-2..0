import { ChangeEvent, useEffect, useState, useRef } from 'react'
import { useEditor } from '@layerhub-io/react'
import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import moment from 'moment'

import { ImageList } from '../../ImageList'
import { ColorsList } from '../../ColorsList'

import { BackgroundTabProps } from './interface'
import { buttons, Tabs } from './utils'

import { Button } from 'design-systems/Atoms/Button'
import { Spinner } from 'design-systems/Atoms/Spinner'
import { Typography } from 'design-systems/Atoms/Typography'
import { ButtonGroup } from 'design-systems/Molecules/ButtonGroups/ButtonGroup'
import { StarIcon } from 'design-systems/Atoms/Icons'
import { useSpaceAssets } from 'hooks/api/useSpaceAssets'
import { useToast } from 'hooks/useToast'
import { useSpace } from 'context'
import { SpaceService } from 'api-services'
import { AIInput } from 'design-systems/Molecules/AIInput'
import { mergeAIImageArrayObjects } from 'utils'

export const BackgroundTab: React.FC<BackgroundTabProps> = () => {
  const editor = useEditor()
  const { setComponent } = useSpace()
  const { successToast, warningToast } = useToast()
  const [tab, setTab] = useState<Tabs>(Tabs.TEMPLATES)
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null)
  const [aiKeyword, setAIkeyword] = useState<string>('')
  const [aiImages, setAIImages] = useState<AIImageObject>()
  const [generatedAIImages, setGeneratedAIImages] = useState<AIImageObject[]>()
  const [aiGenerating, setAIGenerating] = useState<boolean>(false)
  const { backgroundTemplates, isLoadingBackgroundTemplates } = useSpaceAssets()
  const aiTab = localStorage.getItem('aiTab')
  const aiLabel = localStorage.getItem('aiLabel')
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
  const generateAIImages = async () => {
    if (aiTab && aiLabel) {
      warningToast(
        `You are currently generating AI images with ${aiLabel === 'text' ? 'text' : 'text and image'} on ${aiTab} tab`
      )
    } else if (aiKeyword) {
      const result = await SpaceService.generateAIImages(aiKeyword, 'text', 'background')
      if (result.message === 'Request sent!, Please wait while we generating image') {
        successToast(result.message)
        localStorage.setItem('aiLabel', 'text')
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
      warningToast('AI image generating failed. Please try again!')
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
    const data = await SpaceService.getGeneratedAIImages('background', 'text')
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
    if ((aiTab === 'background' && aiLabel === 'text') || aiGenerating) {
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
    <div className="flex h-full w-full flex-col gap-6 bg-neutral-800 dark:bg-neutral-200">
      <div className="flex flex-col gap-3">
        <ButtonGroup className="!gap-0" buttons={buttons} clickHandler={(id: Tabs) => setTab(id)} />
        <Typography size="small" variant="condensed" className="ml-2">
          {tab === Tabs.COLORS
            ? 'Select your background color'
            : 'Select from one of our pre-defined templates, or upload your own image background'}
        </Typography>
      </div>
      <div className="grow overflow-y-auto">
        {tab === Tabs.TEMPLATES && (
          <div className="flex flex-col gap-4">
            <ImageList
              images={backgroundTemplates}
              isLoading={isLoadingBackgroundTemplates}
              onClick={handleSelectTemplate}
            />
          </div>
        )}
        {tab === Tabs.COLORS && (
          <ColorsList
            onClick={async (color: string) => {
              const object = await editor.objects.unsetBackgroundImage()
              editor.objects.deselect()
              editor.objects.remove(object?.id)
              editor.frame.resize({
                width: 1810,
                height: 1035,
              })
              editor.frame.setBackgroundColor(color)
            }}
          />
        )}
        {tab === Tabs.AIGALLERY && (
          <div className="flex flex-col gap-2">
            <div className="rounded-xs bg-gradient-to-r from-brand-800 to-secondary-500 p-[2px]">
              <AIInput
                value={aiKeyword}
                placeholder="Type the desired text to generate a background image"
                onChange={val => setAIkeyword(val)}
                onClick={generateAIImages}
              />
            </div>
            {(localStorage.getItem('aiTab') === 'background' && localStorage.getItem('aiLabel') === 'text') ||
            aiGenerating ? (
              <div className="flex w-full items-center justify-center gap-2 rounded-xs bg-neutral-400 px-4 py-2">
                <Spinner className="h-6 w-6 stroke-neutral-700" />
                <Typography size="caption" className="text-center text-neutral-600">
                  It might take a few minutes to generate AI image
                </Typography>
              </div>
            ) : aiImages?.images ? (
              <div className="flex flex-col gap-2">
                <Typography variant="condensed" className="text-center">
                  LAST IMAGES
                </Typography>
                <ImageList images={aiImages?.images} onClick={handleSelectTemplate} />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 bg-brand-500 px-3 py-4">
                <StarIcon className="" />
                <Typography variant="condensed" className="text-center font-bold text-neutral-100">
                  Start with a prompt, unleash your creativity.
                </Typography>
                <Typography variant="condensed" className="text-center text-neutral-100">
                  We&apos;re thrilled to unveil the latest addition to our platform - the AI Image Generator! This
                  powerful new feature in our AI gallery allows you to create unique, dynamic images with just a few
                  clicks.
                </Typography>
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
        )}
      </div>
      <div className="flex">
        <Button color="primary" fullWidth variant="outlined" onClick={() => setComponent(2)}>
          UPLOAD IMAGE
        </Button>
      </div>
    </div>
  )
}
